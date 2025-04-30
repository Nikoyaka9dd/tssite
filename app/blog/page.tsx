import Link from "next/link"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { getPosts } from "../../lib/actions"
import { useAuth } from "@/components/auth/auth-provider"

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="section">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">イベント参加など</h1>
        <AuthButtons />
      </div>

      {posts.length === 0 ? (
        <p>イベント参加の記録はまだありません。</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
// クライアントコンポーネントとして分離
;("use client")
function AuthButtons() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <Link href="/admin/blog/new">
      <Button>新規イベント追加</Button>
    </Link>
  )
}
