"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { BlogEditor } from "@/components/blog/blog-editor"

export default function NewBlogPostPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="section">
      <h1 className="text-2xl font-bold mb-6">新規イベント追加</h1>
      <BlogEditor />
    </div>
  )
}
