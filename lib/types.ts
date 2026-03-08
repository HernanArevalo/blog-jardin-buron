import { Timestamp, FieldValue } from "firebase/firestore"

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
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type CreatePostInput = {
  title: string
  slug?: string
  excerpt: string
  content: string
  mainImage?: string
  galleryImages?: string[]
  tags?: string[]
  backgroundColor?: string
  featured?: boolean
  status?: "draft" | "published"
}

export interface User {
  id: string
  name: string
  email: string
  password: string
}