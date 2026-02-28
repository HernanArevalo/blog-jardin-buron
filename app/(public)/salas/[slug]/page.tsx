import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Users } from "lucide-react"
import { getTagBySlug, getPostsByTag, getSalas } from "@/lib/data"
import { PostCard } from "@/components/post-card"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = getTagBySlug(slug)
  if (!tag) return { title: "No encontrado" }
  return {
    title: `${tag.name} | Jardin - Instituto Padre Juan Buron`,
    description: `Publicaciones para ${tag.name}`,
  }
}

export async function generateStaticParams() {
  const salas = getSalas()
  return salas.map((s) => ({ slug: s.slug }))
}

export default async function SalaPage({ params }: PageProps) {
  const { slug } = await params
  const tag = getTagBySlug(slug)
  if (!tag) notFound()

  const posts = getPostsByTag(tag.id)
  const allSalas = getSalas()

  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-6 py-8 lg:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group animate-fade-in-down"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Volver al inicio
      </Link>

      {/* Sala Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 mb-10 animate-fade-in-up" style={{ backgroundColor: `${tag.color}10` }}>
        {/* Background decoration */}
        <div
          className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: tag.color }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-2xl opacity-10"
          style={{ backgroundColor: tag.color }}
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-5">
          <div
            className="h-16 w-16 md:h-20 md:w-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-serif font-bold shrink-0 shadow-lg transition-transform hover:scale-105 hover:rotate-3"
            style={{ backgroundColor: tag.color, color: "#fff" }}
          >
            {tag.name.split(" ").pop()}
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground">
              {tag.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <Users className="h-4 w-4" style={{ color: tag.color }} />
              <p className="text-sm text-muted-foreground">
                {posts.length} publicacion{posts.length !== 1 ? "es" : ""}
                {tag.slug !== "general" && " (incluye publicaciones generales)"}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-2 mt-6" aria-hidden="true">
          <div className="h-2 w-2 rounded-full animate-bounce-gentle" style={{ backgroundColor: tag.color }} />
          <div className="h-2 w-2 rounded-full animate-bounce-gentle animation-delay-200" style={{ backgroundColor: `${tag.color}80` }} />
          <div className="h-2 w-10 rounded-full" style={{ backgroundColor: `${tag.color}30` }} />
          <div className="h-2 w-2 rounded-full animate-bounce-gentle animation-delay-400" style={{ backgroundColor: `${tag.color}60` }} />
          <div className="h-2 w-2 rounded-full animate-bounce-gentle animation-delay-600" style={{ backgroundColor: tag.color }} />
        </div>
      </div>

      {/* Other salas navigation */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 animate-fade-in-up animation-delay-200">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Otras salas:</span>
        {allSalas.filter(s => s.id !== tag.id).map((sala) => (
          <Link
            key={sala.id}
            href={`/salas/${sala.slug}`}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105"
            style={{ backgroundColor: `${sala.color}15`, color: sala.color }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: sala.color }}
            />
            {sala.name}
          </Link>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20 animate-scale-in">
          <div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full mb-4"
            style={{ backgroundColor: `${tag.color}15` }}
          >
            <Users className="h-8 w-8" style={{ color: `${tag.color}80` }} />
          </div>
          <p className="text-muted-foreground font-medium">
            Aun no hay publicaciones para esta sala.
          </p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Pronto compartiremos novedades.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
