import { Address } from "../types";
import getInstance from "./prismaClient";
import { addressValidatorCreate, addressValidatorUpdate } from "./validators";

export async function findAddressByUserId(userId: string) {
  return await getInstance().address.findUnique({
    where: {
      userId,
    },
  });
}

export async function createAddress(userId: string, address: Address) {
  const { error } = addressValidatorCreate.validate(address);
  if (error) return new Error(error.message);
  const add = await getInstance().address.create({
    data: {
      ...address,
      userId,
    },
  });
  return await getInstance().users.update({
    where: {
      id: userId,
    },
    data: {
      addressId: add.id,
    },
  });
}

export default async function updateAddress(id: string, address: Address) {
  const { error } = addressValidatorUpdate.validate(address);
  if (error) return new Error(error.message);
  return await getInstance().address.update({
    where: {
      userId: id,
    },
    data: address,
  });
}
