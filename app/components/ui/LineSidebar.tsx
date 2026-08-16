'use client'

import { useRef, useState, useCallback, useEffect, type CSSProperties } from 'react'
import styles from './LineSidebar.module.css'

const FALLOFF_CURVES = {
  linear: (p: number) => p,
  smooth: (p: number) => p * p * (3 - 2 * p),
  sharp: (p: number) => p * p * p,
}

export interface LineSidebarProps {
  items?: string[]
  accentColor?: string
  textColor?: string
  markerColor?: string
  showIndex?: boolean
  showMarker?: boolean
  proximityRadius?: number
  maxShift?: number
  falloff?: 'linear' | 'smooth' | 'sharp'
  markerLength?: number
  markerGap?: number
  tickScale?: number
  scaleTick?: boolean
  itemGap?: number
  fontSize?: number
  smoothing?: number
  defaultActive?: number | null
  onItemClick?: (index: number, label: string) => void
  className?: string
}

export default function LineSidebar({
  items = [],
  accentColor = '#2563EB',
  textColor = '#6b7280',
  markerColor = '#94a3b8',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = '',
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const targetsRef = useRef<number[]>([])
  const currentRef = useRef<number[]>([])
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const activeRef = useRef<number | null>(defaultActive)
  const smoothingRef = useRef(smoothing)
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive)

  activeRef.current = activeIndex
  smoothingRef.current = smoothing

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05)
    lastRef.current = now
    const tau = Math.max(smoothingRef.current, 1) / 1000
    const k = 1 - Math.exp(-dt / tau)

    let moving = false
    const els = itemRefs.current
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      if (!el) continue
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0)
      const cur = currentRef.current[i] || 0
      const next = cur + (target - cur) * k
      const settled = Math.abs(target - next) < 0.0015
      const value = settled ? target : next
      currentRef.current[i] = value
      el.style.setProperty('--effect', value.toFixed(4))
      if (!settled) moving = true
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null
  }, [])

  const startLoop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    lastRef.current = performance.now()
    rafRef.current = requestAnimationFrame(runFrame)
  }, [runFrame])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const list = listRef.current
      if (!list) return
      const rect = list.getBoundingClientRect()
      const pointerY = e.clientY - rect.top
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear
      const els = itemRefs.current
      for (let i = 0; i < els.length; i++) {
        const el = els[i]
        if (!el) continue
        const center = el.offsetTop + el.offsetHeight / 2
        const distance = Math.abs(pointerY - center)
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius))
      }
      startLoop()
    },
    [falloff, proximityRadius, startLoop],
  )

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0)
    startLoop()
  }, [startLoop])

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index)
      onItemClick?.(index, label)
    },
    [onItemClick],
  )

  useEffect(() => {
    startLoop()
  }, [activeIndex, startLoop])

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    },
    [],
  )

  const cssVars = {
    '--accent-color': accentColor,
    '--text-color': textColor,
    '--marker-color': markerColor,
    '--marker-length': `${markerLength}px`,
    '--marker-gap': `${markerGap}px`,
    '--tick-scale': tickScale,
    '--max-shift': `${maxShift}px`,
    '--item-gap': `${itemGap}px`,
    '--font-size': `${fontSize}rem`,
    '--smoothing': `${smoothing}ms`,
  } as CSSProperties

  return (
    <nav
      className={[
        styles.lineSidebar,
        showMarker ? styles.markers : '',
        scaleTick ? styles.scaleTick : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={cssVars}
    >
      <ul
        ref={listRef}
        className={styles.list}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            className={styles.item}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, label)}
          >
            {showMarker && <span className={styles.marker} aria-hidden />}
            <span className={styles.label}>
              {showIndex && <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>}
              <span className={styles.text}>{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
