import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getVarientById,
  deleteVarient,
} from "../../../../../../database/varients";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: GET
// path: /api/products/:productId/varients/:varientId
// Input: { varientId: string }
// Output: ProductVarient
// Error: { message: string }
// description: get a product's varient by varientId

handler.get(async (req, res) => {
  const id = req.query.varientId as string;
  const varient = await getVarientById(id);
  res.status(200).json(varient);
});

handler.delete(async (req, res) => {
  const id = req.query.varientId as string;
  const varient = await deleteVarient(id);
  res.status(200).json(varient);
});

export default handler;
