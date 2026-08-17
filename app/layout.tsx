import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hakamo Outsourcing | Capital Humano para Grandes Proyectos',
  description: 'Empresa dominicana especializada en outsourcing de personal, reclutamiento y gestión de talento humano. Cumplimiento legal garantizado.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={cn(spaceGrotesk.variable, inter.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
