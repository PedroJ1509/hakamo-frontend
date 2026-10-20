import { COMPROMISO_HSE, MARCO_LEGAL, PROCESO_EMPRESAS, SECTORES, SERVICIOS, VALOR_HAKAMO } from '@/lib/data'
import { LANDING_COPY, LANDING_HERO_BACKGROUNDS } from '@/lib/visual-kit/hakamo'
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
import { getColeccion, getPagina, mediaUrl } from './strapi'

const SECCIONES = ['catalogo', 'seguridad', 'valor', 'proceso', 'sectores', 'marcoLegal', 'cierre'] as const
type NombreSeccion = (typeof SECCIONES)[number]

type ServiciosCms = { seo: Seo; portada: PortadaCms } & Record<NombreSeccion, SeccionCms>

interface ServicioCms {
  titulo: string
  slug?: string | null
  descripcion?: string | null
  detalle?: string | null
  etiquetas?: { texto: string }[] | null
  imagen?: StrapiMedia | null
}

/** Un servicio del catálogo, ya resuelto. */
export interface ServicioCatalogo {
  slug: string
  titulo: string
  descripcion: string
  detalle: string
  etiquetas: string[]
  imagen: string | null
}

export type ContenidoServicios = { portada: Portada; servicios: ServicioCatalogo[] } & Record<NombreSeccion, Seccion>

const RESPALDO_SEO = {
  title: 'Servicios — Hakamo',
  description:
    'Outsourcing de personal operativo y técnico, reclutamiento, gestión documental, nómina y supervisión de proyectos para el sector construcción.',
}

const fondo = LANDING_HERO_BACKGROUNDS.services

const RESPALDO_PORTADA = {
  antetitulo: 'Lo que ofrecemos',
  titulo: 'Soluciones para cada\nobra y cada equipo',
  texto: '',
  botonPrincipal: { texto: 'Solicitar personal', url: '/empresas/solicitar' },
  botonSecundario: { texto: 'Hablemos', url: '/contacto' },
  fondo: { imagen: fondo.src, alt: fondo.alt, posicion: fondo.objectPosition, tono: 'claro' as const },
}

const RESPALDO: Record<NombreSeccion, [Parameters<typeof resolverSeccion>[1], Seccion['fondo']['tono']]> = {
  catalogo: [
    {
      antetitulo: 'Catálogo',
      titulo: LANDING_COPY.offeringsTitle,
      texto: 'Selecciona un servicio para ver el detalle',
      boton: { texto: '¿Necesitas algo a medida?', url: '/contacto' },
    },
    'claro',
  ],
  seguridad: [{ antetitulo: 'Seguridad', titulo: COMPROMISO_HSE.titulo, texto: COMPROMISO_HSE.texto }, 'oscuro'],
  valor: [
    {
      antetitulo: '¿Por qué trabajar con Hakamo?',
      titulo: 'Valor para su directiva y su obra',
      elementos: VALOR_HAKAMO.map((v) => ({ titulo: v.titulo, texto: v.descripcion })),
    },
    'oscuro',
  ],
  proceso: [
    {
      antetitulo: 'Cómo trabajamos',
      titulo: 'Un proceso claro, de principio a fin',
      texto: 'Simple, transparente y orientado a resultados desde el primer contacto.',
      elementos: PROCESO_EMPRESAS.map((p) => ({ etiqueta: p.paso, titulo: p.titulo, texto: p.descripcion })),
    },
    'claro',
  ],
  sectores: [
    {
      antetitulo: 'Sectores que servimos',
      titulo: 'Experiencia donde la operación exige más',
      elementos: SECTORES.map((s) => ({ titulo: s.nombre })),
    },
    'claro',
  ],
  marcoLegal: [
    {
      antetitulo: 'Marco legal dominicano',
      titulo: 'Cumplimiento total con la ley dominicana',
      texto:
        'Operamos bajo el Código Laboral (Ley 16-92) y las regulaciones de seguridad social vigentes. Asumimos la responsabilidad patronal.',
      elementos: MARCO_LEGAL.filter((m) => m.titulo !== 'Seguridad y salud ocupacional').map((m) => ({
        titulo: m.titulo,
        texto: m.descripcion,
      })),
    },
    'oscuro',
  ],
  cierre: [
    {
      titulo: 'Garantice el éxito de su obra desde el día uno',
      texto: 'Con personal calificado, sin complicaciones administrativas.',
      boton: { texto: 'Solicitar personal', url: '/empresas/solicitar' },
    },
    'claro',
  ],
}

const RESPALDO_SERVICIOS: ServicioCatalogo[] = SERVICIOS.map((s) => ({
  slug: s.slug,
  titulo: s.titulo,
  descripcion: s.descripcion,
  detalle: 'detalle' in s ? (s.detalle ?? '') : '',
  etiquetas: [...s.tags],
  imagen: null,
}))

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  ...Object.fromEntries(SECCIONES.map((s) => [s, POPULATE_SECCION])),
}

const leerServicios = () => getPagina<ServiciosCms>('pagina-servicios', POPULATE)

export async function metadataServicios() {
  const cms = await leerServicios()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoServicios(): Promise<ContenidoServicios> {
  const [cms, serviciosCms] = await Promise.all([
    leerServicios(),
    getColeccion<ServicioCms>(
      'servicios',
      'filters[activo][$eq]=true&sort=orden:asc&populate[etiquetas]=true&populate[imagen]=true&pagination[pageSize]=100',
    ),
  ])

  const secciones = Object.fromEntries(
    SECCIONES.map((s) => [s, resolverSeccion(cms?.[s], RESPALDO[s][0], RESPALDO[s][1])]),
  ) as Record<NombreSeccion, Seccion>

  const servicios =
    serviciosCms && serviciosCms.length > 0
      ? serviciosCms.map((s, i) => ({
          slug: s.slug || `servicio-${i}`,
          titulo: s.titulo,
          descripcion: s.descripcion ?? '',
          detalle: s.detalle ?? '',
          etiquetas: (s.etiquetas ?? []).map((e) => e.texto).filter(Boolean),
          imagen: mediaUrl(s.imagen),
        }))
      : RESPALDO_SERVICIOS

  return { portada: resolverPortada(cms?.portada, RESPALDO_PORTADA), servicios, ...secciones }
}
