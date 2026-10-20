import { Space_Grotesk, Inter, Geist, Fraunces } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { getSitio, metadataSitio } from '@/lib/cms/sitio'
import { SitioProvider } from '@/app/components/sitio-context'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

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

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const generateMetadata = metadataSitio

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={cn(spaceGrotesk.variable, inter.variable, display.variable, geist.variable, 'h-full antialiased')}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SitioProvider sitio={await getSitio()}>{children}</SitioProvider>
      </body>
    </html>
  )
}
