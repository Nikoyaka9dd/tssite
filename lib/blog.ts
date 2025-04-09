import type { BlogPost } from "@/types/blog"

// ローカルストレージのキー
const BLOG_STORAGE_KEY = "portfolio_blog_posts"

// ブログ記事の取得
export function getBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") {
    return []
  }

  const storedPosts = localStorage.getItem(BLOG_STORAGE_KEY)
  if (!storedPosts) {
    return []
  }

  try {
    const posts = JSON.parse(storedPosts) as BlogPost[]
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Failed to parse blog posts:", error)
    return []
  }
}

// IDによるブログ記事の取得
export function getBlogPostById(id: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find((post) => post.id === id) || null
}

// スラッグによるブログ記事の取得
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

// ブログ記事の作成
export function createBlogPost(postData: Omit<BlogPost, "id" | "slug" | "createdAt" | "updatedAt">): BlogPost {
  const posts = getBlogPosts()

  const newPost: BlogPost = {
    id: generateId(),
    slug: generateSlug(postData.title),
    ...postData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const updatedPosts = [newPost, ...posts]
  saveBlogPosts(updatedPosts)

  return newPost
}

// ブログ記事の更新
export function updateBlogPost(post: BlogPost): BlogPost {
  const posts = getBlogPosts()
  const index = posts.findIndex((p) => p.id === post.id)

  if (index === -1) {
    throw new Error(`Blog post with ID ${post.id} not found`)
  }

  const updatedPost = {
    ...post,
    updatedAt: new Date().toISOString(),
  }

  posts[index] = updatedPost
  saveBlogPosts(posts)

  return updatedPost
}

// ブログ記事の削除
export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts()
  const updatedPosts = posts.filter((post) => post.id !== id)
  saveBlogPosts(updatedPosts)
}

// ブログ記事の保存
function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts))
}

// IDの生成
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// スラッグの生成
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 特殊文字を削除
    .replace(/\s+/g, "-") // スペースをハイフンに置換
    .replace(/--+/g, "-") // 複数のハイフンを単一のハイフンに置換
    .trim()
    .substring(0, 100) // 長さを制限
}
