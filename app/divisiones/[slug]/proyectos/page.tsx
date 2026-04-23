import { getDivision, getProyectosPorDivision } from '@/lib/api'
import { Division, Proyecto } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const division: Division = await getDivision(slug)
  if (!division) return { title: 'Proyectos' }
  return { title: `Proyectos — ${division.nombre}` }
}

const estadoLabel: Record<string, string> = {
  en_proceso: 'En proceso',
  completado: 'Completado',
  destacado: 'Destacado',
}

export default async function ProyectosPage({ params }: Props) {
  const { slug } = await params
  const division: Division = await getDivision(slug)

  if (!division) notFound()

  const proyectosRes = await getProyectosPorDivision(slug)
  const proyectos: Proyecto[] = proyectosRes.data

  const color = division.colorPrimario || '#0B21CC'

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-24 px-6 text-white"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 60%, #07090F 100%)` }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#00C2E0' }} />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 font-bold leading-none"
          style={{ fontSize: 'clamp(180px, 28vw, 380px)', fontFamily: 'var(--font-space-grotesk, monospace)', color: '#fff' }}
          aria-hidden="true"
        >
          &lt;&gt;
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">Hakamo</Link>
            <span className="text-white/30 text-xs">›</span>
            <Link href={`/divisiones/${slug}`} className="text-xs text-white/50 hover:text-white/80 transition-colors">
              {division.nombre}
            </Link>
            <span className="text-white/30 text-xs">›</span>
            <span className="text-xs text-white/80">Proyectos</span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#00C2E0' }}>
            {division.nombre}
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Proyectos
          </h1>
          <p className="text-white/70 text-lg">
            {proyectos.length > 0
              ? `${proyectos.length} proyecto${proyectos.length !== 1 ? 's' : ''}`
              : 'Galería de trabajo'}
          </p>
        </div>
      </section>

      {/* ── Galería ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {proyectos.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No hay proyectos publicados aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectos.map((proyecto: Proyecto) => (
                <Link
                  key={proyecto.id}
                  href={`/divisiones/${slug}/proyectos/${proyecto.documentId}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Imagen principal */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {proyecto.imagenes?.length > 0 ? (
                      <>
                        <StrapiImage
                          media={proyecto.imagenes[0]}
                          alt={proyecto.titulo}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Badge de cantidad de imágenes */}
                        {proyecto.imagenes.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                            +{proyecto.imagenes.length - 1} fotos
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center opacity-20"
                        style={{ backgroundColor: color }}
                      >
                        <span className="text-white text-4xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk, monospace)' }}>
                          &lt;&gt;
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Barra de color */}
                  <div className="h-1" style={{ backgroundColor: color }} />

                  <div className="p-6">
                    {/* Estado */}
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      {estadoLabel[proyecto.estado] || proyecto.estado}
                    </span>

                    <h2
                      className="text-base font-bold mb-2 leading-snug"
                      style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                    >
                      {proyecto.titulo}
                    </h2>

                    {proyecto.descripcion && (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {proyecto.descripcion}
                      </p>
                    )}

                    {proyecto.fecha && (
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(proyecto.fecha).toLocaleDateString('es-DO', {
                          year: 'numeric', month: 'long'
                        })}
                      </p>
                    )}

                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4"
                      style={{ color }}
                    >
                      Ver proyecto
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Volver ── */}
      <section className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/divisiones/${slug}`}
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color }}
          >
            ← Volver a {division.nombre}
          </Link>
        </div>
      </section>

    </main>
  )
}
