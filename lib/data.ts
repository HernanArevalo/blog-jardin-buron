import type { Tag, Post } from "./types"

export const tags: Tag[] = [
  {
    id: "1",
    name: "General",
    slug: "general",
    color: "#5BA4D9",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Sala de 5 A",
    slug: "sala-5-a",
    color: "#E8724A",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Sala de 5 B",
    slug: "sala-5-b",
    color: "#E05A8D",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Sala de 4 A",
    slug: "sala-4-a",
    color: "#49B889",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Sala de 4 B",
    slug: "sala-4-b",
    color: "#9B6DD7",
    createdAt: "2026-01-01T00:00:00Z",
  }
]

export const posts: Post[] = [
  {
    id: "1",
    title: "Bienvenidos al ciclo lectivo 2026",
    slug: "bienvenidos-ciclo-2026",
    excerpt:
      "Estamos felices de comenzar un nuevo año lleno de aprendizaje y aventuras juntos.",
    content: `Queridas familias,

Es un placer darles la bienvenida a un nuevo ciclo lectivo. Este ano nos esperan muchas actividades, proyectos y momentos especiales que compartiremos con ustedes a traves de este espacio.

Recuerden que este blog sera nuestro canal principal de comunicacion para compartir novedades, fotos y recordatorios importantes.

Los esperamos con mucha alegria.

El equipo del Jardín`,
    mainImage:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=500&fit=crop",
    galleryImages: [],
    tags: ["1"],
    featured: true,
    status: "published",
    createdAt: "2026-02-25T10:00:00Z",
    updatedAt: "2026-02-25T10:00:00Z",
  },
  {
    id: "2",
    title: "Proyecto de Arte: Pintando la Primavera",
    slug: "proyecto-arte-primavera",
    excerpt:
      "Las salitas de 5 comenzaron su proyecto anual de arte con temperas y acuarelas.",
    content: `Esta semana las salas de 5 A y 5 B dieron inicio a un hermoso proyecto artistico donde los chicos exploran tecnicas de pintura con temperas, acuarelas y materiales reciclados.

El objetivo es que cada nino pueda expresar su creatividad y desarrollar habilidades motoras finas a traves del arte.

Las obras terminadas seran expuestas en el hall del jardin a fin de mes.

Materiales que necesitamos:
- Pinceles de distintos tamanos
- Revistas viejas para collage
- Tapitas de plastico de colores`,
    mainImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1560421683-6856ea585c78?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop",
    ],
    tags: ["2", "3"],
    backgroundColor: "#FFF5EC",
    featured: true,
    status: "published",
    createdAt: "2026-02-24T14:00:00Z",
    updatedAt: "2026-02-24T14:00:00Z",
  },
  {
    id: "3",
    title: "Recordatorio: Reunion de Padres",
    slug: "reunion-de-padres-marzo",
    excerpt:
      "Los invitamos a la primera reunion de padres del ano, el proximo viernes 6 de marzo.",
    content: `Estimadas familias,

Los invitamos a participar de la primera reunion de padres del ciclo lectivo 2026.

Fecha: Viernes 6 de marzo
Horario: 18:00 hs
Lugar: SUM del colegio

Temas a tratar:
- Presentacion del equipo docente
- Objetivos pedagogicos del ano
- Calendario de actividades
- Preguntas y consultas

Es muy importante la asistencia de al menos un adulto responsable por familia.

Los esperamos!`,
    mainImage:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=500&fit=crop",
    galleryImages: [],
    tags: ["1"],
    featured: false,
    status: "published",
    createdAt: "2026-02-23T09:00:00Z",
    updatedAt: "2026-02-23T09:00:00Z",
  },
  {
    id: "4",
    title: "Sala de 4 A: Proyecto de Huerta",
    slug: "sala-4a-proyecto-huerta",
    excerpt:
      "Los chicos de Sala de 4 A comenzaron a preparar la huerta del jardin.",
    content: `Con mucho entusiasmo, los ninos de Sala de 4 A comenzaron el proyecto de huerta. Plantaron semillas de lechuga, tomate cherry y albahaca.

Cada dia los chicos se turnan para regar las plantas y observar su crecimiento. Estamos trabajando conceptos de ciencias naturales, responsabilidad y trabajo en equipo.

Pronto les compartiremos fotos del progreso!`,
    mainImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop",
    galleryImages: [],
    tags: ["4"],
    backgroundColor: "#EEFAF4",
    featured: false,
    status: "published",
    createdAt: "2026-02-22T11:00:00Z",
    updatedAt: "2026-02-22T11:00:00Z",
  },
  {
    id: "5",
    title: "Cumpleaños del mes: Febrero",
    slug: "cumpleaños-febrero",
    excerpt:
      "Festejamos los cumpleaños de febrero con una hermosa merienda compartida.",
    content: `Este mes celebramos los cumpleaños de:
- Martina (Sala de 5 A)
- Tomas (Sala de 4 B)
- Valentina (Sala de 3)
- Santiago (Sala de 5 B)

Fue una tarde muy divertida con juegos, musica y una merienda compartida. Feliz cumple a todos!`,
    mainImage:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=500&fit=crop",
    galleryImages: [],
    tags: ["1"],
    featured: false,
    status: "published",
    createdAt: "2026-02-20T16:00:00Z",
    updatedAt: "2026-02-20T16:00:00Z",
  },
  {
    id: "6",
    title: "Sala de 3: Adaptacion y Juegos",
    slug: "sala-3-adaptacion",
    excerpt:
      "Los mas pequenos del jardin estan transitando su periodo de adaptacion con mucho amor.",
    content: `Las primeras semanas en el jardin son un momento muy importante para los mas chiquitos. El equipo de Sala de 3 esta acompanando a cada nino en su proceso de adaptacion con mucho carino y paciencia.

Las actividades incluyen:
- Juegos libres en el patio
- Canciones y rondas
- Exploracion de materiales sensoriales
- Cuentos interactivos

Pedimos a las familias que acompanen este proceso con tranquilidad y confianza. Cualquier duda, no duden en consultarnos.`,
    mainImage:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=500&fit=crop",
    galleryImages: [],
    tags: ["6"],
    featured: false,
    status: "published",
    createdAt: "2026-02-18T10:00:00Z",
    updatedAt: "2026-02-18T10:00:00Z",
  },
]

// Helper functions
export function getPublishedPosts(): Post[] {
  return posts
    .filter((p) => p.status === "published")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

export function getFeaturedPosts(): Post[] {
  return getPublishedPosts().filter((p) => p.featured)
}

export function getPostsByTag(tagId: string): Post[] {
  return getPublishedPosts().filter(
    (p) => p.tags.includes(tagId) || p.tags.includes("1") // "1" is "General"
  )
}

export function getPostsByTagOnly(tagId: string): Post[] {
  return getPublishedPosts().filter((p) => p.tags.includes(tagId))
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getTagById(id: string): Tag | undefined {
  return tags.find((t) => t.id === id)
}

export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((t) => t.slug === slug)
}

export function getTagsForPost(post: Post): Tag[] {
  return post.tags
    .map((tagId) => getTagById(tagId))
    .filter((t): t is Tag => t !== undefined)
}

export function getAllTags(): Tag[] {
  return tags
}

export function getSalas(): Tag[] {
  return tags.filter((t) => t.slug !== "general")
}
