'use client'

import type { ReactNode } from 'react'
import BlobCursor from '@/app/components/ui/BlobCursor'

/** Sección completa (#formulario) con BlobCursor al pasar el mouse. */
export default function FormularioBlobSection({ children }: { children: ReactNode }) {
  return (
    <section id="formulario" className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden py-20 lg:py-28 px-6">
      <BlobCursor
        blobType="circle"
        fillColor="#25D366"
        trailCount={3}
        sizes={[70, 140, 90]}
        innerSizes={[22, 38, 28]}
        innerColor="rgba(255,255,255,0.9)"
        opacities={[0.75, 0.5, 0.35]}
        shadowColor="rgba(0,0,0,0.35)"
        shadowBlur={10}
        shadowOffsetX={4}
        shadowOffsetY={8}
        useFilter={false}
        fastDuration={0.12}
        slowDuration={0.45}
        zIndex={50}
      />
      <div className="relative z-[1] mx-auto max-w-6xl space-y-6">{children}</div>
    </section>
  )
}
