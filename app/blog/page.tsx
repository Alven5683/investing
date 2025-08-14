import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/categories`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

async function getBlogPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog-posts?limit=10`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

async function getCategoryPostCounts() {
  try {
    const categories = await getCategories()
    const counts: { [key: string]: number } = {}

    for (const category of categories) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog-posts/category/${category.slug}`,
        { cache: "no-store" },
      )
      if (res.ok) {
        const posts = await res.json()
        counts[category.slug] = posts.length
      } else {
        counts[category.slug] = 0
      }
    }

    return counts
  } catch (error) {
    console.error("Error fetching category counts:", error)
    return {}
  }
}

function getTimeAgo(dateString: string) {
  const now = new Date()
  const published = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours} hours ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} days ago`
}

export default async function BlogPage() {
  const [categories, blogPosts, categoryCounts] = await Promise.all([
    getCategories(),
    getBlogPosts(),
    getCategoryPostCounts(),
  ])

  const [featuredArticle, ...otherArticles] = blogPosts

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">News</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial News</h1>
          <p className="text-gray-600">Stay updated with the latest market developments and analysis</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/blog">
            <Button variant="default" size="sm">
              All News
            </Button>
          </Link>
          {categories.map((category: any) => (
            <Link key={category.slug} href={`/blog/${category.slug}`}>
              <Button variant="outline" size="sm" className="capitalize bg-transparent">
                {category.name} ({categoryCounts[category.slug] || 0})
              </Button>
            </Link>
          ))}
        </div>

        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured article */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow mb-8">
                <Link href={`/blog/${featuredArticle.category.slug}/${featuredArticle.slug}`}>
                  <div className="aspect-video bg-gray-200 relative">
                    <img
                      src={featuredArticle.featuredImage || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 text-sm rounded">Featured</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="text-white px-2 py-1 text-xs rounded capitalize"
                        style={{ backgroundColor: featuredArticle.category.color }}
                      >
                        {featuredArticle.category.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="font-bold text-2xl mb-3 hover:text-blue-600 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{featuredArticle.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span>{featuredArticle.author.name}</span>
                        <span>•</span>
                        <span>{getTimeAgo(featuredArticle.publishedAt)}</span>
                      </div>
                      <span>{featuredArticle.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              </Card>

              {/* Other articles grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((article: any) => (
                  <Card key={article._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${article.category.slug}/${article.slug}`}>
                      <div className="aspect-video bg-gray-200 relative">
                        <img
                          src={article.featuredImage || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-white px-2 py-1 text-xs rounded capitalize"
                            style={{ backgroundColor: article.category.color }}
                          >
                            {article.category.name}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <span>{article.author.name}</span>
                            <span>•</span>
                            <span>{getTimeAgo(article.publishedAt)}</span>
                          </div>
                          <span>{article.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category: any, i: number) => (
                    <Link key={category.slug} href={`/blog/${category.slug}`}>
                      <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{categoryCounts[category.slug] || 0}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Market Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">S&P 500</span>
                    <span className="text-sm text-green-600">+1.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">NASDAQ</span>
                    <span className="text-sm text-green-600">+2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">DOW</span>
                    <span className="text-sm text-red-600">-0.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bitcoin</span>
                    <span className="text-sm text-green-600">+3.8%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Check back later for new content or visit the admin panel to add articles.</p>
          </div>
        )}
      </div>
    </div>
  )
}
