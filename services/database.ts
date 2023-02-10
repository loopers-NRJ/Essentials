import { PrismaClient } from "@prisma/client";
import { User } from "./types";
let client: PrismaClient;

export default function getInstance() {
  if (client) return client;
  client = new PrismaClient();
  return client;
}

export async function getUser(email: string) {
  return await getInstance().user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser(user: User) {
  return await getInstance().user.create({
    data: user,
  });
}
