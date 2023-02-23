import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getVarientById,
  deleteVarient,
  updateVarient,
} from "../../../../../../database/varients";
import admin from "../../../../../../middlewares/admin";
import multer from "multer";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images/",
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

handler.get(async (req, res) => {
  const id = req.query.varientId as string;
  const varient = await getVarientById(id);
  res.status(200).json(varient);
});

handler.delete(admin, async (req, res) => {
  const id = req.query.varientId as string;
  const varient = await deleteVarient(id);
  res.status(200).json(varient);
});

handler.put(admin, upload.array("images", 5), async (req, res) => {
  const id = req.query.varientId as string;
  const varient = await updateVarient(id, {
    ...req.body,
    price: req.body.price ? +req.body.price : undefined,
    numberInStock: req.body.price ? +req.body.numberInStock : undefined,
    images: req.body.images ? req.body.images : undefined,
  });
  if (varient instanceof Error)
    return res.status(400).json({ message: varient.message });
  res.status(200).json(varient);
});

export default handler;
