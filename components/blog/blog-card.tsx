import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BlogPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <div className="text-sm text-muted-foreground">{formatDate(post.date)}</div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="line-clamp-3 text-muted-foreground">
          {post.excerpt || post.content.substring(0, 150)}
          {(post.excerpt || post.content.length > 150) && "..."}
        </div>
        <div className="mt-4">
          <Link href={`/blog/${post.slug}`} className="text-sm font-medium hover:underline">
            続きを読む
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
