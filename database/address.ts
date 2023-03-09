import { Address } from "../types";
import getInstance from "./prismaClient";
import {
  createAddressValidator,
  idValidator,
  updateAddressValidator,
} from "./validators";

export async function findAddressByUserId(userId: string) {
  const { error } = idValidator.validate(userId);
  if (error) return new Error(error.message);
  return await getInstance().address.findUnique({
    where: {
      userId,
    },
  });
}

export async function createAddress(userId: string, address: Address) {
  const { error: idError } = idValidator.validate(userId);
  if (idError) return new Error(idError.message);
  const { error } = createAddressValidator.validate(address);
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

export async function updateAddress(id: string, address: Address) {
  const { error: idError } = idValidator.validate(id);
  if (idError) return new Error(idError.message);
  const { error } = updateAddressValidator.validate(address);
  if (error) return new Error(error.message);
  return await getInstance().address.update({
    where: {
      userId: id,
    },
    data: address,
  });
}

const Address = {
  findAddressByUserId,
  createAddress,
  updateAddress,
};

export default Address;
