import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getAllCategory } from "../../../database/category";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    {
      console.log(err);
      res.status(500).json({ message: err });
    }
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(async (req, res) => {
  const category = await getAllCategory();
  return res.status(200).json(category);
});

handler.post(async (req, res) => {
  const value = req.body.category as string;
  const category = await createCategory(value);
  if (category instanceof Error)
    return res.status(400).json({ message: category.message });
  return res.status(200).json(category);
});

export default handler;
