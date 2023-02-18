import { Category, Orders } from "@prisma/client";

export type Users = {
  id?: string;
  email: string;
  name: string;
  image: string;
  provider: string;
  token?: string;
  orders?: Orders[];
};

export type filterOptions = {
  limit?: number;
  page?: number;
  sort?: sortOptions;
  query?: string;
  filter?: string;
};
export enum sortOptions {
  NAME_ASC,
  NAME_DESC,
  PRICE_ASC,
  PRICE_DESC,
}

export type ProductVarients = {
  id?: string;
  images: string[];
  price: number;
  numberInStock: number;
  varientType: string;
  varientValue: string;
};

export type createProductArgs = {
  name: string;
  description: string;
  price: number;
  numberInStock: number;
  images: string[];
  category: string[];
  varients: varientArgs[];
};

// colors and ingredients are temporary
export type varientArgs = {
  id?: string;
  productId: string;
  price: number;
  numberInStock: number;
  images?: string[];
  color?: string;
  ingredient?: string;
};

export type OrderProducts = {
  productId: string;
  varientId: string;
  quantity: number;
};

export type createComment = {
  userId: string;
  comment: string;
  productId: string;
};
