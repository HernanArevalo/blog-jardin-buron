export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { getAllPosts } from "@/actions/posts"
import { createPost } from "@/actions/post/createPost"
import { CreatePostInput } from "@/lib/types"
import { requireSession } from "@/lib/auth"

export async function GET() {
  const session = await requireSession()

  if (!session.ok) {
    return NextResponse.json(session, { status: session.status })
  }

  const posts = await getAllPosts()

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const session = await requireSession()

  if (!session.ok) {
    return NextResponse.json(session, { status: session.status })
  }

  const body = await request.json()

  const post = await createPost({
    ...body,
    tags: body.tags || [],
    featured: body.featured || false,
    status: body.status || "draft",
  } as CreatePostInput)

  return NextResponse.json(post, { status: post.status })
}
