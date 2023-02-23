import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middlewares/auth";
import updateAddress, {
  createAddress,
  findAddressByUserId,
} from "../../../database/address";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(auth, async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.user.id as string;
  const { addressId } = req.user;
  if (!addressId) return res.status(404).json(null);
  const address = await findAddressByUserId(userId);
  return res.status(200).json(address);
});

handler.put(auth, async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.user.id as string;
  const updatedAddress = await updateAddress(userId, req.body);
  if (updatedAddress instanceof Error)
    return res.status(400).json({ message: updatedAddress.message });
  return res.status(200).json(updatedAddress);
});

handler.post(auth, async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.user.id as string;
  const updatedAddress = await createAddress(userId, req.body);
  if (updatedAddress instanceof Error)
    return res.status(400).json({ message: updatedAddress.message });
  return res.status(200).json(updatedAddress);
});

export default handler;
