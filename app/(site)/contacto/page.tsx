import FAQAccordion from '@/app/components/ui/FAQAccordion'
import { FAQ } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto — Hakamo Outsourcing',
  description:
    'Contáctanos para obtener una cotización o resolver tus dudas. Respondemos en menos de 24 horas.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

const CONTACTO_ITEMS = [
  {
    label: 'WHATSAPP',
    valor: '829-679-0671',
    href: 'https://wa.me/18296790671',
    icono: '💬',
    iconBg: '#25D366',
  },
  {
    label: 'EMAIL',
    valor: 'gestionhumanahakamo@gmail.com',
    href: 'mailto:gestionhumanahakamo@gmail.com',
    icono: '✉️',
    iconBg: ACCENT,
  },
  {
    label: 'TELÉFONO',
    valor: '829-679-6842',
    href: 'tel:+18296796842',
    icono: '📞',
    iconBg: PRIMARY,
  },
  {
    label: 'UBICACIÓN',
    valor: 'Montecristi, República Dominicana',
    href: null,
    icono: '📍',
    iconBg: '#64748B',
  },
  {
    label: 'INSTAGRAM',
    valor: '@hakamord',
    href: 'https://www.instagram.com/hakamord/',
    icono: '📸',
    iconBg: '#E1306C',
  },
]

export default function ContactoPage() {
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
            ¿Listo para optimizar tu{' '}
            <span style={{ color: '#93C5FD' }}>capital humano?</span>
          </h1>
          <p className="text-xl text-white/75 max-w-2xl leading-relaxed">
            Cuéntanos tu necesidad. En menos de 24 horas un especialista de Hakamo te contacta
            para diseñar la solución perfecta.
          </p>
        </div>
      </section>

      {/* ── Layout 2 columnas ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Izquierda — Cards de contacto */}
          <div>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              Información de contacto
            </h2>
            <div className="space-y-4">
              {CONTACTO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: `${item.iconBg}20` }}
                  >
                    {item.icono}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium break-all transition-opacity hover:opacity-70"
                        style={{ color: ACCENT }}
                      >
                        {item.valor}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-700">{item.valor}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Derecha — FAQ Accordion */}
          <div>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              Preguntas frecuentes
            </h2>
            <FAQAccordion items={FAQ} color={ACCENT} />
          </div>

        </div>
      </section>

    </main>
  )
}
