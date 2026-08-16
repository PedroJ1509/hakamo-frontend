'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

/** En SSR no hay ventana: asumimos escritorio y corregimos antes de pintar. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

export interface ParallaxItem {
  titulo: string
  descripcion: string
  icono: string
}

/* ── Íconos por valor (sustituyen a los emoji de lib/data) ── */

const svg = (d: React.ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)

/** Apretón de manos: integridad. */
const IconIntegridad = () =>
  svg(<><path d="M7 11l3-3 3 2 4-4" /><path d="M3 12l4 4 2-1 3 3 2-1 3 2" /><path d="M14 6h4v4" /></>)

/** Insignia con estrella: excelencia. */
const IconExcelencia = () =>
  svg(<><circle cx="12" cy="9" r="6" /><path d="M12 6.5l1.1 2.2 2.4.3-1.8 1.7.5 2.4-2.2-1.2-2.2 1.2.5-2.4-1.8-1.7 2.4-.3L12 6.5z" /><path d="M8.5 14.5L7 22l5-2.5L17 22l-1.5-7.5" /></>)

/** Balanza: cumplimiento legal. */
const IconLegal = () =>
  svg(<><path d="M12 3v18" /><path d="M6 21h12" /><path d="M4 7h16" /><path d="M7 7l-3 6h6L7 7z" /><path d="M17 7l-3 6h6l-3-6z" /></>)

