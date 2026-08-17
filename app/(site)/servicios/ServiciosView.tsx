'use client'

import { SERVICIOS, MARCO_LEGAL, PROCESO_EMPRESAS, PLANES } from '@/lib/data'
import ParallaxHero from '@/app/components/ui/ParallaxHero'
import SectionReveal from '@/app/components/ui/SectionReveal'
import SmoothScroll from '@/app/components/ui/SmoothScroll'
import { SpotlightCard } from '@/app/components/ui/SpotlightCard'
import Aurora from '@/app/components/ui/Aurora/Aurora'
import {
  ICONOS_SERVICIO,
  ICONOS_MARCO_LEGAL,
  IconAcuerdo,
  IconEquipo,
  IconPergamino,
} from '@/app/components/ui/iconos'
import SplashCursor from '@/app/components/ui/SplashCursor/SplashCursor'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ParallaxSection from '@/app/components/ui/ParallaxSection'

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

const dotsBg = (
  <>
    <div
      className="absolute -left-20 top-1/4 h-72 w-72 rounded-full opacity-30"
      style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.55), transparent 70%)' }}
    />
    <div
      className="absolute -right-16 bottom-1/4 h-80 w-80 rounded-full opacity-25"
      style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.35), transparent 70%)' }}
    />
  </>
)

const glowBg = (
  <>
    <div
      className="absolute inset-0 opacity-50"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,99,235,0.55), transparent 55%), radial-gradient(circle at 90% 80%, rgba(147,197,253,0.18), transparent 40%)',
      }}
    />
    <div
      className="absolute left-1/3 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
      style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4), transparent 65%)' }}
    />
  </>
)

/** En grid de 3: izquierda ←, centro ↗, derecha → */
function entradaColumna(index: number): 'left' | 'right' | 'center' {
  const col = index % 3
  if (col === 0) return 'left'
  if (col === 2) return 'right'
  return 'center'
}

