import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, FolderOpen, Users, Plus, MessageSquare, TrendingUp, Eye } from "lucide-react"

async function getDashboardStats() {
  try {
    const [categoriesRes, postsRes, authorsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/categories`, { cache: "no-store" }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog-posts`, { cache: "no-store" }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/authors`, { cache: "no-store" }),
    ])

    const [categories, posts, authors] = await Promise.all([
      categoriesRes.ok ? categoriesRes.json() : [],
      postsRes.ok ? postsRes.json() : [],
      authorsRes.ok ? authorsRes.json() : [],
    ])

    const totalViews = posts.reduce((sum: number, post: any) => sum + (post.views || 0), 0)
    const totalComments = posts.reduce((sum: number, post: any) => sum + (post.comments?.length || 0), 0)

    return {
      categoriesCount: categories.length,
      postsCount: posts.length,
      authorsCount: authors.length,
      totalViews,
      totalComments,
      recentPosts: posts.slice(0, 5),
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      categoriesCount: 0,
      postsCount: 0,
      authorsCount: 0,
      totalViews: 0,
      totalComments: 0,
      recentPosts: [],
    }
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your content management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.postsCount}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{stats.categoriesCount}</p>
            </div>
            <FolderOpen className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Authors</p>
              <p className="text-3xl font-bold text-gray-900">{stats.authorsCount}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalComments}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content Management</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/posts/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
            <Link href="/admin/categories/new">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Category
              </Button>
            </Link>
            <Link href="/admin/authors/new">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Author
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Site Management</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/comments">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Manage Comments
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Posts</h3>
          <Link href="/admin/posts">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {stats.recentPosts.length > 0 ? (
          <div className="space-y-4">
            {stats.recentPosts.map((post: any) => (
              <div key={post._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>By {post.author.name}</span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span className="capitalize" style={{ color: post.category.color }}>
                      {post.category.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{post.views || 0} views</span>
                  <Link href={`/admin/posts/${post._id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No posts found. Create your first post to get started!</p>
        )}
      </Card>
    </div>
  )
}
