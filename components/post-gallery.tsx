"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

interface PostGalleryProps {
  images: string[]
  title: string
}

export function PostGallery({ images, title }: PostGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <ImageIcon className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-serif text-xl text-foreground">Galeria</h3>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">{images.length} fotos</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <Image
                src={img}
                alt={`${title} - Imagen ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <svg className="h-3.5 w-3.5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 backdrop-blur-md animate-scale-in"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-label="Galeria de imagenes"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 rounded-full bg-card/20 hover:bg-card/30 p-2.5 text-card transition-all hover:scale-110"
            aria-label="Cerrar galeria"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 rounded-full bg-card/20 backdrop-blur-sm px-3 py-1 text-xs text-card font-medium">
            {lightboxIndex + 1} / {images.length}
          </div>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex - 1)
              }}
              className="absolute left-4 rounded-full bg-card/20 hover:bg-card/30 p-2.5 text-card transition-all hover:scale-110"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {lightboxIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex + 1)
              }}
              className="absolute right-4 rounded-full bg-card/20 hover:bg-card/30 p-2.5 text-card transition-all hover:scale-110"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} - Imagen ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
