"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { createBlogPost, updateBlogPost } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"
import { Markdown } from "@/components/blog/markdown"

interface BlogEditorProps {
  post?: BlogPost
}

export function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [date, setDate] = useState(post?.date || new Date().toISOString().split("T")[0])
  const [activeTab, setActiveTab] = useState<string>("edit")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !date) {
      alert("タイトル、内容、日付は必須です。")
      return
    }

    if (post) {
      // 更新
      updateBlogPost({
        ...post,
        title,
        content,
        date,
      })
    } else {
      // 新規作成
      createBlogPost({
        title,
        content,
        date,
      })
    }

    router.push("/admin/blog")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <Button type="submit">{post ? "更新する" : "作成する"}</Button>
      </div>
    </form>
  )
}
