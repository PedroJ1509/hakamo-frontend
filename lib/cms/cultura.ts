import { ACTIVIDADES_COLABORADORES, AREAS_EMPLEO, FERIA_TRABAJO, FORMACION, PROCESO_CANDIDATOS } from '@/lib/data'
import {
  metadataDesde,
  POPULATE_SECCION,
  resolverFondo,
  resolverSeccion,
  type Fondo,
  type FondoCms,
  type Item,
  type Seccion,
  type SeccionCms,
  type Seo,
} from './comun'
import { getPagina, lista } from './strapi'

const SECCIONES = ['portada', 'proceso', 'areas', 'formacion', 'actividades', 'siguiente'] as const
type NombreSeccion = (typeof SECCIONES)[number]

type CulturaCms = { seo: Seo; diferenciales: { texto: string }[]; fondoDiferenciales: FondoCms } & Record<NombreSeccion, SeccionCms>

export type ContenidoCultura = {
  diferenciales: string[]
  fondoDiferenciales: Fondo
  /** Párrafos destacados de Formación (elementos con texto). */
  formacionTextos: Item[]
  /** Fotos de Formación (elementos sin texto), con foto local si no se subió una. */
  formacionFotos: Item[]
} & Record<NombreSeccion, Seccion>

const RESPALDO_SEO = {
  title: 'Cultura — Hakamo',
  description: 'Cómo es trabajar con Hakamo: proceso, áreas, formación, vida laboral y cuidado al colaborador.',
}

const FOTOS_FORMACION = ['/visual-kit/heroes/services-rrhh.jpg', '/visual-kit/contact/meeting.jpg']
const FOTOS_ACTIVIDADES = [
  '/visual-kit/heroes/services-rrhh.jpg',
  '/visual-kit/contact/lobby.jpg',
  '/visual-kit/heroes/about-rrhh.jpg',
  '/visual-kit/heroes/job-detail-rrhh.jpg',
  '/visual-kit/heroes/cv-seeker.jpg',
]

const RESPALDO: Record<NombreSeccion, Parameters<typeof resolverSeccion>[1]> = {
  portada: {
    antetitulo: 'Cultura',
    titulo: 'Cómo es trabajar con Hakamo.',
    texto: 'Contrato, inducción, seguridad y vida laboral en los proyectos donde colocamos talento.',
    boton: { texto: 'Ver el proceso', url: '#proceso' },
    botonSecundario: { texto: 'Vacantes abiertas', url: '/empleos/vacantes' },
    elementos: [
      { etiqueta: 'Contrato', titulo: 'Nómina y beneficios a cargo de Hakamo' },
      { etiqueta: 'Inducción', titulo: 'Acompañamiento al entrar al proyecto' },
      { etiqueta: 'Campo', titulo: 'Construcción, energía e industria en RD' },
    ],
  },
  proceso: {
    titulo: 'Del registro al proyecto',
    texto: 'Cuatro pasos, sin letra chica.',
    elementos: PROCESO_CANDIDATOS.map((p) => ({ etiqueta: p.paso, titulo: p.titulo, subtitulo: p.subtitulo, texto: p.descripcion })),
  },
  areas: {
    titulo: 'Áreas donde colocamos talento',
    texto: 'Indica tu área al dejar el perfil para priorizar vacantes afines.',
    elementos: AREAS_EMPLEO.filter((a) => a !== 'Otro').map((titulo) => ({ titulo })),
  },
  formacion: {
    titulo: FORMACION.titulo,
    texto: FORMACION.texto,
    elementos: [
      { titulo: FERIA_TRABAJO.titulo, texto: FERIA_TRABAJO.texto },
      { titulo: 'Formación en campo' },
      { titulo: 'Capacitación de equipo' },
    ],
  },
  actividades: {
    titulo: 'Actividades y cuidado al colaborador',
    elementos: ACTIVIDADES_COLABORADORES.map((a) => ({
      titulo: a.titulo,
      texto:
        a.titulo === 'Empleado seguro'
          ? 'Entornos conformes a la normativa SSO en cada proyecto.'
          : a.titulo === 'Torneo de dominó'
            ? 'Convivencia y reconocimiento entre colaboradores.'
            : a.texto,
    })),
  },
  siguiente: {
    titulo: 'Siguiente paso',
    texto: 'Para postularte deja tu perfil. Para puestos abiertos, entra a Vacantes.',
    boton: { texto: 'Ir a tu perfil', url: '/empleos#tu-cv' },
    botonSecundario: { texto: 'Ver vacantes', url: '/empleos/vacantes' },
  },
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  diferenciales: true,
  fondoDiferenciales: { populate: ['imagen'] },
  ...Object.fromEntries(SECCIONES.map((s) => [s, POPULATE_SECCION])),
}

const leerCultura = () => getPagina<CulturaCms>('pagina-cultura', POPULATE)

export async function metadataCultura() {
  const cms = await leerCultura()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoCultura(): Promise<ContenidoCultura> {
  const cms = await leerCultura()
  const secciones = Object.fromEntries(
    SECCIONES.map((s) => [s, resolverSeccion(cms?.[s], RESPALDO[s], 'oscuro')]),
  ) as Record<NombreSeccion, Seccion>

  secciones.actividades.elementos = secciones.actividades.elementos.map((e, i) => ({
    ...e,
    imagen: e.imagen ?? FOTOS_ACTIVIDADES[i % FOTOS_ACTIVIDADES.length],
  }))
  const fotos = secciones.formacion.elementos.filter((e) => !e.texto)

  return {
    ...secciones,
    diferenciales: lista(cms?.diferenciales?.map((d) => d.texto).filter(Boolean), [
      'Contrato, nómina y beneficios a cargo de Hakamo',
      'Inducción y acompañamiento al integrar el proyecto',
      'Operamos con empresas de construcción, energía e industria en RD',
      'Participamos en ferias con el Ministerio de Trabajo',
    ]),
    fondoDiferenciales: resolverFondo(cms?.fondoDiferenciales, { tono: 'claro' }),
    formacionTextos: secciones.formacion.elementos.filter((e) => e.texto),
    formacionFotos: fotos.map((e, i) => ({ ...e, imagen: e.imagen ?? FOTOS_FORMACION[i % FOTOS_FORMACION.length] })),
  }
}
