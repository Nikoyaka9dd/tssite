"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { BlogEditor } from "@/components/blog/blog-editor"
import { getBlogPostById } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"

export default function EditBlogPostPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const id = params.id as string

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const foundPost = getBlogPostById(id)
    if (foundPost) {
      setPost(foundPost)
    } else {
      router.push("/admin/blog")
    }
  }, [id, isAuthenticated, router])

  if (!isAuthenticated || !post) {
    return null
  }

  return (
    <div className="section">
      <h1 className="text-2xl font-bold mb-6">イベント編集</h1>
      <BlogEditor post={post} />
    </div>
  )
}
