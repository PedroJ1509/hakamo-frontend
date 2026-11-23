/**
 * Taxonomía que une /servicios, las obras y el historial.
 *
 * Los textos de sector y rol de cada obra son libres (vienen del CMS), así que
 * la pertenencia se decide por patrón y no por igualdad exacta. Una obra puede
 * caer en varios sectores: "Energía y mantenimiento" cuenta en los dos.
 */

export interface Sector {
  slug: string
  nombre: string
  /** Se aplica sobre texto ya normalizado: minúsculas y sin tildes. */
  patron: RegExp
}

export const SECTORES_OBRA: Sector[] = [
  { slug: 'construccion', nombre: 'Construcción', patron: /construcci/ },
  { slug: 'plantas-industriales', nombre: 'Plantas industriales', patron: /industri|\bplantas?\b/ },
  { slug: 'infraestructura', nombre: 'Infraestructura', patron: /infraestructura|obras? civil/ },
  { slug: 'energia', nombre: 'Energía y proyectos técnicos', patron: /energi|electric/ },
  { slug: 'comercial', nombre: 'Empresas comerciales', patron: /comerci|retail|tienda|showroom|hotel|turismo/ },
  { slug: 'mantenimiento-hse', nombre: 'Mantenimiento y HSE', patron: /mantenimiento|\bhse\b|seguridad/ },
]

/** Minúsculas y sin tildes, para comparar textos escritos a mano. */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

/** Sectores de una obra, según su sector, título y rol (no su contenido largo). */
export function sectoresDeObra(obra: { sector?: string; titulo?: string; rol?: string }): string[] {
  const texto = normalizar([obra.sector, obra.titulo, obra.rol].filter(Boolean).join(' '))
  return SECTORES_OBRA.filter((s) => s.patron.test(texto)).map((s) => s.slug)
}

/**
 * Sector que corresponde a un título de la lista de /servicios. Primero por
 * nombre exacto; si el CMS lo reescribió, por patrón.
 */
export function sectorDeTitulo(titulo: string): Sector | undefined {
  const t = normalizar(titulo).trim()
  return SECTORES_OBRA.find((s) => normalizar(s.nombre) === t) ?? SECTORES_OBRA.find((s) => s.patron.test(t))
}

export function sectorPorSlug(slug: string | null | undefined): Sector | undefined {
  return slug ? SECTORES_OBRA.find((s) => s.slug === slug) : undefined
}

/** El orden importa: gana el primer patrón que coincide con el rol. */
const SERVICIO_POR_ROL: [RegExp, string][] = [
  [/outsourcing/, 'outsourcing-personal'],
  [/reclutamiento|seleccion/, 'reclutamiento-especializado'],
  [/payroll|nomina|\btss\b/, 'payroll-nomina'],
  [/cumplimiento|documental/, 'cumplimiento-laboral'],
  [/supervision/, 'supervision-proyectos'],
  [/seguridad|\bhse\b|salud/, 'seguridad-salud-ocupacional'],
  [/personal|tecnico|cuadrilla|mantenimiento|dotacion/, 'outsourcing-personal'],
]

/** Servicio del catálogo que describe el rol de Hakamo en una obra. */
export function servicioDeRol(rol: string | null | undefined): string | null {
  if (!rol) return null
  const texto = normalizar(rol)
  return SERVICIO_POR_ROL.find(([patron]) => patron.test(texto))?.[1] ?? null
}

/** Ancla de un servicio dentro de /servicios. */
export const anclaServicio = (slug: string) => `servicio-${slug}`
