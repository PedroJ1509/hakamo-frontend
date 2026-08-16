import EmpleoForm from '@/app/components/ui/EmpleoForm'
import LineSidebar from '@/app/components/ui/LineSidebar'
import ParallaxHero from '@/app/components/ui/ParallaxHero'
import ParallaxLayer from '@/app/components/ui/ParallaxLayer'
import SectionReveal from '@/app/components/ui/SectionReveal'
import StrokeText from '@/app/components/ui/StrokeText'
import TextType from '@/app/components/ui/TextType'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Empleo — Hakamo Outsourcing',
  description:
    'Encuentra tu próxima oportunidad laboral. Registra tu perfil y te contactamos cuando haya una vacante que encaje contigo.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

const BENEFICIOS = [
  'Tu perfil queda en nuestra base de candidatos activos',
  'Te contactamos directamente por WhatsApp cuando hay una vacante',
  'Sin costo alguno para el candidato',
  'Trabajamos con empresas líderes en República Dominicana',
  'Soporte durante todo el proceso de integración',
]

export default function EmpleoPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)]">

      {/* ── Hero ── */}
      <ParallaxHero
        className="flex min-h-[100svh] items-center px-6 py-28 text-white"
        style={{ backgroundColor: PRIMARY }}
        background={
          <>
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
            {/* Formas con contorno definido: son las que hacen legible el desplazamiento */}
            <div
              className="absolute -right-20 -top-24 h-96 w-96 rounded-full"
              style={{ background: `radial-gradient(circle at 40% 40%, ${ACCENT}, transparent 68%)`, opacity: 0.55 }}
            />
            <div className="absolute -left-16 top-1/3 h-72 w-72 rounded-full border-2 border-white/25" />
            <div className="absolute bottom-[-3rem] right-1/4 h-56 w-56 rounded-full border-2 border-white/15" />
            <div
              className="absolute left-1/2 top-10 h-40 w-40 rotate-12 rounded-3xl border-2"
              style={{ borderColor: `${ACCENT}66` }}
            />
          </>
        }
      >
        <div className="mx-auto max-w-4xl">
          <SectionReveal offset={56}>
            <h1 className="mb-5" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {/* Texto accesible: el SVG y el typing son decorativos para el lector */}
              <span className="sr-only">Encuentra tu próxima oportunidad laboral</span>

              <StrokeText
                text="Encuentra tu próxima"
                strokeColor="#ffffff"
                fillColor="#ffffff"
                strokeWidth={1.2}
                drawDuration={1.5}
                fillDelay={0.15}
                stagger={0.045}
                fillMode="wipe"
                trigger="mount"
                fontSize={96}
                fontWeight={700}
                letterSpacing={-3}
                className="max-w-3xl"
              />

              <TextType
                as="span"
                text="oportunidad laboral"
                typingSpeed={62}
                initialDelay={1700}
                loop={false}
                showCursor
                cursorCharacter="_"
                cursorClassName="opacity-70"
                className="block font-bold leading-tight"
                style={{
                  fontSize: 'clamp(2.2rem, 4.4vw, 3.5rem)',
                  color: ACCENT,
                  letterSpacing: '-0.03em',
                }}
              />
            </h1>
          </SectionReveal>
          <SectionReveal offset={44} delay={0.12}>
            <p className="max-w-2xl text-xl leading-relaxed text-white/75">
              Conectamos talento dominicano con las empresas más importantes del país. Envía tu
              currículum y te contactamos cuando haya una oportunidad para tu perfil.
            </p>
          </SectionReveal>
        </div>
      </ParallaxHero>

      {/* ── Formulario ── */}
      <section className="flex min-h-[100svh] items-center bg-[var(--background)] px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-5">

          <div className="relative z-[50] lg:col-span-2">
            <SectionReveal offset={60}>
              <h2
                className="mb-5 text-2xl font-bold"
                style={{ color: 'var(--brand-primary-dark)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                Trabaja en proyectos de alto impacto
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
                Hakamo conecta profesionales dominicanos con proyectos en los sectores de
                construcción, energía, manufactura y servicios. Regístrate y sé el primero en
                enterarte de nuevas oportunidades.
              </p>
            </SectionReveal>
            <SectionReveal offset={48} delay={0.14}>
              <LineSidebar
                items={BENEFICIOS}
                accentColor={ACCENT}
                textColor="#6b7280"
                markerColor="#94a3b8"
                showIndex
                showMarker
                proximityRadius={110}
                maxShift={24}
                falloff="smooth"
                markerLength={48}
                itemGap={22}
                fontSize={0.95}
                defaultActive={0}
              />
            </SectionReveal>
          </div>

          <ParallaxLayer distance={-45} className="relative z-[50] lg:col-span-3">
            <SectionReveal offset={60} delay={0.08}>
              <h3
                className="mb-6 text-xl font-bold"
                style={{ color: 'var(--brand-primary-dark)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                Registra tu perfil
              </h3>
            </SectionReveal>
            <SectionReveal offset={52} delay={0.18}>
              <EmpleoForm />
            </SectionReveal>
          </ParallaxLayer>

        </div>
      </section>

    </main>
  )
}
