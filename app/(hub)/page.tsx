import { COMPANY_INFO, STATS, CLIENTES } from '@/lib/data'
import ProcesoToggle from '@/app/components/ui/ProcesoToggle'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakamo Outsourcing | Capital Humano para Grandes Proyectos',
  description:
    'Empresa dominicana especializada en outsourcing de personal, reclutamiento y gestión de talento humano. Cumplimiento legal garantizado.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: PRIMARY }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full opacity-5 bg-white" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white/70 border border-white/20 bg-white/10 mb-8">
              PROYECTOS A GRAN ESCALA
            </div>
            <h1
              className="text-white font-bold leading-[1.05] mb-6"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.03em',
              }}
            >
              Capital humano para<br />
              <span style={{ color: ACCENT }}>grandes proyectos.</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl">
              Gestionamos equipos de trabajo para proyectos de construcción, energía e
              infraestructura. Experiencia comprobada en sectores industriales de alta exigencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/empleo"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                style={{ backgroundColor: ACCENT }}
              >
                Trabaja con nosotros →
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-all"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
          <span className="text-white text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#EEF2FF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.etiqueta} className="text-center">
                <p
                  className="font-bold mb-1"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: PRIMARY,
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  }}
                >
                  {stat.valor}
                </p>
                <p className="text-sm text-gray-500">{stat.etiqueta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              EMPRESAS ALIADAS
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                color: '#0D1B5E',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              Empresas que confían en Hakamo
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CLIENTES.map((cliente) => (
              <div
                key={cliente.nombre}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{cliente.icono}</div>
                <h3 className="font-bold text-sm mb-1" style={{ color: '#0D1B5E' }}>
                  {cliente.nombre}
                </h3>
                <p className="text-xs text-gray-400">{cliente.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              CÓMO TRABAJAMOS
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                color: '#0D1B5E',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              Así conectamos el talento con las oportunidades
            </h2>
          </div>
          <ProcesoToggle />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-white font-bold mb-5"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              letterSpacing: '-0.02em',
            }}
          >
            ¿Listo para optimizar tu capital humano?
          </h2>
          <p className="text-white/65 mb-10 max-w-md mx-auto leading-relaxed">
            Cuéntanos tu necesidad. Nuestro equipo está listo para diseñar la solución perfecta.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all"
            >
              Enviar correo →
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
