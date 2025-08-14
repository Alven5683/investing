import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Edit, Trash2, FolderOpen, ChevronDown } from "lucide-react"

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/categories/hierarchical`,
      {
        cache: "no-store",
      },
    )
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function CategoryTree({ categories, level = 0 }: { categories: any[]; level?: number }) {
  return (
    <div className={level > 0 ? "ml-6 border-l-2 border-gray-200 pl-4" : ""}>
      {categories.map((category: any) => (
        <div key={category._id} className="space-y-2">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {category.children && category.children.length > 0 && <ChevronDown className="w-4 h-4 text-gray-400" />}
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                  title={category.color}
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  {level === 0 && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Main Category</span>
                  )}
                  {level > 0 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">Subcategory</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Slug: {category.slug} • {category.postCount || 0} posts • Created {formatDate(category.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {level === 0 && (
                <Link href={`/admin/categories/new?parent=${category._id}`}>
                  <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700 bg-transparent">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Sub
                  </Button>
                </Link>
              )}
              <Link href={`/admin/categories/${category._id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>

          {category.children && category.children.length > 0 && (
            <CategoryTree categories={category.children} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  )
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
          <p className="text-gray-600">Manage your blog categories and subcategories</p>
        </div>
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Category
          </Button>
        </Link>
      </div>

      <Card>
        <div className="p-6">
          {categories.length > 0 ? (
            <div className="space-y-4">
              <CategoryTree categories={categories} />
            </div>
          ) : (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600 mb-4">Create your first category to organize your blog posts.</p>
              <Link href="/admin/categories/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Category
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
