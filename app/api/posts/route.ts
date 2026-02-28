import { NextResponse } from "next/server"
import { getAllPosts, createPost } from "@/lib/store"

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()

  const slug =
    body.slug ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60)

  const post = createPost({
    title: body.title,
    slug,
    excerpt: body.excerpt,
    content: body.content,
    mainImage: body.mainImage || undefined,
    galleryImages: body.galleryImages || [],
    tags: body.tags || [],
    backgroundColor: body.backgroundColor || undefined,
    featured: body.featured || false,
    status: body.status || "draft",
  })

  return NextResponse.json(post, { status: 201 })
}
