import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { BlogEditor } from "@/components/blog/blog-editor"
import { getPostById } from "@/lib/actions"

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  // サーバーサイドで認証チェック
  const session = await getServerSession()
  if (!session) {
    redirect("/login")
  }

  const post = await getPostById(params.id)
  if (!post) {
    redirect("/admin/blog")
  }

  return (
    <div className="section">
      <h1 className="text-2xl font-bold mb-6">イベント編集</h1>
      <BlogEditor post={post} />
    </div>
  )
}
