'use client'

import { useState, type ReactNode } from 'react'

export default function ContactoDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white dark:bg-slate-900">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
        style={{ color: 'var(--brand-primary-dark)' }}
      >
        Prefiero escribir un mensaje formal
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
