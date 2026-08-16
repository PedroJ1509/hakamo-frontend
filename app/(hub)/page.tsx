import { COMPANY_INFO, STATS, CLIENTES, PROCESO_EMPRESAS } from '@/lib/data'
import ProcesoToggle from '@/app/components/ui/ProcesoToggle'
import SectionHeading, { Eyebrow } from '@/app/components/ui/SectionHeading'
import SoftCard from '@/app/components/ui/SoftCard'
import FadeIn from '@/app/components/ui/FadeIn'
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
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60
            [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)]
            [background-size:44px_44px]
            [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy */}
            <div>
              <Eyebrow>Proyectos a gran escala</Eyebrow>

              <h1
                className="mt-5 font-bold leading-[1.08] tracking-tight"
                style={{
                  fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
                  color: 'var(--brand-primary)',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.03em',
                }}
              >
                Capital humano para{' '}
                <span style={{ color: 'var(--brand-accent)' }}>grandes proyectos.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                Gestionamos equipos de trabajo para proyectos de construcción, energía e
                infraestructura. Experiencia comprobada en sectores industriales de alta exigencia.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/empleo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ backgroundColor: ACCENT }}
                >
                  Trabaja con nosotros →
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 px-7 py-4 text-sm font-semibold transition-all hover:bg-gray-50 dark:hover:bg-white/5"
                  style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}
                >
                  Contáctanos
                </Link>
              </div>
            </div>

            {/* Vista previa del proceso */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[var(--shadow-elevated)] dark:bg-slate-900">
              <div
                className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-3"
                style={{ backgroundColor: 'var(--brand-accent-light)' }}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                <span className="ml-3 text-xs font-medium text-gray-400">Así trabajamos contigo</span>
              </div>
              <div className="space-y-3 p-5">
                {PROCESO_EMPRESAS.slice(0, 3).map((paso) => (
                  <SoftCard key={paso.paso} title={paso.titulo} description={paso.descripcion} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS (puente) ── */}
      <section className="py-14 px-6 bg-[var(--surface-wash)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.etiqueta} className="text-center">
                <p
                  className="font-bold mb-1"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: 'var(--brand-primary)',
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  }}
                >
                  {stat.valor}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.etiqueta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTES ── */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-14">
              <SectionHeading eyebrow="Empresas aliadas" title="Empresas que confían en Hakamo" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CLIENTES.map((cliente, i) => (
              <FadeIn key={cliente.nombre} delay={i * 0.08}>
                <SoftCard title={cliente.nombre} description={cliente.sector} icon={cliente.icono} center />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO (fundido) ── */}
      <section className="py-20 lg:py-28 px-6 bg-gradient-to-b from-[var(--surface-wash)] to-[var(--background)]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-12">
              <SectionHeading
                eyebrow="Cómo trabajamos"
                title="Así conectamos el talento con las oportunidades"
              />
            </div>
          </FadeIn>
          <ProcesoToggle />
        </div>
      </section>

      {/* ── CTA (respiro oscuro) ── */}
      <section className="py-20 lg:py-28 px-6 bg-gradient-to-b from-[#0F172A] to-[#0B1220]">
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
