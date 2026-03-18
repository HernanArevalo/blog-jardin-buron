import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import { logoutAction } from "@/actions/auth/logout"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Panel de Administracion | Instituto Padre Juan Burón",
  description: "Gestiona publicaciones y contenido del blog del Jardín.",
  robots: "noindex, nofollow",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/30 text-primary-foreground font-serif text-xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shadow-primary/20">
              <Image src="/logo.png" alt="logo" width={24} height={24} />
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
          <div className="flex items-center gap-2">
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
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 lg:px-6 py-8">{children}</main>
    </div>
  )
}
