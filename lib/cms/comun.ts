import type { Metadata } from 'next'
import type { StrapiMedia } from '@/types'
import { mediaUrl, texto } from './strapi'

export interface Boton {
  texto: string
  url: string
}

export interface Dato {
  valor: string
  etiqueta: string
}

export interface Seo {
  metaTitulo?: string | null
  metaDescripcion?: string | null
  imagenCompartir?: StrapiMedia | null
}

export interface FondoCms {
  imagen?: StrapiMedia | null
  textoAlternativo?: string | null
  posicion?: string | null
  color?: string | null
  colorCapa?: string | null
  opacidadCapa?: number | null
  tonoTexto?: 'oscuro' | 'claro' | null
}

/** Fondo ya resuelto: lo que la sección pinta. */
export interface Fondo {
  imagen: string | null
  esVideo: boolean
  alt: string
  posicion: string
  color: string | null
  colorCapa: string | null
  opacidadCapa: number
  /** Color del texto encima: `claro` sobre fondos oscuros, `oscuro` sobre fondos claros. */
  tono: 'oscuro' | 'claro'
}

/**
 * Mezcla el fondo del CMS con el de respaldo, campo por campo.
 * Una imagen subida en el CMS reemplaza la local; un color sin imagen deja la sección en color plano.
 */
export function resolverFondo(cms: FondoCms | null | undefined, respaldo: Partial<Fondo>): Fondo {
  const imagenCms = mediaUrl(cms?.imagen)
  return {
    imagen: imagenCms ?? (cms?.color ? null : (respaldo.imagen ?? null)),
    esVideo: Boolean(cms?.imagen?.url && /\.(mp4|webm|mov)$/i.test(cms.imagen.url)),
    alt: texto(cms?.textoAlternativo, respaldo.alt ?? ''),
    posicion: texto(cms?.posicion, respaldo.posicion ?? '50% 50%'),
    color: cms?.color || respaldo.color || null,
    colorCapa: cms?.colorCapa || respaldo.colorCapa || null,
    opacidadCapa: cms?.opacidadCapa ?? respaldo.opacidadCapa ?? 0,
    tono: cms?.tonoTexto ?? respaldo.tono ?? 'oscuro',
  }
}

/** Metadata de Next a partir del SEO del CMS, con respaldo. */
export function metadataDesde(seo: Seo | null | undefined, respaldo: { title: string; description: string }): Metadata {
  const title = texto(seo?.metaTitulo, respaldo.title)
  const description = texto(seo?.metaDescripcion, respaldo.description)
  const imagen = mediaUrl(seo?.imagenCompartir)
  return {
    title,
    description,
    openGraph: { title, description, ...(imagen ? { images: [imagen] } : {}) },
  }
}

export interface PortadaCms {
  antetitulo?: string | null
  titulo?: string | null
  texto?: string | null
  botonPrincipal?: Boton | null
  botonSecundario?: Boton | null
  fondo?: FondoCms | null
}

/** Primera sección de una página, ya resuelta. Un botón con texto vacío no se muestra. */
export interface Portada {
  antetitulo: string
  titulo: string
  texto: string
  botonPrincipal: Boton | null
  botonSecundario: Boton | null
  fondo: Fondo
}

function boton(cms: Boton | null | undefined, respaldo: Boton | null | undefined): Boton | null {
  if (cms?.texto && cms.url) return cms
  return respaldo ?? null
}

/** Botón de un bloque que existe en el CMS: si está vacío, no se muestra (no vuelve el de respaldo). */
function botonCms(cms: Boton | null | undefined): Boton | null {
  return cms?.texto && cms.url ? cms : null
}

/**
 * Texto opcional de un bloque. Si el bloque existe en el CMS se respeta tal cual, incluso vacío,
 * para que borrar un texto en el panel lo quite del sitio. El respaldo solo cubre un bloque que no llegó.
 */
function opcional(existe: boolean, valor: string | null | undefined, respaldo: string): string {
  return existe ? (valor ?? '') : respaldo
}

