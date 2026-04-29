import { getDivision, getProyectosPorDivision } from '@/lib/api'
import { Proyecto } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string; id: string }>
}

export async function generateStaticParams() {
  return []
}

export default async function ProyectoPage({ params }: Props) {
  const { slug, id } = await params
  const division = await getDivision(slug)

  if (!division) notFound()

  const proyectosRes = await getProyectosPorDivision(slug)
  const proyecto: Proyecto = proyectosRes.data.find(
    (p: Proyecto) => p.documentId === id || p.id.toString() === id
  )

  if (!proyecto) notFound()

  const color = division.colorPrimario || '#0B21CC'

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 px-6 text-white"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 60%, #07090F 100%)` }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#00C2E0' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 flex-wrap text-xs">
            <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Hakamo</Link>
            <span className="text-white/30">›</span>
            <Link href={`/divisiones/${slug}`} className="text-white/50 hover:text-white/80 transition-colors">{division.nombre}</Link>
            <span className="text-white/30">›</span>
            <Link href={`/divisiones/${slug}/proyectos`} className="text-white/50 hover:text-white/80 transition-colors">Proyectos</Link>
            <span className="text-white/30">›</span>
            <span className="text-white/80">{proyecto.titulo}</span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#00C2E0' }}>
            {division.nombre}
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {proyecto.titulo}
          </h1>
          <span
            className="inline-block text-sm px-4 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            {proyecto.estado?.replace('_', ' ')}
          </span>
        </div>
      </section>

      {/* Imágenes */}
      {proyecto.imagenes?.length > 0 && (
        <section className="py-12 px-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proyecto.imagenes.map((imagen, index) => (
              <div key={index} className="rounded-2xl overflow-hidden">
                <StrapiImage
                  media={imagen}
                  alt={`${proyecto.titulo} - imagen ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Descripción */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#07090F' }}>Sobre el proyecto</h2>
        <p className="text-gray-600 leading-relaxed">{proyecto.descripcion}</p>
        {proyecto.fecha && (
          <p className="mt-4 text-sm text-gray-400">
            Fecha: {new Date(proyecto.fecha).toLocaleDateString('es-DO')}
          </p>
        )}
      </section>

      {/* Volver */}
      <section className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/divisiones/${slug}/proyectos`}
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color }}
          >
            ← Volver a proyectos
          </Link>
        </div>
      </section>

    </main>
  )
}
