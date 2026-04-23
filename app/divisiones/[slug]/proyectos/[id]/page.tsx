import { getDivision, getProyecto, getProyectosPorDivision } from '@/lib/api'
import { Division, Proyecto, StrapiMedia } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string; id: string }>
}

export async function generateStaticParams({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const res = await getProyectosPorDivision(slug)
  const proyectos: Proyecto[] = res.data
  return proyectos.map((p) => ({ id: p.documentId }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const res = await getProyecto(id)
  const proyecto: Proyecto = res.data
  if (!proyecto) return { title: 'Proyecto' }
  return {
    title: proyecto.titulo,
    description: proyecto.descripcion,
  }
}

const estadoLabel: Record<string, string> = {
  en_proceso: 'En proceso',
  completado: 'Completado',
  destacado: 'Destacado',
}

export default async function ProyectoDetallePage({ params }: Props) {
  const { slug, id } = await params

  const [division, proyectoRes] = await Promise.all([
    getDivision(slug),
    getProyecto(id),
  ])

  if (!division) notFound()

  const proyecto: Proyecto = proyectoRes.data
  if (!proyecto) notFound()

  const color = division.colorPrimario || '#0B21CC'
  const imagenes: StrapiMedia[] = proyecto.imagenes || []

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
            <Link href={`/divisiones/${slug}/proyectos`} className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Proyectos
            </Link>
            <span className="text-white/30 text-xs">›</span>
            <span className="text-xs text-white/80">{proyecto.titulo}</span>
          </div>

          {/* Estado */}
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 text-white/90"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            {estadoLabel[proyecto.estado] || proyecto.estado}
          </span>

          <h1
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight max-w-3xl"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {proyecto.titulo}
          </h1>

          {proyecto.descripcion && (
            <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
              {proyecto.descripcion}
            </p>
          )}

          {proyecto.fecha && (
            <p className="text-white/50 text-sm mt-4">
              {new Date(proyecto.fecha).toLocaleDateString('es-DO', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          )}
        </div>
      </section>

      {/* ── Galería de imágenes ── */}
      {imagenes.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color }}>
                Galería
              </p>
              <h2 className="text-2xl font-bold" style={{ color: '#07090F' }}>
                {imagenes.length} {imagenes.length === 1 ? 'imagen' : 'imágenes'}
              </h2>
            </div>

            {/* Imagen principal destacada */}
            <div className="rounded-2xl overflow-hidden mb-4 shadow-md" style={{ aspectRatio: '16/7' }}>
              <StrapiImage
                media={imagenes[0]}
                alt={`${proyecto.titulo} — imagen principal`}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Grid del resto de imágenes */}
            {imagenes.length > 1 && (
              <div className={`grid gap-4 ${
                imagenes.length === 2 ? 'grid-cols-2' :
                imagenes.length === 3 ? 'grid-cols-3' :
                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {imagenes.slice(1).map((imagen: StrapiMedia, i: number) => (
                  <div
                    key={imagen.id}
                    className="rounded-xl overflow-hidden shadow-sm"
                    style={{ aspectRatio: '4/3' }}
                  >
                    <StrapiImage
                      media={imagen}
                      alt={`${proyecto.titulo} — imagen ${i + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Sin imágenes ── */}
      {imagenes.length === 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>No hay imágenes disponibles para este proyecto.</p>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-16 px-6" style={{ backgroundColor: '#07090F' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/divisiones/${slug}/proyectos`}
            className="text-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            ← Ver todos los proyectos
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-semibold text-white px-6 py-3 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            ¿Tienes un proyecto similar? →
          </Link>
        </div>
      </section>

    </main>
  )
}
