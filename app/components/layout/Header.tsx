'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between" style={{ height: '72px' }}>

        {/* Logo + wordmark */}
        <Link href="/" className="group">
          <span
            className="text-2xl font-bold tracking-tight transition-opacity group-hover:opacity-80"
            style={{ color: '#07090F', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            HAKAMO
          </span>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '#', label: 'Inicio' },
            { href: '/', label: 'Divisiones' },
            { href: '/empleos', label: 'Empleos' },
            { href: '/blog', label: 'Blog' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors relative group"
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200 rounded-full"
                style={{ backgroundColor: '#0B21CC' }}
              />
            </Link>
          ))}
          <Link
            href="/contacto"
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0B21CC' }}
          >
            Contacto
          </Link>
        </nav>

        {/* Botón menú móvil */}
        <button
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-200 ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-200 ${menuAbierto ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-200 ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-5 flex flex-col gap-4">
          {[
            { href: '#', label: 'Inicio' },
            { href: '/', label: 'Divisiones' },
            { href: '/empleos', label: 'Empleos' },
            { href: '/blog', label: 'Blog' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="inline-flex justify-center text-sm font-semibold text-white px-5 py-2.5 rounded-full"
            style={{ backgroundColor: '#0B21CC' }}
            onClick={() => setMenuAbierto(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  )
}
