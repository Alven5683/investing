import { cookies } from "next/headers"
import { verifyToken } from "./jwt"
import { findUserById } from "../database/users"
import type { User } from "../models/user"

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) return null

    const decoded = verifyToken(token)
    if (!decoded) return null

    const user = await findUserById(decoded.userId)
    return user
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()
  if (user.role !== "admin") {
    throw new Error("Admin access required")
  }
  return user
}

export function isAuthenticated(token?: string): boolean {
  if (!token) return false
  const decoded = verifyToken(token)
  return decoded !== null
}

export function hasRole(token: string, role: "admin" | "user"): boolean {
  const decoded = verifyToken(token)
  if (!decoded) return false
  return decoded.role === role
}
