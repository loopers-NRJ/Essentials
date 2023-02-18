import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "../../../../database/products";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: GET
// path: /api/products/:productId
// Input: { productId: string }
// Output: { id: string; name: string; description: string; price: number; images: string[]; variants: { id: string; name: string; price: number; }[]; }
// Error: { message: string }
// description: Get a product by id

handler.get(async (req, res) => {
  const product = await getProductById(req.query.productId as string);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json(product);
});

export default handler;
