/** Dirección pública del sitio, sin barra final. Se usa en el sitemap, robots.txt y los metadatos. */
export const SITIO_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hakamo.com.do').replace(/\/$/, '')
