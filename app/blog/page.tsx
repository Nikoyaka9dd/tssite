"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"

export default function BlogPage() {
  const { isAdmin } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    setPosts(getBlogPosts())
  }, [])

  return (
    <div className="section">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">イベント参加など</h1>
        {isAdmin && (
          <Link href="/admin/blog/new">
            <Button>新規イベント追加</Button>
          </Link>
        )}
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
