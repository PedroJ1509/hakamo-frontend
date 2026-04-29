import { getDivision, getServiciosPorDivision, getProyectosPorDivision, getClientesPorDivision } from '@/lib/api'
import { Division, Servicio, Proyecto, Cliente, Valor } from '@/types'
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
    getClientesPorDivision(slug),
  ])

  const servicios: Servicio[] = serviciosRes.data
  const proyectos: Proyecto[] = proyectosRes.data
  const clientes: Cliente[] = clientesRes.data
  const valores: Valor[] = division.valores || []

  const color = division.colorPrimario || '#0B21CC'
  const colorSec = division.colorSecundario || color

  return (
    <main className="min-h-screen">

      {/* ══════════════════════════════════════════
          1. HERO — pantalla completa
      ══════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorSec} 50%, #07090F 100%)`,
        }}
      >
        {/* Imagen hero de fondo si existe */}
        {division.imagenHero && (
          <div className="absolute inset-0">
            <StrapiImage
              media={division.imagenHero}
              alt={division.nombre}
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}

        {/* Patrón de puntos decorativo */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Línea superior */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#00C2E0' }} />

        {/* Contenido centrado */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Logo de la división */}
          {division.logo && (
            <div className="flex justify-center mb-10">
              <StrapiImage
                media={division.logo}
                alt={`Logo ${division.nombre}`}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          )}

          {/* Eyebrow */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.4em] mb-6 opacity-70"
          >
            División · Hakamo
          </p>

          {/* Nombre principal */}
          <h1
            className="font-bold leading-none mb-8"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              letterSpacing: '-0.03em',
            }}
          >
            {division.nombre}
          </h1>

          {/* Tagline */}
          {(division.tagline || division.descripcion) && (
            <p
              className="font-light leading-relaxed mx-auto"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                maxWidth: '600px',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {division.tagline || division.descripcion}
            </p>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div
            className="w-px h-10 origin-top"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { transform: scaleY(1); opacity: 0.5; }
            50% { transform: scaleY(1.4); opacity: 1; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════
          2. QUIÉNES SOMOS
      ══════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* Izquierda — título */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-6"
              style={{ color }}
            >
              Nuestra división
            </p>
            <h2
              className="font-bold leading-tight mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: '#07090F',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              Quiénes<br />somos
            </h2>
            {/* Línea decorativa */}
            <div className="flex items-center gap-4">
              <div className="h-1 w-16 rounded-full" style={{ backgroundColor: color }} />
              <div className="h-1 w-4 rounded-full opacity-30" style={{ backgroundColor: color }} />
              <div className="h-1 w-2 rounded-full opacity-15" style={{ backgroundColor: color }} />
            </div>
          </div>

          {/* Derecha — descripción */}
          <div>
            <p
              className="text-lg leading-relaxed text-gray-600 mb-6"
            >
              {division.descripcion}
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color }}
            >
              Habla con nosotros →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. MISIÓN Y VISIÓN
      ══════════════════════════════════════════ */}
      {(division.mision || division.vision) && (
        <section className="py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
                style={{ color }}
              >
                Nuestro propósito
              </p>
              <h2
                className="text-4xl font-bold"
                style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.02em' }}
              >
                Lo que nos mueve
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Card Misión */}
              {division.mision && (
                <div
                  className="rounded-3xl p-10 shadow-xl flex flex-col gap-6"
                  style={{ backgroundColor: color }}
                >
                  {/* Ícono objetivo */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    🎯
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.3em] mb-3"
                      style={{ color: '#00C2E0' }}
                    >
                      Misión
                    </p>
                    <p className="text-white/90 leading-relaxed text-base">
                      {division.mision}
                    </p>
                  </div>
                </div>
              )}

              {/* Card Visión */}
              {division.vision && (
                <div
                  className="rounded-3xl p-10 shadow-xl flex flex-col gap-6 bg-white border-2"
                  style={{ borderColor: color }}
                >
                  {/* Ícono telescopio */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    🔭
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.3em] mb-3"
                      style={{ color }}
                    >
                      Visión
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {division.vision}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          4. VALORES
      ══════════════════════════════════════════ */}
      {valores.length > 0 && (
        <section className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-20">
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
                style={{ color }}
              >
                Lo que nos define
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.02em' }}
              >
                Nuestros valores
              </h2>
            </div>

            <div className={`grid gap-6 ${valores.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {valores.map((valor: Valor, i: number) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  {/* Número */}
                  <p
                    className="text-5xl font-bold mb-6 leading-none"
                    style={{ color: `${color}25`, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  {/* Línea */}
                  <div
                    className="h-0.5 w-10 rounded-full mb-5 transition-all duration-300 group-hover:w-16"
                    style={{ backgroundColor: color }}
                  />
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {valor.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {valor.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          5. SERVICIOS
      ══════════════════════════════════════════ */}
      {servicios.length > 0 && (
        <section className="py-32 px-6" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-6xl mx-auto">

            <div className="mb-20">
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
                style={{ color }}
              >
                Lo que ofrecemos
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.02em' }}
              >
                Servicios
              </h2>
            </div>

            <div className="space-y-6">
              {servicios.map((servicio: Servicio, i: number) => (
                <div
                  key={servicio.id}
                  className={`group flex flex-col md:flex-row gap-8 items-start bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Ícono */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${color}12` }}
                  >
                    {servicio.icono || '⚙️'}
                  </div>
                  {/* Texto */}
                  <div className="flex-1">
                    <div
                      className="h-0.5 w-8 rounded-full mb-4 transition-all duration-300 group-hover:w-14"
                      style={{ backgroundColor: color }}
                    />
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                    >
                      {servicio.titulo}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {servicio.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          6. PROYECTOS
      ══════════════════════════════════════════ */}
      {proyectos.length > 0 && (
        <section className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">

            <div className="mb-20 flex items-end justify-between flex-wrap gap-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
                  style={{ color }}
                >
                  Nuestro trabajo
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold"
                  style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.02em' }}
                >
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
                <Link
                  key={proyecto.id}
                  href={`/divisiones/${division.slug}/proyectos/${proyecto.documentId}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {proyecto.imagenes?.length > 0 ? (
                      <StrapiImage
                        media={proyecto.imagenes[0]}
                        alt={proyecto.titulo}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <span
                          className="text-4xl font-bold opacity-20"
                          style={{ color, fontFamily: 'var(--font-space-grotesk, monospace)' }}
                        >
                          &lt;&gt;
                        </span>
                      </div>
                    )}
                    {/* Badge estado */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: color }}
                      >
                        {proyecto.estado?.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-base font-bold mb-2"
                      style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                    >
                      {proyecto.titulo}
                    </h3>
                    {proyecto.descripcion && (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {proyecto.descripcion}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          7. CLIENTES
      ══════════════════════════════════════════ */}
      {clientes.length > 0 && (
        <section className="py-32 px-6" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-20">
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
                style={{ color }}
              >
                Confían en nosotros
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.02em' }}
              >
                Clientes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientes.map((cliente: Cliente) => (
                <div
                  key={cliente.id}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center"
                >
                  {cliente.logo && (
                    <div className="mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <StrapiImage
                        media={cliente.logo}
                        alt={cliente.nombre}
                        width={80}
                        height={80}
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
                      className="inline-block mt-5 text-xs font-semibold transition-opacity hover:opacity-70"
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

      {/* ══════════════════════════════════════════
          8. CTA FINAL
      ══════════════════════════════════════════ */}
      <section className="py-40 px-6" style={{ backgroundColor: '#0D0D0D' }}>
        <div className="max-w-4xl mx-auto text-center">

          {/* Decoración */}
          <div
            className="w-1 h-16 rounded-full mx-auto mb-12"
            style={{ backgroundColor: color }}
          />

          <h2
            className="font-bold text-white leading-tight mb-8"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              letterSpacing: '-0.03em',
            }}
          >
            ¿Listo para trabajar<br />
            <span style={{ color }}>juntos?</span>
          </h2>

          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Cuéntanos tu necesidad. Nuestro equipo está listo para ayudarte.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              Trabajemos juntos →
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-white/40 hover:text-white/70 transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
