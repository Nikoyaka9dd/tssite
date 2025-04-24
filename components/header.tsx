"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            T's log
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") && !isActive("/blog") && !isActive("/admin") && !isActive("/login")
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              home
            </Link>
            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/blog") ? "text-primary" : "text-muted-foreground",
              )}
            >
              イベント参加ログ
            </Link>
            {isAuthenticated && (
              <Link
                href="/admin/blog"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/admin") ? "text-primary" : "text-muted-foreground",
                )}
              >
                管理画面
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <UserNav />
          <Button variant="ghost" className="md:hidden" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-4">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") && !isActive("/blog") && !isActive("/admin") && !isActive("/login")
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              home
            </Link>
            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/blog") ? "text-primary" : "text-muted-foreground",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              イベント参加ログ
            </Link>
            {isAuthenticated && (
              <Link
                href="/admin/blog"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/admin") ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                管理画面
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
