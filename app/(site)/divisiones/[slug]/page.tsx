import type { ReactNode } from 'react'
import {
  getDivision,
  getServiciosPorDivision,
  getProyectosPorDivision,
  getClientesPorDivision,
  getPreviewPostsPorDivision,
} from '@/lib/api'
import { Division, Servicio, Proyecto, Cliente, Valor, Post } from '@/types'
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

  const [serviciosRes, proyectosRes, clientesRes, postsRes] = await Promise.all([
    getServiciosPorDivision(slug),
    getProyectosPorDivision(slug),
    getClientesPorDivision(slug),
    getPreviewPostsPorDivision(slug).catch(() => ({ data: [] })),
  ])

  const servicios: Servicio[] = serviciosRes.data
  const proyectos: Proyecto[] = proyectosRes.data
  const clientes: Cliente[] = clientesRes.data
  const posts: Post[] = postsRes.data
  const valores: Valor[] = division.valores || []

  const color = division.colorPrimario || '#0B21CC'
  const navy = '#0D1B5E'
  const clienteConTestimonio = clientes.find(c => c.testimonio) ?? null

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {division.imagenHero ? (
          <div className="absolute inset-0">
            <StrapiImage media={division.imagenHero} alt={division.nombre} fill className="object-cover" priority />
            <div className="absolute inset-0" style={{ backgroundColor: `${color}D9` }} />
          </div>
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: color }} />
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          <div className="max-w-2xl">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-[0.3em] mb-6">
              División · Hakamo
            </p>
            <h1
              className="text-white font-bold leading-tight mb-6"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.03em',
              }}
            >
              {division.nombre}
            </h1>
            {(division.tagline || division.descripcion) && (
              <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl">
                {division.tagline || division.descripcion}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: '#fff', color }}
              >
                Contáctanos
              </Link>
              {servicios.length > 0 && (
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold border-2 border-white/50 text-white hover:bg-white/10 transition-all"
                >
                  Ver servicios
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SOBRE NOSOTROS — 3 columnas
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Col 1 — Título */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-4" style={{ color }}>
              Nosotros
            </p>
            <h2
              className="font-bold leading-tight mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                color: navy,
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              Quiénes<br />somos
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm mb-8">
              {division.descripcion}
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: navy, color: navy }}
            >
              Conoce más →
            </Link>
          </div>

          {/* Col 2 — Misión, Visión, Valores */}
          <div className="space-y-6">
            {division.mision && (
              <AboutItem
                color={color}
                navy={navy}
                title="Misión"
                text={division.mision}
                icon={
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />
                }
              />
            )}
            {division.vision && (
              <AboutItem
                color={color}
                navy={navy}
                title="Visión"
                text={division.vision}
                icon={
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                }
              />
            )}
            {valores.slice(0, 2).map((valor: Valor, i: number) => (
              <AboutItem
                key={i}
                color={color}
                navy={navy}
                title={valor.titulo}
                text={valor.descripcion}
                icon={
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                }
              />
            ))}
            {!division.mision && !division.vision && valores.length === 0 && (
              <AboutItem
                color={color}
                navy={navy}
                title="Calidad"
                text="Comprometidos con los más altos estándares en cada proyecto que emprendemos."
                icon={<polyline points="20 6 9 17 4 12" />}
              />
            )}
          </div>

          {/* Col 3 — Imagen */}
          <div className="hidden lg:block relative">
            {division.imagenHero ? (
              <div className="relative">
                <div className="w-full h-72 rounded-2xl overflow-hidden shadow-xl relative">
                  <StrapiImage media={division.imagenHero} alt={division.nombre} fill className="object-cover" />
                </div>
                <div
                  className="absolute -bottom-5 -left-5 w-36 h-36 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg"
                  style={{ backgroundColor: color }}
                >
                  <span
                    className="text-white font-bold text-3xl"
                    style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {division.nombre.charAt(0)}
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="w-full h-72 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${color}12`, border: `2px dashed ${color}30` }}
              >
                <span className="font-bold text-6xl" style={{ color: `${color}30`, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                  {division.nombre.charAt(0)}
                </span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICIOS
      ═══════════════════════════════════════════ */}
      {servicios.length > 0 && (
        <section id="servicios" className="py-24 px-6" style={{ backgroundColor: '#F0F2F5' }}>
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-3" style={{ color }}>
                Lo que ofrecemos
              </p>
              <h2
                className="font-bold"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: navy,
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Nuestros servicios
              </h2>
            </div>

            <div
              className={`grid gap-6 ${
                servicios.length <= 2
                  ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto'
                  : servicios.length === 3
                  ? 'grid-cols-1 md:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {servicios.map((servicio: Servicio) => (
                <div
                  key={servicio.id}
                  className="bg-white rounded-3xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F2F5' }}>
                    {servicio.icono ? (
                      <span className="text-xl">{servicio.icono}</span>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                      </svg>
                    )}
                  </div>
                  <h3
                    className="font-bold text-base mb-3"
                    style={{ color: navy, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {servicio.descripcion}
                  </p>
                  <Link
                    href="/contacto"
                    className="text-sm font-semibold inline-flex items-center gap-1 transition-all hover:gap-2"
                    style={{ color }}
                  >
                    Leer más →
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          PROYECTOS
      ═══════════════════════════════════════════ */}
      {proyectos.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">

            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-3" style={{ color }}>
                  Nuestro trabajo
                </p>
                <h2
                  className="font-bold"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                    color: navy,
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Proyectos
                </h2>
              </div>
              <Link
                href={`/divisiones/${division.slug}/proyectos`}
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: color, color }}
              >
                Ver galería
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {proyectos.slice(0, 3).map((proyecto: Proyecto) => (
                <Link
                  key={proyecto.id}
                  href={`/divisiones/${division.slug}/proyectos/${proyecto.documentId}`}
                  className="group block rounded-2xl overflow-hidden relative h-64 bg-gray-100"
                >
                  {proyecto.imagenes?.length > 0 ? (
                    <StrapiImage
                      media={proyecto.imagenes[0]}
                      alt={proyecto.titulo}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                      <span className="font-bold text-4xl opacity-20" style={{ color }}>P</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-sm leading-snug">{proyecto.titulo}</h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/divisiones/${division.slug}/proyectos`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Ver todos los proyectos
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          ESTADÍSTICAS
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '50+', label: 'Clientes atendidos' },
            { num: '120+', label: 'Proyectos completados' },
            { num: '5+', label: 'Años de experiencia' },
            { num: '98%', label: 'Satisfacción' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-4">
              <div
                className="w-24 h-24 rounded-full border-4 flex items-center justify-center"
                style={{ borderColor: color }}
              >
                <span className="font-bold text-2xl" style={{ color: navy, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                  {num}
                </span>
              </div>
              <p className="text-gray-500 text-sm text-center">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLIENTES / TESTIMONIOS
      ═══════════════════════════════════════════ */}
      {clientes.length > 0 && (
        <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#F0F2F5' }}>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: 'radial-gradient(circle, #c8d2e0 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Izquierda */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-4" style={{ color }}>
                Testimonios
              </p>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: navy,
                  fontFamily: 'var(--font-space-grotesk, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                Lo que dicen<br />nuestros clientes
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-sm">
                Empresas que han confiado en nosotros para sus proyectos más importantes.
              </p>
              <div className="flex flex-wrap gap-3">
                {clientes.map((cliente: Cliente) => (
                  <div key={cliente.id} className="bg-white rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm">
                    {cliente.logo && (
                      <StrapiImage media={cliente.logo} alt={cliente.nombre} width={28} height={28} className="object-contain" />
                    )}
                    <span className="text-sm font-semibold" style={{ color: navy }}>{cliente.nombre}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Derecha — tarjeta de testimonio */}
            {clienteConTestimonio && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={color}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{clienteConTestimonio.testimonio}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  {clienteConTestimonio.logo && (
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 flex-shrink-0">
                      <StrapiImage
                        media={clienteConTestimonio.logo}
                        alt={clienteConTestimonio.nombre}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-sm" style={{ color: navy }}>{clienteConTestimonio.nombre}</p>
                    {clienteConTestimonio.sitioweb && (
                      <a
                        href={clienteConTestimonio.sitioweb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:underline"
                      >
                        {clienteConTestimonio.sitioweb}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          BLOG
      ═══════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">

            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-3" style={{ color }}>
                  Noticias y artículos
                </p>
                <h2
                  className="font-bold"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                    color: navy,
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Del blog
                </h2>
              </div>
              <Link
                href={`/blog?division=${division.slug}`}
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Ver todos
              </Link>
            </div>

            {posts.length === 1 ? (
              <BlogCard post={posts[0]} color={color} navy={navy} large />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <BlogCard post={posts[0]} color={color} navy={navy} large />
                <div className="flex flex-col gap-5">
                  {posts.slice(1, 3).map((post: Post) => (
                    <BlogCard key={post.id} post={post} color={color} navy={navy} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F0F2F5' }}>
        <div
          className="max-w-5xl mx-auto rounded-3xl px-12 py-16 text-center relative overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div
            className="absolute inset-0 opacity-10 rounded-3xl"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
              Da el siguiente paso
            </p>
            <h2
              className="font-bold text-white leading-tight mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              ¿Listo para trabajar juntos?
            </h2>
            <p className="text-white/75 mb-10 max-w-md mx-auto leading-relaxed">
              Cuéntanos tu necesidad. Nuestro equipo está listo para ayudarte.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: '#fff', color }}
              >
                Trabajemos juntos →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-all"
              >
                ← Divisiones
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

/* ── Helper components ──────────────────────────────────────── */

function AboutItem({
  color,
  navy,
  title,
  text,
  icon,
}: {
  color: string
  navy: string
  title: string
  text: string
  icon: ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F0F2F5' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <div>
        <h3 className="font-bold text-sm mb-1" style={{ color: navy }}>{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function BlogCard({
  post,
  color,
  navy,
  large = false,
}: {
  post: Post
  color: string
  navy: string
  large?: boolean
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className={`relative overflow-hidden bg-gray-100 ${large ? 'h-64' : 'h-44'}`}>
        {post.imagenPortada ? (
          <StrapiImage
            media={post.imagenPortada}
            alt={post.titulo}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }} />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {post.fechaPublicacion && (
          <time className="text-xs text-gray-400 mb-2 block">
            {new Date(post.fechaPublicacion).toLocaleDateString('es-DO', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        )}
        <h3
          className={`font-bold leading-snug mb-2 ${large ? 'text-xl' : 'text-sm'}`}
          style={{ color: navy, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          {post.titulo}
        </h3>
        {post.resumen && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.resumen}</p>
        )}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4" style={{ color }}>
          Leer artículo →
        </span>
      </div>
    </Link>
  )
}
