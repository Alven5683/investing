import { NextResponse } from "next/server"
import { getTopPosts } from "@/lib/database/analytics"

export async function GET() {
  try {
    const topPosts = await getTopPosts(10)
    return NextResponse.json(topPosts)
  } catch (error) {
    console.error("Error fetching top posts:", error)
    return NextResponse.json({ error: "Failed to fetch top posts" }, { status: 500 })
  }
}
