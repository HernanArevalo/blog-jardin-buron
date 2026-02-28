"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { toast } from "sonner"
import { ArrowLeft, ImagePlus, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import type { Post, Tag } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface PostFormProps {
  postId?: string
}

export function PostForm({ postId }: PostFormProps) {
  const router = useRouter()
  const { data: tags } = useSWR<Tag[]>("/api/tags", fetcher)
  const { data: existingPost } = useSWR<Post>(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  )

  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [mainImage, setMainImage] = useState("")
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [newGalleryUrl, setNewGalleryUrl] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [backgroundColor, setBackgroundColor] = useState("")
  const [featured, setFeatured] = useState(false)
  const [status, setStatus] = useState<"draft" | "published">("draft")

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title)
      setExcerpt(existingPost.excerpt)
      setContent(existingPost.content)
      setMainImage(existingPost.mainImage || "")
      setGalleryImages(existingPost.galleryImages)
      setSelectedTags(existingPost.tags)
      setBackgroundColor(existingPost.backgroundColor || "")
      setFeatured(existingPost.featured)
      setStatus(existingPost.status)
    }
  }, [existingPost])

  function toggleTag(tagId: string) {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  function addGalleryImage() {
    if (newGalleryUrl.trim()) {
      setGalleryImages((prev) => [...prev, newGalleryUrl.trim()])
      setNewGalleryUrl("")
    }
  }

  function removeGalleryImage(index: number) {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(submitStatus: "draft" | "published") {
    if (!title.trim()) {
      toast.error("El titulo es obligatorio")
      return
    }
    if (selectedTags.length === 0) {
      toast.error("Selecciona al menos un tag")
      return
    }

    setSaving(true)
    try {
      const body = {
        title,
        excerpt,
        content,
        mainImage: mainImage || undefined,
        galleryImages,
        tags: selectedTags,
        backgroundColor: backgroundColor || undefined,
        featured,
        status: submitStatus,
      }

      if (postId) {
        await fetch(`/api/posts/${postId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        toast.success("Publicacion actualizada")
      } else {
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        toast.success("Publicacion creada")
      }
      router.push("/admin")
      router.refresh()
    } catch {
      toast.error("Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a publicaciones
      </Link>

      <h1 className="font-serif text-2xl text-foreground mb-6">
        {postId ? "Editar publicacion" : "Nueva publicacion"}
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main Column */}
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titulo *</Label>
            <Input
              id="title"
              placeholder="Titulo de la publicacion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Descripcion corta</Label>
            <Textarea
              id="excerpt"
              placeholder="Breve descripcion (preview)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              placeholder="Contenido completo de la publicacion..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          {/* Main Image */}
          <div className="space-y-2">
            <Label htmlFor="mainImage">Imagen principal (URL)</Label>
            <div className="flex gap-2">
              <Input
                id="mainImage"
                placeholder="https://..."
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
              />
            </div>
            {mainImage && (
              <div className="relative h-48 rounded-xl overflow-hidden mt-2">
                <Image
                  src={mainImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <button
                  onClick={() => setMainImage("")}
                  className="absolute top-2 right-2 rounded-full bg-foreground/60 p-1.5 text-card hover:bg-foreground/80 transition-colors"
                  aria-label="Quitar imagen"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Gallery */}
          <div className="space-y-2">
            <Label>Galeria de imagenes (URLs)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addGalleryImage()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addGalleryImage}
                className="shrink-0"
              >
                <ImagePlus className="h-4 w-4" />
              </Button>
            </div>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={img}
                      alt={`Galeria ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 rounded-full bg-foreground/60 p-1 text-card hover:bg-foreground/80 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label={`Quitar imagen ${i + 1}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status + Actions */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <h3 className="font-medium text-sm text-foreground">Publicar</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="text-sm">
                Destacada
              </Label>
              <Switch
                id="featured"
                checked={featured}
                onCheckedChange={setFeatured}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 text-sm"
                onClick={() => handleSubmit("draft")}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Borrador"}
              </Button>
              <Button
                className="flex-1 text-sm"
                onClick={() => handleSubmit("published")}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Publicar"}
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <h3 className="font-medium text-sm text-foreground">
              Tags *
            </h3>
            {tags ? (
              <div className="space-y-2.5">
                {tags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedTags.includes(tag.id)}
                      onCheckedChange={() => toggleTag(tag.id)}
                    />
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-sm text-foreground">{tag.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="h-32 animate-pulse rounded-lg bg-secondary" />
            )}
          </div>

          {/* Background Color */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <h3 className="font-medium text-sm text-foreground">
              Color de fondo (opcional)
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundColor || "#ffffff"}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-9 w-9 rounded-lg border border-border cursor-pointer"
              />
              <Input
                placeholder="#FFFFFF"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1"
              />
              {backgroundColor && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBackgroundColor("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
