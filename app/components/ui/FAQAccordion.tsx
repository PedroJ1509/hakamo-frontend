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
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-200 hover:shadow-sm"
        >
          <button
            onClick={() => setAbierto(abierto === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-sm font-semibold pr-4" style={{ color: '#0D1B5E' }}>
              {item.pregunta}
            </span>
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: abierto === i ? color : '#F0F2F5' }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={abierto === i ? '#fff' : '#666'}
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
              <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                {item.respuesta}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
