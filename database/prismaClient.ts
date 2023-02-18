import { PrismaClient } from "@prisma/client";

let client: PrismaClient;

export default function getInstance() {
  if (client) return client;
  client = new PrismaClient();
  return client;
}
