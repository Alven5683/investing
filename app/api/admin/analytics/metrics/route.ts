import { NextResponse } from "next/server"
import { getGrowthMetrics } from "@/lib/database/analytics"

export async function GET() {
  try {
    const metrics = await getGrowthMetrics()
    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Error fetching growth metrics:", error)
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
}
