"use client"

export const dynamic = "force-dynamic"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Lock, Sparkles, Star, Heart, User } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("defaziosilvia@gmail.com")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const nextPath = searchParams.get("next") || "/admin"

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok || !result.ok) {
        toast.error(result.message || "No se pudo iniciar sesión")
        return
      }

      toast.success("Ingreso correcto")
      router.replace(nextPath)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error inesperado al iniciar sesión"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/10">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-soft animation-delay-500" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#E05A8D]/15 rounded-full blur-3xl animate-pulse-soft animation-delay-300" />

        <div className="absolute top-[15%] right-[20%] animate-float">
          <div className="w-12 h-12 rounded-xl bg-accent/30 rotate-12" />
        </div>
        <div className="absolute top-[25%] left-[15%] animate-float-delay">
          <div className="w-8 h-8 rounded-full bg-primary/25" />
        </div>
        <div className="absolute bottom-[30%] right-[15%] animate-float">
          <Star className="w-10 h-10 text-accent/40 fill-accent/20" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] animate-float-delay animation-delay-200">
          <Heart className="w-8 h-8 text-[#E05A8D]/40 fill-[#E05A8D]/20" />
        </div>
        <div className="absolute top-[60%] right-[25%] animate-bounce-gentle animation-delay-400">
          <div className="w-6 h-6 rounded-lg bg-[#49B889]/30 rotate-45" />
        </div>
        <div className="absolute top-[40%] left-[8%] animate-wiggle">
          <Sparkles className="w-7 h-7 text-accent/50" />
        </div>

        <div className="absolute top-[10%] left-[40%] flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/20" />
          <div className="w-2 h-2 rounded-full bg-primary/10" />
        </div>
        <div className="absolute bottom-[15%] right-[35%] flex gap-2">
          <div className="w-2 h-2 rounded-full bg-accent/30" />
          <div className="w-2 h-2 rounded-full bg-accent/20" />
          <div className="w-2 h-2 rounded-full bg-accent/10" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="p-4 md:p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-6">
          <div className="w-full max-w-md animate-scale-in">
            <div className="text-center mb-8 animate-fade-in-down">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground mb-4 shadow-lg shadow-primary/25">
                <span className="font-serif text-2xl font-bold">J</span>
              </div>
              <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                Bienvenido
              </h1>
              <p className="text-muted-foreground text-sm">
                Instituto Padre Juan Buron
              </p>
            </div>

            <Card className="border-0 shadow-2xl shadow-primary/10 bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className="h-1.5 bg-linear-to-r from-primary via-accent to-[#E05A8D]" />

              <CardContent className="p-6 md:p-8">
                <form className="space-y-5" onSubmit={handleLogin}>
                  <div className="space-y-2 animate-fade-in-up animation-delay-100">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Usuario
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Usuario"
                        className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 animate-fade-in-up animation-delay-200">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Tu contraseña"
                        className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20 transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                    </div>
                  </div>

                  <div className="animate-fade-in-up animation-delay-400 pt-2">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                      disabled={loading}
                    >
                      {loading ? "Ingresando..." : "Iniciar sesión"}
                    </Button>
                  </div>
                </form>

                <div className="relative my-6 animate-fade-in-up animation-delay-500">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/60" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-card text-xs text-muted-foreground">
                      Solo para personal autorizado
                    </span>
                  </div>
                </div>

                <div className="animate-fade-in-up animation-delay-600">
                  <div className="rounded-xl bg-linear-to-br from-accent/10 to-accent/5 border border-accent/20 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-accent-foreground">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span>Panel de administracion del Jardin</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-in-up animation-delay-700">
              Para ingresar al panel administrativo primero debes iniciar sesión.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
