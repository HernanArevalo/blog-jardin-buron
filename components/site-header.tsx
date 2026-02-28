"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getSalas } from "@/lib/data"

export function SiteHeader() {
  const pathname = usePathname()
  const salas = getSalas()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [salasOpen, setSalasOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border"
          : "bg-card/80 backdrop-blur-md border-b border-transparent"
      )}
    >
      {/* Top accent band */}
      <div className="flex h-1">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-accent" />
        <div className="flex-1 bg-primary/60" />
        <div className="flex-1 bg-accent/60" />
        <div className="flex-1 bg-primary/30" />
      </div>

      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-serif text-xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shadow-primary/20">
            <span>J</span>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-card animate-pulse-soft" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
              Jardin de Infantes
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight">
              Instituto Padre Juan Buron
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              "rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200",
              pathname === "/"
                ? "bg-primary/10 text-primary shadow-sm shadow-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            Inicio
          </Link>
          <div className="relative">
            <button
              onClick={() => setSalasOpen(!salasOpen)}
              onBlur={() => setTimeout(() => setSalasOpen(false), 200)}
              className={cn(
                "flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200",
                pathname.startsWith("/salas")
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Salas
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  salasOpen && "rotate-180"
                )}
              />
            </button>
            {salasOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-2xl animate-fade-in-down">
                {salas.map((sala, i) => (
                  <Link
                    key={sala.id}
                    href={`/salas/${sala.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-secondary transition-all duration-200 group/sala"
                    style={{ animationDelay: `${i * 50}ms` }}
                    onClick={() => setSalasOpen(false)}
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold shrink-0 shadow-sm transition-transform duration-200 group-hover/sala:scale-110"
                      style={{ backgroundColor: sala.color, color: "#fff" }}
                    >
                      {sala.name.split(" ").pop()}
                    </span>
                    <span className="group-hover/sala:translate-x-0.5 transition-transform duration-200">{sala.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden rounded-xl p-2 text-muted-foreground hover:bg-secondary transition-colors"
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1 animate-fade-in-down">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            Inicio
          </Link>
          <p className="px-3 pt-3 pb-1 text-xs font-semibold text-primary uppercase tracking-wider">
            Salas
          </p>
          {salas.map((sala) => (
            <Link
              key={sala.id}
              href={`/salas/${sala.slug}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold shrink-0 shadow-sm"
                style={{ backgroundColor: sala.color, color: "#fff" }}
              >
                {sala.name.split(" ").pop()}
              </span>
              {sala.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
