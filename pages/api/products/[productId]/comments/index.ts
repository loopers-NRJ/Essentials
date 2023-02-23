import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  createComment,
  getCommentsByProductId,
} from "../../../../../database/comments";
import auth from "../../../../../middlewares/auth";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(async (req, res) => {
  const id = req.query.productId as string;
  const limit = (req.query?.limit && +req.query.limit) || 30;
  const page = (req.query?.page && +req.query.page) || 1;
  const comment = await getCommentsByProductId(id, {
    limit,
    page,
  });
  res.status(200).json(comment);
});

handler.post(auth, async (req, res) => {
  const { comment } = req.body;
  const productId = req.query.productId as string;
  const userId = req.user.id as string;
  const newComment = await createComment({ userId, comment, productId });
  if (newComment instanceof Error)
    return res.status(400).json({ message: newComment.message });
  return res.status(200).json(newComment);
});

export default handler;
