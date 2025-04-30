import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/lib/actions"
import { formatDate } from "@/lib/utils"
import { AdminPostActions } from "@/components/blog/admin-post-actions"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function AdminBlogPage() {


  const posts = await getPosts()

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
                <th className="text-left py-2 px-4">著者</th>
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
                  <td className="py-2 px-4">{post.author || "-"}</td>
                  <td className="py-2 px-4 text-right">
                    <AdminPostActions post={post} />
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
