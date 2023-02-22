import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { NextHandler } from "next-connect";
import { findUser } from "../database/users";

async function auth(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  const cookies = parseCookies({ req });
  if (!cookies["auth-token"]) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = cookies["auth-token"];
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err, decoded: any) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      const id = decoded.id as string;
      const user = await findUser(id);
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      req.user = user;
      next();
    }
  );
}

export default auth;
