import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../middlewares/admin";
import { createAdmin, getAdmins, removeAdmin } from "../../database/admins";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(admin, async (req: NextApiRequest, res: NextApiResponse) => {
  const admins = await getAdmins();
  return res.status(200).json(admins);
});

handler.post(admin, async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const admin = await createAdmin(id);
  if (admin instanceof Error)
    return res.status(400).json({ message: admin.message });
  return res.status(200).json(admin);
});

handler.delete(admin, async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const admin = await removeAdmin(id);
  if (admin instanceof Error)
    return res.status(400).json({ message: admin.message });
  return res.status(200).json(admin);
});

export default handler;
