'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const PRIMARY = '#1E3A5F'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/empleo', label: 'Empleo' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuAbierto])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: '72px' }}>

        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity flex-shrink-0"
          onClick={() => setMenuAbierto(false)}
        >
          <Image
            src="/logo-azul.png"
            alt="Hakamo"
            width={160}
            height={40}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: PRIMARY }}
          >
            Obtener Cotización
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Botón hamburguesa mobile */}
        <button
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span
            className={`block w-5 h-0.5 transition-all duration-200 ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}
            style={{ backgroundColor: PRIMARY }}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-200 ${menuAbierto ? 'opacity-0' : ''}`}
            style={{ backgroundColor: PRIMARY }}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-200 ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}
            style={{ backgroundColor: PRIMARY }}
          />
        </button>
      </div>

      {/* Menú mobile */}
      {menuAbierto && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuAbierto(false)}
              className="px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-100">
            <Link
              href="/contacto"
              onClick={() => setMenuAbierto(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              Obtener Cotización
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
