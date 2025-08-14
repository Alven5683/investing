import { NextResponse } from "next/server"
import { getCategoriesHierarchical } from "@/lib/database/categories"

export async function GET() {
  try {
    const categories = await getCategoriesHierarchical()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching hierarchical categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
