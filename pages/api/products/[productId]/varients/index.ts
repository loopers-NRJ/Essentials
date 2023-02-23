import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getVarientByProductId } from "../../../../../database/varients";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(async (req, res) => {
  const products = await getVarientByProductId(req.query.productId as string);
  res.status(200).json(products);
});

export default handler;
