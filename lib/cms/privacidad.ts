import { metadataDesde, resolverFondo, type Boton, type Fondo, type FondoCms, type Seo } from './comun'
import { getPagina, lista, texto } from './strapi'

interface PrivacidadCms {
  seo: Seo
  menu: Boton[]
  antetitulo: string
  titulo: string
  contenido: string
  fondo: FondoCms
}

export interface ContenidoPrivacidad {
  menu: Boton[]
  antetitulo: string
  titulo: string
  /** Markdown. Admite `{correo}`. */
  contenido: string
  fondo: Fondo
}

const RESPALDO_SEO = {
  title: 'Privacidad — Hakamo',
  description: 'Qué datos recoge Hakamo cuando una empresa solicita personal o una persona se postula.',
}

const RESPALDO_CONTENIDO = [
  'Hakamo recoge solo lo que hace falta para conectar una empresa con talento o para responder un mensaje.',
  'Si buscas empleo, guardamos el nombre, el contacto, el CV y la vacante a la que te postulas. Esos datos los usa el equipo de reclutamiento para evaluar tu perfil y, si avanzas, presentarlos a la empresa del puesto.',
  'Si eres empresa, guardamos el nombre de la compañía, el contacto y el perfil que solicitas. Esa información no se publica en el portal de empleos.',
  'No vendemos datos. Puedes pedir ver, corregir o borrar tu información escribiendo a {correo}.',
].join('\n\n')

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  menu: true,
  fondo: { populate: ['imagen'] },
} as const

const leerPrivacidad = () => getPagina<PrivacidadCms>('pagina-privacidad', POPULATE)

export async function metadataPrivacidad() {
  const cms = await leerPrivacidad()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoPrivacidad(): Promise<ContenidoPrivacidad> {
  const cms = await leerPrivacidad()
  return {
    menu: lista(cms?.menu, [
      { texto: 'Empresas', url: '/empresas' },
      { texto: 'Talentos', url: '/empleos' },
    ]),
    antetitulo: texto(cms?.antetitulo, 'Datos personales'),
    titulo: texto(cms?.titulo, 'Privacidad'),
    contenido: texto(cms?.contenido, RESPALDO_CONTENIDO),
    fondo: resolverFondo(cms?.fondo, { tono: 'oscuro' }),
  }
}
