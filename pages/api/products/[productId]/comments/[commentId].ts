import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  deleteComment,
  getCommentById,
  updateComment,
} from "../../../../../database/comments";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).json({ message: err });
  },
  onNoMatch: (req, res) =>
    res.status(405).json({ message: "Method not allowed" }),
});

handler.get(async (req, res) => {
  const id = req.query.commentId as string;
  const comment = await getCommentById(id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  return res.status(200).json(comment);
});

handler.delete(async (req, res) => {
  const id = req.query.commentId as string;
  const userId = req.user.id as string;
  const comment = await deleteComment(id, userId);
  if (comment instanceof Error)
    return res.status(400).json({ message: comment.message });
  return res.status(200).json(comment);
});

handler.put(async (req, res) => {
  const id = req.query.commentId as string;
  const userId = req.user.id as string;
  const { comment } = req.body;
  const updatedComment = await updateComment(id, userId, comment);
  if (updatedComment instanceof Error)
    return res.status(400).json({ message: updatedComment.message });
  return res.status(200).json(updatedComment);
});

export default handler;
