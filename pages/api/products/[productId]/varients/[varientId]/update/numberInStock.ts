import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { updateNoInStock } from "../../../../../../../database/varients";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: PUT
// path: /api/products/:productId/varients/:varientId/update/numberInStock
// Input: { varientId: string }
// Output: ProductVarient
// Error: { message: string }
// description: update a varient's price by varientId

handler.put(async (req, res) => {
  const numberInStock = req.body.numberInStock && +req.body.numberInStock;
  if (!numberInStock) return res.status(400).json({ message: "bad request" });
  const varient = await updateNoInStock(
    req.query.varientId as string,
    numberInStock
  );
  res.status(200).json(varient);
});

export default handler;
