import { getVacantes, getDivisiones } from '@/lib/api'
import { Vacante, Division } from '@/types'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ division?: string; tipo?: string }>
}

const modalidadLabel: Record<string, string> = {
  presencial: 'Presencial',
  remoto: 'Remoto',
  hibrido: 'Híbrido',
}

const tipoLabel: Record<string, string> = {
  tiempo_completo: 'Tiempo completo',
  medio_tiempo: 'Medio tiempo',
  contrato: 'Contrato',
}

const tipoColor: Record<string, string> = {
  tiempo_completo: '#0B21CC',
  medio_tiempo: '#7C3AED',
  contrato: '#0D9488',
}

export default async function EmpleosPage({ searchParams }: Props) {
  const { division: divisionSlug, tipo } = await searchParams

  const [vacantesRes, divisionesRes] = await Promise.all([
    getVacantes(),
    getDivisiones(),
  ])

  let vacantes: Vacante[] = vacantesRes.data
  const divisiones: Division[] = divisionesRes.data

  if (divisionSlug) {
    vacantes = vacantes.filter((v) => v.division?.slug === divisionSlug)
  }
  if (tipo) {
    vacantes = vacantes.filter((v) => v.tipo === tipo)
  }

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-28 px-6 text-white"
        style={{ background: 'linear-gradient(135deg, #0B21CC 0%, #070D5A 60%, #07090F 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#00C2E0' }} />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 font-bold leading-none"
          style={{ fontSize: 'clamp(200px, 30vw, 420px)', fontFamily: 'var(--font-space-grotesk, monospace)', color: '#fff' }}
          aria-hidden="true"
        >
          &lt;&gt;
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: '#00C2E0' }}>
            Únete al equipo
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Trabaja con nosotros
          </h1>
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            Somos una empresa que impulsa talentos. Si buscas crecer
            profesionalmente en el sector construcción, este es tu lugar.
          </p>
          {vacantesRes.data.length > 0 && (
            <div className="mt-8">
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'rgba(0,194,224,0.2)', color: '#00C2E0', border: '1px solid rgba(0,194,224,0.3)' }}
              >
                {vacantesRes.data.length} vacante{vacantesRes.data.length !== 1 ? 's' : ''} disponible{vacantesRes.data.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── Filtros ── */}
      <section className="py-8 px-6 border-b border-gray-100 sticky top-[72px] z-40 bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3">

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mr-1">División:</span>
            <Link
              href="/empleos"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !divisionSlug ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={!divisionSlug ? { backgroundColor: '#0B21CC' } : {}}
            >
              Todas
            </Link>
            {divisiones.map((div: Division) => (
              <Link
                key={div.id}
                href={`/empleos?division=${div.slug}${tipo ? `&tipo=${tipo}` : ''}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  divisionSlug === div.slug ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={divisionSlug === div.slug ? { backgroundColor: div.colorPrimario || '#0B21CC' } : {}}
              >
                {div.nombre}
              </Link>
            ))}
          </div>

          <div className="hidden md:block w-px bg-gray-200 mx-1" />

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mr-1">Tipo:</span>
            {Object.entries(tipoLabel).map(([key, label]) => (
              <Link
                key={key}
                href={`/empleos?${divisionSlug ? `division=${divisionSlug}&` : ''}tipo=${key}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  tipo === key ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={tipo === key ? { backgroundColor: tipoColor[key] } : {}}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listado ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          {vacantes.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-6xl mb-6 select-none opacity-30" style={{ fontFamily: 'var(--font-space-grotesk, monospace)' }}>&lt;&gt;</p>
              <p className="text-lg font-medium mb-2">No hay vacantes disponibles</p>
              <p className="text-sm">Intenta con otro filtro o vuelve pronto.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {vacantes.map((vacante: Vacante) => (
                <Link
                  key={vacante.id}
                  href={`/empleos/${vacante.documentId}`}
                  className="group block bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderLeft: `4px solid ${vacante.division?.colorPrimario || '#0B21CC'}` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2
                        className="text-lg font-bold leading-snug mb-1"
                        style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                      >
                        {vacante.titulo}
                      </h2>
                      {vacante.division && (
                        <span
                          className="text-xs font-semibold"
                          style={{ color: vacante.division.colorPrimario || '#0B21CC' }}
                        >
                          {vacante.division.nombre}
                        </span>
                      )}
                    </div>
                    <span
                      className="flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: tipoColor[vacante.tipo] || '#0B21CC' }}
                    >
                      {tipoLabel[vacante.tipo]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-5">
                    {vacante.ubicacion && (
                      <span className="flex items-center gap-1">📍 {vacante.ubicacion}</span>
                    )}
                    {vacante.modalidad && (
                      <span className="flex items-center gap-1">💼 {modalidadLabel[vacante.modalidad]}</span>
                    )}
                    {vacante.salario && (
                      <span className="flex items-center gap-1">💰 {vacante.salario}</span>
                    )}
                    {vacante.fechaCierre && (
                      <span className="flex items-center gap-1">
                        📅 Cierra: {new Date(vacante.fechaCierre).toLocaleDateString('es-DO', { day: 'numeric', month: 'short' })}
                      </span>
                    )}
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: vacante.division?.colorPrimario || '#0B21CC' }}
                  >
                    Ver vacante y postularme
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA candidatos espontáneos ── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F4F6FF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#0B21CC' }}>
            ¿No ves tu perfil?
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Déjanos tu CV de todas formas
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Guardamos tu perfil y te contactamos cuando surja una oportunidad que se ajuste a ti.
          </p>
          <Link
            href="/contacto"
            className="inline-block px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0B21CC' }}
          >
            Contáctanos →
          </Link>
        </div>
      </section>

    </main>
  )
}
