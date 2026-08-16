'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

interface ParallaxLayerProps {
  children: ReactNode
  /**
   * px que se desplaza la capa a lo largo de su recorrido por pantalla.
   * Valores distintos entre capas vecinas son los que crean la profundidad.
   */
  distance?: number
  className?: string
}

export default function ParallaxLayer({ children, distance = 60, className = '' }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Atado al recorrido del propio elemento, no al scroll global:
  // así el efecto queda acotado y no se dispara fuera de pantalla.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const smoothY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.4 })

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  )
}
