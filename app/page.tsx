import { getDivisiones } from '@/lib/api'
import { Division } from '@/types'
import Link from 'next/link'
import StrapiImage from '@/app/components/ui/StrapiImage'

export default async function HubPage() {
  const response = await getDivisiones()
  const divisiones: Division[] = response.data

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#F5F5F5' }}
    >

      {/* ── Logo superior izquierdo ── */}
      <header className="px-8 pt-6 pb-2">
        <Link
          href="/"
          className="inline-block text-2xl font-bold tracking-tight"
          style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          HAKAMO
        </Link>
      </header>

      {/* ── Título ── */}
      <div className="text-center mt-10 mb-10 px-6">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          Selecciona una división
        </h1>
        <p className="text-base" style={{ color: '#888' }}>
          Accede a la unidad que deseas visitar
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch px-8 pb-12 flex-1">
        {divisiones.map((division: Division) => {
          const color = division.colorPrimario || '#0B21CC'

          return (
            <Link
              key={division.id}
              href={`/divisiones/${division.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
              style={{ width: '360px', height: '320px' }}
            >
              {/* Imagen hero de fondo */}
              {division.imagenHero ? (
                <StrapiImage
                  media={division.imagenHero}
                  alt={division.nombre}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}AA 100%)` }}
                />
              )}

              {/* Overlay muy sutil para legibilidad del botón */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)' }}
              />

              {/* Botón "Entrar" centrado abajo */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                <span
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                  style={{
                    backgroundColor: '#fff',
                    color,
                  }}
                >
                  Entrar
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          )
        })}

        {divisiones.length === 0 && (
          <p className="text-sm" style={{ color: '#aaa' }}>Cargando divisiones...</p>
        )}
      </div>

    </main>
  )
}
