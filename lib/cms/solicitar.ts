import {
  metadataDesde,
  POPULATE_PORTADA,
  POPULATE_SECCION,
  resolverFondo,
  resolverPortada,
  resolverSeccion,
  type Fondo,
  type FondoCms,
  type ItemCms,
  type Portada,
  type PortadaCms,
  type Seccion,
  type SeccionCms,
  type Seo,
} from './comun'
import { getPagina, texto } from './strapi'

export type Intencion = 'personal' | 'reunion' | 'contactar'

/** Textos del formulario por pasos. Las claves son las del componente «Textos del formulario» de Strapi. */
const TEXTOS = {
  etiquetaNombre: 'Nombre completo',
  ejemploNombre: 'María García',
  etiquetaEmpresa: 'Empresa',
  ejemploEmpresa: 'Opcional',
  etiquetaTelefono: 'Teléfono / WhatsApp',
  ejemploTelefono: '829-000-0000',
  etiquetaCorreo: 'Correo',
  ejemploCorreo: 'tu@empresa.com',
  antetituloPersonal: 'Personal',
  preguntaPersonal: '¿Qué tipo de personal necesitas?',
  antetituloModalidad: 'Modalidad',
  preguntaModalidad: '¿Cómo prefieres la reunión?',
  etiquetaFecha: 'Fecha preferida',
  etiquetaDetalle: 'Cuéntanos el detalle',
  etiquetaMensaje: 'Tu mensaje',
  ejemploDetallePersonal: 'Cargos, cantidad de personas, ubicación de la obra y urgencia.',
  ejemploDetalleReunion: 'De qué quieres hablar y quiénes participan.',
  ejemploMensaje: 'Tu consulta, duda o comentario.',
  antetituloResumen: 'Resumen',
  tituloResumen: 'Todo listo para enviar',
  textoResumen: 'Al confirmar se abre WhatsApp con este texto y tu cliente de correo.',
  botonAtras: 'Atrás',
  botonContinuar: 'Continuar',
  botonEnviar: 'Enviar a WhatsApp y correo',
  botonEnviando: 'Preparando…',
}

export type TextosSolicitar = typeof TEXTOS

interface SolicitarCms {
  seo: Seo
  portada: PortadaCms
  opcionPersonal: ItemCms
  opcionReunion: ItemCms
  opcionContactar: ItemCms
  pasosPersonal: ItemCms[]
  pasosReunion: ItemCms[]
  pasosContactar: ItemCms[]
  tiposPersonal: ItemCms[]
  modalidades: ItemCms[]
  textos: Partial<Record<keyof TextosSolicitar, string | null>>
  fondoFormulario: FondoCms
  listo: SeccionCms
}

export interface Opcion {
  id: Intencion
  index: string
  title: string
  note: string
}

export interface Paso {
  title: string
  hint: string
}

export interface Eleccion {
  value: string
  note: string
}

export interface ContenidoSolicitar {
  portada: Portada
  opciones: Opcion[]
  /** Títulos de los pasos de cada intención. El número de pasos es fijo; el CMS cambia sus textos. */
  pasos: Record<Intencion, Paso[]>
  tiposPersonal: Eleccion[]
  modalidades: Eleccion[]
  textos: TextosSolicitar
  fondoFormulario: Fondo
  listo: Seccion
}

const RESPALDO_SEO = {
  title: 'Solicitar — Hakamo',
  description: 'Solicita personal, una reunión o un mensaje. El formulario cambia según lo que necesitas.',
}

const RESPALDO_PORTADA = {
  antetitulo: 'Solicitar',
  titulo: 'Qué necesitas',
  texto: 'Personal para la obra, una reunión o un mensaje.',
  fondo: {
    imagen: '/visual-kit/contact/meeting.jpg',
    alt: 'Solicitar personal, reunión o contacto con Hakamo',
    posicion: '50% 40%',
    tono: 'claro' as const,
  },
}

const RESPALDO_OPCIONES: Opcion[] = [
  { id: 'personal', index: '01', title: 'Personal', note: 'Equipos para tu obra o proyecto' },
  { id: 'reunion', index: '02', title: 'Reunión', note: 'Presencial, en obra o virtual' },
  { id: 'contactar', index: '03', title: 'Contactar', note: 'Una consulta o un mensaje' },
]

