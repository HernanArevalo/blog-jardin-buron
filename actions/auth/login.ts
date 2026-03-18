"use server"

import { authenticateUser } from "@/utils/authenticateUser"
import { createSession } from "@/lib/auth"

export async function loginAction({
  email,
  password,
}: {
  email: string
  password: string
}) {
  if (!email || !password) {
    return {
      ok: false,
      message: "Usuario y contraseña son obligatorios",
      status: 400,
    }
  }

  const user = await authenticateUser({ email, password })

  if (!user.ok || !user.data?.email) {
    return {
      ok: false,
      message: "Credenciales inválidas",
      status: 401,
    }
  }

  await createSession(user.data.email)

  return {
    ok: true,
    message: "Sesión iniciada correctamente",
    status: 200,
    data: {
      email: user.data.email,
      name: user.data.name ?? "Admin",
    },
  }
}
