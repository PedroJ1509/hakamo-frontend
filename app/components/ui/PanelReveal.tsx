'use client'

import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

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
 * Revelado para el contenido de los paneles.
 * En móvil anula el offset X (evita contenido cortado al entrar).
 */
export default function PanelReveal({ children, delay = 0, y = 28, x = 0, className }: PanelRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const startX = isDesktop ? x : 0

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x: startX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
