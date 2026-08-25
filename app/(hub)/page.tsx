import { COMPANY_INFO, STATS, CLIENTES, PROCESO_EMPRESAS } from '@/lib/data'
import ParallaxHero from '@/app/components/ui/ParallaxHero'
import SectionReveal from '@/app/components/ui/SectionReveal'
import StrokeText from '@/app/components/ui/StrokeText'
import TextType from '@/app/components/ui/TextType'
import TextLoop from '@/app/components/ui/TextLoop'
import StatsCounter from '@/app/components/ui/StatsCounter'
import ShapeGrid from '@/app/components/ui/ShapeGrid'
import ClienteCard from '@/app/components/ui/ClienteCard'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

const AntigravityBackground = dynamic(
  () => import('@/app/components/ui/AntigravityBackground'),
  { loading: () => null },
)

const ProcesoToggle = dynamic(() => import('@/app/components/ui/ProcesoToggle'), {
  loading: () => <div className="min-h-[280px]" aria-hidden />,
})

export const metadata: Metadata = {
  title: 'Hakamo Outsourcing | Capital Humano para Grandes Proyectos',
  description:
    'Empresa dominicana especializada en outsourcing de personal, reclutamiento y gestión de talento humano. Cumplimiento legal garantizado.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

const STATS_CONTADOR = STATS.map((s) => ({ num: s.valor, label: s.etiqueta }))

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)]">

      {/* ── HERO ── */}
      <ParallaxHero
        className="flex min-h-[100svh] items-center px-6 py-24 text-white"
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
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white opacity-10" />
            <AntigravityBackground
              color={ACCENT}
              opacity={0.6}
              magnetRadius={9}
              ringRadius={8}
              waveSpeed={1.5}
              waveAmplitude={3}
              lerpSpeed={0.22}
              autoAnimate
              particleVariance={1.3}
            />
          </>
        }
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy */}
            <div>
              <SectionReveal offset={36}>
                <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                  </span>
                  Proyectos a gran escala
                </div>
              </SectionReveal>

              <h1 className="mb-5" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                <span className="sr-only">Capital humano para grandes proyectos</span>
                <StrokeText
                  text="Capital humano para"
                  strokeColor="#ffffff"
                  fillColor="#ffffff"
                  strokeWidth={1.2}
                  drawDuration={1.4}
                  fillDelay={0.15}
                  stagger={0.04}
                  fillMode="wipe"
                  trigger="mount"
                  fontSize={96}
                  fontWeight={700}
                  letterSpacing={-3}
                />
                <TextType
                  as="span"
                  text="grandes proyectos."
                  typingSpeed={62}
                  initialDelay={1600}
                  loop={false}
                  showCursor
                  cursorCharacter="_"
                  cursorClassName="opacity-70"
                  className="mt-1 block font-bold leading-[1.05]"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.2vw + 1.2svh, 3.2rem)',
                    color: '#93C5FD',
                    letterSpacing: '-0.03em',
                  }}
                />
              </h1>

              <SectionReveal offset={40} delay={0.12}>
                <p className="max-w-xl text-lg leading-relaxed text-white/75">
                  Gestionamos equipos de trabajo para proyectos de construcción, energía e
                  infraestructura. Experiencia comprobada en sectores industriales de alta exigencia.
                </p>
              </SectionReveal>

              <SectionReveal offset={32} delay={0.2}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/empleo"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Trabaja con nosotros
                    <span aria-hidden className="transition-transform group-hover:translate-x-1.5">→</span>
                  </Link>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    Contáctanos
                  </Link>
                </div>
              </SectionReveal>
            </div>

            {/* Vista previa del proceso */}
            <SectionReveal offset={44} delay={0.18}>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.06] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="ml-3 text-xs font-medium text-white/50">Así trabajamos contigo</span>
                </div>
                <div className="space-y-3 p-5">
                  {PROCESO_EMPRESAS.slice(0, 3).map((paso, i) => (
                    <div
                      key={paso.paso}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09]"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px"
                        style={{ background: `linear-gradient(to right, transparent, ${['#60A5FA', '#7DD3FC', '#93C5FD'][i]}, transparent)` }}
                      />
                      <div className="flex items-start gap-3">
                        <span
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `linear-gradient(145deg, ${ACCENT}, ${PRIMARY})` }}
                        >
                          {paso.paso}
                        </span>
                        <div>
                          <h3
                            className="text-sm font-bold text-white"
                            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                          >
                            {paso.titulo}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/55">
                            {paso.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </ParallaxHero>

      {/* ── STATS: cifras que cuentan al entrar ── */}
      <section className="relative overflow-hidden px-6 py-16" style={{ backgroundColor: '#0B1220' }}>
        <div className="absolute inset-0 opacity-[0.1]">
          <ShapeGrid
            direction="right"
            speed={0.35}
            squareSize={58}
            shape="square"
            borderColor="rgba(255,255,255,0.35)"
            hoverFillColor={ACCENT}
            hoverTrailAmount={5}
          />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <StatsCounter stats={STATS_CONTADOR} />
        </div>
      </section>

      {/* ── CLIENTES ── */}
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionReveal offset={36}>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
                Empresas aliadas
              </p>
              <h2
                className="font-bold leading-[1.1]"
                style={{
                  fontSize: 'clamp(1.7rem, 2.4vw + 1.1svh, 2.9rem)',
                  color: 'var(--brand-primary-dark, #0D1B5E)',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Empresas que{' '}
                <em className="font-serif font-normal italic" style={{ color: ACCENT }}>
                  confían en Hakamo
                </em>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: '1200px' }}>
            {CLIENTES.map((cliente, i) => (
              <ClienteCard key={cliente.nombre} cliente={cliente} indice={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--surface-wash)' }}>
        <SectionReveal offset={36}>
          <div className="mb-4 px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
              Cómo trabajamos
            </p>
          </div>
        </SectionReveal>

        <TextLoop
          text="Talento conectado"
          shape="wave"
          speed={70}
          separator="✦"
          curviness={50}
          fontSize={30}
          fontWeight={800}
          letterSpacing={1}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor={ACCENT}
          ribbonWidth={56}
          pauseOnHover
          className="mb-6"
        />

        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal offset={30} delay={0.1}>
            <ProcesoToggle />
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden px-6 py-20 lg:py-28"
        style={{ background: `linear-gradient(175deg, ${PRIMARY}, #0B1220)` }}
      >
        <div className="absolute inset-0 opacity-[0.12]">
          <ShapeGrid
            direction="diagonal"
            speed={0.4}
            squareSize={64}
            shape="square"
            borderColor="rgba(255,255,255,0.35)"
            hoverFillColor={ACCENT}
            hoverTrailAmount={6}
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <SectionReveal offset={40}>
            <h2
              className="mb-5 font-bold text-white"
              style={{
                fontSize: 'clamp(1.9rem, 2.6vw + 1.2svh, 3rem)',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              ¿Listo para optimizar tu{' '}
              <em className="font-serif font-normal italic" style={{ color: '#93C5FD' }}>
                capital humano
              </em>
              ?
            </h2>
            <p className="mx-auto mb-10 max-w-md leading-relaxed text-white/65">
              Cuéntanos tu necesidad. Nuestro equipo está listo para diseñar la solución perfecta.
            </p>
          </SectionReveal>

          <SectionReveal offset={30} delay={0.12}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Enviar correo
                <span aria-hidden className="transition-transform group-hover:translate-x-1.5">→</span>
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

    </main>
  )
}
