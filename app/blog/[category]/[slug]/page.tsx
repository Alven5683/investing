import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Share2, Bookmark } from "lucide-react"

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog-posts/${slug}`, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

async function getRelatedPosts(categorySlug: string, currentSlug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog-posts/category/${categorySlug}?limit=4`,
      {
        cache: "no-store",
      },
    )
    if (!res.ok) return []
    const posts = await res.json()
    return posts.filter((post: any) => post.slug !== currentSlug).slice(0, 3)
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
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

export default async function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const { category, slug } = params

  const [article, relatedArticles] = await Promise.all([getBlogPost(slug), getRelatedPosts(category, slug)])

  if (!article || article.category.slug !== category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-blue-600">
              News
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/blog/${category}`} className="hover:text-blue-600 capitalize">
              {article.category.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Article</span>
          </nav>

          {/* Back button */}
          <Link href={`/blog/${category}`}>
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {article.category.name}
            </Button>
          </Link>

          {/* Article header */}
          <div className="mb-8">
            <div className="mb-4">
              <span
                className="text-white px-3 py-1 text-sm rounded capitalize"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>

            <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

            <div className="flex items-center justify-between border-b pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                  {article.author.avatar ? (
                    <img
                      src={article.author.avatar || "/placeholder.svg"}
                      alt={article.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 font-bold">
                      {article.author.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{article.author.name}</div>
                  <div className="text-sm text-gray-600">
                    {formatDate(article.publishedAt)} • {article.readTime} min read
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="mb-8">
            <img
              src={article.featuredImage || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article content */}
          <Card className="p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              {article.content.split("\n\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          {/* Article stats */}
          <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg border">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>{article.views} views</span>
              <span>{article.likes} likes</span>
              <span>Published {getTimeAgo(article.publishedAt)}</span>
            </div>
            <div className="flex space-x-2">
              {article.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related: any) => (
                  <Card key={related._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${related.category.slug}/${related.slug}`}>
                      <div className="aspect-video bg-gray-200">
                        <img
                          src={related.featuredImage || "/placeholder.svg"}
                          alt={related.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {related.title}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{getTimeAgo(related.publishedAt)}</span>
                          <span>{related.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
