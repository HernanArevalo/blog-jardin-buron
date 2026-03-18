import { getUser } from '@/actions/user/getUser'
import bcrypt from 'bcrypt'

type params = {
    email: string,
    password: string

}

export async function authenticateUser({email, password}:params) {
  const user = await getUser(email)

  if (!user) return false

  const validPassword = await bcrypt.compare(password, user.data!.password)

  if (!validPassword) return false

  return user
}