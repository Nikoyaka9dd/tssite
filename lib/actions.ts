"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import type { BlogPost } from "@/types/blog"

// ブログ記事の取得
export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    // データベースの形式からフロントエンドの形式に変換
    return posts.map((post) => ({
      id: String(post.id),
      title: post.title,
      content: post.content,
      slug: slugify(post.title),
      date: post.createdAt.toISOString().split("T")[0],
      author: post.author,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    })) as BlogPost[]
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}

// IDによるブログ記事の取得
export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number.parseInt(id),
      },
    })

    if (!post) return null

    // データベースの形式からフロントエンドの形式に変換
    return {
      id: String(post.id),
      title: post.title,
      content: post.content,
      slug: slugify(post.title),
      date: post.createdAt.toISOString().split("T")[0],
      author: post.author,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    } as BlogPost
  } catch (error) {
    console.error(`Failed to fetch post with id ${id}:`, error)
    return null
  }
}

// スラッグによるブログ記事の取得
export async function getPostBySlug(slug: string) {
  try {
    // スラッグは保存していないので、全記事を取得して検索
    const posts = await prisma.post.findMany()
    const post = posts.find((p) => slugify(p.title) === slug)

    if (!post) return null

    // データベースの形式からフロントエンドの形式に変換
    return {
      id: String(post.id),
      title: post.title,
      content: post.content,
      slug: slugify(post.title),
      date: post.createdAt.toISOString().split("T")[0],
      author: post.author,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    } as BlogPost
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error)
    return null
  }
}

// ブログ記事の作成
export async function createPost(data: { title: string; content: string; date: string; author: string }) {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        // dateフィールドがある場合は、createdAtを指定の日付に設定
        ...(data.date && { createdAt: new Date(data.date) }),
      },
    })

    // キャッシュを更新
    revalidatePath("/blog")
    revalidatePath("/admin/blog")

    // データベースの形式からフロントエンドの形式に変換
    return {
      id: String(post.id),
      title: post.title,
      content: post.content,
      slug: slugify(post.title),
      date: post.createdAt.toISOString().split("T")[0],
      author: post.author,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    } as BlogPost
  } catch (error) {
    console.error("Failed to create post:", error)
    throw new Error("ブログ記事の作成に失敗しました")
  }
}

// ブログ記事の更新
export async function updatePost(id: string, data: { title: string; content: string; date: string; author: string }) {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        // dateフィールドがある場合は、createdAtを指定の日付に設定
        ...(data.date && { createdAt: new Date(data.date) }),
      },
    })

    // キャッシュを更新
    revalidatePath("/blog")
    revalidatePath(`/blog/${slugify(post.title)}`)
    revalidatePath("/admin/blog")
    revalidatePath(`/admin/blog/edit/${id}`)

    // データベースの形式からフロントエンドの形式に変換
    return {
      id: String(post.id),
      title: post.title,
      content: post.content,
      slug: slugify(post.title),
      date: post.createdAt.toISOString().split("T")[0],
      author: post.author,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    } as BlogPost
  } catch (error) {
    console.error(`Failed to update post with id ${id}:`, error)
    throw new Error("ブログ記事の更新に失敗しました")
  }
}

// ブログ記事の削除
export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: {
        id: Number.parseInt(id),
      },
    })

    // キャッシュを更新
    revalidatePath("/blog")
    revalidatePath("/admin/blog")

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete post with id ${id}:`, error)
    throw new Error("ブログ記事の削除に失敗しました")
  }
}
