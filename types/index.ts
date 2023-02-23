import { Orders } from "@prisma/client";
import { number } from "joi";

export type Users = {
  id?: string;
  email: string;
  name: string;
  image: string;
  token?: string;
  orders?: Orders[];
  addressId: string | null;
};

export type filterOptions = {
  limit?: number;
  page?: number;
  sort?: string;
  query?: string;
  filter?: string;
};

export type updateProductArgs = {
  name?: string;
  description?: string;
  price?: number;
  numberInStock?: number;
  images?: string[];
  category?: string[];
};

// colors and ingredients are temporary
export type varientArgs = {
  id?: string;
  productId: string;
  price: number;
  numberInStock: number;
  images?: string[];
  color?: string;
  quantity?: string;
};
export type updateVarientArgs = {
  price?: number;
  numberInStock?: number;
  images?: string[];
  color?: string;
  quantity?: string;
};

export type OrderArgs = {
  varientId: string;
  quantity: number;
};

export type createComment = {
  userId: string;
  comment: string;
  productId: string;
};

export type Address = {
  id?: string;
  address: string;
  mobile: string;
};

export type DiscountsProps = {
  name: string;
  description?: string;
  discount_percent: number;
};
export type DiscountsUpdateProps = {
  name?: string;
  description?: string;
  discount_percent?: number;
};
