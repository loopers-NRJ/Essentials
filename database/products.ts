import getInstance from "./prismaClient";
import { getCategoryById } from "./category";
import { filterOptions, updateProductArgs } from "../types";
import { createProductValidator, updateProductValidator } from "./validators";

export async function getProducts({
  query = "",
  limit = 30,
  page = 1,
  sort = "name_asc",
  filter = "",
}: filterOptions) {
  const getOrderBy = (): any => {
    if (sort === "name_asc") {
      return { name: "asc" };
    } else if (sort === "name_desc") {
      return { name: "desc" };
    } else if (sort === "price_asc") {
      return { price: "asc" };
    } else {
      return { price: "desc" };
    }
  };
  limit = limit > 30 ? 30 : limit;
  const category = filter === "" ? undefined : { hasSome: filter };
  return await getInstance().products.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      category,
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: getOrderBy(),
  });
}

export async function createProduct({ varients, ...data }: any) {
  const { error } = createProductValidator.validate(data);
  if (error) return new Error(error.message);
  const product = await getInstance().$transaction(async (prisma) => {
    const categories = [];
    for (const c of data.category) {
      const cat = await getCategoryById(c);
      if (!cat) return new Error("Category not found");
      categories.push(cat);
    }
    const product = await prisma.products.create({ data });
    for (const v of varients) {
      v.productId = product.id;
      if (!v.price) v.price = product.price;
      if (!v.numberInStock) v.numberInStock = product.numberInStock;
      if (!v.images) v.images = product.images;
    }
    if (varients.length === 0)
      varients.push({
        productId: product.id,
        price: product.price,
        numberInStock: product.numberInStock,
        images: product.images,
      });
    await prisma.productVarients.createMany({
      data: varients,
    });
    return product;
  });

  return product;
}
export async function getProductById(id: string) {
  return await getInstance().products.findUnique({
    where: {
      id,
    },
  });
}

export async function updateProduct(id: string, data: updateProductArgs) {
  const { error } = updateProductValidator.validate(data);
  if (error) return new Error(error.message);
  return await getInstance().products.update({
    where: {
      id,
    },
    data,
  });
}

const Product = {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
};

export default Product;
