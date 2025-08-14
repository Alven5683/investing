"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Globe, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

export function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="bg-gray-900 text-white">
      {/* Top notification bar */}
      <div className="bg-yellow-400 text-black text-center py-2 text-sm">
        <span>Get real-time data on equities and cryptocurrencies | Bonus: Sign 50% off</span>
        <Button size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white">
          CLAIM DEAL
        </Button>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold hover:text-yellow-400 transition-colors">
              Investing.com
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for stocks, currencies, crypto..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gray-700 text-white">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
                  >
                    SIGN UP FREE
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            <Globe className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-700">
          <div className="flex space-x-8 py-3">
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              My Watchlist
            </Link>
            <Link href="/blog/crypto" className="text-sm text-gray-300 hover:text-white transition-colors">
              Crypto
            </Link>
            <Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">
              News
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Analysis
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Charts
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Technical
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Brokers
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Tools
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Education
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Economic Calendar
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Stock Screener
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Investing Pro
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              More
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
