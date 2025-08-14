import type { ObjectId } from "mongodb"

export interface Author {
  _id?: ObjectId
  name: string
  email: string
  avatar: string
  bio: string
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  _id?: ObjectId
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  categoryId: ObjectId
  authorId: ObjectId
  tags: string[]
  status: "draft" | "published" | "archived"
  publishedAt?: Date
  readTime: number
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface BlogPostInput {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  categoryId: string
  authorId: string
  tags: string[]
  status: "draft" | "published" | "archived"
  publishedAt?: Date
  readTime: number
}

export interface BlogPostWithDetails extends Omit<BlogPost, "categoryId" | "authorId"> {
  category: {
    _id: ObjectId
    name: string
    slug: string
    color: string
    icon: string
  }
  author: {
    _id: ObjectId
    name: string
    avatar: string
  }
}
