import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { updatePrice } from "../../../../../../../database/varients";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: PUT
// path: /api/products/:productId/varients/:varientId/update/price
// Input: { varientId: string }
// Output: ProductVarient
// Error: { message: string }
// description: update a varient's price by varientId

handler.put(async (req, res) => {
  const price = req.body.price && +req.body.price;
  console.log(req.query.varientId, price);
  if (!price) return res.status(400).json({ message: "bad request" });
  const varient = await updatePrice(req.query.varientId as string, price);
  res.status(200).json(varient);
});

export default handler;
