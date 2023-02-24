import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { Products } from "@prisma/client";
import { getProducts } from "../../database/products";

function index({ products }: { products: Products[] }) {
  console.log(products);
  return (
    <div>
      <ol>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ol>
    </div>
  );
}

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = (req.query.query as string) || "";
  const limit = (req.query?.limit && +req.query.limit) || 30;
  const page = (req.query?.page && +req.query.page) || 1;
  const filter = (req.query?.filter as string) || "";
  const sort = (req.query.sort as string) || "name_asc";
  const products = await getProducts({ query, limit, page, sort, filter });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default index;
