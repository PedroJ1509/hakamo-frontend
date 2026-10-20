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
import { getPagina } from './strapi'

interface ContactoCms {
  seo: Seo
  portada: PortadaCms
  canales: SeccionCms
  formulario: SeccionCms
  ruta: SeccionCms
}

export interface ContenidoContacto {
  portada: Portada
  /** Sin elementos, las tarjetas salen de los datos de contacto de la Configuración del sitio. */
  canales: Seccion
  formulario: Seccion
  /** El texto admite `{direccion}`, que se reemplaza por la dirección de la Configuración del sitio. */
  ruta: Seccion
}

const RESPALDO_SEO = {
  title: 'Contacto — Hakamo',
  description: 'Contáctanos para obtener una cotización o resolver tus dudas. Respondemos en menos de 24 horas.',
}

const fondo = LANDING_HERO_BACKGROUNDS.contact

const RESPALDO_PORTADA = {
  antetitulo: 'Hablemos',
  titulo: 'Hablemos de\nsu proyecto',
  texto: 'Escríbenos o llámanos. Respondemos en menos de 24 horas.',
  botonPrincipal: { texto: 'Escribirnos ahora', url: '#formulario' },
  botonSecundario: { texto: 'Cómo llegar', url: '#ruta' },
  fondo: { imagen: fondo.src, alt: fondo.alt, posicion: fondo.objectPosition, tono: 'claro' as const },
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  canales: POPULATE_SECCION,
  formulario: POPULATE_SECCION,
  ruta: POPULATE_SECCION,
}

const leerContacto = () => getPagina<ContactoCms>('pagina-contacto', POPULATE)

export async function metadataContacto() {
  const cms = await leerContacto()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoContacto(): Promise<ContenidoContacto> {
  const cms = await leerContacto()
  return {
    portada: resolverPortada(cms?.portada, RESPALDO_PORTADA),
    canales: resolverSeccion(cms?.canales, { antetitulo: 'Canales', titulo: 'Cómo contactarnos' }, 'claro'),
    formulario: resolverSeccion(
      cms?.formulario,
      {
        antetitulo: 'Mensaje',
        titulo: 'Cuéntanos tu operación',
        texto: 'Completa el formulario y te respondemos con alcance, tiempos y siguiente paso.',
      },
      'claro',
    ),
    ruta: resolverSeccion(
      cms?.ruta,
      {
        antetitulo: 'Ubicación',
        titulo: 'Cómo llegar',
        texto: 'Hakamo está en {direccion}. El mapa ya muestra el punto. Calcula el tiempo desde tu ubicación o desde una ciudad.',
      },
      'claro',
    ),
  }
}
