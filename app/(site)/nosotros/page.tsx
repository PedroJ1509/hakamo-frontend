import { MISION_VISION, VALORES, EQUIPO, CLIENTES } from '@/lib/data'
import HorizontalPanels from '@/app/components/ui/HorizontalPanels'
import PanelReveal from '@/app/components/ui/PanelReveal'
import AntigravityBackground from '@/app/components/ui/AntigravityBackground'
import OrbitalTeam from '@/app/components/ui/OrbitalTeam'
import ParallaxCards from '@/app/components/ui/ParallaxCards'
import Preloader from '@/app/components/ui/Preloader'
import ParallaxHero from '@/app/components/ui/ParallaxHero'
import StrokeText from '@/app/components/ui/StrokeText'
import TextType from '@/app/components/ui/TextType'
import MaskedHeading from '@/app/components/ui/MaskedHeading'
import Masonry from '@/app/components/ui/Masonry'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros — Hakamo Outsourcing',
  description:
    'Conoce a Hakamo Outsourcing: misión, visión, valores y el equipo detrás del talento dominicano.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

/** Brújula: rumbo, para la Misión. */
function IconBrujula() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5 15.5 8.5" />
    </svg>
  )
}

/** Trayectoria ascendente: hacia dónde vamos, para la Visión. */
function IconTrayectoria() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="15 7 21 7 21 13" />
    </svg>
  )
}

/** Escudo: lo que protegemos, para los Valores. */
function IconEscudo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z" />
      <polyline points="9 12 11.2 14.2 15.2 10.2" />
    </svg>
  )
}

/** Ícono y enlace de cada tarjeta de misión / visión / valores, en ese orden. */
/**
 * Piezas del mosaico de clientes. Logos en /public/clientes.
 */
const IMAGENES_CLIENTES = [
  '/clientes/energia-2000.png',
  '/clientes/lindsayca.jpg',
  '/clientes/tsk.jpg',
  '/clientes/grupo-ramos.svg',
]

/** Alturas dispares: es lo que produce el escalonado propio de un mosaico. */
const ALTURAS_MOSAICO = [460, 360, 540, 400]

const CLIENTES_MOSAICO = CLIENTES.map((cliente, i) => ({
  id: String(i + 1),
  img: IMAGENES_CLIENTES[i % IMAGENES_CLIENTES.length],
  height: ALTURAS_MOSAICO[i % ALTURAS_MOSAICO.length],
  label: cliente.nombre,
  sublabel: cliente.sector,
}))

const ENLACES_MVV = [
  { label: 'Ver nuestros servicios', href: '/servicios', Icono: IconBrujula },
  { label: 'Trabaja con nosotros', href: '/empleo', Icono: IconTrayectoria },
  { label: 'Hablemos', href: '/contacto', Icono: IconEscudo },
]

/** Envoltura común: cada panel ocupa la pantalla y centra su contenido. */
function Panel({
  children,
  background,
  className = '',
  style,
}: {
  children: React.ReactNode
  /** Capa decorativa detrás del contenido. */
  background?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      // min-h-full y sin overflow-hidden: en modo apilado (móvil) el panel debe
      // poder crecer con su contenido. El recorte lo hace la sección del track.
      className={`relative flex min-h-full items-center px-6 ${className}`.trim()}
      // El padding escala con la altura de la ventana: en pantallas bajas
      // se comprime y el panel sigue cabiendo sin scroll ni recortes.
      style={{ paddingBlock: 'clamp(1.25rem, 5svh, 4rem)', ...style }}
    >
      {background}
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
    </div>
  )
}

function Encabezado({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="text-center" style={{ marginBottom: 'clamp(1rem, 4svh, 2.5rem)' }}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
        {eyebrow}
      </p>
      <h2
        className="font-bold"
        style={{
          fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
          color: 'var(--brand-primary-dark, #0D1B5E)',
          fontFamily: 'var(--font-space-grotesk, sans-serif)',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400"
          style={{ marginTop: 'clamp(0.5rem, 1.5svh, 1rem)' }}
        >
          {lede}
        </p>
      ) : null}
    </div>
  )
}

