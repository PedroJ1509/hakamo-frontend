import type { MetadataRoute } from 'next'
import { SITIO_URL } from '@/lib/sitio-url'

/** Los buscadores pueden leer todo el sitio público, menos las rutas internas. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITIO_URL}/sitemap.xml`,
  }
}
