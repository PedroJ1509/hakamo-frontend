import Image from 'next/image'
import Link from 'next/link'

export function Logo({
  name,
  compact = false,
  inverted = false,
  className = 'text-ink',
}: {
  name: string
  compact?: boolean
  inverted?: boolean
  className?: string
}) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo-azul.png"
        alt={name}
        width={140}
        height={36}
        className={`h-7 w-auto sm:h-8 ${inverted ? 'brightness-0 invert' : ''}`}
        priority
      />
      {compact ? <span className="sr-only">{name}</span> : null}
    </Link>
  )
}
