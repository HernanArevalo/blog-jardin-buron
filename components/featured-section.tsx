import type { Post } from "@/lib/types"
import { PostCard } from "./post-card"
import { Sparkles } from "lucide-react"

interface FeaturedSectionProps {
  posts: Post[]
}

export function FeaturedSection({ posts }: FeaturedSectionProps) {
  return (
    <section className="pb-6 animate-fade-in-up animation-delay-300">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
            <Sparkles className="h-4 w-4 text-accent fill-accent" />
          </div>
          <h2 className="font-serif text-xl text-foreground">
            Destacadas
          </h2>
        </div>
        <div className="h-px flex-1 bg-accent/20" />
        <div className="flex gap-1" aria-hidden="true">
          <div className="h-2 w-2 rounded-full bg-accent/40 animate-bounce-gentle" />
          <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce-gentle animation-delay-200" />
          <div className="h-2 w-2 rounded-full bg-accent/40 animate-bounce-gentle animation-delay-400" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.slice(0, 2).map((post, i) => (
          <div key={post.id} className={`animate-scale-in ${i === 1 ? "animation-delay-200" : ""}`}>
            <PostCard post={post} featured />
          </div>
        ))}
      </div>
    </section>
  )
}
