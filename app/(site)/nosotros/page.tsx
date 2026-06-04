import { MISION_VISION, VALORES, EQUIPO, CLIENTES } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros — Hakamo Outsourcing',
  description:
    'Conoce a Hakamo Outsourcing: misión, visión, valores y el equipo detrás del talento dominicano.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

export default function NosotrosPage() {
  const mvv = [MISION_VISION.mision, MISION_VISION.vision, MISION_VISION.valores]

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white/70 border border-white/20 bg-white/5 mb-6">
            QUIÉNES SOMOS
          </div>
          <h1
            className="font-bold mb-5 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              letterSpacing: '-0.03em',
            }}
          >
            La empresa detrás del talento dominicano
          </h1>
          <p className="text-xl text-white/75 max-w-2xl leading-relaxed">
            Somos una firma dominicana especializada en capital humano. Llevamos más de 5 años
            conectando empresas con el talento que necesitan para crecer, siempre con cumplimiento
            legal y ética profesional.
          </p>
        </div>
      </section>

      {/* ── Misión, Visión, Valores ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              NUESTRA IDENTIDAD
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
              Misión, Visión y Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mvv.map((item) => (
              <div
                key={item.titulo}
                className="rounded-2xl p-8 text-white"
                style={{ backgroundColor: PRIMARY }}
              >
                <div className="text-4xl mb-5">{item.icono}</div>
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  {item.titulo}
                </h3>
                <div className="w-10 h-1 rounded-full mb-4 bg-white/30" />
                <p className="text-white/75 text-sm leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              NUESTROS PRINCIPIOS
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
              Los valores que nos definen
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Cada interacción con nuestros clientes, candidatos y colaboradores está guiada por
              estos principios fundamentales.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALORES.map((valor) => (
              <div
                key={valor.titulo}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{valor.icono}</div>
                <h3
                  className="font-bold text-base mb-3"
                  style={{ color: ACCENT, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  {valor.titulo}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipo ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              LAS PERSONAS DETRÁS
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
              Nuestro Equipo
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {EQUIPO.map((miembro, i) => (
              <div key={i} className="group text-center">
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {miembro.iniciales}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: '#0D1B5E' }}>
                  {miembro.cargo}
                </h3>
                <p className="text-gray-400 text-xs">{miembro.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clientes ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: ACCENT }}
            >
              CONFIANZA COMPROBADA
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
              Empresas que han confiado en Hakamo
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CLIENTES.map((cliente) => (
              <div
                key={cliente.nombre}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100"
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

    </main>
  )
}
