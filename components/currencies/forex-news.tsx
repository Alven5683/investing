"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { newsAPI, type NewsArticle } from "@/lib/api/news"

export function ForexNews() {
  const [forexNews, setForexNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForexNews = async () => {
      try {
        const articles = await newsAPI.getFinancialNews("currencies", 4)
        setForexNews(articles)
      } catch (err) {
        setError("Failed to fetch forex news")
        console.error("Error fetching forex news:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchForexNews()

    const interval = setInterval(fetchForexNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Forex News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Loading forex news...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Forex News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 text-center py-8">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CardTitle className="text-xl font-bold">Forex News</CardTitle>
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {forexNews.map((news, index) => (
          <div key={news.id} className="flex space-x-4 pb-4 border-b last:border-b-0">
            <Image
              src={news.urlToImage || "/placeholder.svg"}
              alt={news.title}
              width={120}
              height={80}
              className="rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                {news.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{news.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{news.source}</span>
                <span>{new Date(news.publishedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
