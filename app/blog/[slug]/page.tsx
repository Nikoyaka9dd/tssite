import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Markdown } from "@/components/blog/markdown"
import { getPostBySlug } from "@/lib/actions"
import { formatDate } from "@/lib/utils"
import { BlogActions } from "@/components/blog/blog-actions"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="section">
        <p>記事が見つかりませんでした。</p>
        <Link href="/blog" className="text-primary hover:underline">
          イベント一覧に戻る
        </Link>
      </div>
    )
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
        <div className="text-sm text-muted-foreground mb-6">
          {formatDate(post.date)}
          {post.author && <span> • {post.author}</span>}
        </div>

        <Markdown content={post.content} />
      </article>

      <BlogActions post={post} />
    </div>
  )
}
