import { DiscountsProps, DiscountsUpdateProps } from "../types";
import getInstance from "./prismaClient";
import { createDiscountValidator, updateDiscountValidator } from "./validators";
import { getVarientById } from "./varients";

export async function getDiscountById(id: string) {
  if (!id) return new Error("No id provided");
  return await getInstance().discounts.findUnique({
    where: {
      id,
    },
  });
}

export async function getDiscountByVarientId(varientId: string) {
  if (!varientId) return new Error("No id provided");
  return await getInstance().discounts.findUnique({
    where: {
      varientId,
    },
  });
}

export async function addDiscount(varientId: string, discount: DiscountsProps) {
  const { error } = createDiscountValidator.validate(discount);
  if (error) return new Error(error.message);
  if (!discount) return new Error("No discount provided");
  const varient = await getInstance().productVarients.findUnique({
    where: {
      id: varientId,
    },
  });
  if (!varient) return new Error("No varient found");
  const d = await getInstance().discounts.create({
    data: {
      varientId,
      ...discount,
      active: true,
    },
  });
  await getInstance().productVarients.update({
    where: {
      id: varientId,
    },
    data: {
      discountId: d.id,
    },
  });
  return d;
}

export async function updateDiscount(
  varientId: string,
  discount: DiscountsUpdateProps
) {
  if (!varientId) return new Error("No id provided");
  const { error } = updateDiscountValidator.validate(discount);
  if (error) return new Error(error.message);
  const d = await getInstance().discounts.update({
    where: {
      varientId,
    },
    data: {
      ...discount,
    },
  });
  if (!d) return new Error("No discount found");
  return d;
}

export async function deleteDiscount(varientId: string) {
  const varient = await getVarientById(varientId);
  if (!varient) return new Error("No product found");
  if (!varient.discountId) return new Error("No discount found");
  await getInstance().discounts.delete({
    where: {
      id: varient.discountId,
    },
  });
  return await getInstance().productVarients.update({
    where: {
      id: varient.id,
    },
    data: {
      discountId: null,
    },
  });
}
