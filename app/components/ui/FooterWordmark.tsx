'use client'

import { useEffect, useRef, useState } from 'react'

const WORD = 'HAKAMO'
const TYPE_MS = 110
const DELETE_MS = 70
const HOLD_MS = 1600
const EMPTY_MS = 400

export default function FooterWordmark() {
  const ref = useRef<HTMLSpanElement>(null)
  const [text, setText] = useState('')
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setText(WORD)
      return
    }
    if (!inView) return

    let i = 0
    let deleting = false
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    setText('')

    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
    }

    const tick = () => {
      if (!deleting) {
        i += 1
        setText(WORD.slice(0, i))
        if (i >= WORD.length) {
          schedule(() => {
            deleting = true
            tick()
          }, HOLD_MS)
          return
        }
        schedule(tick, TYPE_MS)
        return
      }

      i -= 1
      setText(WORD.slice(0, i))
      if (i <= 0) {
        deleting = false
        schedule(tick, EMPTY_MS)
        return
      }
      schedule(tick, DELETE_MS)
    }

    schedule(tick, TYPE_MS)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [inView, reducedMotion])

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -bottom-10 right-0 select-none whitespace-nowrap font-bold text-white/[0.03]"
      style={{
        fontSize: 'clamp(6rem, 14vw, 12rem)',
        fontFamily: 'var(--font-space-grotesk, sans-serif)',
        letterSpacing: '-0.04em',
      }}
    >
      {text}
      {!reducedMotion && (
        <span
          className={`footer-wordmark-caret inline-block align-baseline${inView ? ' is-on' : ''}`}
          aria-hidden
        />
      )}
    </span>
  )
}
