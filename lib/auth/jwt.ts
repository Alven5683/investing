import jwt from "jsonwebtoken"
import type { UserSession } from "../models/user"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

export function generateToken(user: UserSession): string {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  )
}

export function verifyToken(token: string): UserSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserSession
    return decoded
  } catch (error) {
    return null
  }
}

export function refreshToken(token: string): string | null {
  const decoded = verifyToken(token)
  if (!decoded) return null

  return generateToken(decoded)
}
