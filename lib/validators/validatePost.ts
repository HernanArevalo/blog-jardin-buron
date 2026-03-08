import { postSchema } from "./post"

export type validatePostResult = {
  valid: boolean,
  errors: string[]
}

export function validatePost(data: any): validatePostResult {
  const result = postSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.issues.map(i => i.message)
    }
  }

  if (data.status === "published") {
    if (!data.content?.trim()) {
      return {
        valid: false,
        errors: ["El contenido es obligatorio para publicar"]
      }
    }
  }

  return { valid: true, errors: [] }
}