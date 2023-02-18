import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  createComment,
  deleteComment,
  getCommentsByProductId,
} from "../../../../../database/comments";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: GET
// path: /api/products/:productId/comments
// Input: { productId: string; limit: number; page: number }
// Output: { comments: { id: string; userId: string; comment: string; productId: string }[]; total: number; }
// Error: { message: string }
// description: Get comments by product id

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

// method: POST
// path: /api/products/:productId/comments
// Input: { userId: string; comment: string; }
// Output: { id: string; userId: string; comment: string; productId: string }
// Error: { message: string }
// description: Create a new comment

handler.post(async (req, res) => {
  const { userId, comment } = req.body;
  const productId = req.query.productId as string;
  if (!userId || !comment) {
    res.status(400).json({ message: "Bad request" });
  } else {
    const newComment = await createComment({ userId, comment, productId });
    if (newComment instanceof Error)
      return res.status(400).json({ message: newComment.message });
    return res.status(200).json(newComment);
  }
});

// method: DELETE
// path: /api/products/:productId/comments
// Input: { commentId: string; userId: string }
// Output: { id: string; userId: string; comment: string; productId: string }
// Error: { message: string }
// description: Delete a comment

handler.delete(async (req, res) => {
  const comment = await deleteComment(
    req.body.commentId as string,
    req.body.userId as string
  );
  if (comment instanceof Error)
    return res.status(400).json({ message: comment.message });
  return res.status(200).json(comment);
});

export default handler;
