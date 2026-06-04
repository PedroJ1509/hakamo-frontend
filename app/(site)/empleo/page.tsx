import EmpleoForm from '@/app/components/ui/EmpleoForm'
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
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-28 px-6 text-white"
        style={{ backgroundColor: PRIMARY }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1
            className="font-bold mb-5 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              letterSpacing: '-0.03em',
            }}
          >
            Encuentra tu próxima{' '}
            <span style={{ color: ACCENT }}>oportunidad laboral</span>
          </h1>
          <p className="text-xl text-white/75 max-w-2xl leading-relaxed">
            Conectamos talento dominicano con las empresas más importantes del país. Envía tu
            currículum y te contactamos cuando haya una oportunidad para tu perfil.
          </p>
        </div>
      </section>

      {/* ── Formulario ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Izquierda */}
          <div className="lg:col-span-2">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              Trabaja en proyectos de alto impacto
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Hakamo conecta profesionales dominicanos con proyectos en los sectores de
              construcción, energía, manufactura y servicios. Regístrate y sé el primero en
              enterarte de nuevas oportunidades.
            </p>
            <ul className="space-y-4">
              {BENEFICIOS.map((beneficio) => (
                <li key={beneficio} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 flex-shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-gray-600 leading-relaxed">{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Derecha — formulario client component */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                Registra tu perfil
              </h3>
              <EmpleoForm />
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
