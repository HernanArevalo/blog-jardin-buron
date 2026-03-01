import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Star, Share2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { getPostBySlug, getTagsForPost, getPublishedPosts } from "@/lib/data"
import { TagBadge } from "@/components/tag-badge"
import { PostGallery } from "@/components/post-gallery"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "No encontrado" }
  return {
    title: `${post.title} | Jardin - Instituto Padre Juan Burón`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = getPublishedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || post.status !== "published") notFound()

  const postTags = getTagsForPost(post)
  const mainTag = postTags[0]

  return (
    <article className="mx-auto max-w-3xl px-4 lg:px-6 py-8 lg:py-12">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-down">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver al inicio
        </Link>
        <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg px-2.5 py-1.5 hover:bg-primary/10">
          <Share2 className="h-3.5 w-3.5" />
          Compartir
        </button>
      </div>

      {/* Tags */}
      {postTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5 animate-fade-in-up">
          {postTags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} size="md" />
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance leading-tight animate-fade-in-up animation-delay-100">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed animate-fade-in-up animation-delay-200">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 mt-5 mb-8 animate-fade-in-up animation-delay-300">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary/60" />
          <time dateTime={post.createdAt}>
            {format(new Date(post.createdAt), "EEEE d 'de' MMMM, yyyy", {
              locale: es,
            })}
          </time>
        </div>
        {post.featured && (
          <div className="flex items-center gap-1 text-sm text-accent font-semibold">
            <Star className="h-4 w-4 fill-current" />
            Destacada
          </div>
        )}
      </div>

      {/* Main Image */}
      {post.mainImage && (
        <div className="relative aspect-video overflow-hidden rounded-2xl mb-10 shadow-xl animate-scale-in animation-delay-200">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          {/* Colored corner accent */}
          {mainTag && (
            <>
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: mainTag.color }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: mainTag.color, opacity: 0.5 }}
              />
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div
        className="rounded-2xl animate-fade-in-up animation-delay-400"
        style={
          post.backgroundColor
            ? {
                backgroundColor: post.backgroundColor,
                padding: "2rem",
              }
            : undefined
        }
      >
        {post.content.split("\n").map((paragraph, i) => {
          const trimmed = paragraph.trim()
          if (!trimmed) return null
          if (trimmed.startsWith("- ")) {
            return (
              <li
                key={i}
                className="text-muted-foreground leading-relaxed ml-4 list-disc marker:text-primary/40"
              >
                {trimmed.slice(2)}
              </li>
            )
          }
          return (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-base md:text-lg">
              {trimmed}
            </p>
          )
        })}
      </div>

      {/* Gallery */}
      {post.galleryImages.length > 0 && (
        <div className="animate-fade-in-up animation-delay-500">
          <PostGallery images={post.galleryImages} title={post.title} />
        </div>
      )}

      {/* Bottom nav */}
      <div className="mt-12 pt-8 border-t border-border animate-fade-in-up animation-delay-600">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Ver todas las publicaciones
        </Link>
      </div>
    </article>
  )
}
