import { cache } from 'react'
import { PROJECT_FEATURES, PROJECT_FIELD_GALLERY } from '@/lib/demo-proyectos'
import { LANDING_HERO_BACKGROUNDS } from '@/lib/visual-kit/hakamo'
import type { StrapiMedia } from '@/types'
import {
  metadataDesde,
  POPULATE_PORTADA,
  POPULATE_SECCION,
  resolverPortada,
  resolverSeccion,
  type Portada,
  type PortadaCms,
  type Seccion,
  type SeccionCms,
  type Seo,
} from './comun'
import { getColeccion, getPagina, mediaUrl, texto } from './strapi'

type Estado = 'en_proceso' | 'completado' | 'destacado'

interface ClipCms {
  mostrar?: boolean | null
  antetitulo?: string | null
  titulo?: string | null
  video?: StrapiMedia | null
  imagen?: StrapiMedia | null
  enlace?: string | null
  textoBoton?: string | null
}

interface FichaCms {
  textoVolver?: string | null
  textoVerProyecto?: string | null
  tituloFicha?: string | null
  tituloAlcance?: string | null
  tituloGaleria?: string | null
  tituloOtros?: string | null
}

interface ProyectosCms {
  seo: Seo
  portada: PortadaCms
  galeria: SeccionCms
  obras: SeccionCms
  clip: ClipCms
  cierre: SeccionCms
  ficha: FichaCms
}

interface ProyectoCms {
  documentId: string
  titulo: string
  slug?: string | null
  sector?: string | null
  rol?: string | null
  cliente?: string | null
  ubicacion?: string | null
  descripcion?: string | null
  contenido?: string | null
  datos?: { valor: string; etiqueta: string }[] | null
  alcance?: { texto: string }[] | null
  imagenes?: StrapiMedia[] | null
  estado?: Estado | null
  fecha?: string | null
}

export interface Obra {
  /** Parte final de la dirección de su página: /proyectos/{id}. */
  id: string
  titulo: string
  sector: string
  rol: string
  texto: string
  imagen: string
  estado: Estado | null
}

/** Todo lo que muestra la página de un proyecto. */
export interface DetalleObra extends Obra {
  cliente: string
  ubicacion: string
  /** Mes y año, ya escritos ("abril de 2026"). */
  fecha: string
  contenido: string
  datos: { valor: string; etiqueta: string }[]
  alcance: string[]
  imagenes: string[]
}

export interface FichaTextos {
  textoVolver: string
  textoVerProyecto: string
  tituloFicha: string
  tituloAlcance: string
  tituloGaleria: string
  tituloOtros: string
}

export interface Clip {
  mostrar: boolean
  antetitulo: string
  titulo: string
  video: string | null
  imagen: string
  enlace: string
  textoBoton: string
}

export interface ContenidoProyectos {
  portada: Portada
  galeria: Seccion
  obras: Seccion
  clip: Clip
  cierre: Seccion
  listaObras: Obra[]
  ficha: FichaTextos
}

export interface ContenidoProyecto {
  obra: DetalleObra
  otras: Obra[]
  ficha: FichaTextos
  cierre: Seccion
}

const RESPALDO_SEO = {
  title: 'Proyectos — Hakamo',
  description:
    'Obras, energía e infraestructura donde Hakamo sostiene el talento en campo. Portafolio y galería de operaciones en República Dominicana.',
}

const fondo = LANDING_HERO_BACKGROUNDS.projects

const RESPALDO_PORTADA = {
  antetitulo: 'Proyectos',
  titulo: 'Obras que sostienen\nla operación',
  texto: 'Construcción, energía e infraestructura. El talento en campo, de Manzanillo a todo el país.',
  botonPrincipal: { texto: 'Ver obras', url: '#obras' },
  botonSecundario: { texto: 'En campo', url: '#en-campo' },
  fondo: { imagen: fondo.src, alt: fondo.alt, posicion: fondo.objectPosition, tono: 'claro' as const },
}

