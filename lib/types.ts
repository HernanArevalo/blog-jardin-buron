export interface Tag {
  id: string
  name: string
  slug: string
  color: string
  createdAt: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  mainImage?: string
  galleryImages: string[]
  tags: string[] // tag ids
  backgroundColor?: string
  featured: boolean
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
}
