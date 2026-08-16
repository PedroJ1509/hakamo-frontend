'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AREAS_EMPLEO, NIVELES_EXPERIENCIA } from '@/lib/data'
import { ParticleCard } from '@/app/components/ui/MagicBento'
import bentoStyles from '@/app/components/ui/MagicBento.module.css'
import stepperStyles from '@/app/components/ui/Stepper.module.css'

interface FormData {
  nombre: string
  apellido: string
  telefono: string
  email: string
  areaInteres: string
  nivelExperiencia: string
  mensaje: string
}

const initialForm: FormData = {
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  areaInteres: '',
  nivelExperiencia: '',
  mensaje: '',
}

const GLOW = '37, 99, 235'

const SECTIONS = [
  { id: 1, label: 'Datos' },
  { id: 2, label: 'Perfil' },
  { id: 3, label: 'Envío' },
]

function FieldCard({
  label,
  children,
  wide,
}: {
  label: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div data-lanyard-front className="relative z-[50] h-full">
      <ParticleCard
        className={`${bentoStyles.card} ${bentoStyles.borderGlow} ${bentoStyles.formCard}${wide ? ` ${bentoStyles.cardWide}` : ''}`}
        style={{
          backgroundColor: '#0B1220',
          ['--glow-color' as string]: GLOW,
          aspectRatio: 'auto',
          minHeight: wide ? 160 : 120,
        }}
        glowColor={GLOW}
        enableTilt={false}
        enableMagnetism
        clickEffect
        particleCount={8}
      >
        <div className={bentoStyles.header}>
          <div className={bentoStyles.label}>{label}</div>
        </div>
        <div className="relative z-[2] mt-3">{children}</div>
      </ParticleCard>
    </div>
  )
}

function ProgressTrack({ completedCount }: { completedCount: number }) {
  return (
    <div className="flex w-full items-start px-1 pt-3">
      {SECTIONS.map((section, index) => {
        const stepNumber = index + 1
        const realStatus =
          completedCount >= stepNumber ? 'complete' : completedCount + 1 === stepNumber ? 'active' : 'inactive'
        const isNotLast = index < SECTIONS.length - 1

        return (
          <div key={section.id} className={`flex items-center ${isNotLast ? 'flex-1' : ''}`}>
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className={stepperStyles.indicatorInner}
                animate={realStatus}
                initial={false}
                variants={{
                  inactive: { scale: 1, backgroundColor: '#334155', color: '#a3a3a3' },
                  active: { scale: 1, backgroundColor: '#2563EB', color: '#2563EB' },
                  complete: { scale: 1, backgroundColor: '#2563EB', color: '#fff' },
                }}
                transition={{ duration: 0.3 }}
              >
                {realStatus === 'complete' ? (
                  <CheckIcon />
                ) : realStatus === 'active' ? (
                  <div className={stepperStyles.activeDot} />
                ) : (
                  <span className={stepperStyles.stepNumber}>{stepNumber}</span>
                )}
              </motion.div>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: realStatus === 'inactive' ? '#94a3b8' : 'var(--brand-accent)' }}
              >
                {section.label}
              </span>
            </div>
            {isNotLast && (
              <div className={stepperStyles.connector} style={{ alignSelf: 'flex-start', marginTop: '0.9rem' }}>
                <motion.div
                  className={stepperStyles.connectorInner}
                  initial={false}
                  animate={
                    completedCount >= stepNumber
                      ? { width: '100%', backgroundColor: '#2563EB' }
                      : { width: 0, backgroundColor: 'transparent' }
                  }
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className={stepperStyles.checkIcon} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.05, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

export default function EmpleoForm() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const { progress, canSubmit } = useMemo(() => {
    const datosOk = Boolean(
      formData.nombre.trim() &&
        formData.apellido.trim() &&
        formData.telefono.trim() &&
        formData.email.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    )
    const perfilOk = Boolean(formData.areaInteres && formData.nivelExperiencia)
    let completed = 0
    if (datosOk) completed = 1
    if (datosOk && perfilOk) completed = 2
    // listo para enviar → sección 3 activa; al enviar se muestra success
    return { progress: completed, canSubmit: datosOk && perfilOk }
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      setError('Completa los campos obligatorios (datos y perfil).')
      return
    }
    setEnviando(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/candidatos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setEnviado(true)
      setFormData(initialForm)
    } catch {
      console.log('Candidato registrado (sin Strapi):', formData)
      setEnviado(true)
      setFormData(initialForm)
    } finally {
      setEnviando(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 transition-colors focus:border-[var(--brand-accent)] focus:outline-none'

  if (enviado) {
    return (
      <div
        data-lanyard-front
        className="relative z-[50] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center shadow-[var(--shadow-elevated)]"
      >
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
          style={{ backgroundColor: 'var(--brand-accent)' }}
        >
          ✓
        </div>
        <h4
          className="mb-3 text-xl font-bold"
          style={{ color: 'var(--brand-primary-dark)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          ¡Perfil registrado!
        </h4>
        <p className="mb-8 text-sm leading-relaxed text-[var(--text-muted)]">
          Hemos recibido tu información. Te contactaremos cuando haya una oportunidad que encaje con tu perfil.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="text-sm font-semibold"
          style={{ color: 'var(--brand-accent)' }}
        >
          Registrar otro candidato →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={`${bentoStyles.cardGrid} ${bentoStyles.cardGridCompact}`}>
        <FieldCard label="Nombre">
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Juan" className={inputClass} />
        </FieldCard>
        <FieldCard label="Apellido">
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Pérez" className={inputClass} />
        </FieldCard>
        <FieldCard label="Teléfono">
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="829-000-0000" className={inputClass} />
        </FieldCard>
        <FieldCard label="Correo">
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="juan@correo.com" className={inputClass} />
        </FieldCard>
        <FieldCard label="Área">
          <select name="areaInteres" value={formData.areaInteres} onChange={handleChange} required className={inputClass}>
            <option value="">Selecciona un área</option>
            {AREAS_EMPLEO.map((area) => (
              <option key={area} value={area} className="bg-slate-900 text-white">{area}</option>
            ))}
          </select>
        </FieldCard>
        <FieldCard label="Experiencia">
          <select name="nivelExperiencia" value={formData.nivelExperiencia} onChange={handleChange} required className={inputClass}>
            <option value="">Selecciona tu nivel</option>
            {NIVELES_EXPERIENCIA.map((nivel) => (
              <option key={nivel} value={nivel} className="bg-slate-900 text-white">{nivel}</option>
            ))}
          </select>
        </FieldCard>
        <FieldCard label="Mensaje" wide>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={4}
            placeholder="Cuéntanos sobre tu experiencia o en qué tipo de proyecto te gustaría trabajar..."
            className={`${inputClass} resize-none`}
          />
        </FieldCard>
      </div>

      <div className={`${stepperStyles.circleContainer} relative z-[50] px-4 pb-5`} data-lanyard-front>
        <ProgressTrack completedCount={progress} />
        {error && <p className="mt-3 text-center text-sm text-red-500 dark:text-red-300">{error}</p>}
        <div className="mt-5 flex justify-end">
          <button type="submit" disabled={enviando || !canSubmit} className={stepperStyles.nextButton}>
            {enviando ? 'Enviando...' : 'Enviar mi perfil'}
          </button>
        </div>
      </div>
    </form>
  )
}
