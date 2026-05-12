import Image from 'next/image'
import { StrapiMedia } from '@/types'

interface Props {
  media: StrapiMedia | null
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export default function StrapiImage({
  media,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className,
  priority = false
}: Props) {
  if (!media) return null

  const isExternal = !media.url.startsWith('/')
  const url = isExternal
    ? media.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        className={className}
        priority={priority}
        unoptimized={isExternal}
      />
    )
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={isExternal}
    />
  )
}