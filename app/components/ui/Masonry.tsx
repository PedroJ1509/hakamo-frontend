'use client'

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue
  }

  const [value, setValue] = useState<number>(get)

  useEffect(() => {
    const handler = () => setValue(get)
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler))
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries])

  return value
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    // Medición inicial síncrona: sin ella la rejilla queda vacía hasta el
    // primer callback del observer, y éste no llega si el documento no se
    // está pintando.
    const medir = () => {
      const r = node.getBoundingClientRect()
      setSize((prev) =>
        prev.width === r.width && prev.height === r.height ? prev : { width: r.width, height: r.height }
      )
    }
    medir()

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }))
    })
    ro.observe(node)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])

  return [ref, size] as const
}

/** Sólo precargamos rutas reales: un degradado CSS no es descargable. */
const esImagen = (v: string) => !v.trimStart().startsWith('linear-gradient') && !v.trimStart().startsWith('radial-gradient')

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.filter(esImagen).map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = img.onerror = () => resolve()
        })
    )
  )
}

export interface MasonryItem {
  id: string
  /** Ruta de imagen o degradado CSS. */
  img: string
  url?: string
  height: number
  /** Rótulo opcional sobre la pieza. */
  label?: string
  sublabel?: string
}

interface GridItem extends MasonryItem {
  x: number
  y: number
  w: number
  h: number
}

interface MasonryProps {
  items: MasonryItem[]
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random'
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  colorShiftOnHover?: boolean
  /** Piezas en blanco y negro que recuperan color al pasar el ratón. */
  grayscale?: boolean
  /**
   * Escala las piezas para llenar el alto del contenedor padre, en vez de
   * derivar el alto del mosaico de las alturas de cada pieza.
   */
  ajustarAlAlto?: boolean
  /** Fija el número de columnas en vez de derivarlo del ancho de ventana. */
  columnas?: number
  /** Cómo encaja la imagen en la pieza. `contain` sirve para logos. */
  imageFit?: 'cover' | 'contain'
  /** Fondo de la pieza cuando `imageFit` es contain (logos). */
  tileBackground?: string
}

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  grayscale = false,
  ajustarAlAlto = false,
  columnas,
  imageFit = 'cover',
  tileBackground = '#ffffff',
}: MasonryProps) {
  const columnasPorAncho = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  )
  // El hook corre siempre; la prop sólo decide cuál valor se usa.
  const columns = columnas ?? columnasPorAncho

  const [containerRef, { width, height: alturaContenedor }] = useMeasure<HTMLDivElement>()
  const [imagesReady, setImagesReady] = useState(false)

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }

    let direction = animateFrom

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right']
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 }
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 }
      case 'left':
        return { x: -200, y: item.y }
      case 'right':
        return { x: window.innerWidth + 200, y: item.y }
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        }
      default:
        return { x: item.x, y: item.y + 100 }
    }
  }

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true))
  }, [items])

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return []

    const colHeights = new Array(columns).fill(0)
    const columnWidth = width / columns

    const base = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = columnWidth * col
      const height = child.height / 2
      const y = colHeights[col]

      colHeights[col] += height

      return { ...child, x, y, w: columnWidth, h: height }
    })

    // Con `ajustarAlAlto`, las alturas se reescalan proporcionalmente para que
    // la columna más alta llene el contenedor: se conserva el escalonado.
    if (!ajustarAlAlto || !alturaContenedor) return base
    const columnaMasAlta = Math.max(...colHeights, 1)
    const factor = alturaContenedor / columnaMasAlta
    return base.map((it) => ({ ...it, y: it.y * factor, h: it.h * factor }))
  }, [columns, items, width, ajustarAlAlto, alturaContenedor])

  /** El original depende de un padre con altura; aquí la calculamos para que
   *  el componente funcione en flujo normal sin colapsar a 0. */
  const alturaTotal = useMemo(
    () => grid.reduce((max, it) => Math.max(max, it.y + it.h), 0),
    [grid]
  )

  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    if (!imagesReady) return

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h }

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item)
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' }),
        }

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger,
        })
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' })
      }
    })

    hasMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease])

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement
    const selector = `[data-key="${item.id}"]`

    if (scaleOnHover) {
      gsap.to(selector, { scale: hoverScale, duration: 0.3, ease: 'power2.out' })
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement | null
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
    }
  }

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement
    const selector = `[data-key="${item.id}"]`

    if (scaleOnHover) {
      gsap.to(selector, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement | null
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${ajustarAlAlto ? 'h-full' : ''}`.trim()}
      style={ajustarAlAlto ? undefined : { height: alturaTotal || undefined }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className={`group absolute left-0 top-0 p-1.5 will-change-[transform,width,height,opacity] ${item.url ? 'cursor-pointer' : ''}`}
          onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={(e) => handleMouseEnter(e, item)}
          onMouseLeave={(e) => handleMouseLeave(e, item)}
        >
          <div
            className={`relative h-full w-full overflow-hidden rounded-[10px] shadow-[0_10px_50px_-10px_rgba(0,0,0,0.2)] ${
              imageFit === 'contain' ? 'bg-center bg-no-repeat' : 'bg-cover bg-center'
            } ${grayscale ? 'grayscale transition-[filter] duration-500 group-hover:grayscale-0' : ''}`}
            style={{
              backgroundImage: esImagen(item.img) ? `url(${item.img})` : item.img,
              backgroundSize: imageFit === 'contain' ? '70%' : undefined,
              backgroundColor: imageFit === 'contain' ? tileBackground : undefined,
            }}
          >
            {colorShiftOnHover && (
              <div
                className="color-overlay pointer-events-none absolute inset-0 rounded-[10px] opacity-0"
                style={{
                  background: 'linear-gradient(45deg, rgba(37,99,235,0.55), rgba(14,165,233,0.55))',
                }}
              />
            )}

            {item.label ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4">
                <p
                  className="text-sm font-bold leading-tight text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  {item.label}
                </p>
                {item.sublabel ? (
                  <p className="mt-0.5 text-[11px] leading-tight text-white/70">{item.sublabel}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
