import { NextResponse } from "next/server"
import { deletePost } from "@/lib/store"
import { getPostById } from "@/actions/post/getPostById"
import { UpdatePostById } from "@/actions/post/updatePost"
import { deletePostById } from "@/actions/post/deletePostById"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  return NextResponse.json(post)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const updated = await UpdatePostById(id, body)
  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  return NextResponse.json(updated)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const success = deletePostById(id)
  if (!success) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
