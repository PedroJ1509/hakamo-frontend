import type { ReactNode } from 'react'

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
      {children}
    </span>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  lede?: string
}

export default function SectionHeading({ eyebrow, title, lede }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="mb-4">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        style={{ color: 'var(--brand-primary-dark)', fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-lg leading-relaxed text-gray-500 dark:text-gray-400">{lede}</p>
      ) : null}
    </div>
  )
}
