'use client'

import { useState } from 'react'

interface FormData {
  nombre: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
}

const initialForm: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
}

const infoContacto = [
  {
    label: 'Correo electrónico',
    valor: 'gestionhumanahakamo@gmail.com',
    href: 'mailto:gestionhumanahakamo@gmail.com',
  },
  {
    label: 'Teléfono / WhatsApp',
    valor: '829-679-0671',
    href: 'https://wa.me/18296790671',
  },
  {
    label: 'Teléfono alternativo',
    valor: '829-679-6842',
    href: 'tel:+18296796842',
  },
  {
    label: 'Redes sociales',
    valor: '@hakamord',
    href: 'https://www.instagram.com/hakamord/',
  },
  {
    label: 'Cobertura',
    valor: 'República Dominicana — con presencia activa en Montecristi',
    href: null,
  },
]

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/mensajes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData })
      })

      if (!res.ok) throw new Error('Error al enviar el mensaje')

      setEnviado(true)
      setFormData(initialForm)
    } catch {
      setError('Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none transition-colors bg-white"

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-24 px-6 text-white"
        style={{ background: 'linear-gradient(135deg, #0B21CC 0%, #070D5A 60%, #07090F 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#00C2E0' }} />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 font-bold leading-none"
          style={{ fontSize: 'clamp(180px, 25vw, 360px)', fontFamily: 'var(--font-space-grotesk, monospace)', color: '#fff' }}
          aria-hidden="true"
        >
          &lt;&gt;
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#00C2E0' }}>
            Estamos para ayudarte
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Contáctanos
          </h1>
          <p className="text-lg text-white/70 max-w-lg leading-relaxed">
            Cuéntanos sobre tu proyecto o necesidad. Nos adaptamos a los desafíos de
            cada obra y entorno constructivo.
          </p>
        </div>
      </section>

      {/* ── Contenido ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info de contacto — columna izquierda */}
          <div className="lg:col-span-2 space-y-4">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              Información de contacto
            </h2>

            {infoContacto.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-opacity hover:opacity-70 break-all"
                    style={{ color: '#0B21CC' }}
                  >
                    {item.valor}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-gray-700">{item.valor}</p>
                )}
              </div>
            ))}

            <div
              className="rounded-2xl p-6 mt-4"
              style={{ backgroundColor: '#07090F' }}
            >
              <p className="text-white/90 text-sm leading-relaxed italic">
                "Nos comprometemos a cumplir rigurosamente la normativa vigente en cada proyecto,
                garantizando seguridad y confianza en nuestras operaciones."
              </p>
              <div className="w-8 h-0.5 rounded-full mt-4" style={{ backgroundColor: '#00C2E0' }} />
            </div>
          </div>

          {/* Formulario — columna derecha */}
          <div className="lg:col-span-3">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              Envíanos un mensaje
            </h2>

            {enviado ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{ backgroundColor: '#F4F6FF', border: '2px solid #0B21CC' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold"
                  style={{ backgroundColor: '#0B21CC' }}
                >
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#07090F' }}>
                  Mensaje enviado
                </h3>
                <p className="text-gray-500 mb-8 text-sm">
                  Gracias por contactarnos. Nos comunicaremos contigo muy pronto.
                </p>
                <button
                  onClick={() => setEnviado(false)}
                  className="text-sm font-semibold"
                  style={{ color: '#0B21CC' }}
                >
                  Enviar otro mensaje →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      className={inputClass}
                      style={{ outlineColor: '#0B21CC' }}
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
                      placeholder="juan@empresa.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="829-000-0000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                      Asunto *
                    </label>
                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="Outsourcing de personal">Outsourcing de personal</option>
                      <option value="Reclutamiento y selección">Reclutamiento y selección</option>
                      <option value="Gestión de nómina">Gestión de nómina (Payroll)</option>
                      <option value="Gestión documental">Gestión documental y cumplimiento legal</option>
                      <option value="Supervisión de proyectos">Supervisión de proyectos</option>
                      <option value="Ingeniería y Construcción">Ingeniería y Construcción</option>
                      <option value="Información general">Información general</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Cuéntanos sobre tu proyecto, necesidad de personal o consulta..."
                    className={`${inputClass} resize-none`}
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
                  className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#0B21CC' }}
                >
                  {enviando ? 'Enviando...' : 'Enviar mensaje →'}
                </button>

              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
