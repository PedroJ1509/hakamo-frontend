import type { ReactNode } from 'react'
import {
  getDivision,
  getServiciosPorDivision,
  getProyectosPorDivision,
  getClientesPorDivision,
  getPreviewPostsPorDivision,
  DIVISION_SLUG,
} from '@/lib/api'
import { Division, Servicio, Proyecto, Cliente, Post } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import FAQAccordion from '@/app/components/ui/FAQAccordion'
import NewsletterForm from '@/app/components/ui/NewsletterForm'
import StatsCounter from '@/app/components/ui/StatsCounter'
import FadeIn from '@/app/components/ui/FadeIn'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakamo Outsourcing — Soluciones de Talento Humano',
  description: 'Empresa dominicana especializada en outsourcing de personal, reclutamiento y selección, gestión de nómina y talento humano.',
}

/* ── Datos estáticos (TODO: reemplazar con valores reales del cliente) ── */

const ESTADISTICAS = [
  { num: '5+', label: 'Años de experiencia' },        // TODO: actualizar
  { num: '200+', label: 'Clientes atendidos' },        // TODO: actualizar
  { num: '1,000+', label: 'Candidatos colocados' },    // TODO: actualizar
  { num: '95%', label: 'Tasa de retención' },          // TODO: actualizar
]

const PROCESO = [
  {
    numero: '01',
    titulo: 'Consulta inicial',
    descripcion: 'Nos reunimos para entender tus necesidades específicas de personal y objetivos empresariales.',
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    numero: '02',
    titulo: 'Planificación',
    descripcion: 'Diseñamos la estrategia de reclutamiento y el perfil ideal para cada posición requerida.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  },
  {
    numero: '03',
    titulo: 'Ejecución',
    descripcion: 'Buscamos, evaluamos y seleccionamos los mejores candidatos del mercado dominicano.',
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
  },
  {
    numero: '04',
    titulo: 'Entrega',
    descripcion: 'Presentamos los candidatos seleccionados y acompañamos el proceso de incorporación.',
    icon: <polyline points="20 6 9 17 4 12" />,
  },
]

const EQUIPO_PLACEHOLDER = [
  { nombre: 'Nombre del CEO',       cargo: 'Director General',       initials: 'DG' }, // TODO: reemplazar
  { nombre: 'Gerente de RRHH',      cargo: 'Recursos Humanos',       initials: 'RH' }, // TODO: reemplazar
  { nombre: 'Coordinador Operativo', cargo: 'Operaciones',           initials: 'CO' }, // TODO: reemplazar
  { nombre: 'Analista de Talento',   cargo: 'Selección de Personal', initials: 'AT' }, // TODO: reemplazar
]

const PLANES = [
  {
    nombre: 'Básico',
    precio: 'Consultar',    // TODO: precio real
    descripcion: 'Ideal para empresas pequeñas con necesidades eventuales de personal.',
    caracteristicas: [
      'Hasta 5 posiciones activas',
      'Reclutamiento y selección básico',
      'Soporte por email',
      'Reportes mensuales',
    ],
    destacado: false,
    cta: 'Consultar precio',
  },
  {
    nombre: 'Estándar',
    precio: 'Consultar',    // TODO: precio real
    descripcion: 'Para empresas en crecimiento que necesitan un socio de RRHH.',
    caracteristicas: [
      'Posiciones ilimitadas',
      'Reclutamiento y selección avanzado',
      'Gestión de nómina (Payroll)',
      'Gestión documental y cumplimiento',
      'Soporte prioritario',
      'Reportes semanales',
    ],
    destacado: true,
    cta: 'Consultar precio',
  },
  {
    nombre: 'Enterprise',
    precio: 'A medida',     // TODO: precio real
    descripcion: 'Solución personalizada para grandes corporaciones.',
    caracteristicas: [
      'Todo lo del plan Estándar',
      'Supervisión de proyectos',
      'Gerente de cuenta dedicado',
      'SLA garantizado',
      'Integración con sistemas HR',
      'Capacitación y formación',
    ],
    destacado: false,
    cta: 'Contactar',
  },
]

const FAQ_ITEMS = [
  // TODO: reemplazar con preguntas y respuestas reales del cliente
  {
    pregunta: '¿Qué servicios de outsourcing ofrece Hakamo?',
    respuesta: 'Hakamo ofrece outsourcing de personal, reclutamiento y selección, gestión de nómina (payroll), gestión documental y cumplimiento legal, y supervisión de proyectos.',
  },
  {
    pregunta: '¿En qué zonas de la República Dominicana operan?',
    respuesta: 'Operamos a nivel nacional con presencia activa en Montecristi y cobertura en todo el territorio dominicano.',
  },
  {
    pregunta: '¿Cómo puedo contratar sus servicios?',
    respuesta: 'Puedes contactarnos a través de nuestro formulario en línea, por WhatsApp al 829-679-0671 o por correo electrónico. Te responderemos en menos de 24 horas hábiles.',
  },
  {
    pregunta: '¿Cuánto tiempo tarda el proceso de contratación de personal?',
    respuesta: 'Dependiendo del perfil solicitado y la cantidad de candidatos requeridos, el proceso toma entre 5 y 15 días hábiles desde la consulta inicial.',
  },
  {
    pregunta: '¿Ofrecen garantía sobre el personal colocado?',
    respuesta: 'Sí, ofrecemos un período de garantía y reemplazo sin costo adicional si el candidato no se adapta al puesto en el plazo acordado.',
  },
  {
    pregunta: '¿Trabajan con empresas de todos los tamaños?',
    respuesta: 'Sí, trabajamos tanto con pequeñas y medianas empresas como con grandes corporaciones, adaptando nuestra solución a las necesidades específicas de cada cliente.',
  },
]

/* ── Componentes auxiliares ──────────────────────────────── */

function SectionEyebrow({ texto, color }: { texto: string; color: string }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-3" style={{ color }}>
      {texto}
    </p>
  )
}

