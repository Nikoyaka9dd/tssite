"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Plus, Trash } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { deleteBlogPost, getBlogPosts } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"

export default function AdminBlogPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    setPosts(getBlogPosts())
  }, [isAuthenticated, router])

  const handleDelete = (id: string) => {
    if (window.confirm("このイベント記録を削除してもよろしいですか？")) {
      deleteBlogPost(id)
      setPosts(getBlogPosts())
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="section">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">イベント管理</h1>
        <Link href="/admin/blog/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新規イベント追加
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>イベント参加の記録はまだありません。</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">タイトル</th>
                <th className="text-left py-2 px-4">日付</th>
                <th className="text-right py-2 px-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b hover:bg-muted/50">
                  <td className="py-2 px-4">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{formatDate(post.date)}</td>
                  <td className="py-2 px-4 text-right">
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
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">削除</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
