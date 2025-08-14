import { getDatabase } from "../mongodb"
import type { BlogPost, BlogPostInput, BlogPostWithDetails } from "../models/blog-post"
import { ObjectId } from "mongodb"

export async function getBlogPosts(
  categorySlug?: string,
  limit?: number,
  skip?: number,
): Promise<BlogPostWithDetails[]> {
  const db = await getDatabase()

  const pipeline: any[] = [
    {
      $match: {
        status: "published",
        publishedAt: { $lte: new Date() },
      },
    },
  ]

  if (categorySlug) {
    pipeline.unshift({
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryInfo",
      },
    })
    pipeline.push({
      $match: {
        "categoryInfo.slug": categorySlug,
      },
    })
  }

  pipeline.push(
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "authors",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        title: 1,
        slug: 1,
        excerpt: 1,
        content: 1,
        featuredImage: 1,
        tags: 1,
        publishedAt: 1,
        readTime: 1,
        views: 1,
        likes: 1,
        createdAt: 1,
        updatedAt: 1,
        "category._id": 1,
        "category.name": 1,
        "category.slug": 1,
        "category.color": 1,
        "category.icon": 1,
        "author._id": 1,
        "author.name": 1,
        "author.avatar": 1,
      },
    },
    {
      $sort: { publishedAt: -1 },
    },
  )

  if (skip) {
    pipeline.push({ $skip: skip })
  }

  if (limit) {
    pipeline.push({ $limit: limit })
  }

  const posts = await db.collection<BlogPost>("blog_posts").aggregate<BlogPostWithDetails>(pipeline).toArray()

  return posts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithDetails | null> {
  const db = await getDatabase()

  const pipeline = [
    {
      $match: {
        slug,
        status: "published",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "authors",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        title: 1,
        slug: 1,
        excerpt: 1,
        content: 1,
        featuredImage: 1,
        tags: 1,
        publishedAt: 1,
        readTime: 1,
        views: 1,
        likes: 1,
        createdAt: 1,
        updatedAt: 1,
        "category._id": 1,
        "category.name": 1,
        "category.slug": 1,
        "category.color": 1,
        "category.icon": 1,
        "author._id": 1,
        "author.name": 1,
        "author.avatar": 1,
      },
    },
  ]

  const posts = await db.collection<BlogPost>("blog_posts").aggregate<BlogPostWithDetails>(pipeline).toArray()

  if (posts.length > 0) {
    // Increment view count
    await db.collection<BlogPost>("blog_posts").updateOne({ slug }, { $inc: { views: 1 } })

    return posts[0]
  }

  return null
}

export async function createBlogPost(postData: BlogPostInput): Promise<BlogPost> {
  const db = await getDatabase()
  const now = new Date()

  const post: Omit<BlogPost, "_id"> = {
    ...postData,
    categoryId: new ObjectId(postData.categoryId),
    authorId: new ObjectId(postData.authorId),
    views: 0,
    likes: 0,
    createdAt: now,
    updatedAt: now,
  }

  const result = await db.collection<BlogPost>("blog_posts").insertOne(post)

  return {
    _id: result.insertedId,
    ...post,
  }
}

export async function updateBlogPost(id: string, postData: Partial<BlogPostInput>): Promise<BlogPost | null> {
  const db = await getDatabase()
  const now = new Date()

  const updateData: any = {
    ...postData,
    updatedAt: now,
  }

  if (postData.categoryId) {
    updateData.categoryId = new ObjectId(postData.categoryId)
  }

  if (postData.authorId) {
    updateData.authorId = new ObjectId(postData.authorId)
  }

  const result = await db
    .collection<BlogPost>("blog_posts")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateData }, { returnDocument: "after" })

  return result || null
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const db = await getDatabase()
  const result = await db.collection<BlogPost>("blog_posts").deleteOne({ _id: new ObjectId(id) })

  return result.deletedCount > 0
}
