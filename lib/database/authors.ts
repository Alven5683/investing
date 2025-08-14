import { getDatabase } from "../mongodb"
import type { Author } from "../models/blog-post"
import { ObjectId } from "mongodb"

export async function getAuthors(): Promise<Author[]> {
  const db = await getDatabase()
  const authors = await db.collection<Author>("authors").find({}).sort({ name: 1 }).toArray()

  return authors
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const db = await getDatabase()
  const author = await db.collection<Author>("authors").findOne({ _id: new ObjectId(id) })

  return author
}

export async function createAuthor(authorData: Omit<Author, "_id" | "createdAt" | "updatedAt">): Promise<Author> {
  const db = await getDatabase()
  const now = new Date()

  const author: Omit<Author, "_id"> = {
    ...authorData,
    createdAt: now,
    updatedAt: now,
  }

  const result = await db.collection<Author>("authors").insertOne(author)

  return {
    _id: result.insertedId,
    ...author,
  }
}
