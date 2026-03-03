import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Panel de Administracion | Instituto Padre Juan Burón",
  description: "Gestiona publicaciones y contenido del blog del Jardín.",
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/30 text-primary-foreground font-serif text-xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shadow-primary/20">
              <Image src={'/logo.png'} alt="logo" width={24} height={24}/>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base leading-tight text-foreground">
                PANEL ADMIN
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Instituto Padre Juan Burón
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Publicaciones
            </Link>
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Ver Blog
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 lg:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
