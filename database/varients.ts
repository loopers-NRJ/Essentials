import getInstance from "./prismaClient";

export async function getVarientById(id: string) {
  return await getInstance().productVarients.findUnique({
    where: {
      id,
    },
  });
}

export async function getVarientByProductId(productId: string) {
  return await getInstance().productVarients.findMany({
    where: {
      productId,
    },
  });
}

export async function deleteVarient(id: string) {
  return await getInstance().productVarients.delete({
    where: {
      id,
    },
  });
}

export async function updatePrice(varientId: string, price: number) {
  return await getInstance().productVarients.update({
    where: {
      id: varientId,
    },
    data: {
      price,
    },
  });
}

export async function updateNoInStock(
  varientId: string,
  numberInStock: number
) {
  return await getInstance().productVarients.update({
    where: {
      id: varientId,
    },
    data: {
      numberInStock,
    },
  });
}
