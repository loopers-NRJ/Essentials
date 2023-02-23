import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addDiscount,
  deleteDiscount,
  getDiscountByVarientId,
  updateDiscount,
} from "../../../../../../database/discount";
import admin from "../../../../../../middlewares/admin";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(async (req, res) => {
  const varientId = req.query.varientId as string;
  const discount = await getDiscountByVarientId(varientId);
  if (discount instanceof Error)
    return res.status(404).json({ message: discount.message });
  if (!discount) return res.status(404).json({ message: "No discount found" });
  return res.status(200).json(discount);
});

handler.post(admin, async (req, res) => {
  const varientId = req.query.varientId as string;
  const discount = await addDiscount(varientId, req.body);
  if (discount instanceof Error)
    return res.status(404).json({ message: discount.message });
  return res.status(200).json(discount);
});

handler.put(admin, async (req, res) => {
  const varientId = req.query.varientId as string;
  const discount = await updateDiscount(varientId, req.body);
  if (discount instanceof Error)
    return res.status(404).json({ message: discount.message });
  return res.status(200).json(discount);
});

handler.delete(admin, async (req, res) => {
  const varientId = req.query.varientId as string;
  const discount = await deleteDiscount(varientId);
  if (discount instanceof Error)
    return res.status(404).json({ message: discount.message });
  return res.status(200).json(discount);
});

export default handler;
