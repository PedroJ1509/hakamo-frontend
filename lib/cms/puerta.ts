import { CLIENTES } from '@/lib/data'
import type { Cliente, StrapiMedia } from '@/types'
import { metadataDesde, resolverFondo, type Boton, type Dato, type Fondo, type FondoCms, type Seo } from './comun'
import { getColeccion, getPagina, lista, mediaUrl, texto } from './strapi'

interface OpcionCms {
  etiqueta?: string | null
  titulo?: string | null
  texto?: string | null
  boton?: Boton | null
  colorFondo?: string | null
  imagenFondo?: StrapiMedia | null
}

interface PuertaCms {
  seo: Seo
  fondo: FondoCms
  menu: Boton[]
  antetitulo: string
  titulo: string
  texto: string
  opcionEmpresa: OpcionCms
  opcionEmpleo: OpcionCms
  datos: Dato[]
  tituloClientes: string
  mostrarClientes: boolean
}

export interface OpcionPuerta {
  etiqueta: string
  titulo: string
  texto: string
  boton: Boton
  colorFondo: string
  imagenFondo: string | null
}

export interface ContenidoPuerta {
  fondo: Fondo
  menu: Boton[]
  antetitulo: string
  titulo: string
  texto: string
  opcionEmpresa: OpcionPuerta
  opcionEmpleo: OpcionPuerta
  datos: Dato[]
  tituloClientes: string
  clientes: string[]
}

const RESPALDO = {
  seo: {
    title: 'Hakamo | Empresas y talento',
    description:
      'Hakamo conecta empresas con talento. Elige si buscas personal para tu operación o si buscas empleo.',
  },
  fondo: {
    imagen: '/visual-kit/heroes/home-rrhh.jpg',
    alt: '',
    posicion: '50% 50%',
    color: '#16375C',
    colorCapa: '#0e2744',
    opacidadCapa: 70,
  } satisfies Partial<Fondo>,
  menu: [
    { texto: 'Empresas', url: '/empresas' },
    { texto: 'Empleos', url: '/empleos' },
  ],
  antetitulo: 'Construcción · Industria · Gran escala',
  titulo: '¿Qué quieres hacer?',
  texto: 'Hakamo conecta empresas con talento para proyectos que construyen el país.',
  opcionEmpresa: {
    etiqueta: 'Soy empresa',
    titulo: 'Quiero conocer cómo Hakamo puede ayudarme',
    texto: 'Soluciones de personal, reuniones y más para tu proyecto.',
    boton: { texto: 'Conocer Hakamo', url: '/empresas' },
    colorFondo: '#FFFFFF',
    imagenFondo: null,
  } satisfies OpcionPuerta,
  opcionEmpleo: {
    etiqueta: 'Busco empleo',
    titulo: 'Quiero encontrar mi próxima oportunidad',
    texto: 'Vacantes en construcción, energía y salud e higiene.',
    boton: { texto: 'Ver vacantes', url: '/empleos' },
    colorFondo: '#D7E7F8',
    imagenFondo: null,
  } satisfies OpcionPuerta,
  datos: [
    { valor: '10+', etiqueta: 'años en construcción' },
    { valor: '2019', etiqueta: 'constitución como empresa' },
    { valor: '2021', etiqueta: 'nacimiento del outsourcing' },
    { valor: '100%', etiqueta: 'cumplimiento normativo' },
  ],
  tituloClientes: 'Empresas que confían en Hakamo',
  clientes: CLIENTES.map((c) => c.nombre),
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  fondo: { populate: ['imagen'] },
  menu: true,
  opcionEmpresa: { populate: ['boton', 'imagenFondo'] },
  opcionEmpleo: { populate: ['boton', 'imagenFondo'] },
  datos: true,
} as const

function opcion(cms: OpcionCms | null | undefined, respaldo: OpcionPuerta): OpcionPuerta {
  return {
    etiqueta: texto(cms?.etiqueta, respaldo.etiqueta),
    titulo: texto(cms?.titulo, respaldo.titulo),
    texto: texto(cms?.texto, respaldo.texto),
    boton: {
      texto: texto(cms?.boton?.texto, respaldo.boton.texto),
      url: texto(cms?.boton?.url, respaldo.boton.url),
    },
    colorFondo: texto(cms?.colorFondo, respaldo.colorFondo),
    imagenFondo: mediaUrl(cms?.imagenFondo) ?? respaldo.imagenFondo,
  }
}

const leerPuerta = () => getPagina<PuertaCms>('pagina-puerta', POPULATE)

export async function metadataPuerta() {
  const cms = await leerPuerta()
  return metadataDesde(cms?.seo, RESPALDO.seo)
}

export async function contenidoPuerta(): Promise<ContenidoPuerta> {
  const [cms, clientesCms] = await Promise.all([
    leerPuerta(),
    getColeccion<Cliente>('clientes', 'sort=orden:asc&fields[0]=nombre'),
  ])

  const mostrarClientes = cms?.mostrarClientes ?? true
  return {
    fondo: resolverFondo(cms?.fondo, RESPALDO.fondo),
    menu: lista(cms?.menu, RESPALDO.menu),
    antetitulo: texto(cms?.antetitulo, RESPALDO.antetitulo),
    titulo: texto(cms?.titulo, RESPALDO.titulo),
    texto: texto(cms?.texto, RESPALDO.texto),
    opcionEmpresa: opcion(cms?.opcionEmpresa, RESPALDO.opcionEmpresa),
    opcionEmpleo: opcion(cms?.opcionEmpleo, RESPALDO.opcionEmpleo),
    datos: lista(cms?.datos, RESPALDO.datos),
    tituloClientes: texto(cms?.tituloClientes, RESPALDO.tituloClientes),
    clientes: mostrarClientes ? lista(clientesCms?.map((c) => c.nombre), RESPALDO.clientes) : [],
  }
}
