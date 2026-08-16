'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import ThemeToggle from '@/app/components/ui/ThemeToggle'
import HeaderLanyard from '@/app/components/layout/HeaderLanyard'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/empleo', label: 'Empleo' },
  { href: '/contacto', label: 'Contacto' },
]

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
    {pathname === '/empleo' && <HeaderLanyard />}
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] bg-transparent px-3 pt-3 sm:px-4 sm:pt-4"
      data-lanyard-front
      data-lanyard-nav
    >
      <div className="pointer-events-auto relative mx-auto max-w-5xl">
        <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'relative z-10 flex items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4',
          scrolled
            ? 'border-[var(--border)] bg-white/85 py-2 shadow-[var(--shadow-elevated)] backdrop-blur-xl dark:bg-slate-900/85'
            : 'border-transparent bg-transparent py-2.5 backdrop-blur-0'
        )}
      >
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" onClick={() => setOpen(false)}>
          <Image src="/logo-azul.png" alt="Hakamo" width={140} height={36} className="h-8 w-auto dark:hidden" priority />
          <Image src="/hakamo-logo-blanco.png" alt="Hakamo" width={140} height={36} className="hidden h-8 w-auto dark:block" priority />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-[var(--brand-accent-light)] text-[var(--brand-accent)]'
                    : 'text-gray-600 hover:text-[var(--brand-accent)] dark:text-gray-300'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                  style={{ backgroundColor: 'var(--brand-accent)' }}
                />
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Obtener Cotización
            <IconArrow />
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-gray-900 transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-white/95 p-3 shadow-[var(--shadow-elevated)] backdrop-blur-xl dark:bg-slate-900/95 md:hidden"
          >
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block rounded-xl px-4 py-2.5 font-medium transition-colors',
                      active
                        ? 'bg-[var(--brand-accent-light)] text-[var(--brand-accent)]'
                        : 'text-gray-900 hover:bg-black/5 dark:text-white dark:hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
            <div className="mt-2 border-t border-[var(--border)] pt-2">
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 font-semibold text-white"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Obtener Cotización
                <IconArrow />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
    </>
  )
}
