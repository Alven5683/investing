export interface User {
  _id?: string
  email: string
  password: string
  name: string
  role: "admin" | "user"
  isEmailVerified: boolean
  avatar?: string
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export interface CreateUserData {
  email: string
  password: string
  name: string
  role?: "admin" | "user"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserSession {
  userId: string
  email: string
  name: string
  role: "admin" | "user"
}
