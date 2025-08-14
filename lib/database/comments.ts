import { connectToDatabase } from "../mongodb"
import type { Comment, CommentStats } from "../models/comment"

export async function getComments(postId?: string, status?: string): Promise<Comment[]> {
  const { db } = await connectToDatabase()
  const filter: any = {}

  if (postId) filter.postId = postId
  if (status) filter.status = status

  return await db.collection("comments").find(filter).sort({ createdAt: -1 }).toArray()
}

export async function getCommentStats(): Promise<CommentStats> {
  const { db } = await connectToDatabase()

  const [total, pending, approved, rejected] = await Promise.all([
    db.collection("comments").countDocuments(),
    db.collection("comments").countDocuments({ status: "pending" }),
    db.collection("comments").countDocuments({ status: "approved" }),
    db.collection("comments").countDocuments({ status: "rejected" }),
  ])

  return { total, pending, approved, rejected }
}

export async function updateCommentStatus(commentId: string, status: "approved" | "rejected"): Promise<boolean> {
  const { db } = await connectToDatabase()
  const result = await db
    .collection("comments")
    .updateOne({ _id: commentId }, { $set: { status, updatedAt: new Date() } })
  return result.modifiedCount > 0
}

export async function deleteComment(commentId: string): Promise<boolean> {
  const { db } = await connectToDatabase()
  const result = await db.collection("comments").deleteOne({ _id: commentId })
  return result.deletedCount > 0
}
