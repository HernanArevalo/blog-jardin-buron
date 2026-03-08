import { z } from "zod"

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "El titulo es obligatorio"),

  excerpt: z.string().optional(),

  content: z.string().optional(),

  mainImage: z.string().url("La imagen debe ser una URL valida").optional(),

  galleryImages: z.array(z.string().url()).default([]),

  tags: z
    .array(z.string())
    .min(1, "Debes seleccionar al menos un tag"),

  backgroundColor: z.string().optional(),

  featured: z.boolean(),

  status: z.enum(["draft", "published"])
})
