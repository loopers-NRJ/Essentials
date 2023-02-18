import { getCategoryById } from "./category";
import { sortOptions, filterOptions, createProductArgs } from "../types";
import getInstance from "./prismaClient";

export async function getProducts({
  query = "",
  limit = 30,
  page = 1,
  sort = sortOptions.NAME_ASC,
  filter = "",
}: filterOptions) {
  const getOrderBy = (): any => {
    if (sort === sortOptions.NAME_ASC) {
      return { name: "asc" };
    } else if (sort === sortOptions.NAME_DESC) {
      return { name: "desc" };
    } else if (sort === sortOptions.PRICE_ASC) {
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

export async function createProduct({
  name,
  description,
  price,
  numberInStock,
  images,
  category,
  varients,
}: createProductArgs) {
  const product = await getInstance().$transaction(async (prisma) => {
    const categories = [];
    for (const c of category) {
      const cat = await getCategoryById(c);
      if (!cat) return new Error("Category not found");
      categories.push(cat);
    }
    const product = await prisma.products.create({
      data: {
        name,
        description,
        price,
        numberInStock,
        images,
        category,
      },
    });
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
