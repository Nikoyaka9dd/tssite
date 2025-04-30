"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deletePost } from "@/lib/actions"
import type { BlogPost } from "@/types/blog"
import { useState } from "react"

interface AdminPostActionsProps {
  post: BlogPost
}

export function AdminPostActions({ post }: AdminPostActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm("このイベント記録を削除してもよろしいですか？")) {
      try {
        setIsDeleting(true)
        await deletePost(post.id)
        router.refresh() // ページを更新して削除を反映
      } catch (error) {
        console.error("削除中にエラーが発生しました:", error)
        alert("削除に失敗しました。")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/blog/edit/${post.id}`}>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
          <span className="sr-only">編集</span>
        </Button>
      </Link>
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <span className="h-4 w-4 animate-spin">●</span> : <Trash className="h-4 w-4" />}
        <span className="sr-only">削除</span>
      </Button>
    </div>
  )
}
