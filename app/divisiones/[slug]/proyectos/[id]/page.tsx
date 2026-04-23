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
    (p: Proyecto) => p.id.toString() === id
  )

  if (!proyecto) notFound()

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section
        className="py-24 px-6 text-white text-center"
        style={{ backgroundColor: division.colorPrimario || '#1E3A5F' }}
      >
        <p className="text-sm uppercase tracking-widest mb-3 opacity-75">
          {division.nombre}
        </p>
        <h1 className="text-4xl font-bold mb-4">{proyecto.titulo}</h1>
        <span className="inline-block text-sm px-4 py-1 rounded-full bg-white bg-opacity-20">
          {proyecto.estado?.replace('_', ' ')}
        </span>
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
        <h2 className="text-2xl font-bold mb-6">Sobre el proyecto</h2>
        <p className="text-gray-600 leading-relaxed">{proyecto.descripcion}</p>
        {proyecto.fecha && (
          <p className="mt-4 text-sm text-gray-400">
            Fecha: {new Date(proyecto.fecha).toLocaleDateString('es-DO')}
          </p>
        )}
      </section>

      {/* Volver */}
      <section className="py-12 px-6 text-center">
        <Link
          href={`/divisiones/${slug}`}
          className="text-sm font-medium"
          style={{ color: division.colorPrimario || '#1E3A5F' }}
        >
          ← Volver a {division.nombre}
        </Link>
      </section>

    </main>
  )
}