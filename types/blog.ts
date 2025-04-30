export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  date: string
  author?: string
  excerpt?: string
  createdAt: string
  updatedAt: string
}
