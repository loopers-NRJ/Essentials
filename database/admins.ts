import getInstance from "./prismaClient";
import { idValidator } from "./validators";

export async function createAdmin(id: string) {
  if (!id) return new Error("Admin Id required");
  const { error: idError } = idValidator.validate(id);
  if (idError) return new Error(idError.message);
  const user = await getInstance().users.findUnique({
    where: {
      id,
    },
  });
  if (!user) return new Error("User not found");
  return await getInstance().admins.create({
    data: user,
  });
}

export async function getAdmins() {
  return await getInstance().admins.findMany({});
}

export async function removeAdmin(id: string) {
  const { error: idError } = idValidator.validate(id);
  if (idError) return new Error(idError.message);
  if (!id) return new Error("Admin Id required");
  return await getInstance().admins.delete({
    where: {
      id,
    },
  });
}

export async function findAdmin(id: string) {
  const { error: idError } = idValidator.validate(id);
  if (idError) return new Error(idError.message);
  return await getInstance().admins.findUnique({
    where: {
      id,
    },
  });
}

const Admin = {
  findAdmin,
  removeAdmin,
  getAdmins,
  createAdmin,
};
export default Admin;
