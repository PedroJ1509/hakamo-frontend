import Image from 'next/image'
import { StrapiMedia } from '@/types'

interface Props {
  media: StrapiMedia | null
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function StrapiImage({
  media,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false
}: Props) {
  if (!media) return null

  const url = media.url.startsWith('/')
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`
    : media.url

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}