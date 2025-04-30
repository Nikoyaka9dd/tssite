"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, LogOut, User, FileText, Plus } from "lucide-react"

export function UserNav() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session ? "管理者" : "一般ユーザー"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/blog" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>管理画面</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/blog/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                <span>新規イベント追加</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>ログアウト</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login" className="flex items-center">
              <LogIn className="mr-2 h-4 w-4" />
              <span>管理者ログイン</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
