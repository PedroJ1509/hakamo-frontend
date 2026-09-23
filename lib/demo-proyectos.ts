export type ProjectFeature = {
  id: string
  titulo: string
  sector: string
  rol: string
  texto: string
  imagen: string
  estado: 'en_proceso' | 'completado' | 'destacado'
}

export type FieldMedia =
  | {
      id: string
      type: 'image'
      src: string
      alt: string
      ratio: 'tall' | 'wide' | 'square'
    }
  | {
      id: string
      type: 'video'
      poster: string
      alt: string
      ratio: 'tall' | 'wide' | 'square'
      /** Ruta local `.mp4`/`.webm` cuando exista en /public */
      src?: string
      /** Enlace externo (YouTube, Instagram, etc.) si no hay archivo local */
      href?: string
      label?: string
    }

export const PROJECT_FEATURES: ProjectFeature[] = [
  {
    id: 'manzanillo',
    titulo: 'Energía · Manzanillo',
    sector: 'Generación eléctrica',
    rol: 'Outsourcing de personal técnico y operativo',
    texto:
      'Dotación y gestión humana para proyectos de energía: contratación, nómina, cumplimiento y acompañamiento en campo.',
    imagen: '/visual-kit/obra.jpg',
    estado: 'destacado',
  },
  {
    id: 'infraestructura',
    titulo: 'Infraestructura · Grupo Cafra',
    sector: 'Construcción e infraestructura',
    rol: 'Personal de obra y supervisión en campo',
    texto:
      'Equipos operativos para obras de infraestructura, con inducción, alineación HSE y seguimiento continuo en terreno.',
    imagen: '/visual-kit/heroes/services-rrhh.jpg',
    estado: 'completado',
  },
  {
    id: 'retail',
    titulo: 'Retail · showrooms y plazas',
    sector: 'Comercio y diseño',
    rol: 'Reclutamiento y gestión documental',
    texto:
      'Apoyo en tiendas, showrooms y plazas comerciales: perfiles técnicos y administrativos con cumplimiento laboral.',
    imagen: '/visual-kit/contact/lobby.jpg',
    estado: 'completado',
  },
  {
    id: 'cobertura',
    titulo: 'Cobertura nacional',
    sector: 'Montecristi y todo el país',
    rol: 'Payroll, TSS y supervisión',
    texto:
      'Operaciones adaptadas a cada obra y entorno: de Montecristi al territorio nacional, con el mismo estándar de servicio.',
    imagen: '/visual-kit/heroes/employment-rrhh.jpg',
    estado: 'en_proceso',
  },
]

export const PROJECT_FIELD_GALLERY: FieldMedia[] = [
  {
    id: 'g1',
    type: 'image',
    src: '/visual-kit/obra.jpg',
    alt: 'Obra y proyecto en campo',
    ratio: 'tall',
  },
  {
    id: 'g2',
    type: 'video',
    poster: '/visual-kit/heroes/jobs-rrhh.jpg',
    alt: 'Talento en operación',
    ratio: 'wide',
    href: 'https://instagram.com/hakamord',
    label: 'Ver en Instagram',
  },
  {
    id: 'g3',
    type: 'image',
    src: '/visual-kit/heroes/home-rrhh.jpg',
    alt: 'Equipo de gestión humana',
    ratio: 'square',
  },
  {
    id: 'g4',
    type: 'image',
    src: '/visual-kit/contact/meeting.jpg',
    alt: 'Reunión de coordinación',
    ratio: 'wide',
  },
  {
    id: 'g5',
    type: 'video',
    poster: '/visual-kit/heroes/about-rrhh.jpg',
    alt: 'Día a día en Hakamo',
    ratio: 'tall',
    href: 'https://instagram.com/hakamord',
    label: 'Clip de campo',
  },
  {
    id: 'g6',
    type: 'image',
    src: '/visual-kit/contact/workspace.jpg',
    alt: 'Espacio de trabajo',
    ratio: 'square',
  },
  {
    id: 'g7',
    type: 'image',
    src: '/visual-kit/heroes/cv-seeker.jpg',
    alt: 'Candidatos y talento',
    ratio: 'tall',
  },
  {
    id: 'g8',
    type: 'image',
    src: '/visual-kit/heroes/contact-rrhh.jpg',
    alt: 'Acompañamiento al cliente',
    ratio: 'wide',
  },
]

export const PROJECT_CLIENT_LOGOS = [
  { nombre: 'Grupo Cafra', src: null },
  { nombre: 'Energía 2000', src: '/clientes/energia-2000.png' },
  { nombre: 'Lindsayca Group', src: '/clientes/lindsayca.jpg' },
  { nombre: 'TSK Dominicana', src: '/clientes/tsk.jpg' },
  { nombre: 'Grupo Ramos', src: null },
]
