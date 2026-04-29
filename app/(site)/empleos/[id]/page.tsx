'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import BlocksRenderer from '@/app/components/ui/BlocksRenderer'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

const modalidadLabel: Record<string, string> = {
  presencial: 'Presencial',
  remoto: 'Remoto',
  hibrido: 'Híbrido',
}

const tipoLabel: Record<string, string> = {
  tiempo_completo: 'Tiempo completo',
  medio_tiempo: 'Medio tiempo',
  contrato: 'Contrato',
}

type BlockNode = {
  type: string
  children?: BlockNode[]
  text?: string
  level?: number
  format?: string
  url?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

interface VacanteData {
  id: number
  documentId: string
  titulo: string
  slug: string
  descripcion: BlockNode[] | null
  requisitos: BlockNode[] | null
  ubicacion: string
  modalidad: string
  tipo: string
  salario: string
  estado: string
  fechaPublicacion: string
  fechaCierre: string
  division: {
    nombre: string
    slug: string
    colorPrimario: string
  }
}

interface FormData {
  nombre: string
  email: string
  telefono: string
  cartaPresentacion: string
}

const initialForm: FormData = { nombre: '', email: '', telefono: '', cartaPresentacion: '' }

export default function VacanteDetallePage() {
  const params = useParams()
  const id = params.id as string

  const [vacante, setVacante] = useState<VacanteData | null>(null)
  const [cargando, setCargando] = useState(true)
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/vacantes/${id}?populate=*`)
      .then((r) => r.json())
      .then((data) => {
        setVacante(data.data ?? null)
        setCargando(false)
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vacante) return
    setEnviando(true)
    setError('')

    try {
      const res = await fetch(`${STRAPI_URL}/api/postulacions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            ...formData,
            vacante: vacante.documentId,
            estado: 'recibida',
          }
        }),
      })

      if (!res.ok) throw new Error('Error al enviar la postulación')

      setEnviado(true)
      setFormData(initialForm)
    } catch {
      setError('Hubo un problema al enviar tu postulación. Por favor intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  if (cargando) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-sm">Cargando vacante...</div>
      </main>
    )
  }

  if (!vacante) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-8xl font-black text-gray-100 mb-4">404</p>
        <p className="text-gray-500 mb-6">Esta vacante no existe o ya fue cerrada.</p>
        <Link href="/empleos" className="text-sm font-semibold" style={{ color: '#0B21CC' }}>
          ← Ver todas las vacantes
        </Link>
      </main>
    )
  }

  const color = vacante.division?.colorPrimario || '#0B21CC'

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-24 px-6 text-white"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 60%, #07090F 100%)` }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#00C2E0' }} />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 font-bold leading-none"
          style={{ fontSize: 'clamp(180px, 28vw, 380px)', fontFamily: 'var(--font-space-grotesk, monospace)', color: '#fff' }}
          aria-hidden="true"
        >
          &lt;&gt;
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Link href="/" className="text-xs text-white/50 hover:text-white/80 transition-colors">Hakamo</Link>
            <span className="text-white/30 text-xs">›</span>
            <Link href="/empleos" className="text-xs text-white/50 hover:text-white/80 transition-colors">Empleos</Link>
            <span className="text-white/30 text-xs">›</span>
            <span className="text-xs text-white/80">{vacante.titulo}</span>
          </div>

          {vacante.division && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#00C2E0' }}>
              {vacante.division.nombre}
            </p>
          )}

          <h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {vacante.titulo}
          </h1>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3">
            {vacante.ubicacion && (
              <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                📍 {vacante.ubicacion}
              </span>
            )}
            {vacante.modalidad && (
              <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                💼 {modalidadLabel[vacante.modalidad]}
              </span>
            )}
            {vacante.tipo && (
              <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                🕐 {tipoLabel[vacante.tipo]}
              </span>
            )}
            {vacante.salario && (
              <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                💰 {vacante.salario}
              </span>
            )}
            {vacante.fechaCierre && (
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10">
                📅 Cierra: {new Date(vacante.fechaCierre).toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Contenido ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Descripción y requisitos — izquierda */}
          <div className="lg:col-span-3 space-y-10">

            {vacante.descripcion && (
              <div>
                <h2
                  className="text-xl font-bold mb-5"
                  style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  Descripción del puesto
                </h2>
                <div className="prose prose-gray max-w-none text-sm leading-relaxed">
                  <BlocksRenderer content={vacante.descripcion} />
                </div>
              </div>
            )}

            {vacante.requisitos && (
              <div>
                <h2
                  className="text-xl font-bold mb-5"
                  style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  Requisitos del puesto
                </h2>
                <div className="prose prose-gray max-w-none text-sm leading-relaxed">
                  <BlocksRenderer content={vacante.requisitos} />
                </div>
              </div>
            )}
          </div>

          {/* Formulario de postulación — derecha */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                Postularme a esta vacante
              </h2>

              {enviado ? (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ backgroundColor: '#F4F6FF', border: `2px solid ${color}` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-lg font-bold"
                    style={{ backgroundColor: color }}
                  >
                    ✓
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#07090F' }}>
                    ¡Postulación enviada!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Recibimos tu información. Nos comunicaremos contigo si tu perfil se ajusta a la vacante.
                  </p>
                  <Link
                    href="/empleos"
                    className="text-sm font-semibold"
                    style={{ color }}
                  >
                    ← Ver otras vacantes
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Juan Pérez"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="juan@correo.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="829-000-0000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white"
                    />
                  </div>

                  {/* Instrucción CV por WhatsApp */}
                  <div
                    className="rounded-xl p-4 flex gap-3 items-start"
                    style={{ backgroundColor: `${color}12`, border: `1px solid ${color}30` }}
                  >
                    <span className="text-lg flex-shrink-0">📎</span>
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color }}>
                        Envía tu CV por WhatsApp
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Luego de enviar este formulario, envía tu CV actualizado (PDF) al{' '}
                        <a
                          href="https://wa.me/18296790671"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                          style={{ color }}
                        >
                          829-679-0671
                        </a>{' '}
                        indicando el puesto al que aplicas.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                      Carta de presentación <span className="text-gray-400 normal-case font-normal">(opcional)</span>
                    </label>
                    <textarea
                      name="cartaPresentacion"
                      value={formData.cartaPresentacion}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Cuéntanos brevemente por qué eres el candidato ideal..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white resize-none"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: color }}
                  >
                    {enviando ? 'Enviando...' : 'Enviar postulación →'}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    Tu información es confidencial y solo será usada para este proceso.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
