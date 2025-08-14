import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth/jwt"

// Define protected routes
const protectedRoutes = ["/admin"]
const authRoutes = ["/auth/signin", "/auth/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // If accessing protected route without token, redirect to signin
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If accessing protected route with invalid token, redirect to signin
  if (isProtectedRoute && token) {
    const decoded = verifyToken(token)
    if (!decoded) {
      const signInUrl = new URL("/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      const response = NextResponse.redirect(signInUrl)
      // Clear invalid token
      response.cookies.set("auth-token", "", { maxAge: 0 })
      return response
    }

    // Check if user has admin role for admin routes
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // If accessing auth routes while authenticated, redirect to admin
  if (isAuthRoute && token) {
    const decoded = verifyToken(token)
    if (decoded) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
