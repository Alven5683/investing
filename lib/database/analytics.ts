import { connectToDatabase } from "../mongodb"
import type { GrowthMetrics } from "../models/analytics"

export async function getGrowthMetrics(): Promise<GrowthMetrics> {
  const { db } = await connectToDatabase()

  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const [totalPosts, totalCategories, totalComments, totalViews, monthlyPosts, monthlyViews, monthlyComments] =
    await Promise.all([
      db.collection("blogPosts").countDocuments(),
      db.collection("categories").countDocuments(),
      db.collection("comments").countDocuments(),
      db
        .collection("analytics")
        .aggregate([{ $group: { _id: null, total: { $sum: "$pageViews" } } }])
        .toArray()
        .then((result) => result[0]?.total || 0),
      db.collection("blogPosts").countDocuments({ createdAt: { $gte: lastMonth } }),
      db
        .collection("analytics")
        .aggregate([
          { $match: { date: { $gte: lastMonth } } },
          { $group: { _id: null, total: { $sum: "$pageViews" } } },
        ])
        .toArray()
        .then((result) => result[0]?.total || 0),
      db.collection("comments").countDocuments({ createdAt: { $gte: lastMonth } }),
    ])

  return {
    totalPosts,
    totalCategories,
    totalComments,
    totalViews,
    monthlyGrowth: {
      posts: monthlyPosts,
      views: monthlyViews,
      comments: monthlyComments,
    },
  }
}

export async function getTopPosts(limit = 10) {
  const { db } = await connectToDatabase()
  return await db.collection("blogPosts").find({}).sort({ views: -1 }).limit(limit).toArray()
}
