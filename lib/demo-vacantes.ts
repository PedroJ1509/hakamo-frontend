import type { Division, Vacante } from "@/types";

const baseDivision = {
  documentId: "demo-div",
  descripcion: "",
  colorPrimario: "#1E3A5F",
  colorSecundario: "#C4A35A",
  activo: true,
  imagenHero: null,
  logo: null,
  proyectos: [],
  clientes: [],
  servicios: [],
  posts: [],
};

export const DEMO_DIVISIONES = [
  { ...baseDivision, id: 1, documentId: "demo-div-1", nombre: "Construcción", slug: "construccion" },
  { ...baseDivision, id: 2, documentId: "demo-div-2", nombre: "Energía", slug: "energia" },
  { ...baseDivision, id: 3, documentId: "demo-div-3", nombre: "Salud e Higiene", slug: "salud-higiene" },
  { ...baseDivision, id: 4, documentId: "demo-div-4", nombre: "Administración", slug: "administracion" },
] as Division[];

export type VacanteCard = Vacante & { imagen?: string };

const IMAGES = [
  "/visual-kit/heroes/jobs-rrhh.jpg",
  "/visual-kit/heroes/employment-rrhh.jpg",
  "/visual-kit/heroes/job-detail-rrhh.jpg",
  "/visual-kit/heroes/home-rrhh.jpg",
  "/visual-kit/heroes/about-rrhh.jpg",
  "/visual-kit/heroes/services-rrhh.jpg",
  "/visual-kit/contact/workspace.jpg",
  "/visual-kit/contact/meeting.jpg",
  "/visual-kit/obra.jpg",
];

function vacante(
  partial: Omit<Partial<VacanteCard>, "division"> & {
    id: number;
    titulo: string;
    division: Division;
    descripcion: string;
    imagen?: string;
  },
): VacanteCard {
  return {
    documentId: `demo-vac-${partial.id}`,
    slug: partial.titulo.toLowerCase().replace(/\s+/g, "-"),
    requisitos: "Experiencia comprobable y disponibilidad inmediata.",
    ubicacion: partial.ubicacion ?? "Santo Domingo",
    modalidad: partial.modalidad ?? "presencial",
    tipo: partial.tipo ?? "tiempo_completo",
    salario: partial.salario ?? "",
    estado: "activa",
    fechaPublicacion: "2026-09-01",
    fechaCierre: "2026-12-31",
    imagen: partial.imagen ?? IMAGES[(partial.id - 1) % IMAGES.length],
    ...partial,
  } as VacanteCard;
}

export const DEMO_VACANTES: VacanteCard[] = [
  vacante({
    id: 1,
    titulo: "Ingeniero residente de obra",
    division: DEMO_DIVISIONES[0],
    ubicacion: "Santiago",
    modalidad: "presencial",
    tipo: "tiempo_completo",
    salario: "Negociable",
    descripcion:
      "Lideras la ejecución en campo, coordinas subcontratistas y garantizas calidad, seguridad y avance del cronograma en proyectos de infraestructura.",
  }),
  vacante({
    id: 2,
    titulo: "Técnico electricista industrial",
    division: DEMO_DIVISIONES[1],
    ubicacion: "Santo Domingo Este",
    modalidad: "presencial",
    tipo: "contrato",
    salario: "RD$ 45,000 – 55,000",
    descripcion: "Instalación y mantenimiento de sistemas eléctricos en planta.",
  }),
  vacante({
    id: 3,
    titulo: "Supervisor de Salud e Higiene",
    division: DEMO_DIVISIONES[2],
    ubicacion: "Distrito Nacional",
    modalidad: "hibrido",
    tipo: "tiempo_completo",
    salario: "Según experiencia",
    descripcion:
      "Implementas protocolos SSO, capacitaciones y auditorías internas. Acompañas cuadrillas en obra y reportas indicadores de cumplimiento normativo.",
  }),
  vacante({
    id: 4,
    titulo: "Asistente administrativo",
    division: DEMO_DIVISIONES[3],
    ubicacion: "Santo Domingo",
    modalidad: "presencial",
    tipo: "medio_tiempo",
    descripcion: "Apoyo en nómina, expedientes y atención a candidatos.",
  }),
  vacante({
    id: 5,
    titulo: "Oficial de albañilería",
    division: DEMO_DIVISIONES[0],
    ubicacion: "La Romana",
    modalidad: "presencial",
    tipo: "contrato",
    salario: "Por proyecto",
    descripcion:
      "Ejecutas acabados, mampostería y trabajos de concreto según planos. Experiencia en obras verticales y horizontal requerida.",
  }),
  vacante({
    id: 6,
    titulo: "Analista de Recursos Humanos",
    division: DEMO_DIVISIONES[3],
    ubicacion: "Remoto RD",
    modalidad: "remoto",
    tipo: "tiempo_completo",
    salario: "RD$ 40,000 – 50,000",
    descripcion:
      "Gestionas reclutamiento, onboarding y seguimiento de candidatos para clientes de outsourcing. Dominio de Excel y comunicación clara con gerencias de proyecto.",
  }),
  vacante({
    id: 7,
    titulo: "Soldador certificado",
    division: DEMO_DIVISIONES[0],
    ubicacion: "Haina",
    modalidad: "presencial",
    tipo: "contrato",
    descripcion: "Soldadura estructural para montajes industriales.",
  }),
  vacante({
    id: 8,
    titulo: "Coordinador de seguridad industrial",
    division: DEMO_DIVISIONES[1],
    ubicacion: "San Pedro de Macorís",
    modalidad: "presencial",
    tipo: "tiempo_completo",
    salario: "Negociable",
    descripcion:
      "Diseñas planes de prevención, inspecciones y respuesta a incidentes en plantas y subestaciones. Certificaciones en seguridad son un plus.",
  }),
  vacante({
    id: 9,
    titulo: "Auxiliar de limpieza industrial",
    division: DEMO_DIVISIONES[2],
    ubicacion: "Santo Domingo Norte",
    modalidad: "presencial",
    tipo: "medio_tiempo",
    descripcion: "Turnos rotativos en instalaciones corporativas y clínicas.",
  }),
];

export const FALLBACK_JOB_IMAGES = IMAGES;

export function resolveVacanteImage(vacante: VacanteCard, index: number): string {
  if (vacante.imagen) return vacante.imagen;
  return IMAGES[index % IMAGES.length];
}

export function withJobImages(items: Vacante[]): VacanteCard[] {
  return items.map((item, index) => ({
    ...item,
    imagen: (item as VacanteCard).imagen ?? FALLBACK_JOB_IMAGES[index % FALLBACK_JOB_IMAGES.length],
  }));
}
