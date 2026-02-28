"use client"

import Link from "next/link"
import useSWR from "swr"
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { toast } from "sonner"
import type { Post, Tag } from "@/lib/types"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminPage() {
  const { data: posts, mutate } = useSWR<Post[]>("/api/posts", fetcher)
  const { data: tags } = useSWR<Tag[]>("/api/tags", fetcher)

  const getTagName = (tagId: string) => {
    return tags?.find((t) => t.id === tagId)?.name || tagId
  }

  const getTagColor = (tagId: string) => {
    return tags?.find((t) => t.id === tagId)?.color || "#999"
  }

  async function handleDelete(id: string) {
    if (!confirm("Estas seguro de que quieres eliminar esta publicacion?"))
      return
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
    mutate()
    toast.success("Publicacion eliminada")
  }

  async function toggleFeatured(post: Post) {
    await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !post.featured }),
    })
    mutate()
    toast.success(
      post.featured ? "Quitada de destacadas" : "Marcada como destacada"
    )
  }

  async function toggleStatus(post: Post) {
    const newStatus = post.status === "published" ? "draft" : "published"
    await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    mutate()
    toast.success(
      newStatus === "published" ? "Publicacion publicada" : "Guardada como borrador"
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-foreground">
            Publicaciones
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gestiona el contenido del blog
          </p>
        </div>
        <Link href="/admin/nuevo">
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Nueva Publicacion
          </Button>
        </Link>
      </div>

      {!posts ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-secondary animate-pulse"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground text-sm mb-3">
            No hay publicaciones aun.
          </p>
          <Link href="/admin/nuevo">
            <Button variant="outline" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Crear la primera
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate text-sm">
                    {post.title}
                  </h3>
                  {post.status === "draft" && (
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      Borrador
                    </span>
                  )}
                  {post.featured && (
                    <Star className="h-3.5 w-3.5 text-accent fill-current shrink-0" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(post.createdAt), "d MMM yyyy", {
                      locale: es,
                    })}
                  </time>
                  {post.tags.map((tagId) => (
                    <span
                      key={tagId}
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${getTagColor(tagId)}18`,
                        color: getTagColor(tagId),
                      }}
                    >
                      {getTagName(tagId)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleStatus(post)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  title={
                    post.status === "published"
                      ? "Pasar a borrador"
                      : "Publicar"
                  }
                >
                  {post.status === "published" ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => toggleFeatured(post)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  title={
                    post.featured
                      ? "Quitar de destacadas"
                      : "Marcar como destacada"
                  }
                >
                  <Star
                    className={`h-4 w-4 ${
                      post.featured ? "text-accent fill-current" : ""
                    }`}
                  />
                </button>
                <Link
                  href={`/admin/editar/${post.id}`}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  title="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
