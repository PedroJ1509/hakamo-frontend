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
  /** Etiqueta bajo el hub central. */
  hubLabel?: string
  /** Segundos que tarda una vuelta completa del anillo. */
  duracion?: number
}

const RADIO_ANILLO = 38 // % del contenedor
const RADIO_RADIO_INICIO = 15 // dónde arranca cada radio, saliendo del hub
const RADIO_RADIO_FIN = 27 // dónde termina, antes de llegar al nodo

/** Puntos decorativos sueltos alrededor del anillo. */
const PUNTOS = [
  { x: 78, y: 6, r: 0.7 },
  { x: 94, y: 22, r: 0.5 },
  { x: 6, y: 30, r: 0.6 },
  { x: 97, y: 47, r: 0.6 },
  { x: 3, y: 62, r: 0.5 },
  { x: 88, y: 78, r: 0.7 },
  { x: 22, y: 88, r: 0.6 },
  { x: 62, y: 96, r: 0.5 },
]

function IconoHub() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.6l3.2 1.9v3.6L12 10 8.8 8.1V4.5L12 2.6z" />
      <path d="M6.2 12.6l3.2 1.9v3.6L6.2 20 3 18.1v-3.6l3.2-1.9z" />
      <path d="M17.8 12.6l3.2 1.9v3.6L17.8 20l-3.2-1.9v-3.6l3.2-1.9z" />
    </svg>
  )
}

export default function OrbitalTeam({
  items,
  hubLabel = 'Hakamo',
  duracion = 48,
}: OrbitalTeamProps) {
  const prefersReducedMotion = useReducedMotion()
  const girar = !prefersReducedMotion
  const giro = { duration: duracion, repeat: Infinity, ease: 'linear' as const }

  // Empieza arriba y reparte el resto en el sentido del reloj.
  const angulos = items.map((_, i) => -90 + (360 / items.length) * i)

  return (
    <div className="relative mx-auto aspect-square w-[min(52svh,520px)]">
      {/* Anillo, radios y puntos: giran como una sola pieza */}
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
          strokeWidth="0.25"
          opacity="0.35"
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
              opacity="0.4"
            />
          )
        })}

        {PUNTOS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="currentColor" opacity="0.3" />
        ))}
      </motion.svg>

      {/* Hub central */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="relative">
          {!prefersReducedMotion && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: ACCENT }}
              animate={{ scale: [1, 1.55], opacity: [0.35, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <div
            className="relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border text-white shadow-lg"
            style={{
              background: `linear-gradient(150deg, ${ACCENT}, ${PRIMARY})`,
              borderColor: 'color-mix(in srgb, var(--brand-accent, #2563EB) 45%, transparent)',
            }}
          >
            <IconoHub />
          </div>
        </div>
        <span className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          {hubLabel}
        </span>
      </div>

      {/* Nodos: el anillo gira y cada nodo contra-rota para quedar derecho */}
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
                className="flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                animate={girar ? { rotate: -360 } : undefined}
                transition={giro}
              >
                <div
                  className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl border bg-white text-base font-bold shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md dark:bg-slate-900"
                  style={{ borderColor: 'var(--border)', color: PRIMARY }}
                >
                  {item.iniciales}
                </div>
                <span
                  className="mt-2 text-center text-[11px] font-semibold leading-tight"
                  style={{ color: 'var(--brand-primary-dark, #0D1B5E)' }}
                >
                  {item.cargo}
                </span>
                <span className="mt-0.5 text-center text-[10px] leading-tight text-gray-400">
                  {item.area}
                </span>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
