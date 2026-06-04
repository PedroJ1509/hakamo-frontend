'use client'

import { useState } from 'react'
import { PROCESO_EMPRESAS, PROCESO_CANDIDATOS } from '@/lib/data'

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

export default function ProcesoToggle() {
  const [tab, setTab] = useState<'empresas' | 'candidatos'>('empresas')
  const pasos = tab === 'empresas' ? PROCESO_EMPRESAS : PROCESO_CANDIDATOS
  const activeColor = tab === 'empresas' ? PRIMARY : ACCENT

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setTab('empresas')}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={
              tab === 'empresas'
                ? { backgroundColor: PRIMARY, color: '#fff' }
                : { color: '#6B7280' }
            }
          >
            Para Empresas
          </button>
          <button
            onClick={() => setTab('candidatos')}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={
              tab === 'candidatos'
                ? { backgroundColor: ACCENT, color: '#fff' }
                : { color: '#6B7280' }
            }
          >
            Para Candidatos
          </button>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block absolute top-[2rem] left-[12.5%] right-[12.5%] h-px z-0 bg-gray-200" />

        {pasos.map((paso, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-sm text-white text-xl font-bold transition-colors duration-300"
              style={{ backgroundColor: activeColor }}
            >
              {paso.paso}
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-gray-400">
              {paso.subtitulo}
            </p>
            <h3
              className="font-bold text-base mb-2"
              style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {paso.titulo}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{paso.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
