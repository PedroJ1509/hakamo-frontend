import { CLIENTES } from '@/lib/data'
import { USAR_DEMO } from '@/lib/demo-vacantes'
import type { Cliente } from '@/types'
import { getColeccion, mediaUrl } from './strapi'

export interface ClienteLogo {
  nombre: string
  /** `null` cuando no hay logo: se muestra el nombre en su lugar. */
  logo: string | null
}

/**
 * Logos a color, para fondos claros. Las siluetas blancas de /clientes/blanco
 * son para la portada oscura.
 */
const LOGOS_COLOR: Record<string, string> = {
  'Energía 2000': '/clientes/energia-2000.png',
  'Lindsayca Group': '/clientes/lindsayca.jpg',
  'TSK Dominicana': '/clientes/tsk.jpg',
  'Grupo Ramos': '/clientes/grupo-ramos.svg',
}

/** Clientes del CMS con su logo; si el CMS no responde, los de respaldo. */
export async function clientesConLogo(): Promise<ClienteLogo[]> {
  const cms = await getColeccion<Cliente>('clientes', 'sort=orden:asc&fields[0]=nombre&populate[logo]=true')
  if (cms && cms.length > 0) {
    return cms.map((c) => ({ nombre: c.nombre, logo: mediaUrl(c.logo) ?? LOGOS_COLOR[c.nombre] ?? null }))
  }
  return CLIENTES.map((c) => ({ nombre: c.nombre, logo: LOGOS_COLOR[c.nombre] ?? null }))
}

/* ───────── Testimonios ─────────
 * Strapi ya guarda un `testimonio` por cliente; hasta ahora ninguna página lo
 * mostraba. Solo se publican los que estén cargados en el CMS.
 */

export interface Testimonio {
  texto: string
  /** Empresa que lo firma (o, en los de ejemplo, un cargo genérico). */
  autor: string
  detalle: string
  logo: string | null
  /** Solo fuera de producción: se marca para que nadie lo tome por real. */
  ejemplo: boolean
}

interface ClienteTestimonioCms {
  nombre: string
  testimonio?: string | null
  sector?: string | null
  logo?: Cliente['logo']
}

/**
 * De ejemplo, para ver el diseño mientras el CMS está vacío. Firmados con un
 * cargo y no con un cliente real: una cita inventada nunca debe atribuirse a
 * una empresa que existe.
 */
const TESTIMONIOS_EJEMPLO: Testimonio[] = [
  {
    texto:
      'Necesitábamos un equipo técnico completo sin frenar la obra. En dos semanas teníamos la primera cuadrilla en campo y la nómina dejó de ser un problema nuestro.',
    autor: 'Gerente de proyecto',
    detalle: 'Generación eléctrica',
    logo: null,
    ejemplo: true,
  },
  {
    texto:
      'Lo que más valoramos es el cumplimiento: cada entrada y salida de personal llegó con su documentación en regla. Cerramos la obra sin contingencias laborales.',
    autor: 'Director de operaciones',
    detalle: 'Construcción e infraestructura',
    logo: null,
    ejemplo: true,
  },
  {
    texto:
      'Abrimos cuatro locales con fecha fija y cada uno tuvo su equipo formado antes de inaugurar. Una sola contraparte para todo, y siempre respondió.',
    autor: 'Gerente de recursos humanos',
    detalle: 'Comercio',
    logo: null,
    ejemplo: true,
  },
]

export async function testimonios(): Promise<Testimonio[]> {
  const cms = await getColeccion<ClienteTestimonioCms>(
    'clientes',
    'filters[testimonio][$notNull]=true&sort=orden:asc&fields[0]=nombre&fields[1]=testimonio&fields[2]=sector&populate[logo]=true',
  )
  const reales = (cms ?? [])
    .filter((c) => c.testimonio && c.testimonio.trim())
    .map((c) => ({
      texto: c.testimonio!.trim(),
      autor: c.nombre,
      detalle: c.sector ?? '',
      logo: mediaUrl(c.logo) ?? LOGOS_COLOR[c.nombre] ?? null,
      ejemplo: false,
    }))
  if (reales.length > 0) return reales
  // En producción, sin testimonios cargados la sección simplemente no aparece.
  return USAR_DEMO ? TESTIMONIOS_EJEMPLO : []
}