export default function ServiciosView() {
  const planDestacado = PLANES.find((p) => p.destacado) ?? PLANES[1]
  const planesSecundarios = PLANES.filter((p) => p.nombre !== planDestacado.nombre)

  return (
    <SmoothScroll>
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#2563EB"
      />
      <main className="min-h-screen">

        <ParallaxHero
          className="relative flex min-h-[100svh] items-center px-6 py-28 text-white"
          style={{ backgroundColor: PRIMARY }}
          background={
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 opacity-90">
                <Aurora
                  colorStops={['#5227FF', '#06B6D4', '#5227FF']}
                  amplitude={1}
                  blend={0.5}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />
            </div>
          }
        >
          <div className="mx-auto max-w-4xl text-center">
            <SectionReveal offset={40}>
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                </span>
                Lo que ofrecemos
              </div>
            </SectionReveal>
            <SectionReveal offset={56} delay={0.08}>
              <h1
                className="mb-5 font-bold leading-tight"
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
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/75">
                Soluciones integrales diseñadas para la realidad empresarial dominicana, con pleno
                cumplimiento de la normativa laboral vigente.
              </p>
            </SectionReveal>
          </div>
        </ParallaxHero>

        {/* Servicios — lista editorial + splash cursor */}
        <ParallaxSection
          className="px-6 py-24"
          style={{ backgroundColor: PRIMARY }}
          foregroundDistance={220}
          backgroundDistance={55}
          background={dotsBg}
        >
          <div className="mx-auto max-w-6xl">
            <SectionReveal offset={36}>
              <div className="mb-12 flex flex-col gap-4 border-b border-white/10 pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#93C5FD]">
                    Catálogo
                  </p>
                  <h2
                    className="font-bold text-white"
                    style={{
                      fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)',
                      fontFamily: 'var(--font-space-grotesk, sans-serif)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Ocho soluciones de{' '}
                    <em className="font-serif font-normal italic" style={{ color: '#93C5FD' }}>
                      capital humano
                    </em>
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-white/50 md:text-right">
                  De outsourcing a supervisión de obra — todo con cumplimiento legal dominicano.
                </p>
              </div>
            </SectionReveal>

            <div className="divide-y divide-white/10">
              {SERVICIOS.map((servicio, i) => {
                const IconoServicio = ICONOS_SERVICIO[servicio.slug] ?? IconEquipo
                const from = i % 2 === 0 ? 'left' : 'right'
                const num = String(i + 1).padStart(2, '0')
                return (
                  <SectionReveal key={servicio.slug} from={from} offset={56} delay={0.04 + (i % 4) * 0.05}>
                    <SpotlightCard className="group rounded-none border-0 bg-transparent px-0 py-8 md:py-10">
                      <div className="grid items-start gap-6 md:grid-cols-[4.5rem_1fr_auto] md:gap-10">
                        <span
                          className="text-3xl font-bold tabular-nums text-white/20 transition-colors duration-300 group-hover:text-[#93C5FD] md:text-4xl"
                          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                        >
                          {num}
                        </span>

                        <div className="min-w-0">
                          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <h3
                              className="text-xl font-bold text-white transition-colors md:text-2xl"
                              style={{
                                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                                letterSpacing: '-0.02em',
                              }}
                            >
                              {servicio.titulo}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {servicio.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-white/55 md:text-[15px]">
                            {servicio.descripcion}
                          </p>
                          <Link
                            href="/contacto"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#93C5FD] transition-all group-hover:gap-3"
                          >
                            Solicitar servicio
                            <span aria-hidden>→</span>
                          </Link>
                        </div>

                        <div
                          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#93C5FD] transition-all duration-300 group-hover:scale-110 group-hover:border-white/25 group-hover:bg-[#2563EB] group-hover:text-white md:h-20 md:w-20"
                          aria-hidden
                        >
                          <IconoServicio size={28} />
                        </div>
                      </div>
                    </SpotlightCard>
                  </SectionReveal>
                )
              })}
            </div>

            <SectionReveal offset={40} delay={0.15}>
              <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-white/20 bg-white/[0.04] p-8 md:flex-row md:items-center md:p-10">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <IconAcuerdo size={22} />
                  </div>
                  <div>
                    <h3
                      className="mb-1 text-lg font-bold text-white"
                      style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                    >
                      ¿Necesitas algo a medida?
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-white/55">
                      Armamos un paquete según tu operación, sector y volumen de personal.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{ color: PRIMARY }}
                >
                  Consultar
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </ParallaxSection>

        {/* Marco legal — grid Hakamo + spotlight + motion */}
        <ParallaxSection
          className="px-6 py-24"
          style={{ backgroundColor: PRIMARY }}
          foregroundDistance={220}
          backgroundDistance={55}
          background={glowBg}
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionReveal offset={36}>
              <div className="mx-auto mb-14 max-w-3xl text-center">
                <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                  </span>
                  Marco legal dominicano
                </div>
                <h2
                  className="mb-4 font-bold text-white"
                  style={{
                    fontSize: 'clamp(1.75rem, 3.2vw, 2.6rem)',
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Cumplimiento total con la{' '}
                  <em className="font-serif font-normal italic" style={{ color: '#93C5FD' }}>
                    ley dominicana
                  </em>
                </h2>
                <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                  Operamos bajo el Código Laboral (Ley 16-92) y las regulaciones de seguridad social
                  vigentes. Asumimos la responsabilidad patronal para que tu empresa no enfrente
                  contingencias, multas o litigios.
                </p>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {MARCO_LEGAL.map((item, i) => {
                const from = entradaColumna(i)
                const IconoLegal = ICONOS_MARCO_LEGAL[item.titulo] ?? IconPergamino
                return (
                  <SectionReveal
                    key={item.titulo}
                    from={from}
                    offset={72}
                    delay={0.08 + i * 0.1}
                    className="h-full"
                  >
                    <SpotlightCard className="h-full min-h-[320px] rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.11]">
                      <div className="flex h-full min-h-[280px] flex-col justify-between">
                        <div>
                          <h3
                            className="mb-2 text-[15px] font-semibold leading-snug text-white"
                            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                          >
                            {item.titulo}
                          </h3>
                          <p className="text-[13px] leading-relaxed text-white/60">{item.descripcion}</p>
                        </div>
                        <motion.div
                          className="flex items-end justify-center pb-2 text-[#93C5FD] drop-shadow-[0_16px_24px_rgba(15,23,42,0.45)]"
                          aria-hidden
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 3.6,
                            delay: i * 0.35,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          whileHover={{ scale: 1.12, rotate: -4 }}
                        >
                          <IconoLegal size={72} />
                        </motion.div>
                      </div>
                    </SpotlightCard>
                  </SectionReveal>
                )
              })}
            </div>

            <SectionReveal offset={28} delay={0.35}>
              <div className="mt-12 flex justify-center">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.55)]"
                  style={{ color: PRIMARY }}
                >
                  Habla con un especialista
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </ParallaxSection>

        <ParallaxSection
          className="px-6 py-24"
          style={{ backgroundColor: PRIMARY }}
          foregroundDistance={220}
          backgroundDistance={55}
          background={dotsBg}
        >
          <div className="mx-auto max-w-6xl">
            <SectionReveal offset={36}>
              <div className="mb-16 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#93C5FD]">
                  Cómo trabajamos
                </p>
                <h2
                  className="mb-4 font-bold text-white"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Nuestro proceso en{' '}
                  <em className="font-serif font-normal italic" style={{ color: '#93C5FD' }}>
                    4 pasos
                  </em>
                </h2>
                <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/65">
                  Simple, transparente y orientado a resultados desde el primer contacto.
                </p>
              </div>
            </SectionReveal>

            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-[2rem] z-0 hidden h-px bg-white/20 md:block" />
              {PROCESO_EMPRESAS.map((paso, i) => (
                <SectionReveal key={i} offset={32} delay={i * 0.1} className="relative z-10">
                  <div className="group flex flex-col items-center text-center">
                    <div
                      className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {paso.paso}
                    </div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/45">
                      {paso.subtitulo}
                    </p>
                    <h3
                      className="mb-2 text-base font-bold text-white"
                      style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                    >
                      {paso.titulo}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">{paso.descripcion}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection
          className="px-6 py-24"
          style={{ backgroundColor: PRIMARY }}
          foregroundDistance={220}
          backgroundDistance={55}
          background={glowBg}
        >
          <div className="mx-auto max-w-6xl">
            <SectionReveal offset={36}>
              <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#93C5FD]">
                    Elige tu plan
                  </p>
                  <h2
                    className="font-bold text-white"
                    style={{
                      fontSize: 'clamp(1.9rem, 3.4vw, 3rem)',
                      fontFamily: 'var(--font-space-grotesk, sans-serif)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Planes y{' '}
                    <em className="font-serif font-normal italic" style={{ color: '#93C5FD' }}>
                      precios
                    </em>
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/55 lg:text-right">
                  Cumplimiento legal incluido en todos los planes. Cotización a medida según el
                  tamaño y ritmo de tu operación.
                </p>
              </div>
            </SectionReveal>

            <div className="space-y-5">
                  <SectionReveal offset={48} from="center">
                    <SpotlightCard className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-transparent p-8 md:p-10">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-50"
                        style={{
                          background: 'radial-gradient(circle, rgba(37,99,235,0.55), transparent 70%)',
                        }}
                      />
                      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                        <div>
                          <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-[#2563EB] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                              {planDestacado.badge || 'Recomendado'}
                            </span>
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                              Plan {planDestacado.nombre}
                            </span>
                          </div>
                          <p
                            className="mb-2 font-bold text-white"
                            style={{
                              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                              fontFamily: 'var(--font-space-grotesk, sans-serif)',
                              letterSpacing: '-0.04em',
                              lineHeight: 1,
                            }}
                          >
                            {planDestacado.precio}
                          </p>
                          <p className="mb-8 max-w-md text-base leading-relaxed text-white/65">
                            {planDestacado.descripcion}
                          </p>
                          <Link
                            href={planDestacado.ctaLink}
                            className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.55)]"
                            style={{ color: PRIMARY }}
                          >
                            {planDestacado.cta}
                            <span
                              aria-hidden
                              className="transition-transform duration-300 group-hover:translate-x-1.5"
                            >
                              →
                            </span>
                          </Link>
                        </div>

                        <ul className="grid gap-3 sm:grid-cols-2">
                          {planDestacado.features.map((f, fi) => (
                            <motion.li
                              key={f}
                              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3"
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.4 }}
                              transition={{ delay: 0.05 + fi * 0.04, duration: 0.4 }}
                            >
                              <span
                                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                style={{ backgroundColor: ACCENT }}
                              >
                                ✓
                              </span>
                              <span className="text-sm leading-snug text-white/80">{f}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightCard>
                  </SectionReveal>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {planesSecundarios.map((plan, i) => (
                      <SectionReveal
                        key={plan.nombre}
                        from={i === 0 ? 'left' : 'right'}
                        offset={56}
                        delay={0.1 + i * 0.08}
                        className="h-full"
                      >
                        <SpotlightCard className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-7 transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.09]">
                          <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
                                0{i === 0 ? '1' : '3'}
                              </p>
                              <h3
                                className="text-2xl font-bold text-white"
                                style={{
                                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                                  letterSpacing: '-0.02em',
                                }}
                              >
                                {plan.nombre}
                              </h3>
                            </div>
                            <p
                              className="text-lg font-semibold text-[#93C5FD]"
                              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                            >
                              {plan.precio}
                            </p>
                          </div>
                          <p className="mb-6 text-sm leading-relaxed text-white/55">{plan.descripcion}</p>
                          <ul className="mb-8 flex-1 space-y-2.5 border-t border-white/10 pt-5">
                            {plan.features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#60A5FA]" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={plan.ctaLink}
                            className="inline-flex items-center justify-between rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-white transition-all group-hover:border-white/30 group-hover:bg-white/10"
                          >
                            {plan.cta}
                            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        </SpotlightCard>
                      </SectionReveal>
                    ))}
                  </div>
                </div>
          </div>
        </ParallaxSection>
      </main>
    </SmoothScroll>
  )
}
