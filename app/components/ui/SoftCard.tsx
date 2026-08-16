import type { ReactNode } from 'react'

interface SoftCardProps {
  icon?: string
  title: string
  description?: string
  center?: boolean
  children?: ReactNode
}

export default function SoftCard({ icon, title, description, center, children }: SoftCardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[var(--shadow-elevated)] dark:bg-slate-800/60 dark:hover:border-blue-800 ${center ? 'text-center' : ''}`}
    >
      {icon ? <div className="mb-3 text-2xl">{icon}</div> : null}
      <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
      ) : null}
      {children}
    </div>
  )
}
