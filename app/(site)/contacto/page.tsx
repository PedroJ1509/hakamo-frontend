import FAQAccordion from '@/app/components/ui/FAQAccordion'
import ContactForm from '@/app/components/ui/ContactForm'
import SectionReveal from '@/app/components/ui/SectionReveal'
import FormularioBlobSection from '@/app/components/ui/FormularioBlobSection'
import WhatsAppChatPreview from '@/app/components/ui/WhatsAppChatPreview'
import ContactoDisclosure from '@/app/components/ui/ContactoDisclosure'
import ScrollingContactCards from '@/app/components/ui/ScrollingContactCards'
import TextLoop from '@/app/components/ui/TextLoop'
import { FAQ } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto — Hakamo Outsourcing',
  description:
    'Contáctanos para obtener una cotización o resolver tus dudas. Respondemos en menos de 24 horas.',
}

const PRIMARY = '#1E3A5F'
const ACCENT = '#2563EB'

function IconWhatsApp({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)]">

      {/* ── Hero ── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* grid de fondo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60
            [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)]
            dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
            [background-size:44px_44px]
            [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
        />

        {/* blobs animados */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl animate-[blob-move_9s_ease-in-out_infinite] dark:opacity-35"
          style={{ background: 'radial-gradient(circle, var(--brand-accent), transparent 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 h-[360px] w-[360px] rounded-full opacity-20 blur-3xl animate-[blob-move_11s_ease-in-out_infinite_1s] dark:opacity-30"
          style={{ background: 'radial-gradient(circle, var(--brand-primary), transparent 70%)' }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <SectionReveal>
            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Copy */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-[var(--shadow-soft)] dark:bg-slate-900" style={{ color: 'var(--brand-accent)' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: 'var(--brand-accent)' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--brand-accent)' }} />
                  </span>
                  Respondemos en menos de 24h
                </div>

                <h1
                  className="mt-6 font-bold leading-[1.08] tracking-tight"
                  style={{
                    fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                    color: 'var(--brand-primary)',
                    fontFamily: 'var(--font-space-grotesk, sans-serif)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  ¿Listo para optimizar tu{' '}
                  <span style={{ color: 'var(--brand-accent)' }}>capital humano?</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                  Cuéntanos tu necesidad. Un especialista de Hakamo te contacta para diseñar
                  la solución perfecta, sin compromiso.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#formulario"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                    style={{ backgroundColor: 'var(--brand-accent)' }}
                  >
                    Escribirnos ahora →
                  </a>
                  <a
                    href="https://wa.me/18296790671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 px-7 py-4 text-sm font-semibold transition-all hover:bg-gray-50 dark:hover:bg-white/5"
                    style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}
                  >
                    WhatsApp directo
                  </a>
                </div>
              </div>

              {/* Ilustración */}
              <div className="relative hidden h-[360px] lg:block">
                <svg viewBox="0 0 400 340" className="h-full w-full" aria-hidden>
                  <circle cx="200" cy="170" r="155" style={{ fill: 'var(--surface-wash)' }} />

                  {/* burbuja de mensaje principal */}
                  <g style={{ animation: 'float-y 7s ease-in-out infinite' }}>
                    <rect x="55" y="110" width="235" height="150" rx="24" fill={PRIMARY} />
                    <polygon points="88,260 88,282 116,260" fill={PRIMARY} />
                    <circle cx="92" cy="145" r="16" fill={ACCENT} />
                    <text x="92" y="150" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="var(--font-space-grotesk, sans-serif)">H</text>
                    <rect x="120" y="137" width="80" height="8" rx="4" fill="white" opacity="0.9" />
                    <rect x="120" y="153" width="55" height="8" rx="4" fill="white" opacity="0.5" />
                    <rect x="80" y="180" width="185" height="10" rx="5" fill="white" opacity="0.15" />
                    <rect x="80" y="198" width="155" height="10" rx="5" fill="white" opacity="0.15" />
                    <rect x="80" y="216" width="125" height="10" rx="5" fill="white" opacity="0.15" />
                  </g>

                  {/* burbuja de respuesta enviada */}
                  <g style={{ animation: 'float-y 6s ease-in-out infinite', animationDelay: '0.5s' }}>
                    <rect x="250" y="28" width="110" height="72" rx="18" fill={ACCENT} />
                    <polygon points="268,100 283,100 268,118" fill={ACCENT} />
                    <circle cx="305" cy="64" r="17" fill="white" opacity="0.15" />
                    <path d="M296 64 l6.5 6.5 13 -13" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>

                  <path d="M288 150 C 330 130, 340 110, 322 96" stroke={ACCENT} strokeWidth="2" strokeDasharray="4 6" fill="none" opacity="0.45" />

                  <circle cx="345" cy="235" r="5" fill={ACCENT} opacity="0.4" />
                  <circle cx="55" cy="70" r="4" fill={PRIMARY} opacity="0.3" />
                  <circle cx="365" cy="165" r="3" fill={ACCENT} opacity="0.5" />
                </svg>

                {/* tarjeta 24h */}
                <div
                  className="absolute -bottom-4 right-2 w-44 rounded-2xl border border-[var(--border)] bg-white p-4 text-center shadow-[var(--shadow-elevated)] dark:bg-slate-900"
                  style={{ animation: 'float-y 8s ease-in-out infinite', animationDelay: '1s' }}
                >
                  <p className="text-2xl font-bold" style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>24h</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Tiempo de respuesta</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── WhatsApp primero ── */}
      <FormularioBlobSection>
        <SectionReveal>
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-11"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, #16283f)` }}
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Respondemos al instante
                </div>
                <h2
                  className="font-bold leading-tight text-white"
                  style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                >
                  ¿Prefieres escribirnos por WhatsApp?
                </h2>
                <p className="mt-3 max-w-md text-white/65 leading-relaxed">
                  La forma más rápida de hablar con Hakamo. Un especialista te responde en minutos, no en horas.
                </p>
                <a
                  href="https://wa.me/18296790671"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <IconWhatsApp size={18} />
                  Escribir por WhatsApp
                </a>
              </div>
              <WhatsAppChatPreview />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <ContactoDisclosure>
            <ContactForm />
          </ContactoDisclosure>
        </SectionReveal>
      </FormularioBlobSection>

      {/* ── Canales (scrollytelling) ── */}
      <SectionReveal amount={0.12}>
        <ScrollingContactCards />
      </SectionReveal>

      {/* ── FAQ (fundido) ── */}
      <section className="flex min-h-[100svh] flex-col justify-center py-20 lg:py-28 bg-gradient-to-b from-[var(--surface-wash)] to-[var(--background)]">
        <SectionReveal>
          <div className="mb-2 px-6 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--brand-accent)' }}>
              ¿Tienes dudas?
            </span>
          </div>
          <TextLoop
            text="Preguntas Frecuentes"
            shape="wave"
            speed={70}
            direction="forward"
            separator="✦"
            curviness={50}
            fontSize={30}
            fontWeight={800}
            letterSpacing={1}
            uppercase
            color="#ffffff"
            ribbon
            ribbonColor="var(--brand-accent)"
            ribbonWidth={56}
            pauseOnHover
            className="mb-2"
          />
          <div className="mx-auto mt-8 max-w-3xl px-6">
            <FAQAccordion items={FAQ} color="var(--brand-accent)" />
          </div>
        </SectionReveal>
      </section>

    </main>
  )
}
