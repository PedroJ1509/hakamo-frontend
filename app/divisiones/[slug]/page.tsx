import { getDivision, getServiciosPorDivision, getProyectosPorDivision, getClientesPorDivision } from '@/lib/api'
import { Division, Servicio, Proyecto, Cliente } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function DivisionPage({ params }: Props) {
  const { slug } = await params
  const division: Division = await getDivision(slug)

  if (!division) notFound()

  const [serviciosRes, proyectosRes, clientesRes] = await Promise.all([
    getServiciosPorDivision(slug),
    getProyectosPorDivision(slug),
    getClientesPorDivision(slug)
  ])

  const servicios: Servicio[] = serviciosRes.data
  const proyectos: Proyecto[] = proyectosRes.data
  const clientes: Cliente[] = clientesRes.data

  const color = division.colorPrimario || '#0B21CC'

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-28 px-6 text-white"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 60%, #07090F 100%)` }}
      >
        {/* Decoración < > */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 font-bold leading-none"
          style={{
            fontSize: 'clamp(180px, 28vw, 380px)',
            fontFamily: 'var(--font-space-grotesk, monospace)',
            color: '#fff',
          }}
          aria-hidden="true"
        >
          &lt;&gt;
        </div>

        {/* Imagen de fondo si existe */}
        {division.imagenHero && (
          <div className="absolute inset-0 opacity-10">
            <StrapiImage
              media={division.imagenHero}
              alt={division.nombre}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        {/* Línea de acento superior */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: '#00C2E0' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Hakamo
            </Link>
            <span className="text-white/30 text-xs">›</span>
            <span className="text-xs text-white/50">Divisiones</span>
            <span className="text-white/30 text-xs">›</span>
            <span className="text-xs text-white/80">{division.nombre}</span>
          </div>

          {division.logo && (
            <div className="mb-6">
              <StrapiImage
                media={division.logo}
                alt={`Logo ${division.nombre}`}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          )}

          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#00C2E0' }}>
            División de negocio
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {division.nombre}
          </h1>
          <p className="text-lg text-white/75 max-w-xl leading-relaxed">
            {division.descripcion}
          </p>
        </div>
      </section>

      {/* ── Servicios ── */}
      {servicios.length > 0 && (
        <section className="py-24 px-6" style={{ backgroundColor: '#F4F6FF' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color }}
              >
                Lo que ofrecemos
              </p>
              <h2 className="text-3xl font-bold" style={{ color: '#07090F' }}>
                Servicios
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicios.map((servicio: Servicio) => (
                <div
                  key={servicio.id}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  style={{ borderLeft: `4px solid ${color}` }}
                >
                  {servicio.icono && (
                    <span className="text-3xl mb-4 block">{servicio.icono}</span>
                  )}
                  <h3
                    className="text-base font-bold mb-3"
                    style={{ color, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {servicio.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Proyectos ── */}
      {proyectos.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                  style={{ color }}
                >
                  Nuestro trabajo
                </p>
                <h2 className="text-3xl font-bold" style={{ color: '#07090F' }}>
                  Proyectos
                </h2>
              </div>
              <Link
                href={`/divisiones/${division.slug}/proyectos`}
                className="text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color }}
              >
                Ver galería completa →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectos.map((proyecto: Proyecto) => (
                <div
                  key={proyecto.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {proyecto.imagenes?.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <StrapiImage
                        media={proyecto.imagenes[0]}
                        alt={proyecto.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div
                    className="h-1"
                    style={{ backgroundColor: color }}
                  />
                  <div className="p-6">
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {proyecto.estado?.replace('_', ' ')}
                    </span>
                    <h3
                      className="text-base font-bold mb-2"
                      style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', color: '#07090F' }}
                    >
                      {proyecto.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {proyecto.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Clientes ── */}
      {clientes.length > 0 && (
        <section className="py-24 px-6" style={{ backgroundColor: '#F4F6FF' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color }}
              >
                Confían en nosotros
              </p>
              <h2 className="text-3xl font-bold" style={{ color: '#07090F' }}>
                Clientes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientes.map((cliente: Cliente) => (
                <div
                  key={cliente.id}
                  className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  {cliente.logo && (
                    <div className="flex justify-center mb-5">
                      <StrapiImage
                        media={cliente.logo}
                        alt={cliente.nombre}
                        width={72}
                        height={72}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3
                    className="text-base font-bold mb-3"
                    style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {cliente.nombre}
                  </h3>
                  {cliente.testimonio && (
                    <p className="text-gray-500 text-sm italic leading-relaxed">
                      "{cliente.testimonio}"
                    </p>
                  )}
                  {cliente.sitioWeb && (
                    <a
                      href={cliente.sitioWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-xs font-semibold transition-opacity hover:opacity-70"
                      style={{ color }}
                    >
                      Visitar sitio →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Volver ── */}
      <section className="py-16 px-6" style={{ backgroundColor: '#07090F' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            ← Volver a inicio
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-semibold text-white px-6 py-3 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            Trabajemos juntos →
          </Link>
        </div>
      </section>

    </main>
  )
}
