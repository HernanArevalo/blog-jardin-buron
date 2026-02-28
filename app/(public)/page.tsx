import { getPublishedPosts, getFeaturedPosts, getAllTags } from "@/lib/data"
import { PostCard } from "@/components/post-card"
import { TagFilter } from "@/components/tag-filter"
import { FeaturedSection } from "@/components/featured-section"
import { HeroBanner } from "@/components/hero-banner"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag: activeTag } = await searchParams
  const allPosts = getPublishedPosts()
  const featuredPosts = getFeaturedPosts()
  const tags = getAllTags()

  const filteredPosts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts

  return (
    <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
      {/* Hero */}
      {!activeTag && <HeroBanner />}

      {activeTag && (
        <section className="py-10 lg:py-14 animate-fade-in-up">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground text-balance leading-tight">
            Publicaciones filtradas
          </h1>
          <p className="mt-2 text-muted-foreground text-base">
            Mostrando resultados para el filtro seleccionado.
          </p>
        </section>
      )}

      {/* Featured */}
      {featuredPosts.length > 0 && !activeTag && (
        <FeaturedSection posts={featuredPosts} />
      )}

      {/* Divider with label */}
      <div className="flex items-center gap-4 pt-4 pb-2 animate-fade-in-up animation-delay-400">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Todas las publicaciones
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Tag Filter */}
      <section className="py-5 animate-fade-in-up animation-delay-500">
        <TagFilter tags={tags} activeTag={activeTag} />
      </section>

      {/* Posts Grid */}
      <section className="pb-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 animate-scale-in">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
              <svg className="h-8 w-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <p className="text-muted-foreground font-medium">
              No hay publicaciones para este filtro.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Intenta seleccionar otra categoria.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
