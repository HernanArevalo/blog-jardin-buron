"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Tag } from "@/lib/types"

interface TagFilterProps {
  tags: Tag[]
  activeTag?: string
}

export function TagFilter({ tags, activeTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href="/"
        className={cn(
          "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
          !activeTag
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105"
        )}
      >
        Todas
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/?tag=${tag.id}`}
          className={cn(
            "group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105",
            activeTag === tag.id ? "shadow-md" : ""
          )}
          style={
            activeTag === tag.id
              ? {
                  backgroundColor: tag.color,
                  color: "#fff",
                  boxShadow: `0 4px 14px -3px ${tag.color}50`,
                }
              : {
                  backgroundColor: `${tag.color}15`,
                  color: tag.color,
                }
          }
        >
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125",
              activeTag === tag.id ? "bg-white/80" : ""
            )}
            style={activeTag !== tag.id ? { backgroundColor: tag.color } : undefined}
          />
          {tag.name}
        </Link>
      ))}
    </div>
  )
}
