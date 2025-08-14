import { NextResponse } from "next/server"
import { getCategoryBySlug } from "@/lib/database/categories"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const category = await getCategoryBySlug(params.slug)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}
