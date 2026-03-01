import Link from "next/link"
import { ArrowRight, BookOpen, Palette, Music, Heart } from "lucide-react"
import { getSalas } from "@/lib/data"

export function HeroBanner() {
  const salas = getSalas()

  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-6 right-[15%] h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-[10%] h-48 w-48 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
        {/* Left: text content */}
        <div className="flex-1 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Ciclo lectivo 2026
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance leading-[1.15]">
            Bienvenidos al blog del{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Jardin</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm z-0" />
            </span>
          </h1>

          <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed animate-fade-in-up animation-delay-200">
            Novedades, actividades y comunicados para las familias del{" "}
            <span className="font-semibold text-foreground">Instituto Padre Juan Burón</span>.
            Mantenete al dia con todo lo que pasa en nuestro jardin.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-8 animate-fade-in-up animation-delay-400">
            {[
              { icon: BookOpen, label: "Actividades", color: "#5BA4D9" },
              { icon: Palette, label: "Arte", color: "#E8724A" },
              { icon: Music, label: "Musica", color: "#9B6DD7" },
              { icon: Heart, label: "Comunidad", color: "#E05A8D" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 group">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}18` }}
                >
                  <item.icon className="h-4 w-4" style={{ color: item.color }} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Salas grid cards */}
        <div className="shrink-0 w-full lg:w-85 animate-fade-in-up animation-delay-300">
          <div className="grid grid-cols-2 gap-3">
            {salas.map((sala, i) => (
              <Link
                key={sala.id}
                href={`/salas/${sala.slug}`}
                className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-scale-in"
                style={{
                  backgroundColor: `${sala.color}12`,
                  animationDelay: `${200 + i * 100}ms`,
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold font-serif mb-2.5 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: sala.color, color: "#fff" }}
                >
                  {sala.name.split(" ").pop()}
                </div>
                <p className="text-sm font-semibold text-foreground leading-tight">{sala.name}</p>
                <ArrowRight
                  className="h-3.5 w-3.5 mt-1.5 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: sala.color }}
                />
                {/* Corner decoration */}
                <div
                  className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
                  style={{ backgroundColor: sala.color }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
