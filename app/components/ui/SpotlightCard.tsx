'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { gsap } from 'gsap'

const GLOW = '37, 99, 235'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  enableMagnetism?: boolean
}

/** Card con spotlight radial al cursor y magnetismo suave (estilo Kraft). */
export function SpotlightCard({
  children,
  className = '',
  style,
  enableMagnetism = true,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const magnetRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--spot-x', `${x}%`)
      el.style.setProperty('--spot-y', `${y}%`)
      el.style.setProperty('--spot-opacity', '1')

      if (!reduced && enableMagnetism) {
        const mx = (e.clientX - rect.left) / rect.width - 0.5
        const my = (e.clientY - rect.top) / rect.height - 0.5
        magnetRef.current?.kill()
        magnetRef.current = gsap.to(el, {
          x: mx * 10,
          y: my * 8,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true,
        })
      }
    }

    const onLeave = () => {
      el.style.setProperty('--spot-opacity', '0')
      magnetRef.current?.kill()
      magnetRef.current = gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      magnetRef.current?.kill()
    }
  }, [enableMagnetism])

  return (
    <div
      ref={ref}
      className={`spotlight-card relative overflow-hidden ${className}`.trim()}
      style={
        {
          ...style,
          ['--spot-x' as string]: '50%',
          ['--spot-y' as string]: '50%',
          ['--spot-opacity' as string]: '0',
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          opacity: 'var(--spot-opacity)',
          background: `radial-gradient(420px circle at var(--spot-x) var(--spot-y), rgba(${GLOW}, 0.16), transparent 55%)`,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div className="relative z-[2] flex h-full flex-col">{children}</div>
    </div>
  )
}

interface SpotlightGridProps {
  children: ReactNode
  className?: string
}

/** Spotlight global que sigue el mouse sobre la grilla. */
export function SpotlightGrid({ children, className = '' }: SpotlightGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    const spot = spotRef.current
    if (!grid || !spot) return

    const onMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (!inside) {
        gsap.to(spot, { opacity: 0, duration: 0.35, ease: 'power2.out' })
        return
      }

      gsap.to(spot, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.85,
        duration: 0.12,
        ease: 'power2.out',
      })
    }

    const onLeave = () => gsap.to(spot, { opacity: 0, duration: 0.35 })

    document.addEventListener('mousemove', onMove)
    grid.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      grid.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={gridRef} className={`relative ${className}`.trim()}>
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none fixed z-[5] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-multiply"
        style={{
          background: `radial-gradient(circle, rgba(${GLOW}, 0.18) 0%, rgba(${GLOW}, 0.06) 35%, transparent 68%)`,
        }}
      />
      {children}
    </div>
  )
}
