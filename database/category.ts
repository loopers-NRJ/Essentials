import getInstance from "./prismaClient";
import { categoryValidator, idValidator } from "./validators";
export async function getAllCategory() {
  return await getInstance().category.findMany({});
}
export async function getCategoryById(id: string) {
  const { error: idError } = idValidator.validate(id);
  if (idError) return new Error(idError.message);
  return await getInstance().category.findUnique({
    where: {
      id,
    },
  });
}

export async function createCategory(value: string) {
  const { error } = categoryValidator.validate({ value });
  if (error) return new Error(error.message);
  return await getInstance().category.create({
    data: {
      value,
    },
  });
}

export async function updateCategory(id: string, value: string) {
  const { error: idError } = idValidator.validate(id);
  if (idError) return new Error(idError.message);
  const { error } = categoryValidator.validate({ value });
  if (error) return new Error(error.message);
  return await getInstance().category.update({
    where: {
      id,
    },
    data: {
      value,
    },
  });
}

const Category = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
};

export default Category;
