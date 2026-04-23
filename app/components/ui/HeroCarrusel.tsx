'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSlide } from '@/types'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

// Slide por defecto cuando no hay datos en Strapi
const slideDefault: HeroSlide = {
  id: 0,
  documentId: '',
  titulo: 'Impulsamos Talentos, Fortalecemos Empresas.',
  subtitulo: 'Grupo Empresarial · República Dominicana',
  descripcion: 'Startup dominicana especializada en outsourcing de personal, reclutamiento estratégico y gestión administrativa de proyectos en el sector construcción.',
  imagen: null,
  ctaTexto: 'Nuestras divisiones',
  ctaUrl: '/#divisiones',
  orden: 0,
  activo: true,
}

function getImageUrl(slide: HeroSlide): string | null {
  if (!slide.imagen) return null
  const url = slide.imagen.url
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

interface Props {
  slides: HeroSlide[]
}

export default function HeroCarrusel({ slides }: Props) {
  const allSlides = slides.length > 0 ? slides : [slideDefault]
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 600)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % allSlides.length)
  }, [current, allSlides.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + allSlides.length) % allSlides.length)
  }, [current, allSlides.length, goTo])

  // Auto-avance cada 6 segundos
  useEffect(() => {
    if (allSlides.length <= 1) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, allSlides.length])

  const slide = allSlides[current]
  const imageUrl = getImageUrl(slide)

  return (
    <section className="relative overflow-hidden text-white" style={{ minHeight: '90vh' }}>

      {/* Fondo — imagen o gradiente */}
      <div className="absolute inset-0 transition-opacity duration-700">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={slide.titulo}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay oscuro sobre la imagen */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(11,33,204,0.85) 0%, rgba(7,9,15,0.75) 100%)' }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0B21CC 0%, #070D5A 60%, #07090F 100%)' }}
          />
        )}
      </div>

      {/* Decoración < > */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 font-bold leading-none"
        style={{ fontSize: 'clamp(200px, 30vw, 420px)', fontFamily: 'var(--font-space-grotesk, monospace)', color: '#fff' }}
        aria-hidden="true"
      >
        &lt;&gt;
      </div>

      {/* Línea cian superior */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ backgroundColor: '#00C2E0' }} />

      {/* Contenido del slide */}
      <div
        className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col justify-center"
        style={{ minHeight: '90vh', paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div
          key={current}
          style={{ animation: 'fadeSlideUp 0.6s ease forwards' }}
        >
          {slide.subtitulo && (
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: '#00C2E0' }}
            >
              {slide.subtitulo}
            </p>
          )}

          <h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {slide.titulo.split(',').map((part, i, arr) => (
              <span key={i}>
                {i === 0 ? part + (arr.length > 1 ? ',' : '') : (
                  <>
                    <br />
                    <span style={{ color: '#00C2E0' }}>{part.trim().split(' ')[0]}</span>
                    {' ' + part.trim().split(' ').slice(1).join(' ')}
                  </>
                )}
              </span>
            ))}
          </h1>

          {slide.descripcion && (
            <p className="text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
              {slide.descripcion}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            {slide.ctaUrl && slide.ctaTexto && (
              <Link
                href={slide.ctaUrl}
                className="px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#00C2E0', color: '#07090F' }}
              >
                {slide.ctaTexto}
              </Link>
            )}
            <Link
              href="/contacto"
              className="px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:border-white/60 transition-colors"
            >
              Contáctanos →
            </Link>
          </div>
        </div>
      </div>

      {/* Controles — solo si hay más de 1 slide */}
      {allSlides.length > 1 && (
        <>
          {/* Flechas */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            aria-label="Slide anterior"
          >
            <span className="text-white text-lg leading-none">‹</span>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            aria-label="Siguiente slide"
          >
            <span className="text-white text-lg leading-none">›</span>
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {allSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  backgroundColor: i === current ? '#00C2E0' : 'rgba(255,255,255,0.4)',
                }}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Barra de progreso */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full"
              style={{
                backgroundColor: '#00C2E0',
                width: `${((current + 1) / allSlides.length) * 100}%`,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </>
      )}

      {/* Animación CSS */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
