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
import { getPagina, lista, texto } from './strapi'

const SECCIONES = ['areas', 'sinVacantes', 'masOportunidades', 'como', 'tuCv'] as const
type NombreSeccion = (typeof SECCIONES)[number]

type EmpleosCms = {
  seo: Seo
  portada: PortadaCms
  textoBuscador: string
  botonBuscar: string
  beneficios: { texto: string }[]
  fondoBeneficios: FondoCms
} & Record<NombreSeccion, SeccionCms>

export type ContenidoEmpleos = {
  portada: Portada
  textoBuscador: string
  botonBuscar: string
  beneficios: string[]
  fondoBeneficios: Fondo
} & Record<NombreSeccion, Seccion>

const RESPALDO_SEO = {
  title: 'Empleos — Hakamo',
  description:
    'Revisa vacantes y deja tu perfil con Hakamo. Crea tu currículum o súbelo gratis. Empleo en República Dominicana.',
}

const RESPALDO_PORTADA = {
  antetitulo: '',
  titulo: 'Tu próxima oportunidad empieza aquí.',
  texto: 'Busca un puesto o deja tu CV. Si hay match, te contactamos.',
  botonSecundario: { texto: '¿No ves tu puesto? Deja tu CV →', url: '#tu-cv' },
  fondo: { tono: 'oscuro' as const },
}

const RESPALDO: Record<NombreSeccion, Parameters<typeof resolverSeccion>[1]> = {
  areas: {
    titulo: 'Elige tu área',
    texto: 'Si ninguna de arriba es la tuya, entra por categoría.',
    boton: { texto: 'Ver todas →', url: '/empleos/vacantes' },
  },
  sinVacantes: {
    antetitulo: 'Vacantes',
    titulo: 'Ahora no hay puestos abiertos',
    texto: 'Deja tu perfil y te avisamos cuando haya uno para ti.',
  },
  masOportunidades: {
    titulo: 'Más oportunidades',
    boton: { texto: 'Ver todas las vacantes →', url: '/empleos/vacantes' },
    botonSecundario: { texto: 'Ver puesto →', url: '#' },
  },
  como: {
    titulo: 'Cómo postularte',
    elementos: [
      { etiqueta: '01', titulo: 'Elige un área', texto: 'O busca por puesto y ciudad.', enlace: '#categorias' },
      { etiqueta: '02', titulo: 'Abre el puesto', texto: 'Postúlate desde la vacante.', enlace: '/empleos/vacantes' },
      { etiqueta: '03', titulo: 'O deja tu CV', texto: 'Si aún no hay match, te avisamos.', enlace: '#tu-cv' },
    ],
  },
  tuCv: {
    titulo: 'Deja tu perfil',
    texto: 'Quedas en nuestra base y te avisamos. También puedes escribir a {correoReclutamiento}.',
    boton: { texto: '¿Dudas? WhatsApp {telefono}', url: 'whatsapp' },
    elementos: [
      { etiqueta: 'Sin CV', titulo: 'Crear mi CV', texto: 'Vamos a armar tu CV juntos' },
      { etiqueta: 'Ya tengo CV', titulo: 'Subir archivo', texto: 'Carga tu CV y déjanos tus datos' },
    ],
  },
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  beneficios: true,
  fondoBeneficios: { populate: ['imagen'] },
  ...Object.fromEntries(SECCIONES.map((s) => [s, POPULATE_SECCION])),
}

const leerEmpleos = () => getPagina<EmpleosCms>('pagina-empleos', POPULATE)

export async function metadataEmpleos() {
  const cms = await leerEmpleos()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoEmpleos(): Promise<ContenidoEmpleos> {
  const cms = await leerEmpleos()
  const secciones = Object.fromEntries(
    SECCIONES.map((s) => [s, resolverSeccion(cms?.[s], RESPALDO[s], 'oscuro')]),
  ) as Record<NombreSeccion, Seccion>

  // «Deja tu perfil» siempre tiene sus dos tarjetas (crear y subir); el CMS cambia sus textos.
  const tarjetas = RESPALDO.tuCv.elementos!
  secciones.tuCv.elementos = tarjetas.map((r, i) => {
    const cmsItem = secciones.tuCv.elementos[i]
    return {
      etiqueta: texto(cmsItem?.etiqueta, r.etiqueta ?? ''),
      titulo: texto(cmsItem?.titulo, r.titulo ?? ''),
      subtitulo: cmsItem?.subtitulo ?? '',
      texto: texto(cmsItem?.texto, r.texto ?? ''),
      imagen: cmsItem?.imagen ?? null,
      enlace: null,
    }
  })

  return {
    portada: resolverPortada(cms?.portada, RESPALDO_PORTADA),
    textoBuscador: texto(cms?.textoBuscador, 'Puesto, área o ciudad'),
    botonBuscar: texto(cms?.botonBuscar, 'Buscar'),
    beneficios: lista(
      cms?.beneficios?.map((b) => b.texto).filter(Boolean),
      ['Gratis', 'Vacantes reales', 'Te ayudamos con el CV', 'Te avisamos'],
    ),
    fondoBeneficios: resolverFondo(cms?.fondoBeneficios, { tono: 'claro' }),
    ...secciones,
  }
}
