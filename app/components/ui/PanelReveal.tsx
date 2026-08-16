'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface PanelRevealProps {
  children: ReactNode
  delay?: number
  /** Desplazamiento vertical inicial en px. */
  y?: number
  /** Desplazamiento horizontal inicial en px: útil para que entren desde un lado. */
  x?: number
  className?: string
}

/**
 * Revelado para el contenido de los paneles horizontales.
 * `once: false` para que se repita cada vez que el panel vuelve a entrar en pantalla.
 */
export default function PanelReveal({ children, delay = 0, y = 28, x = 0, className }: PanelRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
