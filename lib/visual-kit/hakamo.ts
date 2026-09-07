import { CLIENTES, COMPANY_INFO, PROCESO_EMPRESAS, SERVICIOS, STATS } from '@/lib/data'
import type { HourRow, LandingCopy, LandingHeroBackground, NavLink, Offering, SitePublic, Stat, Step, StoryCard } from './types'

export const SITE_NAV: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/empleo', label: 'Empleo' },
  { href: '/contacto', label: 'Contacto' },
]

export const SITE_PUBLIC: SitePublic = {
  name: COMPANY_INFO.name,
  tagline: COMPANY_INFO.tagline,
  heroTitle: 'Impulsamos talentos, fortalecemos empresas',
  heroSubtitle:
    'Soluciones integrales para la gestión empresarial. Outsourcing, reclutamiento, payroll y mejora de flujo de caja.',
  about: COMPANY_INFO.description,
  phone: COMPANY_INFO.telefono,
  email: COMPANY_INFO.email,
  address: COMPANY_INFO.ubicacion,
  ctaHref: '/contacto',
  ctaLabel: 'Solicitar cotización',
}

export const LANDING_COPY: LandingCopy = {
  skip: 'Saltar al contenido',
  scrollHint: 'Baja para continuar',
  offeringsKicker: 'Servicios',
  offeringsTitle: 'Cuatro soluciones para su operación',
  processKicker: 'Cómo trabajamos',
  processTitle: 'Un proceso claro, de principio a fin',
  aboutKicker: 'Hakamo',
  hoursTitle: 'Dónde encontrarnos',
  contactKicker: 'Hablemos',
  contactTitle: 'Hablemos de su proyecto',
}

export const LANDING_STATS: Stat[] = STATS.map((item) => ({
  value: item.valor,
  label: item.etiqueta,
}))

export const LANDING_OFFERINGS: Offering[] = SERVICIOS.map((item) => ({
  id: item.slug,
  name: item.titulo,
  description: item.descripcion,
  meta: item.tags.join(' · '),
}))

export const LANDING_STEPS: Step[] = PROCESO_EMPRESAS.map((item) => ({
  n: item.paso,
  title: item.titulo,
  text: item.descripcion,
}))

export const LANDING_HOURS: HourRow[] = [
  { label: 'Oficina', value: COMPANY_INFO.ubicacion },
  { label: 'WhatsApp / Cotizaciones', value: '829-679-0671' },
  { label: 'Correo general', value: COMPANY_INFO.email },
  { label: 'Reclutamiento', value: COMPANY_INFO.emailReclutamiento },
]

export const LANDING_HERO_BACKGROUNDS = {
  home: {
    src: '/visual-kit/heroes/home-rrhh.jpg',
    alt: 'Oficina moderna de gestión de talento y reclutamiento',
    objectPosition: '50% 45%',
    priority: true,
  },
  about: {
    src: '/visual-kit/heroes/about-rrhh.jpg',
    alt: 'Equipo de profesionales colaborando en gestión humana',
    objectPosition: '50% 40%',
  },
  services: {
    src: '/visual-kit/heroes/services-rrhh.jpg',
    alt: 'Sesión de trabajo sobre servicios de talento y nómina',
    objectPosition: '50% 40%',
  },
  contact: {
    src: '/visual-kit/heroes/contact-rrhh.jpg',
    alt: 'Apretón de manos en reunión comercial',
    objectPosition: '50% 40%',
  },
  employment: {
    src: '/visual-kit/heroes/employment-rrhh.jpg',
    alt: 'Profesional en entrevista de empleo',
    objectPosition: '50% 28%',
  },
  jobs: {
    src: '/visual-kit/heroes/jobs-rrhh.jpg',
    alt: 'Equipo en sesión de planificación laboral',
    objectPosition: '50% 40%',
  },
  jobDetail: {
    src: '/visual-kit/heroes/job-detail-rrhh.jpg',
    alt: 'Especialista de RRHH en proceso de selección',
    objectPosition: '55% 32%',
  },
} satisfies Record<string, LandingHeroBackground>

export const LANDING_STORY: StoryCard[] = [
  {
    n: '01',
    side: 'right',
    kicker: 'Escala',
    caption: 'Proyectos industriales',
    title: 'A escala',
    text: 'Experiencia comprobada en energía, infraestructura e ingeniería. El mismo estándar en cada operación.',
    span: [0.14, 0.24, 0.36, 0.46],
  },
  {
    n: '02',
    side: 'left',
    kicker: 'Cumplimiento',
    caption: 'Ley 16-92',
    title: 'Marco legal',
    text: 'Asumimos la relación patronal, TSS, AFP, ARS e ISR. La contingencia laboral no recae en tu operación.',
    span: [0.34, 0.44, 0.56, 0.66],
  },
  {
    n: '03',
    side: 'right',
    kicker: 'Proceso',
    caption: 'De punta a punta',
    title: 'Un expediente',
    text: 'Nos contactas, diagnosticamos y proponemos alcance, tiempos y costos. Luego ejecutamos con seguimiento.',
    span: [0.54, 0.64, 0.76, 0.86],
  },
  {
    n: '04',
    side: 'left',
    kicker: 'Confianza',
    caption: CLIENTES.map((c) => c.nombre).join(' · '),
    title: 'Aliadas',
    text: 'Energía, construcción, ingeniería y retail nos confían la gestión de su personal.',
    span: [0.74, 0.84, 0.96, 1],
  },
]
