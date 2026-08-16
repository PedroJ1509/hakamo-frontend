'use client'

import { useState } from 'react'

interface FAQItem {
  pregunta: string
  respuesta: string
}

interface Props {
  items: FAQItem[]
  color: string
}

export default function FAQAccordion({ items, color }: Props) {
  const [abierto, setAbierto] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden transition-shadow duration-200 hover:shadow-sm"
        >
          <button
            onClick={() => setAbierto(abierto === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <span className="text-sm font-semibold pr-4" style={{ color: 'var(--brand-primary-dark)' }}>
              {item.pregunta}
            </span>
            <span
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                abierto === i ? 'text-white' : 'bg-[#F0F2F5] text-gray-500 dark:bg-white/10 dark:text-gray-300'
              }`}
              style={abierto === i ? { backgroundColor: color } : undefined}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${abierto === i ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>
          {abierto === i && (
            <div className="px-6 pb-5">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/10 pt-4">
                {item.respuesta}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
