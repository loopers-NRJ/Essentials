import getInstance from "./prismaClient";

export async function createAdmin(id: string) {
  if (!id) return new Error("Admin Id required");
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
  if (!id) return new Error("Admin Id required");
  return await getInstance().admins.delete({
    where: {
      id,
    },
  });
}

export async function findAdmin(id: string) {
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
