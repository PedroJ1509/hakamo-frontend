'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const ACCENT = '#2563EB'

interface PreloaderProps {
  /** Contenido mostrado mientras el telón cubre. Vacío para no mostrar nada. */
  texto?: ReactNode
  /** Color del telón. */
  color?: string
  /** Columnas en las que se parte el telón: más columnas, escalera más fina. */
  columnas?: number
  /** Milisegundos que el telón permanece antes de retirarse. */
  espera?: number
}

/**
 * Telón de carga en columnas que se retiran en escalera.
 * Va dentro de una sección con `position: relative` y `overflow-hidden`;
 * no cubre la página ni bloquea el scroll.
 */
export default function Preloader({
  texto = null,
  color = ACCENT,
  columnas = 8,
  espera = 1900,
}: PreloaderProps) {
  const [activo, setActivo] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setActivo(false)
      return
    }
    const id = setTimeout(() => setActivo(false), espera)
    return () => clearTimeout(id)
  }, [espera, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <AnimatePresence>
      {activo && (
        <motion.div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
          {/* Cada columna sale con un retardo distinto: eso dibuja la escalera. */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: columnas }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1"
                style={{ backgroundColor: color }}
                initial={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            ))}
          </div>

          {texto ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-full max-w-3xl">{texto}</div>
            </motion.div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
