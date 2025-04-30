"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Trash } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { deletePost } from "@/lib/actions"
import type { BlogPost } from "@/types/blog"
import { useState } from "react"

interface BlogActionsProps {
  post: BlogPost
}

export function BlogActions({ post }: BlogActionsProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  if (!isAuthenticated) {
    return null
  }

  const handleDelete = async () => {
    if (window.confirm("このイベント記録を削除してもよろしいですか？")) {
      try {
        setIsDeleting(true)
        await deletePost(post.id)
        router.push("/blog")
      } catch (error) {
        console.error("削除中にエラーが発生しました:", error)
        alert("削除に失敗しました。")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="flex gap-4 mt-8">
      <Link href={`/admin/blog/edit/${post.id}`}>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          編集
        </Button>
      </Link>
      <Button variant="destructive" className="flex items-center gap-2" onClick={handleDelete} disabled={isDeleting}>
        <Trash className="h-4 w-4" />
        {isDeleting ? "削除中..." : "削除"}
      </Button>
    </div>
  )
}
