import getInstance from "./prismaClient";
import { updateVarientArgs } from "../types";
import { idValidator, updateVarientValidator } from "./validators";

export async function getVarientById(id: string) {
  const { error } = idValidator.validate(id);
  if (error) return new Error(error.message);
  return await getInstance().productVarients.findUnique({
    where: {
      id,
    },
  });
}

export async function getVarientByProductId(productId: string) {
  const { error } = idValidator.validate(productId);
  if (error) return new Error(error.message);
  return await getInstance().productVarients.findMany({
    where: {
      productId,
    },
  });
}

export async function deleteVarient(id: string) {
  const { error } = idValidator.validate(id);
  if (error) return new Error(error.message);
  return await getInstance().productVarients.delete({
    where: {
      id,
    },
  });
}

export async function updateVarient(id: string, data: updateVarientArgs) {
  const { error: idError } = idValidator.validate(id);
  if (idError) return new Error(idError.message);
  const { error } = updateVarientValidator.validate(data);
  if (error) return new Error(error.message);
  return await getInstance().productVarients.update({
    where: {
      id,
    },
    data,
  });
}

const Varients = {
  getVarientById,
  getVarientByProductId,
  deleteVarient,
  updateVarient,
};

export default Varients;
