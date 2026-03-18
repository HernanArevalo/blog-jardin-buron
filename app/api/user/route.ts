
import { getUser } from "@/actions/user/getUser"

export async function POST(request: Request) {
  const body = await request.json()

  const { email, password } = body

  if (!email || !password) {
    return Response.json(
      { error: "Email y password bligatorios" },
      { status: 400 }
    )
  }

  return Response.json({ ok: true })
}