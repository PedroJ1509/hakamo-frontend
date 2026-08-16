'use client'

import { useCallback, useEffect, useId, useRef } from 'react'
import gsap from 'gsap'
import styles from './BlobCursor.module.css'

interface BlobCursorProps {
  blobType?: 'circle' | 'square'
  fillColor?: string
  trailCount?: number
  sizes?: number[]
  innerSizes?: number[]
  opacities?: number[]
  innerColor?: string
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  filterId?: string
  filterStdDeviation?: number
  filterColorMatrixValues?: string
  useFilter?: boolean
  fastDuration?: number
  slowDuration?: number
  fastEase?: string
  slowEase?: string
  zIndex?: number
}

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId,
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100,
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blobsRef = useRef<Array<HTMLDivElement | null>>([])
  const reactId = useId().replace(/:/g, '')
  const resolvedFilterId = filterId ?? `blob-${reactId}`

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 }
    const rect = containerRef.current.getBoundingClientRect()
    return { left: rect.left, top: rect.top }
  }, [])

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { left, top } = updateOffset()
      const point = 'touches' in e ? e.touches[0] : e
      if (!point) return

      blobsRef.current.forEach((el, i) => {
        if (!el) return
        const isLead = i === 0
        gsap.to(el, {
          x: point.clientX - left,
          y: point.clientY - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase,
          overwrite: 'auto',
        })
      })
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase],
  )

  useEffect(() => {
    const parent = containerRef.current?.parentElement
    if (!parent) return

    blobsRef.current.forEach((el) => {
      if (!el) return
      gsap.set(el, { xPercent: -50, yPercent: -50 })
    })

    const onMove = (e: Event) => handleMove(e as MouseEvent | TouchEvent)

    parent.style.cursor = 'none'
    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseenter', onMove)
    parent.addEventListener('touchmove', onMove, { passive: true })

    const onResize = () => updateOffset()
    window.addEventListener('resize', onResize)

    return () => {
      parent.style.cursor = ''
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseenter', onMove)
      parent.removeEventListener('touchmove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [handleMove, updateOffset, trailCount])

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        zIndex,
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden
    >
      {useFilter && (
        <svg className={styles.filterSvg}>
          <defs>
            <filter id={resolvedFilterId}>
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
              <feColorMatrix in="blur" values={filterColorMatrixValues} />
            </filter>
          </defs>
        </svg>
      )}

      <div
        className={styles.main}
        style={{ filter: useFilter ? `url(#${resolvedFilterId})` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              blobsRef.current[i] = el
            }}
            className={styles.blob}
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`,
            }}
          >
            <div
              className={styles.innerDot}
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