function SectionTitle({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      className="font-bold leading-tight"
      style={{
        fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
        color: light ? '#fff' : '#0D1B5E',
        fontFamily: 'var(--font-space-grotesk, sans-serif)',
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </h2>
  )
}

/* ── Página principal ────────────────────────────────────── */

export default async function HomePage() {
  const [division, serviciosRes, proyectosRes, clientesRes, postsRes] = await Promise.all([
    getDivision(DIVISION_SLUG).catch(() => null),
    getServiciosPorDivision(DIVISION_SLUG).catch(() => ({ data: [] })),
    getProyectosPorDivision(DIVISION_SLUG).catch(() => ({ data: [] })),
    getClientesPorDivision(DIVISION_SLUG).catch(() => ({ data: [] })),
    getPreviewPostsPorDivision(DIVISION_SLUG).catch(() => ({ data: [] })),
  ])

  const div = division as Division | null
  const servicios: Servicio[] = serviciosRes.data
  const proyectos: Proyecto[] = proyectosRes.data
  const clientes: Cliente[] = clientesRes.data
  const posts: Post[] = postsRes.data

  const color = div?.colorPrimario || '#1E3A5F'

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">

      {/* ══════════════════════════════════════════════════
          4a HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {div?.imagenHero ? (
          <div className="absolute inset-0">
            <StrapiImage media={div.imagenHero} alt={div.nombre} fill className="object-cover" priority />
            <div className="absolute inset-0" style={{ backgroundColor: `${color}E0` }} />
          </div>
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: color }} />
        )}

        {/* Patrón de puntos sutil */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-white/70 text-sm font-semibold uppercase tracking-[0.3em] mb-8">
              <span className="w-8 h-px bg-white/50" />
              Hakamo Outsourcing
            </p>
            <h1
              className="text-white font-bold leading-[1.05] mb-6"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.03em',
              }}
            >
              {div?.nombre ?? 'Hakamo'}<br />
              <span style={{ opacity: 0.85 }}>Outsourcing</span>
            </h1>
            {(div?.tagline || div?.descripcion) && (
              <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl">
                {div.tagline || div.descripcion}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                style={{ backgroundColor: '#fff', color }}
              >
                Contáctanos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-all"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
          <span className="text-white text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4b MISIÓN Y VISIÓN
      ══════════════════════════════════════════════════ */}
      {(div?.mision || div?.vision) && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionEyebrow texto="Nuestra empresa" color={color} />
              <SectionTitle>Quiénes Somos</SectionTitle>
              {div.descripcion && (
                <p className="text-gray-500 leading-relaxed mt-4 max-w-2xl mx-auto">
                  {div.descripcion}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {div.mision && (
                <div className="rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}12` }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                    Nuestra Misión
                  </h3>
                  <div className="w-10 h-1 rounded-full mb-4" style={{ backgroundColor: color }} />
                  <p className="text-gray-500 leading-relaxed text-sm">{div.mision}</p>
                </div>
              )}
              {div.vision && (
                <div className="rounded-2xl p-8 text-white" style={{ backgroundColor: color }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/15">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                    Nuestra Visión
                  </h3>
                  <div className="w-10 h-1 rounded-full mb-4 bg-white/40" />
                  <p className="text-white/80 leading-relaxed text-sm">{div.vision}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          4d SERVICIOS
      ══════════════════════════════════════════════════ */}
      {servicios.length > 0 && (
        <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-14">
              <SectionEyebrow texto="NUESTROS SERVICIOS" color={color} />
              <SectionTitle>Soluciones para tu Empresa</SectionTitle>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                Soluciones integrales de talento humano adaptadas a las necesidades de tu empresa.
              </p>
            </FadeIn>

            <div className={`grid gap-6 ${
              servicios.length <= 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
              servicios.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {servicios.map((servicio: Servicio) => (
                <div
                  key={servicio.id}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: color }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}10` }}>
                    {servicio.icono ? (
                      <span className="text-xl">{servicio.icono}</span>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-bold text-base mb-3" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{servicio.descripcion}</p>
                  <Link
                    href="/servicios"
                    className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color }}
                  >
                    Ver más →
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Ver todos los servicios
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          4e PROYECTOS
      ══════════════════════════════════════════════════ */}
      {proyectos.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <SectionEyebrow texto="NUESTROS PROYECTOS" color={color} />
                <SectionTitle>Trabajo que Habla por Nosotros</SectionTitle>
              </div>
              <Link
                href="/proyectos"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: color, color }}
              >
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {proyectos.slice(0, 3).map((proyecto: Proyecto) => (
                <Link
                  key={proyecto.id}
                  href={`/proyectos`}
                  className="group block rounded-2xl overflow-hidden relative h-64 bg-gray-100"
                >
                  {proyecto.imagenes?.length > 0 ? (
                    <StrapiImage
                      media={proyecto.imagenes[0]}
                      alt={proyecto.titulo}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                      <span className="font-bold text-4xl opacity-20" style={{ color }}>H</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: color }}>
                      {proyecto.estado?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-sm leading-snug">{proyecto.titulo}</h3>
                    {proyecto.descripcion && (
                      <p className="text-white/70 text-xs mt-1 line-clamp-1">{proyecto.descripcion}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Ver todos los proyectos
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          4c ESTADÍSTICAS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: color }}>
        <div className="max-w-5xl mx-auto">
          <StatsCounter stats={ESTADISTICAS} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4f PROCESO PASO A PASO
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow texto="Cómo trabajamos" color={color} />
            <SectionTitle>Nuestro Proceso</SectionTitle>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Línea conectora desktop */}
            <div className="hidden md:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-px z-0" style={{ backgroundColor: `${color}30` }} />

            {PROCESO.map((paso, i) => (
              <FadeIn key={i} delay={i * 0.12} className="relative z-10 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {paso.icon}
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: `${color}80` }}>
                  {paso.numero}
                </span>
                <h3 className="font-bold text-base mb-2" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                  {paso.titulo}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{paso.descripcion}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4g EQUIPO
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow texto="Las personas detrás" color={color} />
            <SectionTitle>Nuestro Equipo</SectionTitle>
            {/* TODO: reemplazar con datos reales del equipo desde Strapi cuando esté disponible */}
            <p className="text-gray-400 text-sm mt-3 italic">Próximamente — información del equipo</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {EQUIPO_PLACEHOLDER.map((miembro, i) => (
              <div key={i} className="group text-center">
                <div
                  className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  style={{ backgroundColor: i % 2 === 0 ? color : `${color}CC` }}
                >
                  {miembro.initials}
                </div>
                <h3 className="font-bold text-sm" style={{ color: '#0D1B5E' }}>{miembro.nombre}</h3>
                <p className="text-gray-400 text-xs mt-1">{miembro.cargo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4h CLIENTES Y TESTIMONIOS
      ══════════════════════════════════════════════════ */}
      {clientes.length > 0 && (
        <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: 'radial-gradient(circle, #c8d2e0 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionEyebrow texto="LO QUE DICEN DE NOSOTROS" color={color} />
              <SectionTitle>Testimonios de Clientes</SectionTitle>
            </div>

            {/* Logos */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {clientes.map((cliente: Cliente) => (
                <div key={cliente.id} className="bg-white rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                  {cliente.logo && (
                    <StrapiImage media={cliente.logo} alt={cliente.nombre} width={32} height={32} className="object-contain" />
                  )}
                  <span className="text-sm font-semibold" style={{ color: '#0D1B5E' }}>{cliente.nombre}</span>
                </div>
              ))}
            </div>

            {/* Quote cards — todos los clientes con testimonio */}
            {clientes.some(c => c.testimonio) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientes.filter(c => c.testimonio).map((cliente: Cliente) => (
                  <div key={cliente.id} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow relative">
                    <span className="absolute top-5 right-6 text-5xl font-serif leading-none opacity-10" style={{ color }}>
                      &rdquo;
                    </span>
                    <p className="text-gray-600 leading-relaxed text-sm italic mb-6">
                      &ldquo;{cliente.testimonio}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      {cliente.logo && (
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-50 flex-shrink-0">
                          <StrapiImage media={cliente.logo} alt={cliente.nombre} width={36} height={36} className="object-contain" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#0D1B5E' }}>{cliente.nombre}</p>
                        {cliente.sitioweb && (
                          <a href={cliente.sitioweb} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:underline">
                            {cliente.sitioweb}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          4i PLANES Y PRECIOS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow texto="Elige tu plan" color={color} />
            <SectionTitle>Planes y Precios</SectionTitle>
            {/* TODO: reemplazar precios con valores reales */}
            <p className="text-gray-500 mt-4 text-sm">Contáctanos para obtener una cotización personalizada según tu empresa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES.map((plan) => (
              <div
                key={plan.nombre}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.destacado ? 'text-white shadow-xl scale-105' : 'bg-white border border-gray-100'
                }`}
                style={plan.destacado ? { backgroundColor: color } : {}}
              >
                {plan.destacado && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm" style={{ color }}>
                      Más popular
                    </span>
                  </div>
                )}

                <h3 className={`font-bold text-lg mb-2 ${plan.destacado ? 'text-white' : ''}`} style={{ color: plan.destacado ? '#fff' : '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                  {plan.nombre}
                </h3>
                <p className={`text-3xl font-bold mb-1 ${plan.destacado ? 'text-white' : ''}`} style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', color: plan.destacado ? '#fff' : color }}>
                  {plan.precio}
                </p>
                <p className={`text-sm mb-6 ${plan.destacado ? 'text-white/70' : 'text-gray-500'}`}>{plan.descripcion}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.caracteristicas.map((c) => (
                    <li key={c} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={plan.destacado ? 'rgba(255,255,255,0.8)' : color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className={`text-sm ${plan.destacado ? 'text-white/80' : 'text-gray-600'}`}>{c}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contacto"
                  className="block text-center py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={
                    plan.destacado
                      ? { backgroundColor: '#fff', color }
                      : { backgroundColor: `${color}10`, color }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4j FAQ
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow texto="Resolvemos tus dudas" color={color} />
            <SectionTitle>Preguntas Frecuentes</SectionTitle>
            {/* TODO: reemplazar con preguntas reales del cliente */}
          </div>
          <FAQAccordion items={FAQ_ITEMS} color={color} />
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">¿Tienes otra pregunta?</p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: color, color: '#fff' }}
            >
              Escríbenos →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4k BLOG PREVIEW
      ══════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <SectionEyebrow texto="ÚLTIMAS NOTICIAS" color={color} />
                <SectionTitle>Del Blog de Hakamo</SectionTitle>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Ver todos
              </Link>
            </div>

            <div className={`grid gap-6 ${
              posts.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              posts.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
              'grid-cols-1 md:grid-cols-3'
            }`}>
              {posts.slice(0, 3).map((post: Post) => (
                <HomeBlogCard key={post.id} post={post} color={color} />
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Ver todos los artículos
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          4l NEWSLETTER
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: color }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-[0.3em] mb-4">Boletín</p>
          <h2
            className="text-white font-bold mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Suscríbete a nuestro boletín
          </h2>
          <p className="text-white/65 text-sm mb-8">
            Recibe las últimas noticias, consejos de recursos humanos y novedades de Hakamo.
            {/* TODO: conectar con servicio de email marketing */}
          </p>
          <NewsletterForm color={color} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4m CTA FINAL
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div
          className="max-w-5xl mx-auto rounded-3xl px-12 py-16 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)` }}
        >
          <div
            className="absolute inset-0 opacity-10 rounded-3xl"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
          />
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
              Da el siguiente paso
            </p>
            <h2
              className="text-white font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.02em' }}
            >
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto leading-relaxed text-sm">
              Cuéntanos tu necesidad. Nuestro equipo de expertos en talento humano está listo para ayudarte.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                style={{ backgroundColor: '#fff', color }}
              >
                Obtener Cotización →
              </Link>
              <a
                href="https://wa.me/18296790671"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

/* ── Blog card helper ─────────────────────────────────────── */

function HomeBlogCard({ post, color, large = false }: { post: Post; color: string; large?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className={`relative overflow-hidden bg-gray-100 ${large ? 'h-64' : 'h-44'}`}>
        {post.imagenPortada ? (
          <StrapiImage
            media={post.imagenPortada}
            alt={post.titulo}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }} />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {post.fechaPublicacion && (
          <time className="text-xs text-gray-400 mb-2 block">
            {new Date(post.fechaPublicacion).toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        )}
        <h3
          className={`font-bold leading-snug mb-2 ${large ? 'text-xl' : 'text-sm'}`}
          style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          {post.titulo}
        </h3>
        {post.resumen && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.resumen}</p>
        )}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4" style={{ color }}>
          Leer artículo →
        </span>
      </div>
    </Link>
  )
}
