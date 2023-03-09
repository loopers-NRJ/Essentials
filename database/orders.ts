import { OrderArgs, Users } from "../types";
import getInstance from "./prismaClient";
import { getVarientById } from "./varients";
import { idValidator, ordersValidator } from "./validators";

export async function getOrdersByUserId(id: string) {
  const { error } = idValidator.validate(id);
  if (error) return new Error(error.message);
  return await getInstance().orders.findMany({
    where: {
      userId: id,
    },
  });
}

export async function getSuccessOrders() {
  return await getInstance().orders.findMany({
    where: {
      status: "success",
    },
  });
}

export async function getPendingOrders() {
  return await getInstance().orders.findMany({
    where: {
      status: "pending",
    },
  });
}

export async function placeOrder(user: Users, products: OrderArgs[]) {
  let total = 0;
  if (!user?.addressId) return new Error("Please add an address");
  for (const product of products) {
    const { error } = ordersValidator.validate(product);
    if (error) return new Error(error.message);
    const varient = await getVarientById(product.varientId);
    if (varient instanceof Error) return varient;
    if (!varient) return new Error("Product not found");
    if (product.quantity > varient.numberInStock)
      return new Error("Not enough stock");
    else total += product.quantity * varient.price;
  }
  const order = await getInstance().$transaction(async (prisma) => {
    const order = await prisma.orders.create({
      data: { userId: user.id || "", products, total },
    });
    for (const product of products) {
      await prisma.productVarients.update({
        where: {
          id: product.varientId,
        },
        data: {
          numberInStock: {
            decrement: product.quantity,
          },
        },
      });
    }
    return order;
  });
  return order;
}

export async function cancelOrders({
  userId,
  orderId,
}: {
  userId: string;
  orderId: string;
}) {
  if (!orderId) return new Error("Order Id required");
  if (!userId) return new Error("User Id required");
  const { error: userIdError } = idValidator.validate(userId);
  if (userIdError) return new Error(userIdError.message);
  const { error: orderIdError } = idValidator.validate(orderId);
  if (orderIdError) return new Error(orderIdError.message);
  const order = await getInstance().orders.findUnique({
    where: {
      id: orderId,
    },
  });
  if (!order) return new Error("Order not found");
  if (order.userId !== userId) return new Error("Unauthorized");
  if (order.status !== "pending") return new Error("Order already processed");
  const canceledOrder = await getInstance().$transaction(async (prisma) => {
    for (const product of order.products as OrderArgs[]) {
      await prisma.productVarients.update({
        where: {
          id: product.varientId,
        },
        data: {
          numberInStock: {
            increment: product.quantity,
          },
        },
      });
    }
    const canceledOrder = await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        status: "cancelled",
      },
    });
    return canceledOrder;
  });

  return canceledOrder;
}

const Order = {
  getOrdersByUserId,
  placeOrder,
  cancelOrders,
};

export default Order;
