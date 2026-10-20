import { cache } from 'react'
import { COMPANY_INFO } from '@/lib/data'
import { EMPRESAS_NAV, TALENTOS_NAV } from '@/lib/visual-kit/hakamo'
import type { NavLink } from '@/lib/visual-kit/types'
import type { StrapiMedia } from '@/types'
import { metadataDesde, resolverFondo, type Boton, type Fondo, type FondoCms, type Seo } from './comun'
import { getPagina, lista, mediaUrl, texto } from './strapi'

interface SitioCms {
  nombre: string
  nombreLegal: string
  logo: StrapiMedia | null
  logoClaro: StrapiMedia | null
  contacto: {
    telefono?: string | null
    telefonoAlt?: string | null
    email?: string | null
    emailReclutamiento?: string | null
    direccion?: string | null
    enlaceMapa?: string | null
    latitud?: number | string | null
    longitud?: number | string | null
  } | null
  redes: Red[]
  menuEmpresas: Boton[]
  botonCabeceraEmpresas: Boton | null
  menuEmpleos: Boton[]
  botonCabeceraEmpleos: Boton | null
  pie: {
    texto?: string | null
    botonEmpresas?: Boton | null
    botonEmpleos?: Boton | null
    textoPrivacidad?: string | null
    fondo?: FondoCms | null
    fondoEmpleos?: FondoCms | null
  } | null
  mostrarWhatsapp: boolean
  seo: Seo
}

export interface Red {
  nombre: string
  texto: string
  url: string
}

export interface Contacto {
  telefono: string
  telefonoAlt: string
  email: string
  emailReclutamiento: string
  direccion: string
  /** Enlace de WhatsApp armado con `telefono`. */
  whatsappUrl: string
  /** Enlace `tel:` del teléfono alterno. */
  telefonoAltUrl: string
  mapaUrl: string
  /** Punto de la oficina en el mapa y destino del cálculo de ruta. */
  latitud: number
  longitud: number
}

/** Configuración global ya resuelta: lo que la cabecera, el pie y las páginas leen. */
export interface Sitio {
  nombre: string
  nombreLegal: string
  logo: string
  /** Versión del logo para fondos oscuros. Si no hay, el sitio invierte los colores del logo normal. */
  logoClaro: string | null
  contacto: Contacto
  redes: Red[]
  menuEmpresas: NavLink[]
  botonCabeceraEmpresas: Boton
  menuEmpleos: NavLink[]
  botonCabeceraEmpleos: Boton
  pie: {
    texto: string
    botonEmpresas: Boton
    botonEmpleos: Boton
    textoPrivacidad: string
    fondo: Fondo
    fondoEmpleos: Fondo
  }
  mostrarWhatsapp: boolean
}

const aNav = (b: Boton): NavLink => ({ href: b.url, label: b.texto })

function boton(cms: Boton | null | undefined, respaldo: Boton): Boton {
  return cms?.texto && cms.url ? cms : respaldo
}

/** Número de WhatsApp en formato internacional. Los números de 10 dígitos de RD llevan el 1 delante. */
function whatsappUrl(telefono: string) {
  const digitos = telefono.replace(/\D/g, '')
  return `https://wa.me/${digitos.length === 10 ? `1${digitos}` : digitos}`
}

function telUrl(telefono: string) {
  const digitos = telefono.replace(/\D/g, '')
  return `tel:+${digitos.length === 10 ? `1${digitos}` : digitos}`
}

/** Strapi devuelve los decimales como texto. */
function numero(valor: number | string | null | undefined, respaldo: number) {
  const n = typeof valor === 'string' ? Number.parseFloat(valor) : valor
  return typeof n === 'number' && Number.isFinite(n) ? n : respaldo
}

const RESPALDO_SEO = {
  title: 'Hakamo | Gestión Humana & Outsourcing',
  description:
    'Impulsamos talentos, fortalecemos empresas. Outsourcing de gestión humana para el sector construcción: reclutamiento, nómina, cumplimiento legal y supervisión de proyectos.',
}

const RESPALDO_REDES: Red[] = [
  { nombre: 'Instagram', texto: 'Instagram @hakamord', url: COMPANY_INFO.social.instagram },
  { nombre: 'LinkedIn', texto: 'LinkedIn · Hakamo', url: COMPANY_INFO.social.linkedin },
]

const FONDO = { populate: ['imagen'] }