export default function NosotrosPage() {
  const mvv = [MISION_VISION.mision, MISION_VISION.vision, MISION_VISION.valores]

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* ── Hero: parallax y desvanecido al hacer scroll, igual que empleo ── */}
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
              count={300}
              magnetRadius={9}
              ringRadius={8}
              waveSpeed={1.5}
              waveAmplitude={3}
              particleSize={2}
              lerpSpeed={0.22}
              autoAnimate
              particleVariance={1.3}
              rotationSpeed={0}
              depthFactor={1}
              pulseSpeed={3}
              particleShape="capsule"
              fieldStrength={10}
            />
          </>
        }
        // El telón va fuera del parallax: no debe desplazarse ni desvanecerse.
        overlay={
          <Preloader
            texto={
              <MaskedHeading
                text="Quiénes somos"
                tag="p"
                src="/mask-hakamo.svg"
                reveal="rise"
                trigger="mount"
                duration={1}
                stagger={0.1}
                fillScale={1.35}
                parallax={30}
                drift={14}
                textScale={0.16}
                weight={700}
                tracking={-0.035}
              />
            }
          />
        }
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
              </span>
              Quiénes somos
            </div>

            <h1 className="mb-5" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {/* El trazo es un SVG decorativo: el título accesible va aparte */}
              <span className="sr-only">La empresa detrás del talento dominicano</span>

              {/* Encadenado tras el telón: éste tarda ~2.4s en despejarse
                  (espera 1.9s + salida 0.7s con escalonado de columnas). */}
              <StrokeText
                text="La empresa detrás del"
                strokeColor="#ffffff"
                fillColor="#ffffff"
                strokeWidth={1.2}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.04}
                fillMode="wipe"
                trigger="mount"
                delay={2.4}
                fontSize={96}
                fontWeight={700}
                letterSpacing={-3}
              />

              <TextType
                as="span"
                text="talento dominicano"
                typingSpeed={62}
                initialDelay={3900}
                loop={false}
                showCursor
                cursorCharacter="_"
                cursorClassName="opacity-70"
                className="mt-1 block font-bold leading-[1.05]"
                style={{
                  fontSize: 'clamp(1.9rem, 2.6vw + 1.4svh, 3.6rem)',
                  color: '#93C5FD',
                  letterSpacing: '-0.03em',
                }}
              />
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/75">
              Somos una firma dominicana especializada en capital humano. Llevamos más de 5 años
              conectando empresas con el talento que necesitan para crecer, siempre con cumplimiento
              legal y ética profesional.
            </p>
            <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              Sigue bajando
              <span aria-hidden>↓</span>
            </p>
          </div>
        </div>
      </ParallaxHero>

      <HorizontalPanels>

        {/* ── 1. Misión, Visión, Valores ── */}
        <Panel background={<AntigravityBackground color={ACCENT} />}>
          {/* Encabezado asimétrico: titular a la izquierda, apoyo a la derecha */}
          <div
            className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-end"
            style={{ marginBottom: 'clamp(1rem, 4svh, 2.5rem)' }}
          >
            <PanelReveal x={-32}>
              <span
                className="mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Nuestra identidad
              </span>
              <h2
                className="font-bold leading-[1.1]"
                style={{
                  // Incluye svh para que también encoja en ventanas bajas.
                  fontSize: 'clamp(1.6rem, 2.2vw + 1.1svh, 3.1rem)',
                  color: 'var(--brand-primary-dark, #0D1B5E)',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Lo que nos mueve,{' '}
                <em className="font-serif font-normal italic" style={{ color: ACCENT }}>
                  hacia dónde vamos
                </em>
              </h2>
            </PanelReveal>
            <PanelReveal x={32} delay={0.12}>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 lg:pb-2">
                Tres principios que sostienen cada decisión que tomamos, desde a quién contratamos
                hasta cómo acompañamos a cada cliente.
              </p>
            </PanelReveal>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {mvv.map((item, i) => {
              const enlace = ENLACES_MVV[i]
              const Icono = enlace.Icono
              return (
                <PanelReveal key={item.titulo} y={40} delay={0.18 + i * 0.12}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--brand-accent)] hover:shadow-xl dark:bg-slate-900 lg:p-7">
                    {/* Resplandor que aparece al pasar el mouse */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                      style={{ backgroundColor: ACCENT }}
                    />

                    <div className="relative mb-5 flex items-start justify-between lg:mb-7">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                        style={{ backgroundColor: 'var(--surface-wash, #F1F5F9)', color: ACCENT }}
                      >
                        <Icono />
                      </span>
                      <span className="text-xs font-semibold tracking-[0.15em] text-gray-400 transition-colors group-hover:text-[var(--brand-accent)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3
                      className="relative mb-3 text-lg font-bold"
                      style={{
                        color: 'var(--brand-primary-dark, #0D1B5E)',
                        fontFamily: 'var(--font-space-grotesk, sans-serif)',
                      }}
                    >
                      {item.titulo}
                    </h3>
                    <p className="relative flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {item.texto}
                    </p>

                    <div className="relative mt-4 border-t border-[var(--border)] pt-3 lg:mt-6 lg:pt-4">
                      <Link
                        href={enlace.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                        style={{ color: ACCENT }}
                      >
                        {enlace.label}
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                </PanelReveal>
              )
            })}
          </div>
        </Panel>

        {/* ── 2. Valores ── */}
        <Panel
          background={<AntigravityBackground color={ACCENT} opacity={0.4} />}
          style={{ backgroundColor: 'var(--surface-wash, #F8F9FA)' }}
        >
          {/* Tarjetas dispersas alrededor y el texto en el centro libre.
              En móvil el componente cae a grilla con el texto arriba. */}
          <ParallaxCards items={VALORES}>
            <Encabezado
              eyebrow="Nuestros principios"
              title="Los valores que nos definen"
              lede="Cada interacción con nuestros clientes, candidatos y colaboradores está guiada por estos principios fundamentales."
            />
          </ParallaxCards>
        </Panel>

        {/* ── 3. Equipo ── */}
        <Panel background={<AntigravityBackground color={ACCENT} opacity={0.4} />}>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Izquierda: copy */}
            <PanelReveal x={-32}>
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.28em]"
                style={{ color: ACCENT }}
              >
                Las personas detrás
              </p>
              <h2
                className="mb-4 font-bold leading-[1.1]"
                style={{
                  fontSize: 'clamp(1.6rem, 2.2vw + 1.1svh, 2.8rem)',
                  color: 'var(--brand-primary-dark, #0D1B5E)',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Un equipo conectado{' '}
                <em className="font-serif font-normal italic" style={{ color: ACCENT }}>
                  alrededor de ti
                </em>
              </h2>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Cada área de Hakamo trabaja sobre el mismo expediente. No te pasan de mano en mano:
                una sola coordinación acompaña tu proceso de principio a fin.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contacto"
                  className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: ACCENT }}
                >
                  Hablar con el equipo
                </Link>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {EQUIPO.length} áreas coordinadas
                </span>
              </div>
            </PanelReveal>

            {/* Derecha: mapa orbital */}
            <PanelReveal x={32} delay={0.15}>
              <OrbitalTeam items={EQUIPO} />
            </PanelReveal>
          </div>
        </Panel>

        {/* ── 4. Clientes ── */}
        <Panel
          background={<AntigravityBackground color={ACCENT} opacity={0.4} />}
          style={{ backgroundColor: 'var(--surface-wash, #F8F9FA)' }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Izquierda: copy */}
            <PanelReveal x={-32}>
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.28em]"
                style={{ color: ACCENT }}
              >
                Confianza comprobada
              </p>
              <h2
                className="mb-4 font-bold leading-[1.1]"
                style={{
                  fontSize: 'clamp(1.6rem, 2.2vw + 1.1svh, 2.8rem)',
                  color: 'var(--brand-primary-dark, #0D1B5E)',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Empresas que han{' '}
                <em className="font-serif font-normal italic" style={{ color: ACCENT }}>
                  confiado en Hakamo
                </em>
              </h2>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Operaciones de energía, construcción, ingeniería y retail nos confían la gestión de
                su personal. Cada proyecto sostiene su propio equipo, con la misma exigencia.
              </p>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: ACCENT }}
              >
                Ver nuestros servicios
                <span aria-hidden>→</span>
              </Link>
            </PanelReveal>

            {/* Derecha: mosaico de logos de clientes */}
            <PanelReveal x={32} delay={0.15}>
              <div style={{ height: 'clamp(260px, 56svh, 520px)' }}>
                <Masonry
                  items={CLIENTES_MOSAICO}
                  ease="power3.out"
                  duration={0.6}
                  stagger={0.06}
                  animateFrom="bottom"
                  scaleOnHover
                  hoverScale={0.96}
                  blurToFocus
                  ajustarAlAlto
                  columnas={2}
                  imageFit="contain"
                  tileBackground="#ffffff"
                />
              </div>
            </PanelReveal>
          </div>
        </Panel>

      </HorizontalPanels>
    </main>
  )
}
