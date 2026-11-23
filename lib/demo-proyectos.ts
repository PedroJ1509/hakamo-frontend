export type ProjectFeature = {
  id: string
  titulo: string
  sector: string
  rol: string
  texto: string
  imagen: string
  estado: 'en_proceso' | 'completado' | 'destacado'
  /** Fecha ISO (aaaa-mm-dd): ordena el historial y se muestra como mes y año. */
  fecha: string
  cliente: string
  ubicacion: string
  /** Párrafos de la ficha, separados por línea en blanco. */
  contenido: string
  datos: { valor: string; etiqueta: string }[]
  alcance: string[]
  /** Galería propia de la obra; si falta, se usan las fotos generales. */
  imagenes?: string[]
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
    fecha: '2026-04-01',
    cliente: 'Operador de generación eléctrica',
    ubicacion: 'Manzanillo, Montecristi',
    contenido:
      'La planta necesitaba levantar un equipo técnico completo sin frenar el cronograma de obra. Hakamo asumió el ciclo entero: definición de perfiles, reclutamiento en la zona, contratación e inducción.\n\nEl acompañamiento no terminó con la contratación. Mantenemos supervisión en campo, control de asistencia y la nómina al día, de modo que la operación solo tenga que ocuparse de la obra.',
    datos: [
      { valor: '120+', etiqueta: 'personas en campo' },
      { valor: '15 días', etiqueta: 'para el primer grupo' },
      { valor: '100%', etiqueta: 'cumplimiento TSS' },
    ],
    alcance: [
      'Reclutamiento técnico y operativo en la zona',
      'Contratación, inducción y alineación HSE',
      'Nómina, TSS y cumplimiento laboral',
      'Supervisión y control de asistencia en obra',
    ],
    imagenes: ['/visual-kit/obra.jpg', '/visual-kit/heroes/services-rrhh.jpg', '/visual-kit/heroes/jobs-rrhh.jpg', '/visual-kit/heroes/job-detail-rrhh.jpg'],
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
    fecha: '2026-01-15',
    cliente: 'Varias operaciones simultáneas',
    ubicacion: 'República Dominicana',
    contenido:
      'Un mismo estándar de servicio a distancias muy distintas. Este frente agrupa la gestión de nómina, TSS y supervisión de varias operaciones a la vez, cada una con su propio calendario y su propia realidad de campo.\n\nLa coordinación central permite que una obra en el interior reciba la misma respuesta que una en la capital, sin duplicar estructura administrativa.',
    datos: [
      { valor: '6', etiqueta: 'provincias atendidas' },
      { valor: '24 h', etiqueta: 'tiempo de respuesta' },
    ],
    alcance: [
      'Nómina centralizada y pago puntual',
      'Gestión de TSS y expedientes',
      'Supervisión itinerante por provincia',
    ],
    imagenes: ['/visual-kit/heroes/employment-rrhh.jpg', '/visual-kit/contact/workspace.jpg', '/visual-kit/heroes/home-rrhh.jpg'],
  },
  {
    id: 'infraestructura',
    titulo: 'Infraestructura · obras civiles',
    sector: 'Construcción e infraestructura',
    rol: 'Personal de obra y supervisión en campo',
    texto:
      'Equipos operativos para obras de infraestructura, con inducción, alineación HSE y seguimiento continuo en terreno.',
    imagen: '/visual-kit/heroes/services-rrhh.jpg',
    estado: 'completado',
    fecha: '2025-09-10',
    cliente: 'Constructora de obra civil',
    ubicacion: 'Santiago',
    contenido:
      'Obra civil con picos de personal muy marcados: semanas de arranque con cuadrillas completas y tramos de menor carga. El reto no era solo conseguir la gente, sino sostener el cumplimiento documental en cada entrada y salida.\n\nSe cerró el proyecto con la plantilla al día y sin contingencias laborales pendientes.',
    datos: [
      { valor: '80', etiqueta: 'personas gestionadas' },
      { valor: '0', etiqueta: 'contingencias laborales' },
    ],
    alcance: [
      'Cuadrillas de obra y supervisión',
      'Inducción y alineación HSE',
      'Gestión documental de entradas y salidas',
    ],
    imagenes: ['/visual-kit/heroes/services-rrhh.jpg', '/visual-kit/obra.jpg', '/visual-kit/heroes/job-detail-rrhh.jpg'],
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
    fecha: '2025-03-20',
    cliente: 'Cadena de tiendas',
    ubicacion: 'Santo Domingo',
    contenido:
      'Apertura de locales con fechas fijas de inauguración. Cada punto necesitaba su equipo listo y formado antes del día uno, con perfiles muy distintos entre sala y administración.\n\nEl reclutamiento se organizó por tanda y por local, de modo que ninguna apertura dependiera de la anterior.',
    datos: [
      { valor: '45', etiqueta: 'posiciones cubiertas' },
      { valor: '4', etiqueta: 'locales abiertos' },
    ],
    alcance: [
      'Reclutamiento de sala y administración',
      'Verificación de referencias y documentos',
      'Contratación por tandas de apertura',
    ],
    imagenes: ['/visual-kit/contact/lobby.jpg', '/visual-kit/contact/meeting.jpg', '/visual-kit/contact/workspace.jpg'],
  },
  {
    id: 'planta-industrial',
    titulo: 'Planta industrial · paro programado',
    sector: 'Industria y mantenimiento',
    rol: 'Personal de mantenimiento por campaña',
    texto:
      'Refuerzo temporal para una parada de planta: personal técnico movilizado por campaña, con entrada y salida ordenadas.',
    imagen: '/visual-kit/heroes/job-detail-rrhh.jpg',
    estado: 'completado',
    fecha: '2024-08-05',
    cliente: 'Planta de procesamiento',
    ubicacion: 'Valverde',
    contenido:
      'Una parada programada concentra meses de mantenimiento en pocas semanas. Hacía falta personal técnico disponible en una ventana exacta, sin arrastrar costos antes ni después.\n\nSe movilizó la cuadrilla completa para la campaña y se cerraron todos los contratos en fecha, sin cola administrativa.',
    datos: [
      { valor: '3 semanas', etiqueta: 'duración de la campaña' },
      { valor: '60', etiqueta: 'técnicos movilizados' },
    ],
    alcance: [
      'Movilización por campaña corta',
      'Contratación temporal y cierre en fecha',
      'Control de acceso y asistencia',
    ],
    imagenes: ['/visual-kit/heroes/job-detail-rrhh.jpg', '/visual-kit/obra.jpg', '/visual-kit/heroes/services-rrhh.jpg'],
  },
  {
    id: 'hotelera',
    titulo: 'Operación hotelera · temporada alta',
    sector: 'Turismo y servicios',
    rol: 'Reclutamiento masivo y nómina',
    texto:
      'Refuerzo estacional para temporada alta: selección por volumen y nómina quincenal sin carga para el hotel.',
    imagen: '/visual-kit/heroes/about-rrhh.jpg',
    estado: 'completado',
    fecha: '2024-02-12',
    cliente: 'Complejo hotelero',
    ubicacion: 'Puerto Plata',
    contenido:
      'La temporada alta multiplica la plantilla durante unos meses y vuelve a bajar. El hotel necesitaba ese músculo sin montar una estructura de recursos humanos propia para el pico.\n\nSe cubrieron las posiciones por volumen, con nómina quincenal gestionada íntegramente desde Hakamo.',
    datos: [
      { valor: '90', etiqueta: 'posiciones de temporada' },
      { valor: '2', etiqueta: 'nóminas al mes' },
    ],
    alcance: [
      'Selección por volumen en plazos cortos',
      'Contratación temporal de temporada',
      'Nómina quincenal y cumplimiento',
    ],
    imagenes: ['/visual-kit/heroes/about-rrhh.jpg', '/visual-kit/contact/workspace.jpg', '/visual-kit/contact/lobby.jpg'],
  },
  {
    id: 'mantenimiento-electrico',
    titulo: 'Mantenimiento eléctrico · red de clientes',
    sector: 'Energía y mantenimiento',
    rol: 'Técnicos electricistas y supervisión',
    texto:
      'Cuadrillas de mantenimiento eléctrico distribuidas por cliente, con rotación y control de certificaciones.',
    imagen: '/visual-kit/heroes/home-rrhh.jpg',
    estado: 'completado',
    fecha: '2023-06-18',
    cliente: 'Empresas de servicio eléctrico',
    ubicacion: 'Cibao',
    contenido:
      'Varias cuadrillas pequeñas, repartidas entre clientes distintos y en rotación constante. El punto crítico era que cada técnico tuviera sus certificaciones vigentes en todo momento.\n\nSe centralizó el control de vencimientos, de modo que ninguna cuadrilla saliera a campo con un documento caducado.',
    datos: [
      { valor: '25', etiqueta: 'técnicos en rotación' },
      { valor: '100%', etiqueta: 'certificaciones vigentes' },
    ],
    alcance: [
      'Reclutamiento de técnicos certificados',
      'Control de vencimientos y renovaciones',
      'Supervisión por cuadrilla',
    ],
    imagenes: ['/visual-kit/heroes/home-rrhh.jpg', '/visual-kit/heroes/jobs-rrhh.jpg', '/visual-kit/obra.jpg'],
  },
  {
    id: 'primer-outsourcing',
    titulo: 'Primer contrato de outsourcing',
    sector: 'Construcción',
    rol: 'Dotación inicial y nómina',
    texto:
      'El contrato con el que nació la línea de outsourcing de Hakamo: una cuadrilla, una nómina y el estándar que se mantiene hoy.',
    imagen: '/visual-kit/heroes/cv-seeker.jpg',
    estado: 'completado',
    fecha: '2021-11-03',
    cliente: 'Constructora local',
    ubicacion: 'Montecristi',
    contenido:
      'Con este contrato Hakamo pasó de reclutar a sostener la operación completa: contratar, pagar y responder por el cumplimiento de la gente en obra.\n\nFue el punto de partida del método que seguimos aplicando: perfiles definidos con el cliente, documentación en regla desde el primer día y una sola contraparte para todo.',
    datos: [
      { valor: '2021', etiqueta: 'nacimiento del outsourcing' },
      { valor: '18', etiqueta: 'primeras contrataciones' },
    ],
    alcance: [
      'Definición de perfiles con el cliente',
      'Contratación y expedientes desde cero',
      'Primera nómina gestionada por Hakamo',
    ],
    imagenes: ['/visual-kit/heroes/cv-seeker.jpg', '/visual-kit/heroes/employment-rrhh.jpg', '/visual-kit/contact/meeting.jpg'],
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
  { nombre: 'Energía 2000', src: '/clientes/energia-2000.png' },
  { nombre: 'Lindsayca Group', src: '/clientes/lindsayca.jpg' },
  { nombre: 'TSK Dominicana', src: '/clientes/tsk.jpg' },
  { nombre: 'Grupo Ramos', src: null },
]
