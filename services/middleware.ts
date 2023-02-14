import { NextApiRequest, NextApiResponse } from "next";

export function errorMiddleware(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
