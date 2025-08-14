import type { ObjectId } from "mongodb"

export interface Category {
  _id?: ObjectId
  name: string
  slug: string
  description: string
  color: string
  icon: string
  parentId?: ObjectId | null // Added parentId for subcategory support
  level: number // Added level to track hierarchy depth (0 = main category, 1 = subcategory)
  order: number // Added order for custom sorting within same level
  createdAt: Date
  updatedAt: Date
}

export interface CategoryInput {
  name: string
  slug: string
  description: string
  color: string
  icon: string
  parentId?: string | null // Added parentId for creating subcategories
  level: number // Added level field
  order: number // Added order field
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[]
  postCount?: number
}
