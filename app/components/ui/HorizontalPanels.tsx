'use client'

import { useEffect, useLayoutEffect, useRef, useState, Children, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface HorizontalPanelsProps {
  children: ReactNode
  className?: string
}

/**
 * Desktop: el scroll vertical mueve los capítulos en horizontal.
 * Al soltar, el capítulo más cercano encaja completo en pantalla.
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

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
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

  useEffect(() => {
    if (prefersReducedMotion || !isDesktop || count < 2) return

    let lock = false
    let unlockTimer = 0

    const snap = () => {
      if (lock) return
      const el = containerRef.current
      if (!el) return

      const start = el.getBoundingClientRect().top + window.scrollY
      const range = el.offsetHeight - window.innerHeight
      if (range <= 8) return

      const progress = (window.scrollY - start) / range
      if (progress <= 0 || progress >= 1) return

      const index = Math.round(progress * (count - 1))
      const target = start + (index / (count - 1)) * range
      const delta = target - window.scrollY
      if (Math.abs(delta) < 16) return

      lock = true
      window.scrollBy({ top: delta, behavior: 'smooth' })
      window.clearTimeout(unlockTimer)
      unlockTimer = window.setTimeout(() => {
        lock = false
      }, 480)
    }

    const supportsScrollEnd = 'onscrollend' in window
    let debounce = 0
    const onScroll = () => {
      window.clearTimeout(debounce)
      debounce = window.setTimeout(snap, 140)
    }

    if (supportsScrollEnd) window.addEventListener('scrollend', snap)
    else window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (supportsScrollEnd) window.removeEventListener('scrollend', snap)
      else window.removeEventListener('scroll', onScroll)
      window.clearTimeout(debounce)
      window.clearTimeout(unlockTimer)
    }
  }, [count, isDesktop, prefersReducedMotion])

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
