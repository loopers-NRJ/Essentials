import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse, NextConfig } from "next";
import { createProduct, getProducts } from "../../../database/products";
import multer from "multer";
import admin from "../../../middlewares/admin";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
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
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images/",
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

handler.get(async (req, res) => {
  const query = (req.query.query as string) || "";
  const limit = (req.query?.limit && +req.query.limit) || 30;
  const page = (req.query?.page && +req.query.page) || 1;
  const filter = (req.query?.filter as string) || "";
  const sort = (req.query.sort as string) || "name_asc";

  const products = await getProducts({ query, limit, page, sort, filter });
  res.status(200).json(products);
});

handler.post(admin, upload.array("images", 5), async (req, res) => {
  let images: string[] = [];
  if (req.files) {
    images = req.files.map((file: { path: any }) =>
      file.path.split("\\").splice(1).join("/")
    );
  }
  const { name, description, price, numberInStock, category, varients } =
    req.body;
  const product = await createProduct({
    name,
    description: description,
    price: price ? +price : undefined,
    numberInStock: numberInStock ? +numberInStock : undefined,
    images,
    category: category ? JSON.parse(category) : category,
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
