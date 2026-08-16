'use client'

import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type ScrollDirection = 'up' | 'down'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Distancia del slide en px */
  offset?: number
  /** Cuánto debe verse la sección para considerarse "in view" */
  amount?: number
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  offset = 72,
  amount = 0.2,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount, margin: '-6% 0px -6% 0px' })
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down')
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (isInView) setHasBeenInView(true)
  }, [isInView])

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = current - previous
    if (Math.abs(diff) < 2) return
    setScrollDirection(diff > 0 ? 'down' : 'up')
  })

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Bajar → entra desde abajo / sale hacia arriba
  // Subir → entra desde arriba / sale hacia abajo
  const enterY = scrollDirection === 'down' ? offset : -offset
  const exitY = scrollDirection === 'down' ? -offset : offset

  const visible = { opacity: 1, y: 0, scale: 1 }
  const hidden = {
    opacity: 0,
    y: hasBeenInView ? exitY : enterY,
    scale: 0.96,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: offset, scale: 0.96 }}
      animate={isInView ? visible : hidden}
      transition={{
        duration: 0.7,
        delay: isInView ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
