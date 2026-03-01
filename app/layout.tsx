import type { Metadata, Viewport } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
})

export const metadata: Metadata = {
  title: {
    default: "Jardín de Infantes | Instituto Padre Juan Burón",
    template: "%s | Jardín de Infantes - Instituto Padre Juan Burón",
  },
  description:
    "Blog oficial del Jardín de Infantes del Instituto Padre Juan Burón. Novedades, actividades, comunicados y noticias para las familias.",
  keywords: [
    "Jardín de Infantes",
    "Instituto Padre Juan Burón",
    "Sala de 4",
    "Sala de 5",
    "Comunicados escolares",
    "Actividades escolares",
  ],
  authors: [{ name: "Instituto Padre Juan Burón" }],
  creator: "Instituto Padre Juan Burón",
  metadataBase: new URL("https://jardinburon.vercel.app"),
  openGraph: {
    title: "Jardín de Infantes | Instituto Padre Juan Burón",
    description:
      "Novedades, actividades y comunicados del Jardín de Infantes del Instituto Padre Juan Burón.",
    url: "https://jardinburon.vercel.app",
    siteName: "Jardín - Instituto Padre Juan Burón",
    locale: "es_AR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#5BA4D9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
