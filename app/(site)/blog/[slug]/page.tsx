import { getPost, getPosts, getPreviewPostsPorDivision, DIVISION_SLUG } from '@/lib/api'
import { Post } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const res = await getPosts().catch(() => ({ data: [] }))
  const posts: Post[] = res.data
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post: Post = await getPost(slug).catch(() => null)
  if (!post) return { title: 'Artículo no encontrado' }
  return {
    title: `${post.titulo} — Hakamo Blog`,
    description: post.resumen,
  }
}

const PRIMARY = '#1E3A5F'

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  const [post, relacionadosRes] = await Promise.all([
    getPost(slug).catch(() => null),
    getPreviewPostsPorDivision(DIVISION_SLUG).catch(() => ({ data: [] })),
  ])

  if (!post) notFound()

  const relacionados: Post[] = (relacionadosRes.data as Post[]).filter(p => p.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="py-16 px-4 text-white sm:py-24 sm:px-6" style={{ backgroundColor: PRIMARY }}>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white/90 transition-colors mb-8"
          >
            ← Volver al blog
          </Link>
          <h1
            className="font-bold leading-tight mb-5"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              letterSpacing: '-0.03em',
            }}
          >
            {post.titulo}
          </h1>
          {post.resumen && (
            <p className="text-base sm:text-xl text-white/75 leading-relaxed mb-6 max-w-2xl">{post.resumen}</p>
          )}
          {post.fechaPublicacion && (
            <time className="text-sm text-white/50">
              {new Date(post.fechaPublicacion).toLocaleDateString('es-DO', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
          )}
        </div>
      </section>

      {/* Imagen portada destacada */}
      {post.imagenPortada && (
        <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-xl relative h-72 md:h-96">
            <StrapiImage
              media={post.imagenPortada}
              alt={post.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Contenido + Sidebar */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Artículo */}
        <article className="lg:col-span-2">
          <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600">
            <ReactMarkdown>{post.contenido}</ReactMarkdown>
          </div>

          {/* Footer del artículo */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <Link href="/blog" className="text-sm font-medium flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: PRIMARY }}>
              ← Todos los artículos
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              Contáctanos →
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {relacionados.length > 0 && (
            <div className="sticky top-24">
              <h3 className="font-bold text-base mb-5" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                Artículos relacionados
              </h3>
              <div className="space-y-5">
                {relacionados.map((rel: Post) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group flex gap-4 items-start"
                  >
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {rel.imagenPortada ? (
                        <StrapiImage
                          media={rel.imagenPortada}
                          alt={rel.titulo}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ backgroundColor: `${PRIMARY}15` }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {rel.fechaPublicacion && (
                        <time className="text-xs text-gray-400 block mb-1">
                          {new Date(rel.fechaPublicacion).toLocaleDateString('es-DO', { month: 'short', day: 'numeric' })}
                        </time>
                      )}
                      <h4 className="text-sm font-semibold leading-snug group-hover:opacity-70 transition-opacity line-clamp-2" style={{ color: '#0D1B5E' }}>
                        {rel.titulo}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA sidebar */}
              <div className="mt-8 rounded-2xl p-6 text-white" style={{ backgroundColor: PRIMARY }}>
                <h4 className="font-bold text-base mb-2">¿Necesitas personal?</h4>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Hablemos sobre cómo Hakamo puede ayudar a tu empresa.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white transition-all hover:opacity-90"
                  style={{ color: PRIMARY }}
                >
                  Obtener Cotización
                </Link>
              </div>
            </div>
          )}
        </aside>

      </div>
    </main>
  )
}
