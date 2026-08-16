'use client'

import type { CSSProperties, ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

interface ParallaxHeroProps {
  /** Capas decorativas de fondo — se mueven menos, así se leen "más lejos". */
  background?: ReactNode
  /** Contenido principal — se mueve casi con la página, se lee "más cerca". */
  children: ReactNode
  /** Capa fija sobre todo, ajena al parallax y al desvanecido (p. ej. un telón). */
  overlay?: ReactNode
  /** px que baja el contenido por cada px de scroll. */
  foregroundRate?: number
  /** px que baja el fondo por cada px de scroll. */
  backgroundRate?: number
  className?: string
  style?: CSSProperties
}

export default function ParallaxHero({
  background,
  children,
  overlay,
  foregroundRate = 0.05,
  backgroundRate = 0.65,
  className = '',
  style,
}: ParallaxHeroProps) {
  const { scrollY } = useScroll()

  const { foregroundY, backgroundY } = useTransform(
    scrollY,
    [0, 1],
    {
      foregroundY: [0, foregroundRate],
      backgroundY: [0, backgroundRate],
    },
    { clamp: false }
  )

  // El suavizado es lo que hace que el scroll se sienta sedoso en vez de rígido.
  const spring = { stiffness: 120, damping: 24, mass: 0.4 }
  const smoothForegroundY = useSpring(foregroundY, spring)
  const smoothBackgroundY = useSpring(backgroundY, spring)

  // El contenido se desvanece conforme el hero sale de pantalla.
  const foregroundOpacity = useTransform(scrollY, [0, 420], [1, 0])
  const smoothOpacity = useSpring(foregroundOpacity, spring)

  return (
    <section className={`relative overflow-hidden ${className}`.trim()} style={style}>
      {background ? (
        <motion.div aria-hidden style={{ y: smoothBackgroundY }} className="pointer-events-none absolute inset-0">
          {background}
        </motion.div>
      ) : null}

      <motion.div style={{ y: smoothForegroundY, opacity: smoothOpacity }} className="relative z-10 w-full">
        {children}
      </motion.div>

      {overlay}
    </section>
  )
}
