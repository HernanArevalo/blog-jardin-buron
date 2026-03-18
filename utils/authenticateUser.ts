import { getUser } from "@/actions/user/getUser"
import bcrypt from "bcrypt"

type Params = {
  email: string
  password: string
}

export async function authenticateUser({ email, password }: Params) {
  const user = await getUser(email)

  if (!user?.ok || !user.data?.password) {
    return {
      ok: false,
      message: "Credenciales inválidas",
      data: null,
      status: 401,
    }
  }

  const validPassword = await bcrypt.compare(password, user.data.password)

  if (!validPassword) {
    return {
      ok: false,
      message: "Credenciales inválidas",
      data: null,
      status: 401,
    }
  }

  return user
}
