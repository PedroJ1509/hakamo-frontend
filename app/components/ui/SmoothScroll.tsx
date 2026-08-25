'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Smooth scroll (Lenis) solo en escritorio con rueda.
 * En móvil/touch el scroll nativo es más fiable (Lenis suele “pegar” o pelearse).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const isNarrow = window.matchMedia('(max-width: 1023px)').matches
    if (reduced || isCoarse || isNarrow) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
