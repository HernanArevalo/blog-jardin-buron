import bcrypt from 'bcrypt'


type Params = {
    email: string,
    password: string
}

export async function createUser({ email, password }: Params) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
  }

  // guardar en DB
}