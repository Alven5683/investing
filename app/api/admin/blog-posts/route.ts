import { NextResponse } from "next/server"
import { createBlogPost } from "@/lib/database/blog-posts"
import type { BlogPostInput } from "@/lib/models/blog-post"

export async function POST(request: Request) {
  try {
    const body: BlogPostInput = await request.json()

    // Basic validation
    if (!body.title || !body.slug || !body.content || !body.categoryId || !body.authorId) {
      return NextResponse.json(
        {
          error: "Title, slug, content, categoryId, and authorId are required",
        },
        { status: 400 },
      )
    }

    const post = await createBlogPost(body)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
