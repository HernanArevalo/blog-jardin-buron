import Link from "next/link"
import type { Tag } from "@/lib/types"

interface TagBadgeProps {
  tag: Tag
  linked?: boolean
  size?: "sm" | "md"
}

export function TagBadge({ tag, linked = true, size = "sm" }: TagBadgeProps) {
  const classes = `inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:scale-[1.03] ${
    size === "sm"
      ? "px-2.5 py-0.5 text-xs"
      : "px-3 py-1 text-sm"
  }`

  const content = (
    <>
      <span
        className="h-2 w-2 rounded-full shrink-0"
        style={{ backgroundColor: tag.color }}
      />
      {tag.name}
    </>
  )

  if (linked) {
    return (
      <Link
        href={`/salas/${tag.slug}`}
        className={classes}
        style={{
          backgroundColor: `${tag.color}20`,
          color: tag.color,
        }}
      >
        {content}
      </Link>
    )
  }

  return (
    <span
      className={classes}
      style={{
        backgroundColor: `${tag.color}20`,
        color: tag.color,
      }}
    >
      {content}
    </span>
  )
}
