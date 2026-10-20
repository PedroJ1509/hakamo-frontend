import { getPosts } from '@/lib/api'
import { Post } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import { contenidoBlog, metadataBlog } from '@/lib/cms/blog'
import { FondoSeccion } from '@/app/components/visual-kit/fondo-seccion'

export const generateMetadata = metadataBlog

const PRIMARY = '#1E3A5F'

export default async function BlogPage() {
  const [postsRes, contenido] = await Promise.all([getPosts().catch(() => ({ data: [] })), contenidoBlog()])
  const posts: Post[] = postsRes.data ?? []
  const { portada, sinArticulos, cierre } = contenido
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
          {portada.texto ? (
            <p className="text-base sm:text-xl opacity-75 max-w-2xl mx-auto leading-relaxed">{portada.texto}</p>
          ) : null}
        </div>
      </section>

      {/* Grid de posts */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg mb-2">{sinArticulos.titulo}</p>
              {sinArticulos.texto ? <p className="text-gray-400 text-sm">{sinArticulos.texto}</p> : null}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {post.imagenPortada ? (
                      <StrapiImage
                        media={post.imagenPortada}
                        alt={post.titulo}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${PRIMARY}15, ${PRIMARY}05)` }} />
                    )}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: PRIMARY }} />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {post.fechaPublicacion && (
                      <time className="text-xs text-gray-400 mb-3 block">
                        {new Date(`${post.fechaPublicacion}T12:00:00`).toLocaleDateString('es-DO', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </time>
                    )}
                    <h2 className="text-base font-bold mb-2 leading-snug flex-1" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                      {post.titulo}
                    </h2>
                    {post.resumen && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                        {post.resumen}
                      </p>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
                      style={{ color: PRIMARY }}
                    >
                      {contenido.textoLeer}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cierre */}
      {cierre.mostrar ? (
        <section className={`relative isolate py-20 px-6 bg-white ${cierre.fondo.tono === 'claro' ? 'text-white' : 'text-[#0D1B5E]'}`}>
          <FondoSeccion fondo={cierre.fondo} />
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {cierre.titulo}
            </h2>
            {cierre.texto ? <p className="opacity-70 text-sm mb-6">{cierre.texto}</p> : null}
            {cierre.boton ? (
              <Link
                href={cierre.boton.url}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
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
