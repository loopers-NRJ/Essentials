import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../middlewares/admin";
import auth from "../../middlewares/auth";
import {
  cancelOrders,
  getPendingOrders,
  getSuccessOrders,
  placeOrder,
} from "../../database/orders";
import { OrderArgs } from "../../types";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(admin, async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.status as string;
  if (query && query === "success") {
    const orders = await getSuccessOrders();
    return res.status(200).json({ orders });
  } else {
    const orders = await getPendingOrders();
    return res.status(200).json({ orders });
  }
});

handler.post(auth, async (req: NextApiRequest, res: NextApiResponse) => {
  const orderArgs = req.body.products as OrderArgs[];
  const result = await placeOrder(req.user, orderArgs);
  if (result instanceof Error)
    return res.status(400).json({ message: result.message });
  return res.status(200).json(result);
});

handler.delete(auth, async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.user.id as string;
  const orderId = req.query.id as string;
  const result = await cancelOrders({ userId, orderId });
  if (result instanceof Error)
    return res.status(400).json({ message: result.message });
  return res.status(200).json(result);
});

export default handler;