const RESPALDO_CIERRE = {
  antetitulo: 'Siguiente obra',
  titulo: '¿Su próximo proyecto?',
  texto: 'Armamos el equipo, la nómina y el acompañamiento en campo desde el día uno.',
  boton: { texto: 'Solicitar personal', url: '/empresas/solicitar' },
  botonSecundario: { texto: 'Busco empleo', url: '/empleos' },
}

const RESPALDO_FICHA: FichaTextos = {
  textoVolver: 'Todos los proyectos',
  textoVerProyecto: 'Ver proyecto',
  tituloFicha: 'Ficha del proyecto',
  tituloAlcance: 'Qué hicimos',
  tituloGaleria: 'En imágenes',
  tituloOtros: 'Otros proyectos',
}

const FOTOS = PROJECT_FIELD_GALLERY.flatMap((m) => (m.type === 'image' ? [m] : []))
const CLIP = PROJECT_FIELD_GALLERY.flatMap((m) => (m.type === 'video' ? [m] : []))[0]

/** Fotos locales de las obras de demostración, por slug. Se usan mientras la obra no tenga imagen en el CMS. */
const IMAGEN_LOCAL: Record<string, string> = Object.fromEntries(PROJECT_FEATURES.map((p) => [p.id, p.imagen]))

const RESPALDO_OBRAS: DetalleObra[] = PROJECT_FEATURES.map((p) => ({
  id: p.id,
  titulo: p.titulo,
  sector: p.sector,
  rol: p.rol,
  texto: p.texto,
  imagen: p.imagen,
  estado: p.estado,
  cliente: '',
  ubicacion: '',
  fecha: '',
  contenido: '',
  datos: [],
  alcance: [],
  imagenes: [p.imagen, ...FOTOS.map((f) => f.src).filter((src) => src !== p.imagen)],
}))

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  galeria: POPULATE_SECCION,
  obras: POPULATE_SECCION,
  clip: { populate: ['video', 'imagen'] },
  cierre: POPULATE_SECCION,
  ficha: true,
}

const leerProyectos = cache(() => getPagina<ProyectosCms>('pagina-proyectos', POPULATE))

/** "2026-04-17" → "abril de 2026". Al mediodía, para que la zona horaria no la mueva de día. */
function mesYAnio(fecha?: string | null): string {
  if (!fecha) return ''
  const d = new Date(`${fecha}T12:00:00`)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('es-DO', { month: 'long', year: 'numeric' })
}

function resolverFicha(cms?: FichaCms | null): FichaTextos {
  return {
    textoVolver: texto(cms?.textoVolver, RESPALDO_FICHA.textoVolver),
    textoVerProyecto: texto(cms?.textoVerProyecto, RESPALDO_FICHA.textoVerProyecto),
    tituloFicha: texto(cms?.tituloFicha, RESPALDO_FICHA.tituloFicha),
    tituloAlcance: texto(cms?.tituloAlcance, RESPALDO_FICHA.tituloAlcance),
    tituloGaleria: texto(cms?.tituloGaleria, RESPALDO_FICHA.tituloGaleria),
    tituloOtros: texto(cms?.tituloOtros, RESPALDO_FICHA.tituloOtros),
  }
}

function resolverObra(o: ProyectoCms): DetalleObra {
  const id = o.slug || o.documentId
  const imagenes = (o.imagenes ?? []).map((m) => mediaUrl(m)).filter((src): src is string => Boolean(src))
  const imagen = imagenes[0] ?? IMAGEN_LOCAL[id] ?? fondo.src
  return {
    id,
    titulo: o.titulo,
    sector: o.sector ?? '',
    rol: o.rol ?? '',
    texto: o.descripcion ?? '',
    imagen,
    estado: o.estado ?? null,
    cliente: o.cliente ?? '',
    ubicacion: o.ubicacion ?? '',
    fecha: mesYAnio(o.fecha),
    contenido: o.contenido ?? '',
    datos: (o.datos ?? []).filter((d) => d.valor && d.etiqueta),
    alcance: (o.alcance ?? []).map((a) => a.texto).filter(Boolean),
    imagenes: imagenes.length > 0 ? imagenes : [imagen],
  }
}

