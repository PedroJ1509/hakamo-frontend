import Link from 'next/link'
import Image from 'next/image'
import { getDivisiones } from '@/lib/api'
import { Division } from '@/types'

export default async function Footer() {
  const response = await getDivisiones().catch(() => ({ data: [] }))
  const divisiones: Division[] = response.data

  return (
    <footer style={{ backgroundColor: '#07090F' }} className="text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Columna 1 — Marca */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Hakamo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                Hakamo
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Grupo empresarial dominicano con divisiones especializadas,
              comprometido con la excelencia en cada uno de sus servicios.
            </p>
            <div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: '#00C2E0' }}
            />
          </div>

          {/* Columna 2 — Divisiones */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Divisiones
            </h4>
            <ul className="space-y-3">
              {divisiones.map((division: Division) => (
                <li key={division.id}>
                  <Link
                    href={`/divisiones/${division.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-125"
                      style={{ backgroundColor: division.colorPrimario || '#0B21CC' }}
                    />
                    {division.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Contacto */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:gestionhumanahakamo@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors break-all"
                >
                  gestionhumanahakamo@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/18296790671"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  829-679-0671 (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hakamord/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  @hakamord
                </a>
              </li>
              <li>
                <Link
                  href="/empleos"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Empleos
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Formulario de contacto →
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Hakamo. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-700">
            hakamo.do
          </p>
        </div>
      </div>
    </footer>
  )
}
