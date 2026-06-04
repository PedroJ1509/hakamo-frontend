import { SERVICIOS, MARCO_LEGAL, PROCESO_EMPRESAS, PLANES } from '@/lib/data'
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
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white/70 border border-white/20 bg-white/5 mb-6">
            LO QUE OFRECEMOS
          </div>
          <h1
            className="font-bold mb-5 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              letterSpacing: '-0.03em',
            }}
          >
            Servicios especializados de talento humano
          </h1>
          <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            Soluciones integrales diseñadas para la realidad empresarial dominicana, con pleno
            cumplimiento de la normativa laboral vigente.
          </p>
        </div>
      </section>

      {/* ── Grid de servicios ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIOS.map((servicio) => (
              <div
                key={servicio.slug}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ backgroundColor: PRIMARY }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl"
                  style={{ backgroundColor: '#F1F5F9' }}
                >
                  {servicio.icono}
                </div>
                <h2
                  className="font-bold text-lg mb-3"
                  style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  {servicio.titulo}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                  {servicio.descripcion}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {servicio.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full font-medium bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
                  style={{ color: ACCENT }}
                >
                  Solicitar servicio →
                </Link>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:border-gray-300 transition-colors">
              <div className="text-3xl mb-4">🤝</div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                ¿Necesitas algo a medida?
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Diseñamos soluciones personalizadas según las necesidades específicas de tu empresa.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                Consultar →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marco legal ── */}
      <section className="py-24 px-6" style={{ backgroundColor: PRIMARY }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white/70 border border-white/20 bg-white/5 mb-6">
                MARCO LEGAL DOMINICANO
              </div>
              <h2
                className="text-white font-bold mb-5"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Cumplimiento total con la ley dominicana
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Operamos bajo plena conformidad con el Código Laboral (Ley 16-92) y todas las
                regulaciones de seguridad social vigentes. Asumimos la responsabilidad patronal para
                que tu empresa nunca enfrente contingencias laborales, multas o litigios.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-white transition-all hover:opacity-90"
                style={{ color: PRIMARY }}
              >
                Habla con un especialista →
              </Link>
            </div>
            <div className="space-y-4">
              {MARCO_LEGAL.map((item) => (
                <div key={item.titulo} className="bg-white/10 rounded-xl p-5 flex gap-4">
                  <div className="text-2xl flex-shrink-0">{item.icono}</div>
                  <div>
                    <h3
                      className="text-white font-semibold text-sm mb-1"
                      style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                    >
                      {item.titulo}
                    </h3>
                    <p className="text-white/65 text-xs leading-relaxed">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Proceso ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              CÓMO TRABAJAMOS
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
              Nuestro proceso en 4 pasos
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Simple, transparente y orientado a resultados desde el primer contacto.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hidden md:block absolute top-[2rem] left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />
            {PROCESO_EMPRESAS.map((paso, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-sm text-white text-xl font-bold"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {paso.paso}
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-gray-400">
                  {paso.subtitulo}
                </p>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  {paso.titulo}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planes ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              ELIGE TU PLAN
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
              Planes y Precios
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Cada plan incluye cumplimiento legal garantizado. Solicita una cotización personalizada
              para tu empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANES.map((plan) => (
              <div
                key={plan.nombre}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                  plan.destacado
                    ? 'text-white shadow-xl md:scale-105'
                    : 'bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1'
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
                  className="block text-center py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={
                    plan.destacado
                      ? { backgroundColor: '#fff', color: PRIMARY }
                      : { backgroundColor: `${PRIMARY}10`, color: PRIMARY }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
