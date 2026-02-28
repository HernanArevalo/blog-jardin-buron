import Link from "next/link"
import Image from "next/image"
import { Calendar, Star, ArrowUpRight } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { Post } from "@/lib/types"
import { getTagsForPost } from "@/lib/data"
import { TagBadge } from "./tag-badge"

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const postTags = getTagsForPost(post)
  const mainTag = postTags[0]

  return (
    <Link href={`/publicaciones/${post.slug}`} className="group block animate-fade-in-up">
      <article className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/20">
        {post.mainImage && (
          <div
            className={`relative overflow-hidden ${
              featured ? "h-56 sm:h-64" : "h-44 sm:h-48"
            }`}
          >
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Colored top strip per tag */}
            {mainTag && (
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                style={{ backgroundColor: mainTag.color }}
              />
            )}

            {post.featured && (
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-accent/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-md">
                <Star className="h-3 w-3 fill-current" />
                Destacada
              </div>
            )}

            {/* Hover arrow */}
            <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <Calendar className="h-3.5 w-3.5 text-primary/60" />
            <time
              dateTime={post.createdAt}
              className="text-xs text-muted-foreground"
            >
              {format(new Date(post.createdAt), "d 'de' MMMM, yyyy", {
                locale: es,
              })}
            </time>
          </div>
          <h3
            className={`font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-balance ${
              featured ? "text-xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          {postTags.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {postTags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} linked={false} />
              ))}
            </div>
          )}
        </div>

        {/* Bottom colored edge on hover */}
        {mainTag && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-0.5 transition-all duration-300"
            style={{ backgroundColor: mainTag.color }}
          />
        )}
      </article>
    </Link>
  )
}
