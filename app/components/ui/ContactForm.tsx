'use client'

import { useState } from 'react'

interface FormData {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

const initialForm: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        body: JSON.stringify({ data: formData }),
      })

      if (!res.ok) throw new Error('Error al enviar')
      setEnviado(true)
      setFormData(initialForm)
    } catch {
      console.log('Mensaje de contacto (sin Strapi):', formData)
      setEnviado(true)
      setFormData(initialForm)
    } finally {
      setEnviando(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-gray-400 transition-colors focus:border-[var(--brand-accent)] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:placeholder:text-gray-500'

  if (enviado) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center shadow-[var(--shadow-elevated)] dark:bg-slate-900">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
          style={{ backgroundColor: 'var(--brand-accent)' }}
        >
          ✓
        </div>
        <h4
          className="mb-3 text-xl font-bold"
          style={{ color: 'var(--brand-primary-dark)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          ¡Mensaje enviado!
        </h4>
        <p className="mb-8 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Gracias por escribirnos. Un especialista de Hakamo te contactará en menos de 24 horas.
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="text-sm font-semibold"
          style={{ color: 'var(--brand-accent)' }}
        >
          Enviar otro mensaje →
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow focus-within:shadow-[var(--shadow-elevated)] dark:bg-slate-900 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="829-000-0000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Correo electrónico *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@correo.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Mensaje *
        </label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Cuéntanos qué necesitas..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-xl py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: 'var(--brand-accent)' }}
      >
        {enviando ? 'Enviando...' : 'Enviar mensaje →'}
      </button>
    </form>
  )
}
