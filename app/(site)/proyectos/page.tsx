import { getProyectosPorDivision, DIVISION_SLUG } from '@/lib/api'
import { Proyecto } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proyectos — Hakamo Outsourcing',
  description: 'Conoce los proyectos y casos de éxito de Hakamo Outsourcing.',
}

const PRIMARY = '#1E3A5F'

const estadoLabel: Record<string, string> = {
  en_proceso: 'En proceso',
  completado: 'Completado',
  destacado: 'Destacado',
}

const estadoColor: Record<string, string> = {
  en_proceso: '#F59E0B',
  completado: '#10B981',
  destacado: PRIMARY,
}

interface Props {
  searchParams: Promise<{ estado?: string }>
}

export default async function ProyectosPage({ searchParams }: Props) {
  const { estado: filtroEstado } = await searchParams

  const res = await getProyectosPorDivision(DIVISION_SLUG).catch(() => ({ data: [] }))
  let proyectos: Proyecto[] = res.data

  if (filtroEstado) {
    proyectos = proyectos.filter(p => p.estado === filtroEstado)
  }

  const totalPorEstado = {
    completado: (res.data as Proyecto[]).filter(p => p.estado === 'completado').length,
    en_proceso: (res.data as Proyecto[]).filter(p => p.estado === 'en_proceso').length,
    destacado: (res.data as Proyecto[]).filter(p => p.estado === 'destacado').length,
  }

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 text-white sm:py-28 sm:px-6" style={{ backgroundColor: PRIMARY }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Nuestro trabajo
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.03em' }}
          >
            Proyectos
          </h1>
          <p className="text-base sm:text-xl text-white/75 max-w-xl mx-auto leading-relaxed">
            Casos de éxito y proyectos que reflejan nuestro compromiso con la calidad.
          </p>
        </div>
      </section>

      {/* Filtros */}
      {(res.data as Proyecto[]).length > 0 && (
        <section className="sticky top-[var(--header-h)] z-40 border-b border-gray-100 bg-white px-4 py-6 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
            <Link
              href="/proyectos"
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={!filtroEstado ? { backgroundColor: PRIMARY, color: '#fff' } : { backgroundColor: '#F0F2F5', color: '#666' }}
            >
              Todos ({(res.data as Proyecto[]).length})
            </Link>
            {Object.entries(estadoLabel).map(([key, label]) => {
              const count = totalPorEstado[key as keyof typeof totalPorEstado]
              if (count === 0) return null
              return (
                <Link
                  key={key}
                  href={`/proyectos?estado=${key}`}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={filtroEstado === key ? { backgroundColor: PRIMARY, color: '#fff' } : { backgroundColor: '#F0F2F5', color: '#666' }}
                >
                  {label} ({count})
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          {proyectos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">No hay proyectos publicados aún.</p>
              <Link href="/proyectos" className="text-sm font-medium" style={{ color: PRIMARY }}>
                Ver todos los proyectos →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectos.map((proyecto: Proyecto) => (
                <div
                  key={proyecto.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {proyecto.imagenes?.length > 0 ? (
                      <>
                        <StrapiImage
                          media={proyecto.imagenes[0]}
                          alt={proyecto.titulo}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {proyecto.imagenes.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                            +{proyecto.imagenes.length - 1}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}10` }}>
                        <span className="font-bold text-5xl opacity-10" style={{ color: PRIMARY }}>H</span>
                      </div>
                    )}
                  </div>

                  <div className="h-1" style={{ backgroundColor: estadoColor[proyecto.estado] || PRIMARY }} />

                  <div className="p-6">
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"
                      style={{ backgroundColor: `${estadoColor[proyecto.estado] || PRIMARY}15`, color: estadoColor[proyecto.estado] || PRIMARY }}
                    >
                      {estadoLabel[proyecto.estado] || proyecto.estado}
                    </span>
                    <h2 className="text-base font-bold mb-2 leading-snug" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                      {proyecto.titulo}
                    </h2>
                    {proyecto.descripcion && (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{proyecto.descripcion}</p>
                    )}
                    {proyecto.fecha && (
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(proyecto.fecha).toLocaleDateString('es-DO', { year: 'numeric', month: 'long' })}
                      </p>
                    )}
                  </div>
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
            ¿Quieres ser nuestro próximo caso de éxito?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Cuéntanos sobre tu proyecto y trabajemos juntos.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}
          >
            Comenzar un proyecto →
          </Link>
        </div>
      </section>

    </main>
  )
}
