'use client'

import { useEffect, useLayoutEffect, useRef, useState, Children, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

/** En SSR no hay ventana: asumimos escritorio y corregimos antes de pintar. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface HorizontalPanelsProps {
  /** Cada hijo se convierte en un panel de ancho completo. */
  children: ReactNode
  className?: string
}

/**
 * Convierte el scroll vertical en un recorrido horizontal por paneles.
 * Contenedor alto + wrapper sticky + track que se desplaza en X.
 */
export default function HorizontalPanels({ children, className = '' }: HorizontalPanelsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  // Empieza en true para coincidir con el HTML del servidor y no romper la
  // hidratación; se corrige antes del primer pintado.
  const [isDesktop, setIsDesktop] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  const panels = Children.toArray(children)

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Medimos el recorrido real para que funcione en cualquier ancho de pantalla.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => setDistance(Math.max(0, track.scrollWidth - track.clientWidth))

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [panels.length])

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(rawX, { stiffness: 150, damping: 32, mass: 0.4 })
  const progressScale = useSpring(scrollYProgress, { stiffness: 150, damping: 32, mass: 0.4 })

  // En móvil/tableta y con movimiento reducido, los paneles se apilan y la
  // página scrollea normal: en pantallas angostas el contenido no cabe en una
  // sola vista y el recorrido lateral se recortaría.
  if (prefersReducedMotion || !isDesktop) {
    // containerRef se adjunta también aquí: useScroll lo referencia siempre y,
    // si no existiera en el DOM, motion avisa "target ref is not hydrated".
    return (
      <div ref={containerRef} className={className}>
        {panels.map((panel, i) => (
          <div key={i} className="min-h-[100svh]">
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
      style={{ height: `${panels.length * 100}svh` }}
    >
      {/* El overflow va aquí y no en un ancestro: en un ancestro rompería el sticky. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-full will-change-transform">
          {/* w-full y no w-screen: 100vw incluiría el ancho de la barra de
              desplazamiento y cada panel quedaría desalineado.
              overflow-hidden: cada panel cabe en pantalla, sin scroll interno. */}
          {panels.map((panel, i) => (
            <section key={i} className="h-full w-full flex-shrink-0 overflow-hidden">
              {panel}
            </section>
          ))}
        </motion.div>

        {/* Progreso del recorrido */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/10 dark:bg-white/10">
          <motion.div
            className="h-full origin-left"
            style={{ scaleX: progressScale, backgroundColor: 'var(--brand-accent, #2563EB)' }}
          />
        </div>
      </div>
    </div>
  )
}
