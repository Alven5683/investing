import { connectToDatabase } from "../mongodb"
import type { User, CreateUserData } from "../models/user"
import bcrypt from "bcryptjs"

export async function createUser(userData: CreateUserData): Promise<User> {
  const { db } = await connectToDatabase()

  // Check if user already exists
  const existingUser = await db.collection("users").findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("User already exists with this email")
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 12)

  const user: Omit<User, "_id"> = {
    email: userData.email,
    password: hashedPassword,
    name: userData.name,
    role: userData.role || "user",
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db.collection("users").insertOne(user)
  return { ...user, _id: result.insertedId.toString() }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const { db } = await connectToDatabase()
  const user = await db.collection("users").findOne({ email })

  if (!user) return null

  return {
    ...user,
    _id: user._id.toString(),
  }
}

export async function findUserById(userId: string): Promise<User | null> {
  const { db } = await connectToDatabase()
  const { ObjectId } = require("mongodb")

  const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })

  if (!user) return null

  return {
    ...user,
    _id: user._id.toString(),
  }
}

export async function validateUserPassword(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email)
  if (!user) return null

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) return null

  // Update last login
  const { db } = await connectToDatabase()
  const { ObjectId } = require("mongodb")

  await db.collection("users").updateOne(
    { _id: new ObjectId(user._id) },
    {
      $set: {
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      },
    },
  )

  return user
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
  const { db } = await connectToDatabase()
  const { ObjectId } = require("mongodb")

  const updateData = {
    ...updates,
    updatedAt: new Date(),
  }

  // Remove _id from updates if present
  delete updateData._id

  const result = await db
    .collection("users")
    .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: updateData }, { returnDocument: "after" })

  if (!result.value) return null

  return {
    ...result.value,
    _id: result.value._id.toString(),
  }
}

export async function getAllUsers(): Promise<User[]> {
  const { db } = await connectToDatabase()
  const users = await db.collection("users").find({}).toArray()

  return users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }))
}

export async function deleteUser(userId: string): Promise<boolean> {
  const { db } = await connectToDatabase()
  const { ObjectId } = require("mongodb")

  const result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) })
  return result.deletedCount > 0
}