/** Candado: confidencialidad. */
const IconConfidencialidad = () =>
  svg(<><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15.5" r="1.4" /></>)

/** Bombilla con destello: innovación. */
const IconInnovacion = () =>
  svg(<><path d="M9.5 17h5" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .9 1.6h5.4c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3z" /></>)

/** Brote: responsabilidad social. */
const IconSocial = () =>
  svg(<><path d="M12 21v-7" /><path d="M12 14c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6z" /><path d="M12 14c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7z" /></>)

const ICONOS: Record<string, () => React.ReactElement> = {
  Integridad: IconIntegridad,
  Excelencia: IconExcelencia,
  'Cumplimiento Legal': IconLegal,
  Confidencialidad: IconConfidencialidad,
  Innovación: IconInnovacion,
  'Responsabilidad Social': IconSocial,
}

/** Tono propio por tarjeta: rompe la planitud del conjunto. */
const TONOS = ['#2563EB', '#0EA5E9', '#4F46E5', '#0891B2', '#3B82F6', '#1E3A5F']

interface Posicion {
  left: string
  top: string
  width: string
  /** Cuánto se desplaza con el ratón: mayor = más cerca del espectador. */
  depth: number
  rot: number
}

/**
 * Reparto disperso alrededor de un centro libre, donde va el texto.
 * Con maxHeight 32%, la fila superior nunca pasa del 37% y la inferior
 * arranca en el 64%: queda una banda central despejada.
 */
const POSICIONES: Posicion[] = [
  { left: '0%', top: '0%', width: '27%', depth: 1.5, rot: -1.6 },
  { left: '36%', top: '0%', width: '26%', depth: 0.7, rot: 1.1 },
  { left: '73%', top: '2%', width: '27%', depth: 1.2, rot: -0.8 },
  { left: '1%', top: '72%', width: '27%', depth: 0.9, rot: 1.4 },
  { left: '36%', top: '74%', width: '26%', depth: 1.7, rot: -1.2 },
  { left: '73%', top: '70%', width: '27%', depth: 0.6, rot: 0.9 },
]

function Tarjeta({
  item,
  pos,
  indice,
  mx,
  my,
  animar,
}: {
  item: ParallaxItem
  pos: Posicion
  indice: number
  mx: MotionValue<number>
  my: MotionValue<number>
  animar: boolean
}) {
  const tono = TONOS[indice % TONOS.length]
  const Icono = ICONOS[item.titulo] ?? IconIntegridad

  // Cada capa se mueve en proporción a su profundidad.
  const x = useTransform(mx, (v) => v * 34 * pos.depth)
  const y = useTransform(my, (v) => v * 26 * pos.depth)
  const rotY = useTransform(mx, (v) => v * 7 * pos.depth)
  const rotX = useTransform(my, (v) => -v * 5 * pos.depth)

  return (
    <motion.article
      className="group absolute overflow-hidden rounded-2xl border bg-white p-4 backdrop-blur-sm transition-[box-shadow,border-color] duration-300 dark:bg-slate-900 lg:p-5"
      style={{
        left: pos.left,
        top: pos.top,
        width: pos.width,
        // Acota la tarjeta para dejar libre la banda central del campo
        // (fila superior hasta 28%, inferior desde 70%).
        maxHeight: '26%',
        rotate: pos.rot,
        x: animar ? x : 0,
        y: animar ? y : 0,
        rotateY: animar ? rotY : 0,
        rotateX: animar ? rotX : 0,
        transformStyle: 'preserve-3d',
        // Las de mayor profundidad quedan por delante.
        zIndex: Math.round(pos.depth * 10),
        borderColor: `color-mix(in srgb, ${tono} 22%, transparent)`,
        // Fondo con degradado suave hacia el tono: evita el aspecto plano.
        backgroundImage: `linear-gradient(155deg, color-mix(in srgb, ${tono} 7%, transparent), transparent 62%)`,
        // Sombra proporcional a la profundidad: las cercanas pesan más.
        boxShadow: `0 ${6 + pos.depth * 10}px ${16 + pos.depth * 20}px -${8 + pos.depth * 4}px rgba(15,23,42,${0.10 + pos.depth * 0.07})`,
      }}
      initial={animar ? { opacity: 0, y: 24, scale: 0.94 } : false}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, delay: indice * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Filo superior iluminado */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${tono}66, transparent)` }}
      />
      {/* Resplandor de esquina al pasar el ratón */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: tono }}
      />

      <div className="relative mb-2 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ background: `linear-gradient(145deg, ${tono}, color-mix(in srgb, ${tono} 62%, #0B1220))` }}
        >
          <Icono />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-400">
          {String(indice + 1).padStart(2, '0')}
        </span>
      </div>
      <h3
        className="relative mb-1 text-sm font-bold lg:text-base"
        style={{ color: tono, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
      >
        {item.titulo}
      </h3>
      <p className="relative line-clamp-2 text-[11px] leading-snug text-gray-500 dark:text-gray-400 lg:text-xs">
        {item.descripcion}
      </p>
    </motion.article>
  )
}

interface ParallaxCardsProps {
  items: ParallaxItem[]
  children?: ReactNode
}

/**
 * Campo de tarjetas en capas con parallax por movimiento del ratón.
 */
export default function ParallaxCards({ items, children }: ParallaxCardsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [esEscritorio, setEsEscritorio] = useState(true)
  const animar = !prefersReducedMotion && esEscritorio

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setEsEscritorio(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.5 })
  const my = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.5 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!animar) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    // Normalizado a -1..1 desde el centro del campo.
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  // Sin ratón (móvil/tableta) el parallax no aporta y el reparto disperso deja
  // tarjetas de ~95px, ilegibles: ahí caemos a una grilla normal.
  if (!esEscritorio) {
    return (
      <>
        {children ? <div className="mb-6">{children}</div> : null}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item, i) => {
          const tono = TONOS[i % TONOS.length]
          const Icono = ICONOS[item.titulo] ?? IconIntegridad
          return (
          <article
            key={item.titulo}
            className="rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-900"
            style={{
              borderColor: `color-mix(in srgb, ${tono} 22%, transparent)`,
              backgroundImage: `linear-gradient(155deg, color-mix(in srgb, ${tono} 7%, transparent), transparent 62%)`,
            }}
          >
            <div className="mb-2 flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm"
                style={{ background: `linear-gradient(145deg, ${tono}, color-mix(in srgb, ${tono} 62%, #0B1220))` }}
              >
                <Icono />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-400">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3
              className="mb-1 text-base font-bold"
              style={{ color: tono, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {item.titulo}
            </h3>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              {item.descripcion}
            </p>
          </article>
          )
        })}
        </div>
      </>
    )
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full"
      // Altura explícita: dentro de un contenedor con min-h-full, un h-full
      // sería circular y colapsaría el campo a 0.
      style={{ perspective: '1100px', height: 'clamp(360px, 72svh, 620px)' }}
    >
      {items.slice(0, POSICIONES.length).map((item, i) => (
        <Tarjeta
          key={item.titulo}
          item={item}
          pos={POSICIONES[i]}
          indice={i}
          mx={mx}
          my={my}
          animar={animar}
        />
      ))}

      {/* Texto en la banda central libre, por encima de las tarjetas */}
      {children ? (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-50 -translate-y-1/2 px-6">
          {/* Halo detrás del texto: lo despega del fondo */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(ellipse, color-mix(in srgb, ${ACCENT} 16%, transparent), transparent 70%)` }}
          />
          {children}
        </div>
      ) : null}
    </div>
  )
}
