import Link from 'next/link'
import { contenidoEquipo, metadataEquipo } from '@/lib/cms/equipo'
import { FondoSeccion } from '@/app/components/visual-kit/fondo-seccion'

export const generateMetadata = metadataEquipo

const PRIMARY = '#1E3A5F'

export default async function EquipoPage() {
  const { portada, miembros, cierre } = await contenidoEquipo()
  const portadaClara = portada.fondo.tono === 'claro'

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className={`relative isolate overflow-hidden py-20 px-4 sm:py-28 sm:px-6 ${portadaClara ? 'text-white' : 'text-[#0D1B5E]'}`}>
        <FondoSeccion fondo={portada.fondo} priority />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {portada.antetitulo ? (
            <p className="opacity-60 text-sm font-semibold uppercase tracking-[0.3em] mb-4">{portada.antetitulo}</p>
          ) : null}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.03em' }}
          >
            {portada.titulo}
          </h1>
          {portada.texto ? <p className="text-base sm:text-xl opacity-75 max-w-xl mx-auto leading-relaxed">{portada.texto}</p> : null}
        </div>
      </section>

      {/* Grid del equipo */}
      {miembros.mostrar ? (
        <section className="relative isolate py-24 px-6" style={{ backgroundColor: '#F8F9FA' }}>
          <FondoSeccion fondo={miembros.fondo} />
          <div className="relative max-w-6xl mx-auto">
            {miembros.titulo ? (
              <h2
                className={`text-center text-3xl font-bold mb-4 ${miembros.fondo.tono === 'claro' ? 'text-white' : 'text-[#0D1B5E]'}`}
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                {miembros.titulo}
              </h2>
            ) : null}
            {miembros.texto ? (
              <p className={`text-center text-sm italic mb-10 ${miembros.fondo.tono === 'claro' ? 'text-white/70' : 'text-gray-400'}`}>
                {miembros.texto}
              </p>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {miembros.elementos.map((miembro, i) => (
                <div
                  key={miembro.titulo + i}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
                >
                  {miembro.imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element -- foto del CMS de tamaño libre
                    <img
                      src={miembro.imagen}
                      alt={miembro.titulo}
                      className="w-20 h-20 rounded-2xl mx-auto mb-5 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-white text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: i % 2 === 0 ? PRIMARY : `${PRIMARY}CC` }}
                    >
                      {miembro.etiqueta}
                    </div>
                  )}
                  <h3 className="font-bold text-base mb-1" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                    {miembro.titulo}
                  </h3>
                  {miembro.subtitulo ? <p className="text-sm font-medium mb-3" style={{ color: PRIMARY }}>{miembro.subtitulo}</p> : null}
                  {miembro.texto ? <p className="text-gray-500 text-xs leading-relaxed">{miembro.texto}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      {cierre.mostrar ? (
        <section className={`relative isolate py-20 px-6 bg-white ${cierre.fondo.tono === 'claro' ? 'text-white' : 'text-[#0D1B5E]'}`}>
          <FondoSeccion fondo={cierre.fondo} />
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {cierre.titulo}
            </h2>
            {cierre.texto ? <p className="opacity-70 mb-8 max-w-xl mx-auto leading-relaxed">{cierre.texto}</p> : null}
            {cierre.boton ? (
              <Link
                href={cierre.boton.url}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                {cierre.boton.texto}
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

    </main>
  )
}
