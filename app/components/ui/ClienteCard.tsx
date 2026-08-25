'use client'

import { motion } from 'framer-motion'
import { ICONOS_CLIENTE, IconRayo } from './iconos'

interface Cliente {
  nombre: string
  sector: string
  icono: string
}

/** Tono propio por cliente: evita que las cuatro se lean iguales. */
const TONOS = [
  { bg: 'linear-gradient(145deg, #2563EB, #1D4ED8)', acento: '#60A5FA' },
  { bg: 'linear-gradient(145deg, #38BDF8, #1E3A5F)', acento: '#7DD3FC' },
  { bg: 'linear-gradient(145deg, #4F46E5, #1E1B4B)', acento: '#A5B4FC' },
  { bg: 'linear-gradient(145deg, #0891B2, #0B1220)', acento: '#67E8F9' },
]

export default function ClienteCard({ cliente, indice }: { cliente: Cliente; indice: number }) {
  const tono = TONOS[indice % TONOS.length]
  const Icono = ICONOS_CLIENTE[cliente.nombre] ?? IconRayo

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: indice % 2 === 0 ? -50 : 50, z: -100 }}
      whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: indice * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-xl dark:bg-slate-900"
    >
      {/* Filo teñido con el tono del cliente */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${tono.acento}, transparent)` }}
      />
      {/* Halo que se enciende al pasar el ratón */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: tono.bg }}
      />

      <div className="relative">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          style={{ background: tono.bg }}
        >
          <Icono size={24} />
        </span>
        <h3
          className="mt-5 text-base font-bold"
          style={{
            color: 'var(--brand-primary-dark, #0D1B5E)',
            fontFamily: 'var(--font-space-grotesk, sans-serif)',
          }}
        >
          {cliente.nombre}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-gray-400">{cliente.sector}</p>
      </div>
    </motion.div>
  )
}
