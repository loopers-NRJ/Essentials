import getInstance from "./prismaClient";

export async function getAllCategory() {
  return await getInstance().category.findMany({});
}
export async function getCategoryById(id: string) {
  return await getInstance().category.findUnique({
    where: {
      id,
    },
  });
}

export async function createCategory(value: string) {
  return await getInstance().category.create({
    data: {
      value,
    },
  });
}

export async function updateCategory(id: string, value: string) {
  return await getInstance().category.update({
    where: {
      id,
    },
    data: {
      value,
    },
  });
}
