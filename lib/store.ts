import { Timestamp } from "firebase/firestore"
import { posts as initialPosts, tags as initialTags } from "./data"
import type { Post, Tag } from "./types"

// Simple in-memory store for admin operations.
// Replace with database calls when connecting a real DB.

let postsStore: Post[] = [...initialPosts]
let tagsStore: Tag[] = [...initialTags]

// Posts CRUD
export function getAllPosts(): Post[] {
  return [...postsStore].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getStorePostBySlug(slug: string): Post | undefined {
  return postsStore.find((p) => p.slug === slug)
}

export function getStorePostById(id: string): Post | undefined {
  return postsStore.find((p) => p.id === id)
}

export function createPost(data: Omit<Post, "id" | "createdAt" | "updatedAt">): Post {
  const now = new Date().toISOString()
  const post: Post = {
    ...data,
    id: String(Date.now()),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  }
  postsStore.push(post)
  return post
}

export function updatePost(
  id: string,
  data: Partial<Omit<Post, "id" | "createdAt">>
): Post | undefined {
  const index = postsStore.findIndex((p) => p.id === id)
  if (index === -1) return undefined
  postsStore[index] = {
    ...postsStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  return postsStore[index]
}

export function deletePost(id: string): boolean {
  const len = postsStore.length
  postsStore = postsStore.filter((p) => p.id !== id)
  return postsStore.length < len
}

// Tags CRUD
export function getAllStoreTags(): Tag[] {
  return [...tagsStore]
}

export function getStoreTagById(id: string): Tag | undefined {
  return tagsStore.find((t) => t.id === id)
}
