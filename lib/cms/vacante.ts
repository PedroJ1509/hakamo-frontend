import { resolverFondo, type Fondo, type FondoCms } from './comun'
import { getPagina, texto } from './strapi'
import { TEXTOS_FICHA, type TextosFicha } from './vacante-textos'

interface FichaCms {
  textos: Partial<Record<keyof TextosFicha, string | null>>
  fondo: FondoCms
}

export interface ContenidoFicha {
  /** `{correoReclutamiento}` se reemplaza por el correo de la Configuración del sitio. */
  textos: TextosFicha
  fondo: Fondo
}

export async function contenidoFicha(): Promise<ContenidoFicha> {
  const cms = await getPagina<FichaCms>('pagina-vacante', { textos: true, fondo: { populate: ['imagen'] } })
  return {
    textos: Object.fromEntries(
      Object.entries(TEXTOS_FICHA).map(([clave, respaldo]) => [clave, texto(cms?.textos?.[clave as keyof TextosFicha], respaldo)]),
    ) as TextosFicha,
    fondo: resolverFondo(cms?.fondo, { tono: 'oscuro' }),
  }
}
