import { SERVICIOS, STATS } from '@/lib/data'
import { LANDING_HERO_BACKGROUNDS, SITE_PUBLIC } from '@/lib/visual-kit/hakamo'
import type { StrapiMedia } from '@/types'
import {
  metadataDesde,
  resolverFondo,
  resolverPortada,
  type Dato,
  type Fondo,
  type FondoCms,
  type Portada,
  type PortadaCms,
  type Seo,
} from './comun'
import { getPagina, lista, mediaUrl, texto } from './strapi'

interface ImagenExpandibleCms {
  titulo?: string | null
  texto?: string | null
  indicacion?: string | null
  imagen?: StrapiMedia | null
  textoAlternativo?: string | null
}

interface AccesoCms {
  antetitulo?: string | null
  titulo: string
  url: string
  textoEnlace?: string | null
  imagen?: StrapiMedia | null
}

interface EmpresasCms {
  seo: Seo
  portada: PortadaCms
  imagenExpandible: ImagenExpandibleCms
  datos: Dato[]
  fondoDatos: FondoCms
  cinta: { texto: string }[]
  fondoCinta: FondoCms
  accesos: AccesoCms[]
  fondoAccesos: FondoCms
}

export interface Acceso {
  antetitulo: string
  titulo: string
  url: string
  textoEnlace: string
  imagen: string | null
}

export interface ContenidoEmpresas {
  portada: Portada
  imagenExpandible: { titulo: string; texto: string; indicacion: string; imagen: string; alt: string }
  datos: Dato[]
  fondoDatos: Fondo
  cinta: string[]
  fondoCinta: Fondo
  accesos: Acceso[]
  fondoAccesos: Fondo
}

const RESPALDO = {
  seo: {
    title: 'Empresas — Hakamo',
    description:
      'Outsourcing, reclutamiento, payroll y supervisión para construcción e industria. Solicita el personal que tu proyecto necesita.',
  },
  portada: {
    antetitulo: SITE_PUBLIC.name,
    titulo: SITE_PUBLIC.heroTitle,
    texto: SITE_PUBLIC.heroSubtitle,
    botonPrincipal: { texto: SITE_PUBLIC.ctaLabel, url: SITE_PUBLIC.ctaHref },
    botonSecundario: { texto: 'Ver servicios', url: '/servicios' },
    fondo: {
      imagen: LANDING_HERO_BACKGROUNDS.home.src,
      alt: LANDING_HERO_BACKGROUNDS.home.alt,
      posicion: LANDING_HERO_BACKGROUNDS.home.objectPosition,
      tono: 'claro' as const,
    },
  },
  imagenExpandible: {
    titulo: 'Talento',
    texto: 'Soluciones integrales para la gestión empresarial, de la planificación a la ejecución.',
    indicacion: 'Baja para continuar',
    imagen: '/visual-kit/obra.jpg',
    alt: 'Equipo de profesionales de gestión humana',
  },
  datos: STATS.map((s) => ({ valor: s.valor, etiqueta: s.etiqueta })),
  cinta: SERVICIOS.map((s) => s.titulo),
  accesos: [
    { antetitulo: 'Nosotros', titulo: 'Quiénes somos', url: '/nosotros', textoEnlace: 'Ver →', imagen: null },
    { antetitulo: 'Servicios', titulo: 'Seis soluciones', url: '/servicios', textoEnlace: 'Ver →', imagen: null },
    { antetitulo: 'Proyectos', titulo: 'Obras en campo', url: '/proyectos', textoEnlace: 'Ver →', imagen: null },
    { antetitulo: 'Contacto', titulo: 'Hablemos', url: '/contacto', textoEnlace: 'Ver →', imagen: null },
    { antetitulo: 'Solicitar', titulo: 'Solicitar personal', url: '/empresas/solicitar', textoEnlace: 'Ver →', imagen: null },
  ] satisfies Acceso[],
}

const FONDO = { populate: ['imagen'] }

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: { populate: { botonPrincipal: true, botonSecundario: true, fondo: FONDO } },
  imagenExpandible: { populate: ['imagen'] },
  datos: true,
  fondoDatos: FONDO,
  cinta: true,
  fondoCinta: FONDO,
  accesos: { populate: ['imagen'] },
  fondoAccesos: FONDO,
} as const

const leerEmpresas = () => getPagina<EmpresasCms>('pagina-empresas', POPULATE)

export async function metadataEmpresas() {
  const cms = await leerEmpresas()
  return metadataDesde(cms?.seo, RESPALDO.seo)
}

export async function contenidoEmpresas(): Promise<ContenidoEmpresas> {
  const cms = await leerEmpresas()
  const expandible = cms?.imagenExpandible
  const accesosCms = cms?.accesos?.map<Acceso>((a) => ({
    antetitulo: a.antetitulo ?? '',
    titulo: a.titulo,
    url: a.url,
    textoEnlace: texto(a.textoEnlace, 'Ver →'),
    imagen: mediaUrl(a.imagen),
  }))

  return {
    portada: resolverPortada(cms?.portada, RESPALDO.portada),
    imagenExpandible: {
      titulo: texto(expandible?.titulo, RESPALDO.imagenExpandible.titulo),
      texto: texto(expandible?.texto, RESPALDO.imagenExpandible.texto),
      indicacion: texto(expandible?.indicacion, RESPALDO.imagenExpandible.indicacion),
      imagen: mediaUrl(expandible?.imagen) ?? RESPALDO.imagenExpandible.imagen,
      alt: texto(expandible?.textoAlternativo, RESPALDO.imagenExpandible.alt),
    },
    datos: lista(cms?.datos, RESPALDO.datos),
    fondoDatos: resolverFondo(cms?.fondoDatos, {}),
    cinta: lista(cms?.cinta?.map((c) => c.texto), RESPALDO.cinta),
    fondoCinta: resolverFondo(cms?.fondoCinta, {}),
    accesos: lista(accesosCms, RESPALDO.accesos),
    fondoAccesos: resolverFondo(cms?.fondoAccesos, {}),
  }
}
