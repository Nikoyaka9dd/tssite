"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { createPost, updatePost } from "@/lib/actions"
import type { BlogPost } from "@/types/blog"
import { Markdown } from "@/components/blog/markdown"
import { useSession } from "next-auth/react"

interface BlogEditorProps {
  post?: BlogPost
}

export function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [date, setDate] = useState(post?.date || new Date().toISOString().split("T")[0])
  const [author, setAuthor] = useState(post?.author || session?.user?.name || "")
  const [activeTab, setActiveTab] = useState<string>("edit")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title || !content || !date) {
      setError("タイトル、内容、日付は必須です。")
      return
    }

    try {
      setIsSubmitting(true)

      if (post) {
        // 更新
        await updatePost(post.id, {
          title,
          content,
          date,
          author,
        })
      } else {
        // 新規作成
        await createPost({
          title,
          content,
          date,
          author,
        })
      }

      router.push("/admin/blog")
      router.refresh()
    } catch (err) {
      console.error("Error saving post:", err)
      setError(err instanceof Error ? err.message : "保存中にエラーが発生しました。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-100 text-red-800 rounded-md">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="イベント名を入力"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">日付</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">著者</Label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="著者名を入力" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">内容</Label>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">編集</TabsTrigger>
            <TabsTrigger value="preview">プレビュー</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="mt-0 border rounded-md">
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="マークダウン記法で内容を入力"
              className="min-h-[300px] font-mono"
              required
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-0">
            <div className="border rounded-md p-4 min-h-[300px] prose prose-slate max-w-none">
              {content ? (
                <Markdown content={content} />
              ) : (
                <p className="text-muted-foreground">プレビューするコンテンツがありません</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        <p className="text-sm text-muted-foreground">
          マークダウン記法が使用できます。# 見出し、**太字**、*斜体*、[リンク](URL)、など
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
          キャンセル
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : post ? "更新する" : "作成する"}
        </Button>
      </div>
    </form>
  )
}
