'use client'

import { useEffect, useLayoutEffect, useRef, useState, Children, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface HorizontalPanelsProps {
  children: ReactNode
  className?: string
}

/**
 * Tras el hero:
 * - Desktop (≥1024): scroll vertical → recorrido lateral (sticky).
 * - Móvil/tablet: mismas secciones apiladas (scroll nativo estable).
 * El sticky+transform en táctil se corta entre paneles y pelea con el gesto.
 */
export default function HorizontalPanels({ children, className = '' }: HorizontalPanelsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [panelWidth, setPanelWidth] = useState(0)

  const panels = Children.toArray(children)
  const count = Math.max(panels.length, 1)
  const distance = panelWidth * Math.max(0, count - 1)

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !isDesktop) return
    const sticky = stickyRef.current
    if (!sticky) return

    const measure = () => {
      const w = Math.round(sticky.getBoundingClientRect().width)
      if (w > 0) setPanelWidth((prev) => (prev === w ? prev : w))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(sticky)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [count, prefersReducedMotion, isDesktop])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Píxeles (no %): useSpring con strings "%" se rompe.
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(rawX, { stiffness: 110, damping: 28, mass: 0.4 })
  const progressScale = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 })

  // Móvil / reduced-motion: apilar. Flujo hero → secciones → footer, sin bugs.
  if (prefersReducedMotion || !isDesktop) {
    return (
      <div ref={containerRef} className={className}>
        {panels.map((panel, i) => (
          <div key={i} className="relative border-b border-[var(--border)] last:border-b-0">
            {panel}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`.trim()}
      style={{ height: `${count * 100}svh` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ x, width: panelWidth > 0 ? panelWidth * count : undefined }}
          className="flex h-full will-change-transform"
        >
          {panels.map((panel, i) => (
            <section
              key={i}
              className="h-full flex-shrink-0 overflow-x-hidden overflow-y-auto"
              style={{ width: panelWidth > 0 ? panelWidth : '100%' }}
            >
              {panel}
            </section>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1 bg-black/10 dark:bg-white/10">
          <motion.div
            className="h-full origin-left"
            style={{ scaleX: progressScale, backgroundColor: 'var(--brand-accent, #2563EB)' }}
          />
        </div>
      </div>
    </div>
  )
}
