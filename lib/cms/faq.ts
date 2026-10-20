import { FAQ } from '@/lib/data'
import { LANDING_HERO_BACKGROUNDS } from '@/lib/visual-kit/hakamo'
import {
  metadataDesde,
  POPULATE_PORTADA,
  POPULATE_SECCION,
  resolverFondo,
  resolverPortada,
  resolverSeccion,
  type Fondo,
  type FondoCms,
  type Portada,
  type PortadaCms,
  type Seccion,
  type SeccionCms,
  type Seo,
} from './comun'
import { getPagina } from './strapi'

export interface Pregunta {
  pregunta: string
  respuesta: string
}

export interface GrupoFaq {
  nombre: string
  preguntas: Pregunta[]
}

interface FaqCms {
  seo: Seo
  portada: PortadaCms
  grupos: GrupoFaq[]
  fondoPreguntas: FondoCms
  ayuda: SeccionCms
}

export interface ContenidoFaq {
  portada: Portada
  grupos: GrupoFaq[]
  fondoPreguntas: Fondo
  /** El texto admite `{correo}` y `{telefono}`; los enlaces, `whatsapp`, `telefono` y `correo`. */
  ayuda: Seccion
}

const RESPALDO_SEO = {
  title: 'Preguntas frecuentes — Hakamo',
  description:
    'Respuestas sobre outsourcing, reclutamiento, payroll, cumplimiento laboral, supervisión y seguridad ocupacional de Hakamo.',
}

const fondo = LANDING_HERO_BACKGROUNDS.faq

const RESPALDO_PORTADA = {
  antetitulo: 'FAQ',
  titulo: 'Preguntas\nfrecuentes',
  texto: 'Outsourcing, reclutamiento, payroll, cumplimiento y seguridad ocupacional.',
  fondo: { imagen: fondo.src, alt: fondo.alt, posicion: fondo.objectPosition, tono: 'claro' as const },
}

const RESPALDO_GRUPOS: GrupoFaq[] = [
  { nombre: 'Generales', preguntas: FAQ.map(({ pregunta, respuesta }) => ({ pregunta, respuesta })) },
]

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  grupos: { populate: ['preguntas'] },
  fondoPreguntas: { populate: ['imagen'] },
  ayuda: POPULATE_SECCION,
} as const

const leerFaq = () => getPagina<FaqCms>('pagina-faq', POPULATE)

export async function metadataFaq() {
  const cms = await leerFaq()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoFaq(): Promise<ContenidoFaq> {
  const cms = await leerFaq()
  const grupos = (cms?.grupos ?? []).filter((g) => g.nombre && g.preguntas?.length)
  return {
    portada: resolverPortada(cms?.portada, RESPALDO_PORTADA),
    grupos: grupos.length > 0 ? grupos : RESPALDO_GRUPOS,
    fondoPreguntas: resolverFondo(cms?.fondoPreguntas, { tono: 'claro' }),
    ayuda: resolverSeccion(
      cms?.ayuda,
      {
        antetitulo: 'Más ayuda',
        titulo: '¿No está tu respuesta?',
        texto: 'Escríbenos a {correo} o por WhatsApp al {telefono}. Respondemos en menos de 24 horas.',
        boton: { texto: 'Contactar', url: '/contacto' },
        botonSecundario: { texto: 'WhatsApp', url: 'whatsapp' },
      },
      'claro',
    ),
  }
}
