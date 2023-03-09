import getInstance from "./prismaClient";
import { createComment } from "../types";
import { commentValidator, idValidator } from "./validators";
export async function createComment({
  userId,
  comment,
  productId,
}: createComment) {
  const { error: userIdError } = idValidator.validate(userId);
  if (userIdError) return new Error(userIdError.message);
  const { error: productIdError } = idValidator.validate(productId);
  if (productIdError) return new Error(productIdError.message);
  const { error } = commentValidator.validate({ comment });
  if (error) return new Error(error.message);
  const product = await getInstance().products.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) return new Error("Product not found");
  return await getInstance().comments.create({
    data: {
      comment,
      userId,
      productId,
    },
  });
}

export async function updateComment(
  commentId: string,
  userId: string,
  comment: string
) {
  const { error: userIdError } = idValidator.validate(userId);
  if (userIdError) return new Error(userIdError.message);
  const { error: commentIdError } = idValidator.validate(commentId);
  if (commentIdError) return new Error(commentIdError.message);
  const { error } = commentValidator.validate({ comment });
  if (error) return new Error(error.message);
  let c = await getInstance().comments.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!c) return new Error("Comment not found");
  if (c.userId !== userId) return new Error("Not authorized");
  return await getInstance().comments.update({
    where: {
      id: commentId,
    },
    data: {
      comment,
    },
  });
}

export async function deleteComment(commentId: string, userId: string) {
  const { error: userIdError } = idValidator.validate(userId);
  if (userIdError) return new Error(userIdError.message);
  const { error: commentIdError } = idValidator.validate(commentId);
  if (commentIdError) return new Error(commentIdError.message);
  let comment = await getInstance().comments.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!comment) return new Error("Comment not found");
  if (comment.userId !== userId) return new Error("Not authorized");
  return await getInstance().comments.delete({
    where: {
      id: commentId,
    },
  });
}

export async function getCommentsByProductId(
  id: string,
  { page = 1, limit = 30 }: { page?: number; limit?: number }
) {
  const { error } = idValidator.validate(id);
  if (error) return new Error(error.message);
  limit = limit > 30 ? 30 : limit;
  return await getInstance().comments.findMany({
    where: {
      productId: id,
    },
    take: limit,
    skip: (page - 1) * limit,
  });
}

export async function getCommentsByUserId(
  id: string,
  { page = 1, limit = 30 }: { page?: number; limit?: number }
) {
  const { error } = idValidator.validate(id);
  if (error) return new Error(error.message);
  limit = limit > 30 ? 30 : limit;
  return await getInstance().comments.findMany({
    where: {
      userId: id,
    },
    take: limit,
    skip: (page - 1) * limit,
  });
}

export async function getCommentById(id: string) {
  const { error } = idValidator.validate(id);
  if (error) return new Error(error.message);
  return await getInstance().comments.findUnique({
    where: {
      id,
    },
  });
}

const Comments = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  getCommentsByProductId,
  getCommentsByUserId,
};

export default Comments;
