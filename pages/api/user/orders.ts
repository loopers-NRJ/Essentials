import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middlewares/auth";
import { getOrdersByUserId } from "../../../database/orders";

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
  const orders = await getOrdersByUserId(userId);
  return res.status(200).json(orders);
});

export default handler;
