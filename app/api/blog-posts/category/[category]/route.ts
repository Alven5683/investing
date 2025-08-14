import { NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/database/blog-posts"

export async function GET(request: Request, { params }: { params: { category: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const skip = searchParams.get("skip") ? Number.parseInt(searchParams.get("skip")!) : undefined

    const posts = await getBlogPosts(params.category, limit, skip)
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts by category:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
