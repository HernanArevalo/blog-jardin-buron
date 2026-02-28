import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel de Administracion | Instituto Padre Juan Buron",
  description: "Gestiona publicaciones y contenido del blog del Jardin.",
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-serif text-base font-bold">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base leading-tight text-foreground">
                Panel Admin
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Instituto Padre Juan Buron
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
