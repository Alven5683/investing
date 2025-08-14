import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

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

async function getCategoryPosts(categorySlug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog-posts/category/${categorySlug}`,
      {
        cache: "no-store",
      },
    )
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error("Error fetching posts:", error)
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

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  const [categories, categoryArticles] = await Promise.all([getCategories(), getCategoryPosts(category)])

  const categoryExists = categories.some((cat: any) => cat.slug === category)

  if (!categoryExists) {
    notFound()
  }

  const currentCategory = categories.find((cat: any) => cat.slug === category)
  const categoryTitle = currentCategory?.name || category.charAt(0).toUpperCase() + category.slice(1)

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
            <Link href="/blog" className="hover:text-blue-600">
              News
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{categoryTitle}</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryTitle} News</h1>
          <p className="text-gray-600">
            {currentCategory?.description || `Latest updates and analysis in ${category}`}
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          {categories.map((cat: any) => (
            <Link key={cat.slug} href={`/blog/${cat.slug}`}>
              <Button
                variant={cat.slug === category ? "default" : "outline"}
                size="sm"
                className="capitalize"
                style={cat.slug === category ? { backgroundColor: cat.color } : {}}
              >
                {cat.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((article: any) => (
            <Card key={article._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/blog/${category}/${article.slug}`}>
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
                  <h2 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>
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

        {categoryArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Check back later for new {categoryTitle.toLowerCase()} content.</p>
          </div>
        )}
      </div>
    </div>
  )
}
