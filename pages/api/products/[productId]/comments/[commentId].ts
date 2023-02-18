import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  deleteComment,
  getCommentById,
} from "../../../../../database/comments";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(500).json({ message: err }),
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

// method: GET
// path: /api/products/:productId/comments/commentId
// Input: {  }
// Output: { comments: { id: string; userId: string; comment: string; productId: string }[]; total: number; }
// Error: { message: string }
// description: Get comments by comment id

handler.get(async (req, res) => {
  const id = req.query.commentId as string;
  const comment = await getCommentById(id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  return res.status(200).json(comment);
});

// method: DELETE
// path: /api/products/:productId/comments
// Input: { commentId: string; userId: string }
// Output: { id: string; userId: string; comment: string; productId: string }
// Error: { message: string }
// description: Delete a comment by comment id

handler.delete(async (req, res) => {
  const id = req.query.commentId as string;
  const userId = req.body.userId as string;
  const comment = await deleteComment(id, userId);
  if (comment instanceof Error)
    return res.status(400).json({ message: comment.message });
  return res.status(200).json(comment);
});

export default handler;
