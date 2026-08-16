'use client'

import { motion } from 'framer-motion'
import ShapeGrid from './ShapeGrid'

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

function IconMail({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconPhone({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconPin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const CARDS = [
  {
    label: 'Email',
    valor: 'gestionhumanahakamo@gmail.com',
    accion: 'Escribir correo',
    href: 'mailto:gestionhumanahakamo@gmail.com',
    Icono: IconMail,
    bg: `linear-gradient(145deg, ${ACCENT}, #1D4ED8)`,
    acento: '#60A5FA',
  },
  {
    label: 'Teléfono',
    valor: '829-679-6842',
    accion: 'Llamar ahora',
    href: 'tel:+18296796842',
    Icono: IconPhone,
    bg: `linear-gradient(145deg, #38BDF8, ${PRIMARY})`,
    acento: '#7DD3FC',
  },
  {
    label: 'Ubicación',
    valor: 'Montecristi, RD',
    accion: 'Ver en el mapa',
    href: 'https://maps.google.com/?q=Montecristi,República Dominicana',
    Icono: IconPin,
    bg: 'linear-gradient(145deg, #34D399, #0F766E)',
    acento: '#6EE7B7',
  },
  {
    label: 'Instagram',
    valor: '@hakamord',
    accion: 'Seguirnos',
    href: 'https://www.instagram.com/hakamord/',
    Icono: IconInstagram,
    bg: 'linear-gradient(145deg, #F58529, #DD2A7B, #8134AF)',
    acento: '#F472B6',
  },
]

export default function ScrollingContactCards() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-20 lg:py-28" style={{ background: `linear-gradient(175deg, ${PRIMARY}, #0B1220)` }}>
      <div className="absolute inset-0 opacity-[0.12]">
        <ShapeGrid
          direction="diagonal"
          speed={0.4}
          squareSize={64}
          shape="square"
          borderColor="rgba(255,255,255,0.35)"
          hoverFillColor={ACCENT}
          hoverTrailAmount={6}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Nuestros canales</span>
          <h2
            className="mt-4 font-bold text-white"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Encuéntranos donde te sea más fácil
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: '1200px' }}>
          {CARDS.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotateY: i % 2 === 0 ? -60 : 60, z: -120 }}
              whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotateY: i % 2 === 0 ? -6 : 6, transition: { duration: 0.25 } }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.02] p-6 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors duration-300 hover:border-white/30"
            >
              {/* Filo iluminado con el color del canal */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${item.acento}, transparent)` }}
              />
              {/* Halo del canal, se enciende al pasar el ratón */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: item.bg }}
              />

              <div className="relative">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: item.bg }}
                >
                  <item.Icono size={24} />
                </span>

                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
                  {item.label}
                </p>
                <p
                  className="mt-1.5 break-words text-base font-semibold leading-snug text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  {item.valor}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 transition-colors group-hover:text-white">
                  {item.accion}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
