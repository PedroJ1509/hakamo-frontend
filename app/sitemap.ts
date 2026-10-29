import type { MetadataRoute } from 'next'
import { getColeccion } from '@/lib/cms/strapi'
import { SITIO_URL } from '@/lib/sitio-url'

/** Páginas fijas del sitio, con la frecuencia con que suelen cambiar y su peso para los buscadores. */
const PAGINAS: { ruta: string; cambia: 'daily' | 'weekly' | 'monthly' | 'yearly'; prioridad: number }[] = [
  { ruta: '', cambia: 'monthly', prioridad: 1 },
  { ruta: '/empresas', cambia: 'monthly', prioridad: 0.9 },
  { ruta: '/servicios', cambia: 'monthly', prioridad: 0.8 },
  { ruta: '/empresas/solicitar', cambia: 'yearly', prioridad: 0.8 },
  { ruta: '/nosotros', cambia: 'monthly', prioridad: 0.7 },
  { ruta: '/proyectos', cambia: 'monthly', prioridad: 0.7 },
  { ruta: '/equipo', cambia: 'monthly', prioridad: 0.5 },
  { ruta: '/contacto', cambia: 'yearly', prioridad: 0.6 },
  { ruta: '/agendar-visita', cambia: 'yearly', prioridad: 0.5 },
  { ruta: '/como-llegar', cambia: 'yearly', prioridad: 0.4 },
  { ruta: '/faq', cambia: 'monthly', prioridad: 0.5 },
  { ruta: '/empleos', cambia: 'weekly', prioridad: 0.9 },
  { ruta: '/empleos/vacantes', cambia: 'daily', prioridad: 0.9 },
  { ruta: '/empleo', cambia: 'monthly', prioridad: 0.6 },
  { ruta: '/blog', cambia: 'weekly', prioridad: 0.6 },
  { ruta: '/privacidad', cambia: 'yearly', prioridad: 0.2 },
]

type Publicado = { documentId: string; slug?: string; updatedAt?: string }

const fecha = (valor?: string) => (valor ? new Date(valor) : undefined)

/**
 * Lista de páginas para los buscadores. Incluye cada vacante abierta y cada artículo
 * activo del blog, así que lo nuevo que se publica en el panel aparece solo.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vacantes, articulos] = await Promise.all([
    getColeccion<Publicado>('vacantes', 'filters[estado][$eq]=activa&fields[0]=updatedAt&pagination[pageSize]=100'),
    getColeccion<Publicado>('posts', 'filters[activo][$eq]=true&fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100'),
  ])

  return [
    ...PAGINAS.map((p) => ({ url: `${SITIO_URL}${p.ruta}`, changeFrequency: p.cambia, priority: p.prioridad })),
    ...(vacantes ?? []).map((v) => ({
      url: `${SITIO_URL}/empleos/vacantes/${v.documentId}`,
      lastModified: fecha(v.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...(articulos ?? []).filter((a) => a.slug).map((a) => ({
      url: `${SITIO_URL}/blog/${a.slug}`,
      lastModified: fecha(a.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
