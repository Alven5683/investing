export interface SiteAnalytics {
  _id?: string
  date: Date
  pageViews: number
  uniqueVisitors: number
  blogViews: number
  topPages: Array<{
    path: string
    views: number
  }>
  topPosts: Array<{
    postId: string
    title: string
    views: number
  }>
  referrers: Array<{
    source: string
    visits: number
  }>
}

export interface GrowthMetrics {
  totalPosts: number
  totalCategories: number
  totalComments: number
  totalViews: number
  monthlyGrowth: {
    posts: number
    views: number
    comments: number
  }
}
