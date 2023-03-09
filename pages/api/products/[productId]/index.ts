import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { getProductById, updateProduct } from "../../../../database/products";
import admin from "../../../../middlewares/admin";

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
  const product = await getProductById(req.query.productId as string);
  if (product instanceof Error)
    return res.status(400).json({ message: product.message });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json(product);
});

handler.put(admin, upload.array("images", 5), async (req, res) => {
  let images = undefined;
  if (req.files) {
    images = req.files.map((file: { path: any }) =>
      file.path.split("\\").splice(1).join("/")
    );
  }
  const product = await updateProduct(req.query.productId as string, {
    ...req.body,
    images,
  });
  if (product instanceof Error)
    return res.status(400).json({ message: product.message });
  res.status(200).json(product);
});

export default handler;
