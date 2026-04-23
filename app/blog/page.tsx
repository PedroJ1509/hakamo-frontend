import { getPosts, getPostsPorDivision, getDivisiones } from '@/lib/api'
import { Post, Division, StrapiResponse } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ division?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { division: divisionSlug } = await searchParams

  const [postsRes, divisionesRes] = await Promise.all([
    divisionSlug ? getPostsPorDivision(divisionSlug) : getPosts(),
    getDivisiones()
  ])

  const posts: Post[] = postsRes.data
  const divisiones: Division[] = divisionesRes.data

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section
        className="py-24 px-6 text-white text-center"
        style={{ backgroundColor: '#1E3A5F' }}
      >
        <p className="text-sm uppercase tracking-widest mb-3 opacity-75">Noticias y artículos</p>
        <h1 className="text-5xl font-bold mb-6">Blog</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Insights, proyectos y novedades de todas nuestras divisiones.
        </p>
      </section>

      {/* Filtros por división */}
      <section className="py-8 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !divisionSlug
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={!divisionSlug ? { backgroundColor: '#1E3A5F' } : {}}
          >
            Todos
          </Link>
          {divisiones.map((div: Division) => (
            <Link
              key={div.id}
              href={`/blog?division=${div.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                divisionSlug === div.slug
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={divisionSlug === div.slug ? { backgroundColor: div.colorPrimario || '#1E3A5F' } : {}}
            >
              {div.nombre}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid de posts */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No hay artículos publicados aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
                {post.imagenPortada && (
                  <div className="relative h-48 overflow-hidden">
                    <StrapiImage
                      media={post.imagenPortada}
                      alt={post.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {post.division && (
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: post.division.colorPrimario || '#1E3A5F' }}
                      >
                        {post.division.nombre}
                      </span>
                    )}
                    {post.fechaPublicacion && (
                      <time className="text-xs text-gray-400">
                        {new Date(post.fechaPublicacion).toLocaleDateString('es-DO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                  </div>

                  <h2 className="text-lg font-bold mb-2 text-gray-900 leading-snug">
                    {post.titulo}
                  </h2>

                  {post.resumen && (
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {post.resumen}
                    </p>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-5 text-sm font-medium"
                    style={{ color: post.division?.colorPrimario || '#1E3A5F' }}
                  >
                    Leer artículo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </main>
  )
}
