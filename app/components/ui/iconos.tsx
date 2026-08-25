/**
 * Íconos de línea del sitio. Usan `currentColor`, así que toman el color del
 * contenedor: eso es lo que los emoji no permitían.
 */

type Props = { size?: number }

const Svg = ({ size = 24, children }: Props & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)

/* ── Servicios ── */

/** Equipo de personas: outsourcing de personal. */
export const IconEquipo = (p: Props) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16.5 6.5a3 3 0 0 1 0 5.6" />
    <path d="M17 14.6a5.5 5.5 0 0 1 4 5.4" />
  </Svg>
)

/** Diana: reclutamiento y selección. */
export const IconDiana = (p: Props) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" />
  </Svg>
)

/** Billete y monedas: administración de nómina. */
export const IconNomina = (p: Props) => (
  <Svg {...p}>
    <rect x="2.5" y="6" width="15" height="9" rx="1.6" />
    <circle cx="10" cy="10.5" r="2.2" />
    <path d="M21.5 9v8.4a1.6 1.6 0 0 1-1.6 1.6H6" />
  </Svg>
)

/** Lupa sobre documento: estudios socioeconómicos. */
export const IconLupaDoc = (p: Props) => (
  <Svg {...p}>
    <path d="M13.5 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h6" />
    <path d="M13.5 3L18 7.5V11" />
    <circle cx="16.5" cy="16.5" r="3.2" />
    <path d="M18.9 18.9L21.5 21.5" />
  </Svg>
)

/** Cabeza con circuito: evaluaciones psicométricas. */
export const IconMente = (p: Props) => (
  <Svg {...p}>
    <path d="M15.5 20.5v-2.2a4.2 4.2 0 0 0 3-4c0-.7 .3-1.2 .8-1.6.6-.5 1-1.3 1-2.1A7.3 7.3 0 0 0 13 3.2 7.2 7.2 0 0 0 5.6 9c-.2 1.4.2 2.7 1 3.7v3.1a1.6 1.6 0 0 0 1.6 1.6h1.3v3.1" />
    <path d="M12 8.5v3.4" />
    <circle cx="12" cy="13.4" r="1.1" />
  </Svg>
)

/** Balanza: consultoría laboral. */
export const IconBalanza = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3.5v17" />
    <path d="M6 20.5h12" />
    <path d="M4 7.5h16" />
    <path d="M7 7.5l-3 6h6l-3-6z" />
    <path d="M17 7.5l-3 6h6l-3-6z" />
  </Svg>
)

/** Carpeta con hoja: gestión documental. */
export const IconCarpeta = (p: Props) => (
  <Svg {...p}>
    <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.2h7A1.5 1.5 0 0 1 19 9.7V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 3 18V7.5z" />
    <path d="M8 13h6" />
    <path d="M8 16h4" />
  </Svg>
)

/** Casco de obra: supervisión de proyectos. */
export const IconCasco = (p: Props) => (
  <Svg {...p}>
    <path d="M3.5 16.5a8.5 8.5 0 0 1 17 0" />
    <path d="M2.5 16.5h19" />
    <path d="M9.5 8.6V5.4A1.4 1.4 0 0 1 10.9 4h2.2a1.4 1.4 0 0 1 1.4 1.4v3.2" />
    <path d="M2.5 19.5h19" />
  </Svg>
)

/* ── Marco legal ── */

/** Pergamino: código laboral. */
export const IconPergamino = (p: Props) => (
  <Svg {...p}>
    <path d="M6 3h11a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6" />
    <path d="M4 6a2 2 0 0 1 2-2" />
    <path d="M8 8h7" />
    <path d="M8 12h7" />
    <path d="M8 16h4" />
  </Svg>
)

/** Institución con columnas: TSS. */
export const IconInstitucion = (p: Props) => (
  <Svg {...p}>
    <path d="M3 9.5L12 4l9 5.5" />
    <path d="M5 10v8" />
    <path d="M9.5 10v8" />
    <path d="M14.5 10v8" />
    <path d="M19 10v8" />
    <path d="M3 20.5h18" />
  </Svg>
)

/** Escudo con cruz: AFP / ARS, pensiones y salud. */
export const IconSalud = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v6c0 4.4-3.1 8-7.5 9.3C7.6 20 4.5 16.4 4.5 12V6L12 3z" />
    <path d="M12 8.8v5" />
    <path d="M9.5 11.3h5" />
  </Svg>
)

