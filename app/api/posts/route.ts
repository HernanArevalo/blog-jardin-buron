import { NextResponse } from "next/server"
import { getAllPosts } from "@/actions/posts"
import { createPost } from "@/actions/post/createPost"
import { CreatePostInput } from "@/lib/types"
import { generateSlug } from "@/utils/generateSlug"

export async function GET() {
  const posts = await getAllPosts()

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()

  const slug = body.slug || generateSlug(body.title)

  const post = await createPost({
    ...body,
    tags: body.tags || [],
    featured: body.featured || false,
    status: body.status || "draft",
  } as CreatePostInput)

  return NextResponse.json(post, { status: 201 })
}
