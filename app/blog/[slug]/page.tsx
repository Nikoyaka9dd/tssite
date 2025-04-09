"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { deleteBlogPost, getBlogPostBySlug } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"
import { Markdown } from "@/components/blog/markdown"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { isAdmin } = useAuth()
  const [post, setPost] = useState<BlogPost | null>(null)
  const slug = params.slug as string

  useEffect(() => {
    const foundPost = getBlogPostBySlug(slug)
    if (foundPost) {
      setPost(foundPost)
    } else {
      router.push("/blog")
    }
  }, [slug, router])

  const handleDelete = () => {
    if (post && window.confirm("このイベント記録を削除してもよろしいですか？")) {
      deleteBlogPost(post.id)
      router.push("/blog")
    }
  }

  if (!post) {
    return <div className="section">Loading...</div>
  }

  return (
    <div className="section">
      <div className="mb-6">
        <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          イベント一覧に戻る
        </Link>
      </div>

      <article className="prose prose-slate max-w-none">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="text-sm text-muted-foreground mb-6">{formatDate(post.date)}</div>

        <Markdown content={post.content} />
      </article>

      {isAdmin && (
        <div className="flex gap-4 mt-8">
          <Link href={`/admin/blog/edit/${post.id}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              編集
            </Button>
          </Link>
          <Button variant="destructive" className="flex items-center gap-2" onClick={handleDelete}>
            <Trash className="h-4 w-4" />
            削除
          </Button>
        </div>
      )}
    </div>
  )
}
