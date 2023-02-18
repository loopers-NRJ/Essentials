import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse, NextConfig } from "next";
import { createProduct, getProducts } from "../../../database/products";
import multer from "multer";
import { sortOptions } from "../../../types";

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

// method: GET
// path: /api/products
// Input: { query: string; limit: number; page: number; sort: string }
// Output: { products: { id: string; name: string; description: string; price: number; images: string[]; variants: { id: string; name: string; price: number; }[]; }[]; total: number; }
// Error: { message: string }
// description: Get products

handler.get(async (req, res) => {
  const query = (req.query.query as string) || "";
  const limit = (req.query?.limit && +req.query.limit) || 30;
  const page = (req.query?.page && +req.query.page) || 1;
  const filter = (req.query?.filter as string) || "";
  const sort =
    req.query.sort === "name_asc"
      ? sortOptions.NAME_ASC
      : req.query.sort === "name_desc"
      ? sortOptions.NAME_DESC
      : req.query.sort === "price_asc"
      ? sortOptions.PRICE_ASC
      : sortOptions.PRICE_DESC;

  const products = await getProducts({ query, limit, page, sort, filter });
  res.status(200).json(products);
});

// method: POST
// path: /api/products
// Input: { name: string; description: string; price: number;numberInStock: number; images: files[]; category: string, varients: varientArgs[] }
// Output: { id: string; name: string; description: string; price: number; images: string[]; variants: { id: string; name: string; price: number; }[]; }
// Error: { message: string }
// description: Create a product

handler.use(upload.array("images", 5));

handler.post(async (req, res) => {
  const images: string[] = req.files.map((file: { path: any }) =>
    file.path.split("\\").splice(1).join("/")
  );
  const { name, description, price, numberInStock, category, varients } =
    req.body;
  if (!name || !price || !images || !category)
    return res.status(400).json({ message: "Bad request" });
  const product = await createProduct({
    name,
    description: description || "",
    price: +price,
    numberInStock: +numberInStock,
    images,
    category: JSON.parse(category),
    varients: varients ? JSON.parse(varients) : [],
  });
  if (product instanceof Error)
    return res.status(400).json({ message: product.message });
  return res.status(200).json(product);
});

export default handler;

export const config: NextConfig = {
  api: {
    bodyParser: false,
  },
};
