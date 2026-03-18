import { NextResponse } from "next/server"
import { loginAction } from "@/actions/auth/login"
import { clearSession, getSession } from "@/lib/auth"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { ok: false, message: "No autenticado", data: null },
      { status: 401 }
    )
  }

  return NextResponse.json({ ok: true, message: "Sesion activa", data: session })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  const result = await loginAction({ email, password })

  return NextResponse.json(result, { status: result.status })
}

export async function DELETE() {
  await clearSession()

  return NextResponse.json({ ok: true, message: "Sesion cerrada" })
}
