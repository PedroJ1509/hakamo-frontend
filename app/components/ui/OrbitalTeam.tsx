'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

export interface OrbitalNode {
  iniciales: string
  cargo: string
  area: string
}

interface OrbitalTeamProps {
  items: OrbitalNode[]
  hubLabel?: string
  duracion?: number
}

const RADIO_ANILLO = 36
const RADIO_RADIO_INICIO = 14
const RADIO_RADIO_FIN = 26

const PUNTOS = [
  { x: 78, y: 8, r: 0.7 },
  { x: 92, y: 24, r: 0.5 },
  { x: 8, y: 28, r: 0.6 },
  { x: 94, y: 50, r: 0.6 },
  { x: 6, y: 58, r: 0.5 },
  { x: 86, y: 76, r: 0.7 },
  { x: 24, y: 90, r: 0.6 },
  { x: 60, y: 94, r: 0.5 },
]

function IconoHub() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.6l3.2 1.9v3.6L12 10 8.8 8.1V4.5L12 2.6z" />
      <path d="M6.2 12.6l3.2 1.9v3.6L6.2 20 3 18.1v-3.6l3.2-1.9z" />
      <path d="M17.8 12.6l3.2 1.9v3.6L17.8 20l-3.2-1.9v-3.6l3.2-1.9z" />
    </svg>
  )
}

/** Lista vertical legible en móvil (sin grilla apretada). */
function TeamList({ items }: { items: OrbitalNode[] }) {
  return (
    <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-white dark:bg-slate-900">
      {items.map((item, i) => (
        <li key={item.cargo} className="flex items-start gap-3.5 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
          <div
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ background: `linear-gradient(150deg, ${ACCENT}, ${PRIMARY})` }}
          >
            {item.iniciales}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-baseline justify-between gap-2">
              <h3
                className="text-sm font-bold leading-snug sm:text-[0.95rem]"
                style={{ color: 'var(--brand-primary-dark, #0D1B5E)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                {item.cargo}
              </h3>
              <span className="flex-shrink-0 text-[10px] font-semibold tracking-[0.16em] text-gray-400">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{item.area}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function Orbit({
  items,
  hubLabel,
  duracion,
}: {
  items: OrbitalNode[]
  hubLabel: string
  duracion: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const girar = !prefersReducedMotion
  const giro = { duration: duracion, repeat: Infinity, ease: 'linear' as const }
  const angulos = items.map((_, i) => -90 + (360 / items.length) * i)

  return (
    <div className="relative mx-auto w-full max-w-[420px] px-2 py-4 sm:px-4">
      <div className="relative mx-auto aspect-square w-full max-w-[min(42svh,380px)]">
        <motion.svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          style={{ color: ACCENT }}
          animate={girar ? { rotate: 360 } : undefined}
          transition={giro}
        >
          <circle
            cx="50"
            cy="50"
            r={RADIO_ANILLO}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.3"
          />
          {angulos.map((a) => {
            const rad = (a * Math.PI) / 180
            return (
              <line
                key={a}
                x1={50 + RADIO_RADIO_INICIO * Math.cos(rad)}
                y1={50 + RADIO_RADIO_INICIO * Math.sin(rad)}
                x2={50 + RADIO_RADIO_FIN * Math.cos(rad)}
                y2={50 + RADIO_RADIO_FIN * Math.sin(rad)}
                stroke="currentColor"
                strokeWidth="0.25"
                opacity="0.35"
              />
            )
          })}
          {PUNTOS.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="currentColor" opacity="0.25" />
          ))}
        </motion.svg>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="relative">
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-2xl"
                style={{ backgroundColor: ACCENT }}
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl border text-white shadow-lg"
              style={{
                background: `linear-gradient(150deg, ${ACCENT}, ${PRIMARY})`,
                borderColor: 'color-mix(in srgb, var(--brand-accent, #2563EB) 45%, transparent)',
              }}
            >
              <IconoHub />
            </div>
          </div>
          <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            {hubLabel}
          </span>
        </div>

        <motion.div
          className="absolute inset-0"
          animate={girar ? { rotate: 360 } : undefined}
          transition={giro}
        >
          {items.map((item, i) => {
            const rad = (angulos[i] * Math.PI) / 180
            const left = 50 + RADIO_ANILLO * Math.cos(rad)
            const top = 50 + RADIO_ANILLO * Math.sin(rad)

            return (
              <div
                key={item.cargo}
                className="absolute h-0 w-0"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <motion.div
                  className="flex w-[5.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  animate={girar ? { rotate: -360 } : undefined}
                  transition={giro}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-sm font-bold shadow-sm dark:bg-slate-900"
                    style={{ borderColor: 'var(--border)', color: PRIMARY }}
                  >
                    {item.iniciales}
                  </div>
                  <span
                    className="mt-1.5 line-clamp-2 text-center text-[10px] font-semibold leading-tight"
                    style={{ color: 'var(--brand-primary-dark, #0D1B5E)' }}
                  >
                    {item.cargo}
                  </span>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default function OrbitalTeam({
  items,
  hubLabel = 'Hakamo',
  duracion = 48,
}: OrbitalTeamProps) {
  return (
    <>
      <div className="lg:hidden">
        <TeamList items={items} />
      </div>
      <div className="hidden lg:block">
        <Orbit items={items} hubLabel={hubLabel} duracion={duracion} />
      </div>
    </>
  )
}
