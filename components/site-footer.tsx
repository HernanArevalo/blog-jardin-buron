import Link from "next/link"
import { Heart, Mail, MapPin } from "lucide-react"
import { getSalas } from "@/lib/data"

export function SiteFooter() {
  const salas = getSalas()

  return (
    <footer className="relative border-t border-border bg-card mt-16 overflow-hidden">
      {/* Decorative top band */}
      <div className="flex h-1.5">
        {salas.map((sala) => (
          <div key={sala.id} className="flex-1" style={{ backgroundColor: sala.color }} />
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-primary/3 blur-3xl z-0" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Brand */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-serif text-xl font-bold shadow-md shadow-primary/20">
                J
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl text-foreground">
                  Jardín de Infantes
                </span>
                <span className="text-xs text-muted-foreground">
                  Instituto Padre Juan Burón
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-4">
              Nuestro espacio de comunicacion para las familias del jardín.
              Compartimos novedades, actividades y momentos especiales de cada dia.
            </p>
            {/* Mini color palette */}
            <div className="flex gap-1.5 mt-5" aria-hidden="true">
              {salas.map((sala) => (
                <div
                  key={sala.id}
                  className="h-3 w-3 rounded-full shadow-sm"
                  style={{ backgroundColor: sala.color }}
                />
              ))}
            </div>
          </div>

          {/* Salas */}
          <div>
            <h4 className="font-semibold text-sm text-primary mb-4 uppercase tracking-wider">
              Nuestras Salas
            </h4>
            <ul className="space-y-2.5">
              {salas.map((sala) => (
                <li key={sala.id}>
                  <Link
                    href={`/salas/${sala.slug}`}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: sala.color, color: "#fff" }}
                    >
                      {sala.name.split(" ").pop()}
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {sala.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm text-primary mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary/60 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Instituto Padre Juan Burón</p>
                  <p>Córdoba, Argentina</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary/60 shrink-0" />
                <span>info@ipjburon.edu.ar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            <p>
              {new Date().getFullYear()} Instituto Padre Juan Burón - Jardín de Infantes.
            </p>
            <Link href="/admin">
              <p className="underline text-sm">Ingresar</p>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-destructive fill-destructive inline" /> para nuestras familias
          </p>
        </div>
      </div>
    </footer>
  )
}
