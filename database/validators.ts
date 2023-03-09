import joi from "joi";
export const createAddressValidator = joi.object({
  address: joi.string().min(10).max(255).required().label("Address"),
  mobile: joi.string().min(10).max(10).required().label("Mobile Number"),
});
export const updateAddressValidator = joi.object({
  address: joi.string().min(10).max(255).label("Address"),
  mobile: joi.string().min(10).max(10).label("Mobile Number"),
});

export const categoryValidator = joi.object({
  value: joi.string().min(3).max(255).label("Category").required(),
});

export const commentValidator = joi.object({
  comment: joi.string().min(3).max(255).label("Comment").required(),
});

export const ordersValidator = joi.object({
  varientId: joi.string().required(),
  quantity: joi.number().required(),
});

export const createProductValidator = joi.object({
  name: joi.string().min(3).max(255).required().label("Name"),
  description: joi.string().required().min(3).max(255).label("Description"),
  price: joi.number().required().label("Price"),
  numberInStock: joi.number().required().min(0).label("Number In Stock"),
  images: joi.array().items(joi.string()).required().min(1).label("Images"),
  category: joi.array().items(joi.string()).required().min(1).label("Category"),
});

export const updateProductValidator = joi.object({
  name: joi.string().min(3).max(255).label("Name"),
  description: joi.string().min(3).max(255).label("Description"),
  price: joi.number().label("Price"),
  numberInStock: joi.number().min(0).label("Number In Stock"),
  images: joi.array().items(joi.string()).min(1).label("Images"),
  category: joi.array().items(joi.string()).min(1).label("Category"),
});

export const createUserValidator = joi.object({
  name: joi.string().required().min(3).max(255).label("Name"),
  email: joi.string().email().required().min(3).max(255).label("Email"),
  image: joi.string().required().label("Image"),
  provider: joi.string().required().label("Provider"),
});

export const updateUserValidator = joi.object({
  name: joi.string().min(3).max(255).label("Name"),
  email: joi.string().email().min(3).max(255).label("Email"),
  image: joi.string().label("Image"),
  provider: joi.string().label("Provider"),
});

export const updateVarientValidator = joi.object({
  price: joi.number().min(0).label("Price"),
  numberInStock: joi.number().min(0).label("Number in stock"),
  images: joi.array().items(joi.string()).min(1).label("Images"),
  color: joi.string().min(3).max(20).label("Color"),
  quantity: joi.string().min(3).max(20).label("Quantity"),
});

export const createDiscountValidator = joi.object({
  name: joi.string().required().label("Name"),
  description: joi.string().label("Description"),
  discount_percent: joi.number().required().min(0).max(100).label("Discount"),
});
export const updateDiscountValidator = joi.object({
  name: joi.string().label("Name"),
  description: joi.string().label("Description"),
  discount_percent: joi.number().min(0).max(100).label("Discount"),
});

export const idValidator = joi.string().hex().length(24).required();

const Validator = {
  createAddressValidator,
  updateAddressValidator,
  categoryValidator,
  commentValidator,
  ordersValidator,
  createProductValidator,
  updateProductValidator,
  createUserValidator,
  updateUserValidator,
  updateVarientValidator,
  createDiscountValidator,
  updateDiscountValidator,
};

export default Validator;
