import { getPost, getPosts } from '@/lib/api'
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
  const res = await getPosts()
  const posts: Post[] = res.data
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post: Post = await getPost(slug)

  if (!post) return { title: 'Artículo no encontrado' }

  return {
    title: post.titulo,
    description: post.resumen,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post: Post = await getPost(slug)

  if (!post) notFound()

  const colorPrimario = post.division?.colorPrimario || '#1E3A5F'

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section
        className="py-24 px-6 text-white"
        style={{ backgroundColor: colorPrimario }}
      >
        <div className="max-w-3xl mx-auto">
          {post.division && (
            <Link
              href={`/divisiones/${post.division.slug}`}
              className="inline-block text-sm font-medium uppercase tracking-widest opacity-75 hover:opacity-100 mb-4"
            >
              {post.division.nombre} ↗
            </Link>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.titulo}
          </h1>
          {post.resumen && (
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              {post.resumen}
            </p>
          )}
          {post.fechaPublicacion && (
            <time className="text-sm opacity-60">
              {new Date(post.fechaPublicacion).toLocaleDateString('es-DO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </div>
      </section>

      {/* Imagen portada */}
      {post.imagenPortada && (
        <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <StrapiImage
              media={post.imagenPortada}
              alt={post.titulo}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Contenido */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-gray max-w-none">
          <ReactMarkdown>{post.contenido}</ReactMarkdown>
        </div>
      </article>

      {/* Footer del artículo */}
      <section className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4 items-center justify-between">
          <Link
            href="/blog"
            className="text-sm font-medium"
            style={{ color: colorPrimario }}
          >
            ← Volver al blog
          </Link>
          {post.division && (
            <Link
              href={`/divisiones/${post.division.slug}`}
              className="text-sm font-medium"
              style={{ color: colorPrimario }}
            >
              Ver división {post.division.nombre} →
            </Link>
          )}
        </div>
      </section>

    </main>
  )
}
