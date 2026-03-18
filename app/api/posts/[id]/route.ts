export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { getPostById } from "@/actions/post/getPostById"
import { UpdatePostById } from "@/actions/post/updatePost"
import { deletePostById } from "@/actions/post/deletePostById"
import { requireSession } from "@/lib/auth"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireSession()

  if (!session.ok) {
    return NextResponse.json(session, { status: session.status })
  }

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
  const session = await requireSession()

  if (!session.ok) {
    return NextResponse.json(session, { status: session.status })
  }

  const { id } = await params
  const body = await request.json()
  const updated = await UpdatePostById(id, body)

  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json(updated, { status: updated.status })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireSession()

  if (!session.ok) {
    return NextResponse.json(session, { status: session.status })
  }

  const { id } = await params
  const deleted = await deletePostById(id)

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json(deleted, { status: deleted.status })
}
