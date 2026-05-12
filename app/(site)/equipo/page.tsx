import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nuestro Equipo — Hakamo Outsourcing',
  description: 'Conoce al equipo de profesionales detrás de Hakamo Outsourcing.',
}

const PRIMARY = '#1E3A5F'

// TODO: reemplazar con datos reales del equipo (integrar con Strapi cuando esté disponible)
const EQUIPO = [
  { nombre: 'Nombre del CEO', cargo: 'Director General', bio: 'Líder visionario con amplia experiencia en gestión empresarial.', initials: 'DG', color: PRIMARY },
  { nombre: 'Gerente de RRHH', cargo: 'Recursos Humanos', bio: 'Especialista en reclutamiento y desarrollo del talento humano.', initials: 'RH', color: `${PRIMARY}CC` },
  { nombre: 'Coordinador Operativo', cargo: 'Operaciones', bio: 'Responsable de la ejecución y coordinación de los procesos internos.', initials: 'CO', color: PRIMARY },
  { nombre: 'Analista de Talento', cargo: 'Selección de Personal', bio: 'Experto en identificar y atraer los mejores perfiles del mercado.', initials: 'AT', color: `${PRIMARY}CC` },
]

export default function EquipoPage() {
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
            Las personas detrás
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.03em' }}
          >
            Nuestro Equipo
          </h1>
          <p className="text-xl text-white/75 max-w-xl mx-auto leading-relaxed">
            Profesionales comprometidos con el crecimiento de tu empresa.
          </p>
        </div>
      </section>

      {/* Grid del equipo */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          {/* TODO: reemplazar con datos reales del equipo */}
          <p className="text-center text-gray-400 text-sm italic mb-10">
            Datos del equipo próximamente — actualiza esta sección con información real
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EQUIPO.map((miembro, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-white text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: miembro.color }}
                >
                  {miembro.initials}
                </div>
                <h3 className="font-bold text-base mb-1" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                  {miembro.nombre}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: PRIMARY }}>{miembro.cargo}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{miembro.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            Únete a nuestro equipo
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
            ¿Tienes talento y quieres crecer? Revisa nuestras vacantes disponibles.
          </p>
          <Link
            href="/empleos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}
          >
            Ver vacantes →
          </Link>
        </div>
      </section>

    </main>
  )
}
