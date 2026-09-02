'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHAT: { from: 'in' | 'out'; text: string }[] = [
  { from: 'in', text: 'Hola, buenas tardes 👋' },
  { from: 'in', text: '¿En qué podemos ayudarte hoy?' },
  { from: 'out', text: 'Necesito personal para un proyecto de construcción' },
  { from: 'in', text: 'Perfecto, cuéntanos más y te conectamos con un especialista.' },
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[#1f2c34] px-3 py-2.5 w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/50"
          style={{ animation: 'wa-dot 1.1s ease-in-out infinite', animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

export default function WhatsAppChatPreview() {
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(false)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timeouts.current.push(id)
      })

    async function run() {
      while (!cancelled) {
        setVisible(0)
        setTyping(false)
        await wait(700)
        for (let i = 0; i < CHAT.length; i++) {
          if (cancelled) return
          if (CHAT[i].from === 'in') {
            setTyping(true)
            await wait(1100)
            if (cancelled) return
            setTyping(false)
          } else {
            await wait(500)
          }
          if (cancelled) return
          setVisible(i + 1)
          await wait(900)
        }
        await wait(2600)
      }
    }

    run()
    return () => {
      cancelled = true
      timeouts.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="rounded-[20px] bg-[#0b141a] p-3.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
      <style>{`@keyframes wa-dot { 0%, 60%, 100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }`}</style>

      <div className="mb-2.5 flex items-center gap-2.5 border-b border-white/10 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white">
          H
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white">Hakamo</p>
          <p className="text-[11px] text-emerald-400">en línea</p>
        </div>
      </div>

      <div className="flex min-h-[168px] flex-col justify-end gap-2 px-0.5 pb-1">
        <AnimatePresence initial={false}>
          {CHAT.slice(0, visible).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${
                msg.from === 'in'
                  ? 'self-start rounded-tl-sm bg-[#1f2c34] text-[#e9edef]'
                  : 'self-end rounded-tr-sm bg-[#005c4b] text-[#e9edef]'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="self-start"
            >
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
