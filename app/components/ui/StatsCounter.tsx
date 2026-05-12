'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Stat {
  num: string
  label: string
}

interface Props {
  stats: Stat[]
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)
  const isInView = useInView(ref, { once: true })

  // Extract numeric part
  const hasPlus = value.includes('+')
  const hasPct = value.includes('%')
  const hasComma = value.includes(',')
  const rawNum = parseFloat(value.replace(/[^0-9.]/g, '').replace(',', ''))

  const displayValue = useTransform(count, (latest: number) => {
    const rounded = Math.round(latest)
    if (hasComma && rounded >= 1000) {
      return rounded.toLocaleString()
    }
    return rounded.toString()
  })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, rawNum, {
        duration: 2,
        ease: 'easeOut',
      })
      return controls.stop
    }
  }, [isInView, count, rawNum])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{displayValue}</motion.span>
      {hasPlus && '+'}
      {hasPct && '%'}
    </span>
  )
}

export default function StatsCounter({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map(({ num, label }, i) => (
        <motion.div
          key={label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <p
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            <Counter value={num} />
          </p>
          <p className="text-white/60 text-sm leading-snug">{label}</p>
        </motion.div>
      ))}
    </div>
  )
}
