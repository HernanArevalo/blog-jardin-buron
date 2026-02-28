import { NextResponse } from "next/server"
import { getAllStoreTags } from "@/lib/store"

export async function GET() {
  const tags = getAllStoreTags()
  return NextResponse.json(tags)
}
