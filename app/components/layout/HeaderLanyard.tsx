'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'

const Lanyard = dynamic(() => import('@/app/components/ui/Lanyard'), {
  ssr: false,
  loading: () => null,
})

type CardScreen = { x: number; y: number; w: number; h: number }

function rectsOverlap(a: CardScreen, b: DOMRect) {
  return !(
    a.x + a.w < b.left ||
    a.x > b.right ||
    a.y + a.h < b.top ||
    a.y > b.bottom
  )
}

/** ¿La tarjeta choca con nav, casillas del form u otros controles marcados? */
function overlapsFrontUI(rect: CardScreen) {
  const fronts = document.querySelectorAll('[data-lanyard-front]')
  for (const el of fronts) {
    const box = el.getBoundingClientRect()
    if (box.width < 2 || box.height < 2) continue
    if (rectsOverlap(rect, box)) return true
  }

  // Fallback por puntos (links/botones sueltos sin data-attr)
  const samples = [
    [rect.x + rect.w * 0.5, rect.y + rect.h * 0.4],
    [rect.x + rect.w * 0.5, rect.y + rect.h * 0.75],
    [rect.x + rect.w * 0.25, rect.y + rect.h * 0.55],
    [rect.x + rect.w * 0.75, rect.y + rect.h * 0.55],
  ] as const

  for (const [x, y] of samples) {
    if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) continue
    const hits = document.elementsFromPoint(x, y)
    for (const el of hits) {
      if (!(el instanceof Element)) continue
      if (el.closest('[data-lanyard-root]')) continue
      if (el.closest('canvas')) continue
      if (el.closest('header, nav, a, button, input, textarea, select, label, [role="button"]')) {
        return true
      }
    }
  }
  return false
}

/** Credencial 3D solo en /empleo — se monta tras el primer paint para no bloquear la carga. */
export default function HeaderLanyard() {
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [overFront, setOverFront] = useState(false)
  const overRef = useRef(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.add('lanyard-active')

    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const enable = () => setReady(true)

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 })
    } else {
      timeoutId = setTimeout(enable, 900)
    }

    return () => {
      document.documentElement.classList.remove('lanyard-active')
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const onCardScreenPos = useCallback((rect: CardScreen) => {
    const next = overlapsFrontUI(rect)
    if (next !== overRef.current) {
      overRef.current = next
      setOverFront(next)
    }
  }, [])

  if (!mounted || !ready) return null

  return createPortal(
    <div
      data-lanyard-root
      className={
        overFront
          ? 'pointer-events-none fixed inset-0 z-[5] hidden md:block'
          : 'pointer-events-none fixed inset-0 z-[30] hidden md:block'
      }
      aria-hidden
    >
      <Lanyard
        position={[0, 0.2, 15]}
        lookAt={[-1.1, 0.1, 0]}
        gravity={[0, -40, 0]}
        fov={24}
        frontImage="/logo-azul.png"
        backImage="/hakamo-logo-blanco.png"
        lanyardImage="/lanyard/hakamo-band.png"
        imageFit="contain"
        lanyardWidth={1.35}
        anchor={[3.45, 4.0, 0]}
        onCardScreenPos={onCardScreenPos}
      />
    </div>,
    document.body,
  )
}
