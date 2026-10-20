import { metadataDesde, resolverFondo, type Fondo, type FondoCms, type Seo } from './comun'
import { getPagina, texto } from './strapi'

/** Textos del buscador, filtros, tarjetas y paginación. Las claves son las del componente «Textos del listado». */
export const TEXTOS_VACANTES = {
  buscador: 'Busca por puesto o ciudad',
  borrar: 'Borrar',
  etiquetaArea: 'Área',
  todasLasAreas: 'Todas las áreas',
  buscarArea: 'Buscar área',
  sinAreas: 'Ninguna área coincide',
  limpiarFiltros: 'Limpiar filtros',
  mostrarFiltros: 'Filtrar por ciudad o contrato',
  ocultarFiltros: 'Ocultar ciudad y contrato',
  etiquetaCiudad: 'Ciudad',
  todas: 'Todas',
  etiquetaContrato: 'Contrato',
  cualquierContrato: 'Cualquier contrato',
  etiquetaModalidad: 'Modalidad',
  cualquierModalidad: 'Cualquier modalidad',
  puesto: 'puesto',
  puestos: 'puestos',
  abiertos: 'abiertos',
  verCerradas: 'Ver cerradas',
  ocultarCerradas: 'Ocultar cerradas',
  sinResultadosTitulo: 'Ningún puesto coincide',
  sinResultadosTexto: 'Prueba otra área o ciudad, o limpia los filtros para ver todo lo abierto.',
  cerrada: 'Cerrada',
  verPuesto: 'Ver puesto',
  verDetalle: 'Ver detalle',
  anterior: 'Anterior',
  siguiente: 'Siguiente',
  porPagina: 'Por página',
  todasPorPagina: 'Todas',
  de: 'de',
}

export type TextosVacantes = typeof TEXTOS_VACANTES

interface VacantesCms {
  seo: Seo
  antetitulo: string
  titulo: string
  tituloArea: string
  texto: string
  textoArea: string
  textos: Partial<Record<keyof TextosVacantes, string | null>>
  fondo: FondoCms
}

export interface ContenidoVacantes {
  antetitulo: string
  titulo: string
  /** Admite `{area}`. */
  tituloArea: string
  texto: string
  /** Admite `{area}`. */
  textoArea: string
  textos: TextosVacantes
  fondo: Fondo
}

const RESPALDO_SEO = {
  title: 'Vacantes — Hakamo',
  description: 'Vacantes abiertas de Hakamo por categoría, ciudad y tipo de contrato.',
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  textos: true,
  fondo: { populate: ['imagen'] },
} as const

const leerVacantes = () => getPagina<VacantesCms>('pagina-vacantes', POPULATE)

export async function metadataVacantes() {
  const cms = await leerVacantes()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoVacantes(): Promise<ContenidoVacantes> {
  const cms = await leerVacantes()
  return {
    antetitulo: texto(cms?.antetitulo, 'Empleos'),
    titulo: texto(cms?.titulo, 'Vacantes abiertas'),
    tituloArea: texto(cms?.tituloArea, 'Vacantes de {area}'),
    texto: texto(cms?.texto, 'Elige un área o busca por puesto y ciudad. Los puestos cerrados quedan aparte.'),
    textoArea: texto(cms?.textoArea, 'Puedes cambiar de área o buscar por ciudad.'),
    textos: Object.fromEntries(
      Object.entries(TEXTOS_VACANTES).map(([clave, respaldo]) => [clave, texto(cms?.textos?.[clave as keyof TextosVacantes], respaldo)]),
    ) as TextosVacantes,
    fondo: resolverFondo(cms?.fondo, { tono: 'oscuro' }),
  }
}
