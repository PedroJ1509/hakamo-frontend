import { getServiciosPorDivision, DIVISION_SLUG } from '@/lib/api'
import { Servicio } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios — Hakamo Outsourcing',
  description: 'Conoce todos los servicios de outsourcing, reclutamiento y gestión de talento humano que ofrece Hakamo.',
}

const PRIMARY = '#1E3A5F'

export default async function ServiciosPage() {
  const res = await getServiciosPorDivision(DIVISION_SLUG).catch(() => ({ data: [] }))
  const servicios: Servicio[] = res.data

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-white" style={{ backgroundColor: PRIMARY }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Lo que ofrecemos
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.03em' }}
          >
            Nuestros Servicios
          </h1>
          <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            Soluciones integrales de talento humano diseñadas para impulsar el crecimiento de tu empresa.
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          {servicios.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Servicios disponibles próximamente.</p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: PRIMARY }}
              >
                Consultar directamente
              </Link>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              servicios.length <= 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
              servicios.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {servicios.map((servicio: Servicio) => (
                <div
                  key={servicio.id}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300" style={{ backgroundColor: PRIMARY }} />

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${PRIMARY}10` }}>
                    {servicio.icono ? (
                      <span className="text-2xl">{servicio.icono}</span>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                      </svg>
                    )}
                  </div>

                  <h2 className="font-bold text-lg mb-3" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                    {servicio.titulo}
                  </h2>
                  <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: PRIMARY }} />
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{servicio.descripcion}</p>

                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                    style={{ color: PRIMARY }}
                  >
                    Consultar este servicio →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            ¿Necesitas una solución a medida?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Cada empresa tiene necesidades únicas. Contáctanos y diseñamos juntos el servicio perfecto para ti.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}
          >
            Obtener Cotización →
          </Link>
        </div>
      </section>

    </main>
  )
}
