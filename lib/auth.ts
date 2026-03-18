import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const SESSION_COOKIE_NAME = "admin_session"
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12

type SessionPayload = {
  email: string
  exp: number
}

function getSessionSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-admin-secret-change-me"
}

function encode(payload: SessionPayload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = createHmac("sha256", getSessionSecret()).update(data).digest("base64url")
  return `${data}.${signature}`
}

function decode(token: string): SessionPayload | null {
  const [data, signature] = token.split(".")

  if (!data || !signature) return null

  const expectedSignature = createHmac("sha256", getSessionSecret()).update(data).digest("base64url")

  const receivedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as SessionPayload

    if (!payload.email || !payload.exp || payload.exp < Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export async function createSession(email: string) {
  const store = await cookies()
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + SESSION_DURATION_MS,
  }

  store.set(SESSION_COOKIE_NAME, encode(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(payload.exp),
  })

  return payload
}

export async function clearSession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE_NAME)
}

export async function getSession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE_NAME)?.value

  if (!token) return null

  return decode(token)
}

export async function requireSession() {
  const session = await getSession()

  if (!session) {
    return {
      ok: false as const,
      error: "No autorizado",
      status: 401,
      data: null,
    }
  }

  return {
    ok: true as const,
    error: null,
    status: 200,
    data: session,
  }
}
