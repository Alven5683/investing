"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Eye, MessageSquare, FileText, Calendar, DollarSign, BarChart3 } from "lucide-react"
import { coinGeckoAPI } from "@/lib/api/coingecko"
import { forexAPI } from "@/lib/api/forex"

interface GrowthMetrics {
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

interface TopPost {
  _id: string
  title: string
  views: number
  likes: number
  category: string
  publishedAt: string
}

interface MarketMetrics {
  totalMarketCap: number
  topCryptoGainer: { name: string; change: number }
  topForexPair: { symbol: string; change: number }
  marketVolatility: number
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<GrowthMetrics | null>(null)
  const [topPosts, setTopPosts] = useState<TopPost[]>([])
  const [marketMetrics, setMarketMetrics] = useState<MarketMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const [metricsRes, postsRes, marketData] = await Promise.all([
        fetch("/api/admin/analytics/metrics"),
        fetch("/api/admin/analytics/top-posts"),
        fetchMarketMetrics(),
      ])

      const metricsData = await metricsRes.json()
      const postsData = await postsRes.json()

      setMetrics(metricsData)
      setTopPosts(postsData)
      setMarketMetrics(marketData)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMarketMetrics = async (): Promise<MarketMetrics> => {
    try {
      const [globalData, topCoins, forexPairs] = await Promise.all([
        coinGeckoAPI.getGlobalData(),
        coinGeckoAPI.getTopCoins(10),
        forexAPI.getMajorPairs(),
      ])

      const topGainer = topCoins.reduce((prev, current) =>
        prev.price_change_percentage_24h > current.price_change_percentage_24h ? prev : current,
      )

      const topForexGainer = forexPairs.reduce((prev, current) =>
        prev.changePercent > current.changePercent ? prev : current,
      )

      return {
        totalMarketCap: globalData.data?.total_market_cap?.usd || 0,
        topCryptoGainer: {
          name: topGainer.name,
          change: topGainer.price_change_percentage_24h,
        },
        topForexPair: {
          symbol: topForexGainer.symbol,
          change: topForexGainer.changePercent,
        },
        marketVolatility: Math.abs(topGainer.price_change_percentage_24h) + Math.abs(topForexGainer.changePercent),
      }
    } catch (error) {
      console.error("Error fetching market metrics:", error)
      return {
        totalMarketCap: 0,
        topCryptoGainer: { name: "N/A", change: 0 },
        topForexPair: { symbol: "N/A", change: 0 },
        marketVolatility: 0,
      }
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>
  }

  if (!metrics) {
    return <div className="text-center py-8">Failed to load analytics data.</div>
  }

  const growthCards = [
    {
      title: "Total Views",
      value: metrics.totalViews.toLocaleString(),
      growth: `+${metrics.monthlyGrowth.views.toLocaleString()} this month`,
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Total Posts",
      value: metrics.totalPosts,
      growth: `+${metrics.monthlyGrowth.posts} this month`,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Total Comments",
      value: metrics.totalComments,
      growth: `+${metrics.monthlyGrowth.comments} this month`,
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Categories",
      value: metrics.totalCategories,
      growth: "Active categories",
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  const marketCards = marketMetrics
    ? [
        {
          title: "Global Market Cap",
          value: `$${(marketMetrics.totalMarketCap / 1e12).toFixed(2)}T`,
          growth: "Total crypto market",
          icon: DollarSign,
          color: "text-green-600",
        },
        {
          title: "Top Crypto Gainer",
          value: marketMetrics.topCryptoGainer.name,
          growth: `+${marketMetrics.topCryptoGainer.change.toFixed(2)}% today`,
          icon: TrendingUp,
          color: "text-blue-600",
        },
        {
          title: "Top Forex Pair",
          value: marketMetrics.topForexPair.symbol,
          growth: `${marketMetrics.topForexPair.change >= 0 ? "+" : ""}${marketMetrics.topForexPair.change.toFixed(2)}%`,
          icon: BarChart3,
          color: "text-purple-600",
        },
        {
          title: "Market Volatility",
          value: `${marketMetrics.marketVolatility.toFixed(1)}%`,
          growth: "Combined volatility index",
          icon: TrendingUp,
          color: "text-red-600",
        },
      ]
    : []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Site Analytics</h1>
        <div className="flex items-center space-x-1 text-green-600 text-sm">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="market">Market Data</TabsTrigger>
          <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthCards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.growth}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Monthly Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>New Posts</span>
                    <span className="font-bold text-green-600">+{metrics.monthlyGrowth.posts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Page Views</span>
                    <span className="font-bold text-blue-600">+{metrics.monthlyGrowth.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Comments</span>
                    <span className="font-bold text-purple-600">+{metrics.monthlyGrowth.comments}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Published Posts</span>
                    <span className="font-bold">{metrics.totalPosts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Categories</span>
                    <span className="font-bold">{metrics.totalCategories}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg. Views per Post</span>
                    <span className="font-bold">
                      {metrics.totalPosts > 0
                        ? Math.round(metrics.totalViews / metrics.totalPosts).toLocaleString()
                        : 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div key={post._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.category} • {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{post.views?.toLocaleString() || 0} views</div>
                      <div className="text-sm text-muted-foreground">{post.likes || 0} likes</div>
                    </div>
                  </div>
                ))}

                {topPosts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No posts data available yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketCards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.growth}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketMetrics && (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Best Crypto Performer</span>
                        <span className="font-bold text-green-600">
                          {marketMetrics.topCryptoGainer.name} (+{marketMetrics.topCryptoGainer.change.toFixed(2)}%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Best Forex Pair</span>
                        <span className="font-bold text-blue-600">
                          {marketMetrics.topForexPair.symbol} ({marketMetrics.topForexPair.change >= 0 ? "+" : ""}
                          {marketMetrics.topForexPair.change.toFixed(2)}%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Market Volatility Index</span>
                        <span className="font-bold text-red-600">{marketMetrics.marketVolatility.toFixed(1)}%</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Cryptocurrency Data</span>
                    <span className="font-bold text-green-600">CoinGecko API</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Forex Data</span>
                    <span className="font-bold text-blue-600">Exchange Rates API</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Update Frequency</span>
                    <span className="font-bold text-purple-600">Real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Posts Published</span>
                      <span className="text-sm font-medium">{metrics.totalPosts}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min((metrics.totalPosts / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Categories Created</span>
                      <span className="text-sm font-medium">{metrics.totalCategories}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${Math.min((metrics.totalCategories / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Total Views</span>
                      <span className="text-sm font-medium">{metrics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${Math.min((metrics.totalViews / 10000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Total Comments</span>
                      <span className="text-sm font-medium">{metrics.totalComments}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full"
                        style={{ width: `${Math.min((metrics.totalComments / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