export function resolverPortada(
  cms: PortadaCms | null | undefined,
  respaldo: Omit<Portada, 'fondo' | 'botonPrincipal' | 'botonSecundario'> & {
    botonPrincipal?: Boton
    botonSecundario?: Boton
    fondo: Partial<Fondo>
  },
): Portada {
  const existe = cms != null
  return {
    antetitulo: opcional(existe, cms?.antetitulo, respaldo.antetitulo),
    titulo: texto(cms?.titulo, respaldo.titulo),
    texto: opcional(existe, cms?.texto, respaldo.texto),
    botonPrincipal: existe ? botonCms(cms.botonPrincipal) : boton(null, respaldo.botonPrincipal),
    botonSecundario: existe ? botonCms(cms.botonSecundario) : boton(null, respaldo.botonSecundario),
    fondo: resolverFondo(cms?.fondo, respaldo.fondo),
  }
}

/**
 * Parte un título en líneas: por saltos de línea si los tiene;
 * si no, después de la primera coma («Impulsamos talentos, fortalecemos empresas»).
 */
export function lineasTitulo(titulo: string): string[] {
  if (titulo.includes('\n')) return titulo.split('\n').map((l) => l.trim()).filter(Boolean)
  const index = titulo.indexOf(',')
  if (index === -1) return [titulo]
  return [titulo.slice(0, index + 1), titulo.slice(index + 1).trim()]
}

export interface ItemCms {
  etiqueta?: string | null
  titulo?: string | null
  subtitulo?: string | null
  texto?: string | null
  imagen?: StrapiMedia | null
  enlace?: string | null
}

export interface Item {
  etiqueta: string
  titulo: string
  subtitulo: string
  texto: string
  imagen: string | null
  enlace: string | null
}

export interface SeccionCms {
  mostrar?: boolean | null
  antetitulo?: string | null
  titulo?: string | null
  texto?: string | null
  elementos?: ItemCms[] | null
  boton?: Boton | null
  botonSecundario?: Boton | null
  fondo?: FondoCms | null
}

/** Bloque de página ya resuelto. `mostrar: false` oculta la sección entera. */
export interface Seccion {
  mostrar: boolean
  antetitulo: string
  titulo: string
  texto: string
  elementos: Item[]
  boton: Boton | null
  botonSecundario: Boton | null
  fondo: Fondo
}

export type SeccionRespaldo = {
  antetitulo?: string
  titulo?: string
  texto?: string
  elementos?: Partial<Item>[]
  boton?: Boton
  botonSecundario?: Boton
}

function item(i: Partial<Item> | ItemCms): Item {
  return {
    etiqueta: i.etiqueta ?? '',
    titulo: i.titulo ?? '',
    subtitulo: i.subtitulo ?? '',
    texto: i.texto ?? '',
    imagen: typeof i.imagen === 'string' ? i.imagen : mediaUrl(i.imagen as StrapiMedia | null | undefined),
    enlace: i.enlace ?? null,
  }
}

/**
 * Mezcla una sección del CMS con su respaldo. `tono` es el del diseño original
 * (`claro` en secciones oscuras), y se usa mientras no se elija otro en el fondo.
 */
export function resolverSeccion(cms: SeccionCms | null | undefined, respaldo: SeccionRespaldo, tono: Fondo['tono']): Seccion {
  const existe = cms != null
  return {
    mostrar: cms?.mostrar ?? true,
    antetitulo: opcional(existe, cms?.antetitulo, respaldo.antetitulo ?? ''),
    titulo: texto(cms?.titulo, respaldo.titulo ?? ''),
    texto: opcional(existe, cms?.texto, respaldo.texto ?? ''),
    elementos: (cms?.elementos && cms.elementos.length > 0 ? cms.elementos : (respaldo.elementos ?? [])).map(item),
    boton: existe ? botonCms(cms.boton) : (respaldo.boton ?? null),
    botonSecundario: existe ? botonCms(cms.botonSecundario) : (respaldo.botonSecundario ?? null),
    fondo: resolverFondo(cms?.fondo, { tono }),
  }
}

/** Populate de Strapi para un componente Sección. */
export const POPULATE_SECCION = {
  populate: { elementos: { populate: ['imagen'] }, boton: true, botonSecundario: true, fondo: { populate: ['imagen'] } },
} as const

/** Populate de Strapi para un componente Portada. */
export const POPULATE_PORTADA = {
  populate: { botonPrincipal: true, botonSecundario: true, fondo: { populate: ['imagen'] } },
} as const
