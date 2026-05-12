'use client'

import { useState } from 'react'

interface Props {
  color: string
}

export default function NewsletterForm({ color }: Props) {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: conectar con backend (Strapi, Mailchimp, etc.)
    setEnviado(true)
    setEmail('')
  }

  if (enviado) {
    return (
      <div className="flex items-center justify-center gap-3 bg-white/10 rounded-xl px-6 py-4 max-w-md mx-auto">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white flex-shrink-0">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <p className="text-white/90 text-sm font-medium">¡Gracias! Te hemos añadido a nuestra lista.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="tu@correo.com"
        className="flex-1 px-5 py-3.5 rounded-xl text-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
      />
      <button
        type="submit"
        className="px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all hover:opacity-90 hover:shadow-lg"
        style={{ backgroundColor: '#fff', color }}
      >
        Suscribirme
      </button>
    </form>
  )
}
