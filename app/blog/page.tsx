import { BlogCard } from "@/components/blog/blog-card"
import { getPosts } from "@/lib/actions"
import { AuthButtons } from "@/components/blog/auth-buttons"

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
