import { SERVICIOS, MARCO_LEGAL, PROCESO_EMPRESAS, PLANES } from '@/lib/data'
import ParallaxHero from '@/app/components/ui/ParallaxHero'
import SectionReveal from '@/app/components/ui/SectionReveal'
import {
  ICONOS_SERVICIO,
  ICONOS_MARCO_LEGAL,
  IconAcuerdo,
  IconEquipo,
  IconPergamino,
} from '@/app/components/ui/iconos'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios — Hakamo Outsourcing',
  description:
    'Servicios especializados de outsourcing de personal, reclutamiento, nómina y consultoría laboral para empresas dominicanas.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

export default function ServiciosPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero: parallax y desvanecido al hacer scroll ── */}
      <ParallaxHero
        className="py-28 px-6 text-white"
        style={{ backgroundColor: PRIMARY }}
        background={
          <>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10 bg-white" />
          </>
        }
      >
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal offset={40}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white/70 border border-white/20 bg-white/5 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
              </span>
              Lo que ofrecemos
            </div>
          </SectionReveal>
          <SectionReveal offset={56} delay={0.08}>
            <h1
              className="font-bold mb-5 leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.03em',
              }}
            >
              Servicios especializados de{' '}
              <em className="font-serif font-normal italic" style={{ color: '#93C5FD' }}>
                talento humano
              </em>
            </h1>
          </SectionReveal>
          <SectionReveal offset={44} delay={0.16}>
            <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
              Soluciones integrales diseñadas para la realidad empresarial dominicana, con pleno
              cumplimiento de la normativa laboral vigente.
            </p>
          </SectionReveal>
        </div>
      </ParallaxHero>

      {/* ── Grid de servicios ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIOS.map((servicio, i) => {
              const IconoServicio = ICONOS_SERVICIO[servicio.slug] ?? IconEquipo
              return (
              // Escalonado en cascada: el retardo crece con el índice.
              <SectionReveal key={servicio.slug} offset={30} delay={i * 0.06} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--brand-accent)] hover:shadow-xl">
                  <div
                    className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: PRIMARY }}
                  />
                  {/* Resplandor de esquina al pasar el ratón */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                    style={{ backgroundColor: ACCENT }}
                  />

                  <div
                    className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-white"
                    style={{ backgroundColor: '#F1F5F9', color: ACCENT }}
                  >
                    <IconoServicio size={26} />
                  </div>
                  <h2
                    className="relative mb-3 text-lg font-bold"
                    style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {servicio.titulo}
                  </h2>
                  <p className="relative mb-5 flex-1 text-sm leading-relaxed text-gray-500">
                    {servicio.descripcion}
                  </p>
                  <div className="relative mb-5 flex flex-wrap gap-2">
                    {servicio.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contacto"
                    className="relative inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: ACCENT }}
                  >
                    Solicitar servicio
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                </div>
              </SectionReveal>
              )
            })}

            {/* CTA card */}
            <SectionReveal offset={30} delay={SERVICIOS.length * 0.06} className="h-full">
              <div className="group flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center transition-colors hover:border-[var(--brand-accent)]">
                <div
                  className="mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: ACCENT }}
                >
                  <IconAcuerdo size={30} />
                </div>
                <h3
                  className="mb-2 text-base font-bold"
                  style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  ¿Necesitas algo a medida?
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-500">
                  Diseñamos soluciones personalizadas según las necesidades específicas de tu empresa.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Consultar →
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Marco legal ── */}
      <section className="py-24 px-6" style={{ backgroundColor: PRIMARY }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal offset={40}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white/70 border border-white/20 bg-white/5 mb-6">
                Marco legal dominicano
              </div>
              <h2
                className="text-white font-bold mb-5"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Cumplimiento total con la{' '}
                <em className="font-serif font-normal italic" style={{ color: '#93C5FD' }}>
                  ley dominicana
                </em>
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Operamos bajo plena conformidad con el Código Laboral (Ley 16-92) y todas las
                regulaciones de seguridad social vigentes. Asumimos la responsabilidad patronal para
                que tu empresa nunca enfrente contingencias laborales, multas o litigios.
              </p>
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-white transition-all hover:shadow-xl hover:-translate-y-0.5"
                style={{ color: PRIMARY }}
              >
                Habla con un especialista
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </SectionReveal>
            <div className="space-y-4">
              {MARCO_LEGAL.map((item, i) => {
                const IconoLegal = ICONOS_MARCO_LEGAL[item.titulo] ?? IconPergamino
                return (
                <SectionReveal key={item.titulo} offset={26} delay={0.1 + i * 0.07}>
                  <div className="group flex gap-4 rounded-xl bg-white/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.16]">
                    <div className="flex-shrink-0 text-white/80 transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                      <IconoLegal size={24} />
                    </div>
                    <div>
                      <h3
                        className="mb-1 text-sm font-semibold text-white"
                        style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                      >
                        {item.titulo}
                      </h3>
                      <p className="text-xs leading-relaxed text-white/65">{item.descripcion}</p>
                    </div>
                  </div>
                </SectionReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Proceso ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionReveal offset={36}>
            <div className="text-center mb-16">
              <p
                className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
                style={{ color: ACCENT }}
              >
                Cómo trabajamos
              </p>
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: '#0D1B5E',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Nuestro proceso en{' '}
                <em className="font-serif font-normal italic" style={{ color: ACCENT }}>
                  4 pasos
                </em>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                Simple, transparente y orientado a resultados desde el primer contacto.
              </p>
            </div>
          </SectionReveal>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hidden md:block absolute top-[2rem] left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />
            {PROCESO_EMPRESAS.map((paso, i) => (
              <SectionReveal key={i} offset={32} delay={i * 0.1} className="relative z-10">
                <div className="group flex flex-col items-center text-center">
                  <div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    {paso.paso}
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {paso.subtitulo}
                  </p>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {paso.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">{paso.descripcion}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planes ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal offset={36}>
            <div className="text-center mb-14">
              <p
                className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
                style={{ color: ACCENT }}
              >
                Elige tu plan
              </p>
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: '#0D1B5E',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Planes y{' '}
                <em className="font-serif font-normal italic" style={{ color: ACCENT }}>
                  Precios
                </em>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                Cada plan incluye cumplimiento legal garantizado. Solicita una cotización
                personalizada para tu empresa.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANES.map((plan, i) => (
              <SectionReveal key={plan.nombre} offset={34} delay={i * 0.1} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl p-8 transition-all duration-300 ${
                  plan.destacado
                    ? 'text-white shadow-xl md:scale-105 hover:shadow-2xl'
                    : 'bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 hover:border-[var(--brand-accent)]'
                }`}
                style={plan.destacado ? { backgroundColor: PRIMARY } : {}}
              >
                {plan.destacado && plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="bg-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm"
                      style={{ color: PRIMARY }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}
                <h3
                  className="font-bold text-lg mb-2"
                  style={{
                    color: plan.destacado ? '#fff' : '#0D1B5E',
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  }}
                >
                  {plan.nombre}
                </h3>
                <p
                  className="text-3xl font-bold mb-1"
                  style={{
                    color: plan.destacado ? '#fff' : PRIMARY,
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  }}
                >
                  {plan.precio}
                </p>
                <p className={`text-sm mb-6 ${plan.destacado ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.descripcion}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg
                        className="mt-0.5 flex-shrink-0"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={plan.destacado ? 'rgba(255,255,255,0.8)' : ACCENT}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span
                        className={`text-sm ${plan.destacado ? 'text-white/80' : 'text-gray-600'}`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaLink}
                  className="block rounded-xl py-3.5 text-center text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                  style={
                    plan.destacado
                      ? { backgroundColor: '#fff', color: PRIMARY }
                      : { backgroundColor: `${PRIMARY}10`, color: PRIMARY }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
