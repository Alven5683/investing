import { NextResponse } from "next/server"
import { getSubcategories } from "@/lib/database/categories"

export async function GET(request: Request, { params }: { params: { parentId: string } }) {
  try {
    const subcategories = await getSubcategories(params.parentId)
    return NextResponse.json(subcategories)
  } catch (error) {
    console.error("Error fetching subcategories:", error)
    return NextResponse.json({ error: "Failed to fetch subcategories" }, { status: 500 })
  }
}
