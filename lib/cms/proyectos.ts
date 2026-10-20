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

interface ProyectosCms {
  seo: Seo
  portada: PortadaCms
  galeria: SeccionCms
  obras: SeccionCms
  clip: ClipCms
  cierre: SeccionCms
}

interface ProyectoCms {
  titulo: string
  slug?: string | null
  sector?: string | null
  rol?: string | null
  descripcion?: string | null
  imagenes?: StrapiMedia[] | null
  estado?: Estado | null
}

export interface Obra {
  id: string
  titulo: string
  sector: string
  rol: string
  texto: string
  imagen: string
  estado: Estado | null
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

const FOTOS = PROJECT_FIELD_GALLERY.flatMap((m) => (m.type === 'image' ? [m] : []))
const CLIP = PROJECT_FIELD_GALLERY.flatMap((m) => (m.type === 'video' ? [m] : []))[0]

/** Fotos locales de las obras de demostración, por slug. Se usan mientras la obra no tenga imagen en el CMS. */
const IMAGEN_LOCAL: Record<string, string> = Object.fromEntries(PROJECT_FEATURES.map((p) => [p.id, p.imagen]))

const RESPALDO_OBRAS: Obra[] = PROJECT_FEATURES.map((p) => ({
  id: p.id,
  titulo: p.titulo,
  sector: p.sector,
  rol: p.rol,
  texto: p.texto,
  imagen: p.imagen,
  estado: p.estado,
}))

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  galeria: POPULATE_SECCION,
  obras: POPULATE_SECCION,
  clip: { populate: ['video', 'imagen'] },
  cierre: POPULATE_SECCION,
}

const leerProyectos = () => getPagina<ProyectosCms>('pagina-proyectos', POPULATE)

export async function metadataProyectos() {
  const cms = await leerProyectos()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoProyectos(): Promise<ContenidoProyectos> {
  const [cms, obrasCms] = await Promise.all([
    leerProyectos(),
    getColeccion<ProyectoCms>(
      'proyectos',
      'filters[activo][$eq]=true&sort=orden:asc&populate[imagenes]=true&pagination[pageSize]=100',
    ),
  ])

  // La franja usa las fotos del CMS; si faltan, las locales en el mismo orden.
  const galeria = resolverSeccion(
    cms?.galeria,
    { elementos: FOTOS.slice(0, 3).map((f) => ({ titulo: f.alt, imagen: f.src })) },
    'claro',
  )
  galeria.elementos = galeria.elementos.map((e, i) => ({ ...e, imagen: e.imagen ?? FOTOS[i % FOTOS.length].src }))

  const clip = cms?.clip
  const listaObras =
    obrasCms && obrasCms.length > 0
      ? obrasCms.map((o, i) => ({
          id: o.slug || `obra-${i}`,
          titulo: o.titulo,
          sector: o.sector ?? '',
          rol: o.rol ?? '',
          texto: o.descripcion ?? '',
          imagen: mediaUrl(o.imagenes?.[0]) ?? IMAGEN_LOCAL[o.slug ?? ''] ?? fondo.src,
          estado: o.estado ?? null,
        }))
      : RESPALDO_OBRAS

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
    cierre: resolverSeccion(
      cms?.cierre,
      {
        antetitulo: 'Siguiente obra',
        titulo: '¿Su próximo proyecto?',
        texto: 'Armamos el equipo, la nómina y el acompañamiento en campo desde el día uno.',
        boton: { texto: 'Solicitar personal', url: '/empresas/solicitar' },
        botonSecundario: { texto: 'Busco empleo', url: '/empleos' },
      },
      'oscuro',
    ),
    listaObras,
  }
}
