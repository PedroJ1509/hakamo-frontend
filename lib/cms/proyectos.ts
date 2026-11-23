import { cache } from 'react'
import { PROJECT_FEATURES, PROJECT_FIELD_GALLERY } from '@/lib/demo-proyectos'
import { USAR_DEMO } from '@/lib/demo-vacantes'
import { SECTORES_OBRA, sectoresDeObra } from '@/lib/sectores'
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
  /** Mes y año ya escritos ("abril de 2026"); vacío si la obra no tiene fecha. */
  fecha: string
  /** Año suelto, para ordenar y agrupar el historial. */
  anio: number | null
  /** Slugs de lib/sectores: enlazan /servicios con el historial filtrado. */
  sectores?: string[]
}

/** Todo lo que muestra la página de un proyecto. */
export interface DetalleObra extends Obra {
  cliente: string
  ubicacion: string
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
  fecha: mesYAnio(p.fecha),
  anio: anioDe(p.fecha),
  cliente: p.cliente,
  ubicacion: p.ubicacion,
  contenido: p.contenido,
  datos: p.datos,
  alcance: p.alcance,
  imagenes:
    p.imagenes && p.imagenes.length > 0
      ? p.imagenes
      : [p.imagen, ...FOTOS.map((f) => f.src).filter((src) => src !== p.imagen)],
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

/** Año de una fecha ISO; `null` si no hay fecha o no es válida. */
function anioDe(fecha?: string | null): number | null {
  if (!fecha) return null
  const anio = Number(fecha.slice(0, 4))
  return Number.isFinite(anio) && anio > 1900 ? anio : null
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
    fecha: mesYAnio(o.fecha),
    anio: anioDe(o.fecha),
    cliente: o.cliente ?? '',
    ubicacion: o.ubicacion ?? '',
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
/**
 * Completa una obra del CMS con la de ejemplo del mismo id: el CMS manda,
 * y lo de ejemplo solo entra donde el campo está vacío.
 */
function completar(obra: DetalleObra, demo: DetalleObra): DetalleObra {
  return {
    ...obra,
    sector: obra.sector || demo.sector,
    rol: obra.rol || demo.rol,
    texto: obra.texto || demo.texto,
    estado: obra.estado ?? demo.estado,
    fecha: obra.fecha || demo.fecha,
    anio: obra.anio ?? demo.anio,
    cliente: obra.cliente || demo.cliente,
    ubicacion: obra.ubicacion || demo.ubicacion,
    contenido: obra.contenido || demo.contenido,
    datos: obra.datos.length > 0 ? obra.datos : demo.datos,
    alcance: obra.alcance.length > 0 ? obra.alcance : demo.alcance,
    imagenes: obra.imagenes.length > 1 ? obra.imagenes : demo.imagenes,
  }
}

const leerObras = cache(async (): Promise<DetalleObra[]> => {
  const obrasCms = await getColeccion<ProyectoCms>(
    'proyectos',
    'filters[activo][$eq]=true&sort=orden:asc&populate[imagenes]=true&populate[datos]=true&populate[alcance]=true&pagination[pageSize]=100',
  )
  if (!obrasCms || obrasCms.length === 0) return RESPALDO_OBRAS

  const delCms = obrasCms.map(resolverObra)
  // En producción solo se publica lo que esté cargado en el CMS: el contenido
  // de ejemplo nunca debe pasar por real en el sitio público.
  if (!USAR_DEMO) return delCms

  const porId = new Map(RESPALDO_OBRAS.map((o) => [o.id, o]))
  const completadas = delCms.map((o) => {
    const demo = porId.get(o.id)
    return demo ? completar(o, demo) : o
  })
  const yaEstan = new Set(delCms.map((o) => o.id))
  return [...completadas, ...RESPALDO_OBRAS.filter((o) => !yaEstan.has(o.id))]
})

/** Lo que muestra el listado de cada obra. */
const resumen = ({ id, titulo, sector, rol, texto, imagen, estado, fecha, anio }: DetalleObra): Obra => ({
  id,
  titulo,
  sector,
  rol,
  texto,
  imagen,
  estado,
  fecha,
  anio,
  sectores: sectoresDeObra({ sector, titulo, rol }),
})

/** Prioridad al mostrar pocas obras: lo destacado, luego lo vivo, luego lo cerrado. */
const PESO_ESTADO: Record<string, number> = { destacado: 0, en_proceso: 1, completado: 2 }

/**
 * Las obras que conviene enseñar fuera de /proyectos: destacadas primero y,
 * a igualdad, las más recientes.
 */
export async function obrasSeleccionadas(cuantas = 3): Promise<Obra[]> {
  const obras = (await leerObras()).map(resumen)
  return obras
    .slice()
    .sort((a, b) => {
      const peso = (PESO_ESTADO[a.estado ?? ''] ?? 3) - (PESO_ESTADO[b.estado ?? ''] ?? 3)
      return peso !== 0 ? peso : (b.anio ?? 0) - (a.anio ?? 0)
    })
    .slice(0, cuantas)
}

/** Cuántas obras hay en cada sector; un sector sin obras no debe enlazar a nada. */
export async function obrasPorSector(): Promise<Record<string, number>> {
  const obras = (await leerObras()).map(resumen)
  return Object.fromEntries(
    SECTORES_OBRA.map((sector) => [sector.slug, obras.filter((o) => o.sectores?.includes(sector.slug)).length]),
  )
}

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

/* ───────── Historial: todas las obras por año ───────── */

export interface GrupoHistorial {
  /** `null` agrupa las obras que todavía no tienen fecha. */
  anio: number | null
  obras: Obra[]
}

export interface ContenidoHistorial {
  antetitulo: string
  titulo: string
  texto: string
  grupos: GrupoHistorial[]
  total: number
  /** Cuántas hay de cada estado, para el resumen de arriba. */
  conteo: { enProceso: number; completados: number; destacados: number }
  ficha: FichaTextos
}

const RESPALDO_HISTORIAL = {
  title: 'Historial de proyectos — Hakamo',
  description:
    'Todas las obras de Hakamo por año: energía, construcción, industria y retail en República Dominicana.',
}

export async function metadataHistorial() {
  return {
    title: RESPALDO_HISTORIAL.title,
    description: RESPALDO_HISTORIAL.description,
    openGraph: { title: RESPALDO_HISTORIAL.title, description: RESPALDO_HISTORIAL.description },
  }
}

export async function contenidoHistorial(): Promise<ContenidoHistorial> {
  const [obras, cms] = await Promise.all([leerObras(), leerProyectos()])

  // Más recientes primero; las que no tienen fecha quedan al final.
  const porGrupo = new Map<number | null, Obra[]>()
  for (const obra of obras) {
    const lista = porGrupo.get(obra.anio) ?? []
    lista.push(resumen(obra))
    porGrupo.set(obra.anio, lista)
  }

  const grupos = [...porGrupo.entries()]
    .map(([anio, obrasDelAnio]) => ({ anio, obras: obrasDelAnio }))
    .sort((a, b) => {
      if (a.anio === null) return 1
      if (b.anio === null) return -1
      return b.anio - a.anio
    })

  return {
    antetitulo: 'Historial',
    titulo: 'Cada obra, en orden',
    texto: 'El recorrido completo de Hakamo en campo, de la más reciente a la primera.',
    grupos,
    total: obras.length,
    conteo: {
      enProceso: obras.filter((o) => o.estado === 'en_proceso').length,
      completados: obras.filter((o) => o.estado === 'completado').length,
      destacados: obras.filter((o) => o.estado === 'destacado').length,
    },
    ficha: resolverFicha(cms?.ficha),
  }
}
