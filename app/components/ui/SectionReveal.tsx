'use client'

import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type ScrollDirection = 'up' | 'down'
export type RevealFrom = 'left' | 'right' | 'bottom' | 'top' | 'center'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Distancia del slide en px */
  offset?: number
  /** Dirección de entrada fija (ignora el eje Y del scroll). */
  from?: RevealFrom
  /** Cuánto debe verse la sección para considerarse "in view" */
  amount?: number
}

function offsetFor(from: RevealFrom | undefined, offset: number, scrollDirection: ScrollDirection) {
  if (!from) {
    const y = scrollDirection === 'down' ? offset : -offset
    return { x: 0, y, scale: 0.96 }
  }
  switch (from) {
    case 'left':
      return { x: -offset, y: 0, scale: 0.98 }
    case 'right':
      return { x: offset, y: 0, scale: 0.98 }
    case 'top':
      return { x: 0, y: -offset, scale: 0.98 }
    case 'center':
      return { x: 0, y: offset * 0.35, scale: 0.88 }
    case 'bottom':
    default:
      return { x: 0, y: offset, scale: 0.96 }
  }
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  offset = 72,
  from,
  amount = 0.2,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount, margin: '-6% 0px -6% 0px' })
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = current - previous
    if (Math.abs(diff) < 2) return
    setScrollDirection(diff > 0 ? 'down' : 'up')
  })

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const enter = offsetFor(from, offset, scrollDirection)
  // Con `from`: siempre afuera → dentro (mismo lado al salir).
  const away = from
    ? enter
    : offsetFor(undefined, offset, scrollDirection === 'down' ? 'up' : 'down')

  const visible = { opacity: 1, x: 0, y: 0, scale: 1 }
  const hidden = {
    opacity: 0,
    x: away.x,
    y: away.y,
    scale: away.scale,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...enter }}
      animate={isInView ? visible : hidden}
      transition={{
        duration: 0.75,
        delay: isInView ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
