'use client'

import { useState } from 'react'
import CurvedInput from '@/app/components/ui/CurvedInput'

interface Props {
  color: string
}

export default function NewsletterForm({ color }: Props) {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return
    // TODO: conectar con backend (Strapi, Mailchimp, etc.)
    setEnviado(true)
    setEmail('')
  }

  if (enviado) {
    return (
      <div
        data-lanyard-front
        className="relative z-[50] mx-auto flex max-w-md items-center justify-center gap-3 rounded-xl bg-white/10 px-6 py-4"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 text-white"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <p className="text-sm font-medium text-white/90">¡Gracias! Te hemos añadido a nuestra lista.</p>
      </div>
    )
  }

  return (
    <div data-lanyard-front className="relative z-[50] mx-auto w-full max-w-lg lg:mx-0">
      <CurvedInput
        value={email}
        onChange={setEmail}
        onSubmit={handleSubmit}
        placeholder="tu@correo.com"
        buttonText="Suscribirme"
        theme="dark"
        bend={22}
        height={58}
        width="100%"
        fontSize={15}
        buttonColor={color}
        backgroundColor="rgba(255,255,255,0.08)"
        borderColor="rgba(255,255,255,0.18)"
        textColor="#ffffff"
        placeholderColor="rgba(255,255,255,0.45)"
        shadowSize="md"
        shadowColor="#000000"
      />
    </div>
  )
}
