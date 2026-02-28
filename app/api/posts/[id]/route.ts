import { NextResponse } from "next/server"
import { getStorePostById, updatePost, deletePost } from "@/lib/store"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = getStorePostById(id)
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
  const updated = updatePost(id, body)
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
  const success = deletePost(id)
  if (!success) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
