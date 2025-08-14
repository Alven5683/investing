import { type NextRequest, NextResponse } from "next/server"
import { getComments } from "@/lib/database/comments"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined
    const postId = searchParams.get("postId") || undefined

    const comments = await getComments(postId, status)
    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}
