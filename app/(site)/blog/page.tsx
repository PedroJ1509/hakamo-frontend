import { getPosts } from '@/lib/api'
import { Post } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Hakamo Outsourcing',
  description: 'Noticias, consejos y artículos sobre outsourcing de personal, talento humano y gestión empresarial.',
}

const PRIMARY = '#1E3A5F'

export default async function BlogPage() {
  const postsRes = await getPosts().catch(() => ({ data: [] }))
  const posts: Post[] = postsRes.data

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
            Noticias y artículos
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.03em' }}
          >
            Blog
          </h1>
          <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            Insights, consejos y novedades sobre recursos humanos y outsourcing de personal.
          </p>
        </div>
      </section>

      {/* Grid de posts */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg mb-2">No hay artículos publicados aún.</p>
              <p className="text-gray-400 text-sm">Vuelve pronto para leer nuestro contenido.</p>
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
                        {new Date(post.fechaPublicacion).toLocaleDateString('es-DO', {
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
                      Leer artículo →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA suscripción */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            ¿Tienes alguna duda?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Nuestro equipo está disponible para responder todas tus preguntas.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}
          >
            Contáctanos →
          </Link>
        </div>
      </section>

    </main>
  )
}
