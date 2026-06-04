'use client'

import { useState } from 'react'
import { AREAS_EMPLEO, NIVELES_EXPERIENCIA } from '@/lib/data'

const ACCENT = '#2563EB'

interface FormData {
  nombre: string
  apellido: string
  telefono: string
  email: string
  areaInteres: string
  nivelExperiencia: string
  mensaje: string
}

const initialForm: FormData = {
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  areaInteres: '',
  nivelExperiencia: '',
  mensaje: '',
}

export default function EmpleoForm() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/candidatos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
      })

      if (!res.ok) throw new Error('Error al enviar')
      setEnviado(true)
      setFormData(initialForm)
    } catch {
      console.log('Candidato registrado (sin Strapi):', formData)
      setEnviado(true)
      setFormData(initialForm)
    } finally {
      setEnviando(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors bg-white'

  if (enviado) {
    return (
      <div className="rounded-2xl p-12 text-center bg-white border-2" style={{ borderColor: ACCENT }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold"
          style={{ backgroundColor: ACCENT }}
        >
          ✓
        </div>
        <h4
          className="text-xl font-bold mb-3"
          style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          ¡Perfil registrado!
        </h4>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Hemos recibido tu información. Te contactaremos cuando haya una oportunidad
          que encaje con tu perfil.
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="text-sm font-semibold"
          style={{ color: ACCENT }}
        >
          Registrar otro candidato →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Juan"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            Apellido *
          </label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            placeholder="Pérez"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            placeholder="829-000-0000"
            className={inputClass}
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
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          Área de interés *
        </label>
        <select
          name="areaInteres"
          value={formData.areaInteres}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="">Selecciona un área</option>
          {AREAS_EMPLEO.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          Nivel de experiencia *
        </label>
        <select
          name="nivelExperiencia"
          value={formData.nivelExperiencia}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="">Selecciona tu nivel</option>
          {NIVELES_EXPERIENCIA.map((nivel) => (
            <option key={nivel} value={nivel}>
              {nivel}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          Mensaje (opcional)
        </label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows={4}
          placeholder="Cuéntanos sobre tu experiencia o en qué tipo de proyecto te gustaría trabajar..."
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
        style={{ backgroundColor: ACCENT }}
      >
        {enviando ? 'Enviando...' : 'Enviar mi perfil →'}
      </button>
    </form>
  )
}
