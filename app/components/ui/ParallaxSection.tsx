'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: ReactNode
  /** Capas decorativas — se mueven más lento (más “lejos”). */
  background?: ReactNode
  /**
   * Distancia total (px) del foreground a lo largo del recorrido de la sección.
   * El fondo se mueve a ~1/4 de esto (más lento → más profundidad).
   */
  foregroundDistance?: number
  backgroundDistance?: number
  className?: string
  style?: CSSProperties
  id?: string
}

/**
 * Parallax entre secciones: el fondo se mueve más lento que el foreground.
 * Atado al recorrido de la propia sección (no al scroll global) para que
 * el contenido no desaparezca al bajar la página.
 */
export default function ParallaxSection({
  children,
  background,
  foregroundDistance = 220,
  backgroundDistance = 55,
  className = '',
  style,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Misma idea que useTransform(scrollY, [0,1], { fg:[0,2], bg:[0,0.5] }):
  // el foreground recorre más distancia que el background.
  const foregroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [foregroundDistance, -foregroundDistance]
  )
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [backgroundDistance, -backgroundDistance]
  )

  const spring = { stiffness: 90, damping: 18, mass: 0.35 }
  const smoothForegroundY = useSpring(foregroundY, spring)
  const smoothBackgroundY = useSpring(backgroundY, spring)

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden ${className}`.trim()}
      style={style}
    >
      {background ? (
        <motion.div
          aria-hidden
          style={{ y: smoothBackgroundY }}
          className="pointer-events-none absolute -inset-y-32 inset-x-0"
        >
          {background}
        </motion.div>
      ) : null}

      <motion.div style={{ y: smoothForegroundY }} className="relative z-10 w-full">
        {children}
      </motion.div>
    </section>
  )
}