const POPULATE = {
  logo: true,
  logoClaro: true,
  contacto: true,
  redes: true,
  menuEmpresas: true,
  botonCabeceraEmpresas: true,
  menuEmpleos: true,
  botonCabeceraEmpleos: true,
  pie: { populate: { botonEmpresas: true, botonEmpleos: true, fondo: FONDO, fondoEmpleos: FONDO } },
  seo: { populate: ['imagenCompartir'] },
} as const

/** Una sola lectura por petición, aunque la pidan el layout y la página. */
const leerSitio = cache(() => getPagina<SitioCms>('configuracion-sitio', POPULATE))

export async function metadataSitio() {
  const cms = await leerSitio()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function getSitio(): Promise<Sitio> {
  return resolverSitio(await leerSitio())
}

/** Arma la configuración a partir de lo que vino del CMS (o de nada), campo por campo. */
export function resolverSitio(cms: Partial<SitioCms> | null): Sitio {
  const c = cms?.contacto
  const telefono = texto(c?.telefono, COMPANY_INFO.telefono)
  const telefonoAlt = texto(c?.telefonoAlt, COMPANY_INFO.telefonoAlt)
  const direccion = texto(c?.direccion, COMPANY_INFO.ubicacion)

  return {
    nombre: texto(cms?.nombre, COMPANY_INFO.name),
    nombreLegal: texto(cms?.nombreLegal, COMPANY_INFO.legalName),
    logo: mediaUrl(cms?.logo) ?? '/logo-azul.png',
    logoClaro: mediaUrl(cms?.logoClaro),
    contacto: {
      telefono,
      telefonoAlt,
      email: texto(c?.email, COMPANY_INFO.email),
      emailReclutamiento: texto(c?.emailReclutamiento, COMPANY_INFO.emailReclutamiento),
      direccion,
      whatsappUrl: whatsappUrl(telefono),
      telefonoAltUrl: telUrl(telefonoAlt),
      latitud: numero(c?.latitud, 19.8469),
      longitud: numero(c?.longitud, -71.6453),
      mapaUrl: texto(c?.enlaceMapa, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`),
    },
    redes: lista(cms?.redes, RESPALDO_REDES),
    menuEmpresas: lista(cms?.menuEmpresas?.map(aNav), EMPRESAS_NAV),
    botonCabeceraEmpresas: boton(cms?.botonCabeceraEmpresas, { texto: 'Busco empleo', url: '/empleos' }),
    menuEmpleos: lista(cms?.menuEmpleos?.map(aNav), TALENTOS_NAV),
    botonCabeceraEmpleos: boton(cms?.botonCabeceraEmpleos, { texto: 'Empresas', url: '/empresas' }),
    pie: {
      texto: texto(cms?.pie?.texto, 'Personal, nómina y cumplimiento para obras y plantas.'),
      botonEmpresas: boton(cms?.pie?.botonEmpresas, { texto: 'Solicitar personal', url: '/empresas/solicitar' }),
      botonEmpleos: boton(cms?.pie?.botonEmpleos, { texto: 'Buscar empleo', url: '/empleos/vacantes' }),
      textoPrivacidad: texto(cms?.pie?.textoPrivacidad, 'Privacidad'),
      fondo: resolverFondo(cms?.pie?.fondo, { tono: 'claro' }),
      fondoEmpleos: resolverFondo(cms?.pie?.fondoEmpleos, { tono: 'oscuro' }),
    },
    mostrarWhatsapp: cms?.mostrarWhatsapp ?? true,
  }
}

/**
 * Atajos para los enlaces escritos en el CMS: `whatsapp`, `telefono` y `correo`
 * se convierten en los datos de contacto de la Configuración del sitio.
 */
export function enlaceSitio(url: string, contacto: Contacto): string {
  const clave = url.trim().toLowerCase()
  if (clave === 'whatsapp') return contacto.whatsappUrl
  if (clave === 'telefono' || clave === 'teléfono') return `tel:${contacto.telefono.replace(/[^\d+]/g, '')}`
  if (clave === 'correo') return `mailto:${contacto.email}`
  return url
}

/**
 * Reemplaza `{correo}`, `{correoReclutamiento}`, `{telefono}` y `{direccion}` en un texto del CMS
 * por los datos de contacto.
 */
export function textoConContacto(texto: string, contacto: Contacto): string {
  return texto
    .replaceAll('{correoReclutamiento}', contacto.emailReclutamiento)
    .replaceAll('{correo}', contacto.email)
    .replaceAll('{telefono}', contacto.telefono)
    .replaceAll('{direccion}', contacto.direccion)
}
