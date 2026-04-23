import { getDivisiones, getHeroSlides } from '@/lib/api'
import { Division, HeroSlide } from '@/types'
import StrapiImage from '@/app/components/ui/StrapiImage'
import HeroCarrusel from '@/app/components/ui/HeroCarrusel'
import Link from 'next/link'

const valores = [
  { titulo: 'Respeto', descripcion: 'Valoramos a cada persona, equipo y proyecto, promoviendo relaciones justas y humanas.' },
  { titulo: 'Compromiso', descripcion: 'Cumplimos con cada acuerdo, cada norma y cada expectativa, con responsabilidad y dedicación.' },
  { titulo: 'Transparencia', descripcion: 'Comunicación clara, honesta y trazable con nuestros clientes, colaboradores y aliados.' },
  { titulo: 'Excelencia Operativa', descripcion: 'Mejora continua en cada proceso, cuidando los detalles técnicos, legales y humanos.' },
  { titulo: 'Adaptabilidad', descripcion: 'Nos ajustamos con agilidad a los cambios del entorno, ofreciendo soluciones prácticas y oportunas.' },
  { titulo: 'Legalidad', descripcion: 'Actuamos conforme a la normativa dominicana, garantizando seguridad jurídica en cada gestión.' },
]

export default async function HomePage() {
  const [response, slidesRes] = await Promise.all([
    getDivisiones(),
    getHeroSlides().catch(() => ({ data: [] })),
  ])
  const divisiones: Division[] = response.data
  const slides: HeroSlide[] = slidesRes.data ?? []

  return (
    <main className="min-h-screen">

      {/* ── Hero Carrusel ── */}
      <HeroCarrusel slides={slides} />

      {/* ── Quiénes somos ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F6FF' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#0B21CC' }}
            >
              Nuestra empresa
            </p>
            <h2
              className="text-4xl font-bold mb-5"
              style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              ¿Quiénes somos?
            </h2>
            <div className="w-12 h-1 rounded-full mb-8" style={{ backgroundColor: '#00C2E0' }} />
            <p className="text-gray-600 leading-relaxed mb-5">
              Somos una empresa startup dominicana especializada en outsourcing de personal,
              reclutamiento estratégico y gestión administrativa de proyectos en el sector construcción.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Combinamos experiencia técnica, cumplimiento legal y sensibilidad humana para ofrecer
              soluciones que impulsan la eficiencia operativa de nuestros clientes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Con más de 10 años en el sector, constituidos como empresa constructora en 2019
              y como outsourcing de gestión de personal desde 2021.
            </p>
          </div>

          {/* Misión y Visión */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-8 text-white"
              style={{ backgroundColor: '#0B21CC' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#00C2E0' }}>
                Misión
              </p>
              <p className="text-white/90 leading-relaxed text-sm">
                Generar oportunidades y aportar valor en la gestión del talento humano y la
                administración de proyectos, promoviendo el respeto, el buen trato y el desarrollo
                integral de nuestros colaboradores, mientras impulsamos el crecimiento sostenible
                de nuestros clientes.
              </p>
            </div>
            <div
              className="rounded-2xl p-8 border-2"
              style={{ borderColor: '#0B21CC' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#0B21CC' }}>
                Visión
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Ser referentes en el mercado nacional por la excelencia en la tercerización de
                servicios para el sector construcción, el cumplimiento normativo y la capacidad
                de adaptarnos a los desafíos propios de cada proyecto, obra y entorno constructivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divisiones ── */}
      <section id="divisiones" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#0B21CC' }}>
              Lo que hacemos
            </p>
            <h2 className="text-4xl font-bold" style={{ color: '#07090F' }}>
              Nuestras divisiones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisiones.map((division: Division) => (
              <Link
                key={division.id}
                href={`/divisiones/${division.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {division.imagenHero && (
                  <div className="relative h-44 overflow-hidden">
                    <StrapiImage
                      media={division.imagenHero}
                      alt={division.nombre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{ background: `linear-gradient(to top, ${division.colorPrimario || '#0B21CC'}, transparent)` }}
                    />
                  </div>
                )}

                {!division.imagenHero && (
                  <div className="h-1.5" style={{ backgroundColor: division.colorPrimario || '#0B21CC' }} />
                )}

                <div className="p-7">
                  {division.logo && (
                    <div className="mb-4">
                      <StrapiImage
                        media={division.logo}
                        alt={`Logo ${division.nombre}`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3
                    className="text-xl font-bold mb-3 transition-opacity group-hover:opacity-80"
                    style={{ color: division.colorPrimario || '#0B21CC', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {division.nombre}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {division.descripcion}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: division.colorPrimario || '#0B21CC' }}
                  >
                    Ver división
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F4F6FF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#0B21CC' }}>
              Lo que nos define
            </p>
            <h2 className="text-4xl font-bold" style={{ color: '#07090F' }}>
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {valores.map((valor, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                <div
                  className="w-8 h-1 rounded-full mb-5"
                  style={{ backgroundColor: '#0B21CC' }}
                />
                <h3
                  className="text-base font-bold mb-2"
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

      {/* ── Clientes ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#0B21CC' }}>
            Confían en nosotros
          </p>
          <h2 className="text-4xl font-bold mb-14" style={{ color: '#07090F' }}>
            Nuestros clientes
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['Energía 2000', 'TSK', 'Lindsayca'].map((cliente) => (
              <div key={cliente} className="text-2xl font-bold text-gray-200 tracking-tight select-none">
                {cliente}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 px-6 text-white text-center" style={{ backgroundColor: '#07090F' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#00C2E0' }}>
            ¿Tienes un proyecto?
          </p>
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            Hablemos de lo que necesitas
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Nuestro equipo está listo para ayudarte.
          </p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-4 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0B21CC', color: '#fff' }}
          >
            Escribirnos →
          </Link>
        </div>
      </section>

    </main>
  )
}