/**
 * Obras activas del CMS, por orden. Si el CMS no tiene ninguna (o no responde),
 * las de demostración, para que la página nunca quede vacía.
 */
const leerObras = cache(async (): Promise<DetalleObra[]> => {
  const obrasCms = await getColeccion<ProyectoCms>(
    'proyectos',
    'filters[activo][$eq]=true&sort=orden:asc&populate[imagenes]=true&populate[datos]=true&populate[alcance]=true&pagination[pageSize]=100',
  )
  return obrasCms && obrasCms.length > 0 ? obrasCms.map(resolverObra) : RESPALDO_OBRAS
})

/** Lo que muestra el listado de cada obra. */
const resumen = ({ id, titulo, sector, rol, texto, imagen, estado }: DetalleObra): Obra => ({
  id,
  titulo,
  sector,
  rol,
  texto,
  imagen,
  estado,
})

export async function metadataProyectos() {
  const cms = await leerProyectos()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoProyectos(): Promise<ContenidoProyectos> {
  const [cms, obras] = await Promise.all([leerProyectos(), leerObras()])

  // La franja usa las fotos del CMS; si faltan, las locales en el mismo orden.
  const galeria = resolverSeccion(
    cms?.galeria,
    { elementos: FOTOS.slice(0, 3).map((f) => ({ titulo: f.alt, imagen: f.src })) },
    'claro',
  )
  galeria.elementos = galeria.elementos.map((e, i) => ({ ...e, imagen: e.imagen ?? FOTOS[i % FOTOS.length].src }))

  const clip = cms?.clip

  return {
    portada: resolverPortada(cms?.portada, RESPALDO_PORTADA),
    galeria,
    obras: resolverSeccion(cms?.obras, {}, 'oscuro'),
    clip: {
      mostrar: clip?.mostrar ?? true,
      antetitulo: texto(clip?.antetitulo, 'En campo'),
      titulo: texto(clip?.titulo, 'La obra, de cerca'),
      video: mediaUrl(clip?.video),
      imagen: mediaUrl(clip?.imagen) ?? CLIP?.poster ?? fondo.src,
      enlace: texto(clip?.enlace, CLIP?.href ?? 'https://instagram.com/hakamord'),
      textoBoton: texto(clip?.textoBoton, CLIP?.label ?? 'Ver clip'),
    },
    cierre: resolverSeccion(cms?.cierre, RESPALDO_CIERRE, 'oscuro'),
    listaObras: obras.map(resumen),
    ficha: resolverFicha(cms?.ficha),
  }
}

/** Página de un proyecto. `null` si no existe o no está activo. */
export async function contenidoProyecto(id: string): Promise<ContenidoProyecto | null> {
  const [cms, obras] = await Promise.all([leerProyectos(), leerObras()])
  const obra = obras.find((o) => o.id === id)
  if (!obra) return null
  return {
    obra,
    otras: obras.filter((o) => o.id !== id).slice(0, 3).map(resumen),
    ficha: resolverFicha(cms?.ficha),
    cierre: resolverSeccion(cms?.cierre, RESPALDO_CIERRE, 'oscuro'),
  }
}

export async function metadataProyecto(id: string) {
  const obra = (await leerObras()).find((o) => o.id === id)
  if (!obra) return { title: 'Proyecto no encontrado — Hakamo' }
  const description = obra.texto || [obra.sector, obra.rol].filter(Boolean).join(' · ')
  return {
    title: `${obra.titulo} — Proyectos Hakamo`,
    description,
    openGraph: { title: obra.titulo, description, images: [obra.imagen] },
  }
}

/** Direcciones de todas las obras, para el sitemap. */
export async function idsObras(): Promise<string[]> {
  return (await leerObras()).map((o) => o.id)
}