const RESPALDO_PASOS: Record<Intencion, Paso[]> = {
  personal: [
    { title: 'Tus datos', hint: 'Para contactarte' },
    { title: 'El personal', hint: 'Qué perfiles buscas' },
    { title: 'Detalle', hint: 'Obra y urgencia' },
    { title: 'Confirmar', hint: 'WhatsApp y correo' },
  ],
  reunion: [
    { title: 'Tus datos', hint: 'Para contactarte' },
    { title: 'La reunión', hint: 'Cuándo y cómo' },
    { title: 'Detalle', hint: 'De qué hablamos' },
    { title: 'Confirmar', hint: 'WhatsApp y correo' },
  ],
  contactar: [
    { title: 'Tus datos', hint: 'Para responderte' },
    { title: 'Mensaje', hint: 'Qué quieres decirnos' },
    { title: 'Confirmar', hint: 'WhatsApp y correo' },
  ],
}

const RESPALDO_TIPOS: Eleccion[] = [
  { value: 'Outsourcing de personal', note: 'Equipos para obra' },
  { value: 'Reclutamiento', note: 'Perfiles clave' },
  { value: 'Payroll y nómina', note: 'Administración salarial' },
  { value: 'Cumplimiento laboral', note: 'TSS, contratos, DGT3' },
  { value: 'Otro', note: 'Cuéntanos en el detalle' },
]

const RESPALDO_MODALIDADES: Eleccion[] = [
  { value: 'Presencial en Montecristi', note: 'En nuestra base' },
  { value: 'Visita en nuestra operación / obra', note: 'Vamos a tu proyecto' },
  { value: 'Virtual (videollamada)', note: 'Rápida y remota' },
]

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_PORTADA,
  opcionPersonal: true,
  opcionReunion: true,
  opcionContactar: true,
  pasosPersonal: true,
  pasosReunion: true,
  pasosContactar: true,
  tiposPersonal: true,
  modalidades: true,
  textos: true,
  fondoFormulario: { populate: ['imagen'] },
  listo: POPULATE_SECCION,
} as const

const leerSolicitar = () => getPagina<SolicitarCms>('pagina-solicitar', POPULATE)

/** Cada paso conserva su posición: si el CMS trae menos textos, los que faltan salen del respaldo. */
function pasos(cms: ItemCms[] | null | undefined, respaldo: Paso[]): Paso[] {
  return respaldo.map((r, i) => ({ title: texto(cms?.[i]?.titulo, r.title), hint: texto(cms?.[i]?.texto, r.hint) }))
}

function elecciones(cms: ItemCms[] | null | undefined, respaldo: Eleccion[]): Eleccion[] {
  const lista = (cms ?? []).filter((i) => i.titulo).map((i) => ({ value: i.titulo!, note: i.texto ?? '' }))
  return lista.length > 0 ? lista : respaldo
}

export async function metadataSolicitar() {
  const cms = await leerSolicitar()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoSolicitar(): Promise<ContenidoSolicitar> {
  const cms = await leerSolicitar()
  const opcionesCms = [cms?.opcionPersonal, cms?.opcionReunion, cms?.opcionContactar]
  const textos = Object.fromEntries(
    Object.entries(TEXTOS).map(([clave, respaldo]) => [clave, texto(cms?.textos?.[clave as keyof TextosSolicitar], respaldo)]),
  ) as TextosSolicitar

  return {
    portada: resolverPortada(cms?.portada, RESPALDO_PORTADA),
    opciones: RESPALDO_OPCIONES.map((r, i) => ({
      id: r.id,
      index: texto(opcionesCms[i]?.etiqueta, r.index),
      title: texto(opcionesCms[i]?.titulo, r.title),
      note: texto(opcionesCms[i]?.texto, r.note),
    })),
    pasos: {
      personal: pasos(cms?.pasosPersonal, RESPALDO_PASOS.personal),
      reunion: pasos(cms?.pasosReunion, RESPALDO_PASOS.reunion),
      contactar: pasos(cms?.pasosContactar, RESPALDO_PASOS.contactar),
    },
    tiposPersonal: elecciones(cms?.tiposPersonal, RESPALDO_TIPOS),
    modalidades: elecciones(cms?.modalidades, RESPALDO_MODALIDADES),
    textos,
    fondoFormulario: resolverFondo(cms?.fondoFormulario, { tono: 'claro' }),
    listo: resolverSeccion(
      cms?.listo,
      {
        antetitulo: 'Listo',
        titulo: 'Solicitud preparada',
        texto: 'Abrimos WhatsApp y tu correo con el resumen. Si alguno no se abrió, usa los botones.',
        boton: { texto: 'Volver a contacto →', url: '/contacto' },
      },
      'claro',
    ),
  }
}
