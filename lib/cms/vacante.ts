import type { Metadata } from 'next'
import { getVacantePorId, getVacantes } from '@/lib/api'
import { DEMO_VACANTES, USAR_DEMO } from '@/lib/demo-vacantes'
import { resolverFondo, type Fondo, type FondoCms } from './comun'
import { getPagina, texto } from './strapi'
import { TEXTOS_FICHA, type TextosFicha } from './vacante-textos'

interface FichaCms {
  textos: Partial<Record<keyof TextosFicha, string | null>>
  fondo: FondoCms
}

export interface ContenidoFicha {
  /** `{correoReclutamiento}` se reemplaza por el correo de la Configuración del sitio. */
  textos: TextosFicha
  fondo: Fondo
}

export async function contenidoFicha(): Promise<ContenidoFicha> {
  const cms = await getPagina<FichaCms>('pagina-vacante', { textos: true, fondo: { populate: ['imagen'] } })
  return {
    textos: Object.fromEntries(
      Object.entries(TEXTOS_FICHA).map(([clave, respaldo]) => [clave, texto(cms?.textos?.[clave as keyof TextosFicha], respaldo)]),
    ) as TextosFicha,
    fondo: resolverFondo(cms?.fondo, { tono: 'oscuro' }),
  }
}

/* ───────── Ficha de una vacante, resuelta en el servidor ─────────
 * Antes la ficha se pedía desde el navegador: el HTML salía vacío, sin
 * título propio y una vacante inexistente respondía 200. Ahora se resuelve
 * aquí para que Google y quien comparta el enlace vean el puesto.
 */

export type BloqueTexto = {
  type: string
  children?: BloqueTexto[]
  text?: string
  level?: number
  format?: string
  url?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export interface VacanteFicha {
  documentId: string
  titulo: string
  descripcion: BloqueTexto[] | string | null
  requisitos: BloqueTexto[] | string | null
  ubicacion: string
  modalidad: string
  tipo: string
  salario: string
  fechaCierre: string
  estado?: 'activa' | 'cerrada'
  division: { nombre: string } | null
}

/** La vacante del CMS; si no responde, la de demostración con ese id. */
export async function vacantePorId(documentId: string): Promise<VacanteFicha | null> {
  const demo = USAR_DEMO
    ? ((DEMO_VACANTES.find((v) => v.documentId === documentId) as unknown as VacanteFicha | undefined) ?? null)
    : null
  try {
    const json = await getVacantePorId(documentId)
    return ((json?.data as VacanteFicha | null) ?? null) ?? demo
  } catch {
    return demo
  }
}

/** Direcciones de todas las vacantes, para prepararlas al compilar y para el sitemap. */
export async function idsVacantes(): Promise<string[]> {
  try {
    const json = await getVacantes()
    const ids = ((json?.data ?? []) as { documentId?: string }[])
      .map((v) => v.documentId)
      .filter((id): id is string => Boolean(id))
    if (ids.length > 0) return ids
  } catch {
    // Sin CMS se usan las de demostración (solo fuera de producción).
  }
  return USAR_DEMO ? DEMO_VACANTES.map((v) => v.documentId) : []
}

/** Texto plano de una descripción con formato, para la metadescripción. */
function resumen(valor: VacanteFicha['descripcion'], limite = 155): string {
  const plano =
    typeof valor === 'string'
      ? valor
      : Array.isArray(valor)
        ? valor
            .map(function recorrer(n: BloqueTexto): string {
              return typeof n.text === 'string' ? n.text : (n.children ?? []).map(recorrer).join(' ')
            })
            .join(' ')
        : ''
  const limpio = plano.replace(/\s+/g, ' ').trim()
  return limpio.length > limite ? `${limpio.slice(0, limite - 1).trimEnd()}…` : limpio
}

export async function metadataVacante(documentId: string): Promise<Metadata> {
  const vacante = await vacantePorId(documentId)
  if (!vacante) return { title: 'Vacante no encontrada — Hakamo' }

  const contexto = [vacante.division?.nombre, vacante.ubicacion, vacante.tipo].filter(Boolean).join(' · ')
  const title = `${vacante.titulo}${vacante.ubicacion ? ` en ${vacante.ubicacion}` : ''} — Empleos Hakamo`
  const description = resumen(vacante.descripcion) || `${vacante.titulo}. ${contexto}.`

  return {
    title,
    description,
    openGraph: { title: vacante.titulo, description, type: 'article' },
    // Una vacante cerrada no debe seguir compitiendo en los resultados.
    ...(vacante.estado === 'cerrada' ? { robots: { index: false, follow: true } } : {}),
  }
}
