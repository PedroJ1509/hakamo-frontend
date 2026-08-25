'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'

// three.js no puede renderizarse en el servidor.
const Antigravity = dynamic(() => import('@/app/components/ui/Antigravity'), {
  ssr: false,
  loading: () => null,
})

interface AntigravityBackgroundProps {
  color?: string
  /** Opacidad del lienzo, para que no compita con el contenido. */
  opacity?: number
  count?: number
  magnetRadius?: number
  ringRadius?: number
  waveSpeed?: number
  waveAmplitude?: number
  particleSize?: number
  lerpSpeed?: number
  autoAnimate?: boolean
  particleVariance?: number
  rotationSpeed?: number
  depthFactor?: number
  pulseSpeed?: number
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron'
  fieldStrength?: number
  /**
   * Si false, el canvas no captura el ratón (el scroll de la página pasa).
   * Útil dentro de HorizontalPanels.
   */
  interactive?: boolean
}

/**
 * Fondo de partículas para el panel de misión/visión/valores.
 * Sólo monta el lienzo WebGL mientras la sección está en pantalla.
 */
export default function AntigravityBackground({
  color = '#2563EB',
  opacity = 0.55,
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10,
  interactive = true,
}: AntigravityBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  // `montado` gobierna el lienzo WebGL; `visible`, la opacidad. Se separan para
  // que el campo pueda desvanecerse antes de desmontarse, en vez de cortar seco.
  const [montado, setMontado] = useState(false)
  const [visible, setVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMontado(true)
          setVisible(true)
        } else {
          setVisible(false)
        }
      },
      // Margen amplio: el campo ya está montado y arrancado cuando el panel
      // entra en pantalla, así no se ve el salto inicial de las partículas.
      { threshold: 0, rootMargin: '40% 40% 40% 40%' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // Desmonta sólo cuando el fundido de salida ya terminó.
  useEffect(() => {
    if (visible || !montado) return
    const id = setTimeout(() => setMontado(false), 900)
    return () => clearTimeout(id)
  }, [visible, montado])

  return (
    <div
      ref={ref}
      aria-hidden
      // pointer-events-auto: el lienzo necesita recibir el ratón aunque su
      // contenedor lo tenga desactivado (caso del fondo de ParallaxHero).
      // pointer-events-auto solo si interactive: en paneles sticky el canvas
      // no debe robar el wheel del scroll de la página.
      className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{
        opacity: visible ? opacity : 0,
        transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {montado && !prefersReducedMotion ? (
        <Antigravity
          count={count}
          magnetRadius={magnetRadius}
          ringRadius={ringRadius}
          waveSpeed={waveSpeed}
          waveAmplitude={waveAmplitude}
          particleSize={particleSize}
          lerpSpeed={lerpSpeed}
          color={color}
          autoAnimate={autoAnimate}
          particleVariance={particleVariance}
          rotationSpeed={rotationSpeed}
          depthFactor={depthFactor}
          pulseSpeed={pulseSpeed}
          particleShape={particleShape}
          fieldStrength={fieldStrength}
        />
      ) : null}
    </div>
  )
}
