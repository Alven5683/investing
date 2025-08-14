import { getDatabase } from "../mongodb"
import type { Category, CategoryInput, CategoryWithChildren } from "../models/category"
import { ObjectId } from "mongodb"

export async function getCategories(): Promise<Category[]> {
  const db = await getDatabase()
  const categories = await db
    .collection<Category>("categories")
    .find({})
    .sort({ level: 1, order: 1, name: 1 })
    .toArray()

  return categories
}

export async function getCategoriesHierarchical(): Promise<CategoryWithChildren[]> {
  const db = await getDatabase()
  const allCategories = await db
    .collection<Category>("categories")
    .find({})
    .sort({ level: 1, order: 1, name: 1 })
    .toArray()

  // Get post counts for each category
  const categoriesWithCounts = await Promise.all(
    allCategories.map(async (category) => {
      const postCount = await db.collection("blog-posts").countDocuments({ categoryId: category._id })
      return { ...category, postCount }
    }),
  )

  // Build hierarchy
  const categoryMap = new Map<string, CategoryWithChildren>()
  const rootCategories: CategoryWithChildren[] = []

  // First pass: create all category objects
  categoriesWithCounts.forEach((category) => {
    categoryMap.set(category._id!.toString(), { ...category, children: [] })
  })

  // Second pass: build hierarchy
  categoriesWithCounts.forEach((category) => {
    const categoryWithChildren = categoryMap.get(category._id!.toString())!

    if (category.parentId) {
      const parent = categoryMap.get(category.parentId.toString())
      if (parent) {
        parent.children!.push(categoryWithChildren)
      }
    } else {
      rootCategories.push(categoryWithChildren)
    }
  })

  return rootCategories
}

export async function getSubcategories(parentId: string): Promise<Category[]> {
  const db = await getDatabase()
  const subcategories = await db
    .collection<Category>("categories")
    .find({ parentId: new ObjectId(parentId) })
    .sort({ order: 1, name: 1 })
    .toArray()

  return subcategories
}

export async function getMainCategories(): Promise<Category[]> {
  const db = await getDatabase()
  const categories = await db
    .collection<Category>("categories")
    .find({ level: 0 })
    .sort({ order: 1, name: 1 })
    .toArray()

  return categories
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = await getDatabase()
  const category = await db.collection<Category>("categories").findOne({ slug })

  return category
}

export async function createCategory(categoryData: CategoryInput): Promise<Category> {
  const db = await getDatabase()
  const now = new Date()

  const category: Omit<Category, "_id"> = {
    ...categoryData,
    parentId: categoryData.parentId ? new ObjectId(categoryData.parentId) : null,
    createdAt: now,
    updatedAt: now,
  }

  const result = await db.collection<Category>("categories").insertOne(category)

  return {
    _id: result.insertedId,
    ...category,
  }
}

export async function updateCategory(id: string, categoryData: Partial<CategoryInput>): Promise<Category | null> {
  const db = await getDatabase()
  const now = new Date()

  const updateData: any = {
    ...categoryData,
    updatedAt: now,
  }

  if (categoryData.parentId !== undefined) {
    updateData.parentId = categoryData.parentId ? new ObjectId(categoryData.parentId) : null
  }

  const result = await db
    .collection<Category>("categories")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateData }, { returnDocument: "after" })

  return result || null
}

export async function deleteCategory(id: string): Promise<boolean> {
  const db = await getDatabase()

  const hasSubcategories = await db.collection<Category>("categories").countDocuments({ parentId: new ObjectId(id) })

  if (hasSubcategories > 0) {
    throw new Error("Cannot delete category with subcategories. Delete subcategories first.")
  }

  const result = await db.collection<Category>("categories").deleteOne({ _id: new ObjectId(id) })

  return result.deletedCount > 0
}
