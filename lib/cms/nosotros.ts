import {
  ACTIVIDADES_COLABORADORES,
  CLIENTES,
  EQUIPO,
  FERIA_TRABAJO,
  FORMACION,
  HISTORIA,
  MISION_VISION,
  PILARES,
  QUIENES_SOMOS,
  VALORES,
} from '@/lib/data'
import { LANDING_HERO_BACKGROUNDS } from '@/lib/visual-kit/hakamo'
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
import { getColeccion, getPagina } from './strapi'

const SECCIONES = ['trayectoria', 'misionVision', 'valores', 'pilares', 'equipo', 'formacion', 'actividades', 'clientes'] as const
type NombreSeccion = (typeof SECCIONES)[number]

type NosotrosCms = { seo: Seo; portada: PortadaCms } & Record<NombreSeccion, SeccionCms>

export interface ClienteResumen {
  nombre: string
  sector: string
}

export type ContenidoNosotros = { portada: Portada; listaClientes: ClienteResumen[] } & Record<NombreSeccion, Seccion>

const RESPALDO_SEO = {
  title: 'Nosotros — Hakamo',
  description:
    'Startup dominicana de outsourcing de personal, reclutamiento y gestión de proyectos para el sector construcción. Misión, visión, valores y trayectoria de Hakamo.',
}

const fondo = LANDING_HERO_BACKGROUNDS.about

const RESPALDO_PORTADA = {
  antetitulo: QUIENES_SOMOS.titulo,
  titulo: 'Outsourcing de gestión humana\npara el sector construcción',
  texto: QUIENES_SOMOS.lead,
  botonPrincipal: { texto: 'Ver servicios', url: '/servicios' },
  botonSecundario: { texto: 'Hablemos', url: '/contacto' },
  fondo: { imagen: fondo.src, alt: fondo.alt, posicion: fondo.objectPosition, tono: 'claro' as const },
}

/** Texto de respaldo y tono original (claro = sección oscura) de cada sección. */
const RESPALDO: Record<NombreSeccion, [Parameters<typeof resolverSeccion>[1], Seccion['fondo']['tono']]> = {
  trayectoria: [
    {
      antetitulo: 'Nuestra trayectoria',
      titulo: 'De la obra al talento que la sostiene',
      elementos: HISTORIA.map((h) => ({ etiqueta: h.ano, titulo: h.titulo, texto: h.texto })),
    },
    'oscuro',
  ],
  misionVision: [
    {
      antetitulo: 'Lo que nos mueve',
      titulo: 'Misión y visión',
      elementos: [MISION_VISION.mision, MISION_VISION.vision].map((m) => ({ titulo: m.titulo, texto: m.texto })),
    },
    'claro',
  ],
  valores: [
    {
      antetitulo: 'Nuestros valores',
      titulo: 'Los principios que nos definen',
      texto: 'Siete principios que guían cada contrato, cada obra y cada relación con colaboradores y clientes.',
      elementos: VALORES.map((v) => ({ titulo: v.titulo, texto: v.descripcion })),
    },
    'claro',
  ],
  pilares: [
    {
      antetitulo: 'Dossier · Pilares',
      titulo: 'Su aliado estratégico en gestión humana',
      texto: QUIENES_SOMOS.resultado,
      elementos: PILARES.map((p) => ({ titulo: p.titulo, texto: p.descripcion })),
    },
    'oscuro',
  ],
  equipo: [
    {
      antetitulo: 'Las personas detrás',
      titulo: 'Un equipo conectado alrededor de ti',
      texto:
        'Cada área de Hakamo trabaja sobre el mismo expediente. No te pasan de mano en mano: una sola coordinación acompaña tu proceso de principio a fin.',
      elementos: EQUIPO.map((e) => ({ etiqueta: e.iniciales, titulo: e.cargo, texto: e.area })),
    },
    'claro',
  ],
  formacion: [
    {
      titulo: 'Formación y captación',
      elementos: [FERIA_TRABAJO, FORMACION].map((e) => ({ titulo: e.titulo, texto: e.texto })),
    },
    'claro',
  ],
  actividades: [
    {
      antetitulo: 'Vida en Hakamo',
      titulo: 'Actividades y servicio al colaborador',
      texto:
        'Nos comprometemos a cumplir rigurosamente la normativa vigente en cada proyecto, y a cuidar a las personas que lo hacen posible.',
      elementos: ACTIVIDADES_COLABORADORES.map((e) => ({ titulo: e.titulo, texto: e.texto })),
    },
    'claro',
  ],
  clientes: [
    {
      antetitulo: 'Confianza comprobada',
      titulo: 'Empresas que han confiado en Hakamo',
      texto:
        'Operaciones de construcción, energía, ingeniería y retail nos confían la gestión de su personal. Cada proyecto sostiene su propio equipo, con la misma exigencia.',
      boton: { texto: 'Solicitar personal', url: '/empresas/solicitar' },
    },
    'oscuro',
  ],
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  ...Object.fromEntries(SECCIONES.map((s) => [s, POPULATE_SECCION])),
}

const leerNosotros = () => getPagina<NosotrosCms>('pagina-nosotros', POPULATE)

export async function metadataNosotros() {
  const cms = await leerNosotros()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoNosotros(): Promise<ContenidoNosotros> {
  const [cms, clientes] = await Promise.all([
    leerNosotros(),
    getColeccion<ClienteResumen>('clientes', 'sort=orden:asc&fields[0]=nombre&fields[1]=sector'),
  ])

  const secciones = Object.fromEntries(
    SECCIONES.map((s) => [s, resolverSeccion(cms?.[s], RESPALDO[s][0], RESPALDO[s][1])]),
  ) as Record<NombreSeccion, Seccion>

  return {
    portada: resolverPortada(cms?.portada, RESPALDO_PORTADA),
    ...secciones,
    listaClientes:
      clientes && clientes.length > 0
        ? clientes.map((c) => ({ nombre: c.nombre, sector: c.sector ?? '' }))
        : CLIENTES.map((c) => ({ nombre: c.nombre, sector: c.sector })),
  }
}
