import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getCategoryById, updateCategory } from "../../../database/category";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: GET
// path: /api/category/:categoryId
// Input: { }
// Output: { id: string; name: string; }
// Error: { message: string }
// description: Get a category by id

handler.get(async (req, res) => {
  const id = req.query.categoryId as string;
  const category = await getCategoryById(id);
  return res.status(200).json(category);
});

// method: PUT
// path: /api/category/:categoryId
// Input: { category: string }
// Output: { id: string; name: string; }
// Error: { message: string }
// description: Update a category by id

handler.put(async (req, res) => {
  const id = req.query.categoryId as string;
  const value = req.body.category as string;
  const category = await updateCategory(id, value);
  if (category instanceof Error)
    return res.status(400).json({ message: category.message });
  return res.status(200).json(category);
});

export default handler;
