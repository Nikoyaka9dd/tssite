import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { BlogEditor } from "@/components/blog/blog-editor"

export default async function NewBlogPostPage() {
  // サーバーサイドで認証チェック
  const session = await getServerSession()
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="section">
      <h1 className="text-2xl font-bold mb-6">新規イベント追加</h1>
      <BlogEditor />
    </div>
  )
}
