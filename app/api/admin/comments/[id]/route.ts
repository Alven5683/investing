import { type NextRequest, NextResponse } from "next/server"
import { updateCommentStatus, deleteComment } from "@/lib/database/comments"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const success = await updateCommentStatus(params.id, status)

    if (success) {
      return NextResponse.json({ message: "Comment status updated" })
    } else {
      return NextResponse.json({ error: "Failed to update comment" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating comment:", error)
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteComment(params.id)

    if (success) {
      return NextResponse.json({ message: "Comment deleted" })
    } else {
      return NextResponse.json({ error: "Failed to delete comment" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
  }
}
