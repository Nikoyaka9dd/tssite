import {redirect} from "next/navigation"
import {BlogEditor} from "@/components/blog/blog-editor"
import {getPostById} from "@/lib/actions"
import {authOptions} from "@/lib/auth"

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {



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