/** Gráfico de barras: DGII. */
export const IconGrafico = (p: Props) => (
  <Svg {...p}>
    <path d="M4 20.5h16" />
    <rect x="5.5" y="12" width="3.4" height="6" rx="0.8" />
    <rect x="10.6" y="8" width="3.4" height="10" rx="0.8" />
    <rect x="15.7" y="4.5" width="3.4" height="13.5" rx="0.8" />
  </Svg>
)

/** Edificio: Ministerio de Trabajo. */
export const IconEdificio = (p: Props) => (
  <Svg {...p}>
    <rect x="4" y="3" width="11" height="18" rx="1.4" />
    <path d="M15 9h4.5a1.4 1.4 0 0 1 1.5 1.4V21" />
    <path d="M7.5 7h4" />
    <path d="M7.5 11h4" />
    <path d="M7.5 15h4" />
    <path d="M2.5 21h19" />
  </Svg>
)

/** Apretón de manos: acuerdo a medida. */
export const IconAcuerdo = (p: Props) => (
  <Svg {...p}>
    <path d="M7 11l3-3 3 2 4-4" />
    <path d="M3 12l4 4 2-1 3 3 2-1 3 2" />
    <path d="M14 6h4v4" />
  </Svg>
)

/* ── Sectores de clientes ── */

/** Rayo: generación eléctrica. */
export const IconRayo = (p: Props) => (
  <Svg {...p}>
    <path d="M13.5 2.5L5 13.5h6l-.5 8L19 10.5h-6l.5-8z" />
  </Svg>
)

/** Grúa: energía e infraestructura. */
export const IconGrua = (p: Props) => (
  <Svg {...p}>
    <path d="M4 21V4l12 3.5" />
    <path d="M4 21h9" />
    <path d="M11 6.5V12" />
    <path d="M8.5 12h5l-2.5 4-2.5-4z" />
    <path d="M16 7.5l4 2" />
  </Svg>
)

/** Llave inglesa: ingeniería y construcción. */
export const IconLlave = (p: Props) => (
  <Svg {...p}>
    <path d="M15.5 3.5a5 5 0 0 0-5.9 6.4L3 16.5 7.5 21l6.6-6.6a5 5 0 0 0 6.4-5.9l-3.2 3.2-3-.5-.5-3 3.2-3.2z" />
  </Svg>
)

/** Tienda: retail y supermercados. */
export const IconTienda = (p: Props) => (
  <Svg {...p}>
    <path d="M3.5 9.5L5 4h14l1.5 5.5" />
    <path d="M3.5 9.5a3 3 0 0 0 5.6 1.5 3 3 0 0 0 5.8 0 3 3 0 0 0 5.6-1.5" />
    <path d="M5 12v8h14v-8" />
    <path d="M10 20v-5h4v5" />
  </Svg>
)

/** Íconos por sector de cliente, según su nombre. */
export const ICONOS_CLIENTE: Record<string, (p: Props) => React.ReactElement> = {
  'Energía 2000': IconRayo,
  'Lindsayca Group': IconGrua,
  'TSK Dominicana': IconLlave,
  'Grupo Ramos': IconTienda,
}

/** Íconos de servicios, por `slug`. */
export const ICONOS_SERVICIO: Record<string, (p: Props) => React.ReactElement> = {
  'outsourcing-personal': IconEquipo,
  'reclutamiento-seleccion': IconDiana,
  'administracion-nomina': IconNomina,
  'estudios-socioeconomicos': IconLupaDoc,
  'evaluaciones-psicometricas': IconMente,
  'consultoria-laboral': IconBalanza,
  'gestion-documental': IconCarpeta,
  'supervision-proyectos': IconCasco,
}

/** Íconos del marco legal, por título. */
export const ICONOS_MARCO_LEGAL: Record<string, (p: Props) => React.ReactElement> = {
  'Código Laboral — Ley 16-92': IconPergamino,
  'TSS — Tesorería Seguridad Social': IconInstitucion,
  'AFP / ARS — Pensiones y Salud': IconSalud,
  'DGII — ISR e ITBIS': IconGrafico,
  'Ministerio de Trabajo': IconEdificio,
}
