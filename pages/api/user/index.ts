import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middlewares/auth";
import { findUser } from "../../../database/users";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(auth, async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json(req.user);
});

export default handler;
