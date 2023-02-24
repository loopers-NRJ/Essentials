import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { Products } from "@prisma/client";
import { getProductById } from "../../database/products";

function ProductDetails({ product }: { product: Products }) {
  console.log(product);
  return <div>productId</div>;
}

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const product = await getProductById(req.query.productId as string);
  console.log(product);
  if (!product || product instanceof Error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default ProductDetails;
