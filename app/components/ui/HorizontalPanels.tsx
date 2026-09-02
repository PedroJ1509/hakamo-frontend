'use client'

import { useEffect, useLayoutEffect, useRef, useState, Children, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface HorizontalPanelsProps {
  children: ReactNode
  className?: string
}

/**
 * Desktop: scroll vertical mueve capítulos en horizontal (1:1, sin muelle).
 * Sin overflow interno: la rueda siempre es de la página.
 * Móvil: capítulos apilados.
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

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  if (prefersReducedMotion || !isDesktop) {
    return (
      <div ref={containerRef} className={`relative ${className}`.trim()}>
        {panels.map((panel, i) => (
          <div key={i} className="relative">
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
      style={{ height: `calc(${count} * (100svh - var(--header-h)))` }}
    >
      <div
        ref={stickyRef}
        className="hp-stage sticky top-[var(--header-h)] h-[calc(100svh-var(--header-h))] overflow-hidden"
      >
        <motion.div
          style={{ x, width: panelWidth > 0 ? panelWidth * count : undefined }}
          className="flex h-full touch-pan-y"
        >
          {panels.map((panel, i) => (
            <section
              key={i}
              className="h-full min-h-0 flex-shrink-0 overflow-hidden"
              style={{ width: panelWidth > 0 ? panelWidth : '100%' }}
            >
              {panel}
            </section>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1 bg-white/10">
          <motion.div className="h-full origin-left bg-glow" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  )
}
