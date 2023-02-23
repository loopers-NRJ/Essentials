import getInstance from "./prismaClient";
import { Users } from "../types";
export async function findUserByEmail(email: string) {
  return await getInstance().users.findUnique({
    where: {
      email,
    },
  });
}
export async function findUser(id: string) {
  return await getInstance().users.findUnique({
    where: {
      id,
    },
  });
}

export async function createUser(user: Users) {
  return await getInstance().users.create({
    data: {
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
}

const User = {
  findUser,
  findUserByEmail,
  createUser,
};

export default User;
