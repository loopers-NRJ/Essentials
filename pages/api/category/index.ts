import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getAllCategory } from "../../../database/category";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: GET
// path: /api/category
// Input: { }
// Output: { id: string; value: string; }[]
// Error: { message: string }
// description: Get all category

handler.get(async (req, res) => {
  const category = await getAllCategory();
  return res.status(200).json(category);
});

// method: POST
// path: /api/category
// Input: { category: string }
// Output: { id: string; value: string; }
// Error: { message: string }
// description: Create a new category

handler.post(async (req, res) => {
  const value = req.body.category as string;
  if (!value || value === "")
    res.status(400).json({ message: "Category name is required" });
  const category = await createCategory(value);
  return res.status(200).json(category);
});

export default handler;
