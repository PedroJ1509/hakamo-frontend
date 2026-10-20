'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSitio } from '@/app/components/sitio-context'

/** Logo de la Configuración del sitio. Sobre fondo oscuro usa el logo claro, o invierte el normal si no hay. */
export function Logo({
  name,
  compact = false,
  inverted = false,
  href = '/',
  className = 'text-ink',
}: {
  name?: string
  compact?: boolean
  inverted?: boolean
  href?: string
  className?: string
}) {
  const sitio = useSitio()
  const nombre = name ?? sitio.nombre
  const claro = inverted && sitio.logoClaro
  const src = claro ? sitio.logoClaro! : sitio.logo

  return (
    <Link href={href} className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={src}
        alt={nombre}
        width={140}
        height={36}
        unoptimized={!src.startsWith('/')}
        className={`h-7 w-auto sm:h-8 ${inverted && !claro ? 'brightness-0 invert' : ''}`}
        priority
      />
      {compact ? <span className="sr-only">{nombre}</span> : null}
    </Link>
  )
}
