import type { StrapiMedia } from '@/types'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

/** Segundos que el sitio guarda una página antes de volver a pedirla al CMS. */
export const REVALIDAR_SEGUNDOS = 60

type Populate = '*' | readonly string[] | { [campo: string]: boolean | { populate: Populate } }

/** Convierte `{ a: { populate: ['b'] } }` en `populate[a][populate][0]=b`, como lo espera Strapi 5. */
function populateQuery(populate: Populate, prefix = 'populate'): string[] {
  if (populate === '*') return [`${prefix}=*`]
  if (Array.isArray(populate)) return populate.map((campo, i) => `${prefix}[${i}]=${encodeURIComponent(campo)}`)
  return Object.entries(populate).flatMap(([campo, valor]) =>
    typeof valor === 'boolean'
      ? valor
        ? [`${prefix}[${campo}]=true`]
        : []
      : populateQuery(valor.populate, `${prefix}[${campo}][populate]`),
  )
}

/**
 * Lee una página (single type) publicada. Devuelve `null` si el CMS no está
 * configurado, no responde o la página no existe; la página usa entonces su texto de respaldo.
 */
export async function getPagina<T>(uid: string, populate: Populate): Promise<Partial<T> | null> {
  if (!STRAPI_URL) return null
  try {
    const res = await fetch(`${STRAPI_URL}/api/${uid}?${populateQuery(populate).join('&')}`, {
      next: { revalidate: REVALIDAR_SEGUNDOS, tags: [uid] },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.data ?? null) as Partial<T> | null
  } catch {
    return null
  }
}

/** Lee una colección publicada. Devuelve `null` si falla. */
export async function getColeccion<T>(uid: string, query = ''): Promise<T[] | null> {
  if (!STRAPI_URL) return null
  try {
    const res = await fetch(`${STRAPI_URL}/api/${uid}${query ? `?${query}` : ''}`, {
      next: { revalidate: REVALIDAR_SEGUNDOS, tags: [uid] },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.data ?? null) as T[] | null
  } catch {
    return null
  }
}

/** URL absoluta de un archivo del CMS (Cloudinary ya viene absoluta; la carga local, no). */
export function mediaUrl(media: StrapiMedia | null | undefined): string | null {
  if (!media?.url) return null
  return media.url.startsWith('/') ? `${STRAPI_URL}${media.url}` : media.url
}

/** Texto del CMS si tiene contenido; si viene vacío, el de respaldo. */
export function texto(valor: string | null | undefined, respaldo: string): string {
  return valor && valor.trim() ? valor : respaldo
}

/** Lista del CMS si tiene elementos; si viene vacía, la de respaldo. */
export function lista<T>(valor: T[] | null | undefined, respaldo: T[]): T[] {
  return valor && valor.length > 0 ? valor : respaldo
}
