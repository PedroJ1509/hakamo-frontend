"use client";

import {
  COMPROMISO_HSE,
  MARCO_LEGAL,
  PROCESO_EMPRESAS,
  SECTORES,
  SERVICIOS,
  VALOR_HAKAMO,
} from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { ServiceTimeline } from "../service-timeline";

export function ServicesLanding() {
  const site = SITE_PUBLIC;

  return (
    <div className="landing">
      <ScrollProgress />
      <Grain />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        Saltar al contenido
      </a>

      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref={site.ctaHref}
        ctaLabel={site.ctaLabel}
        ctaExternal={site.ctaHref.startsWith("http")}
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.services}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Lo que ofrecemos</p>
          <div className="mt-5">
            <CinematicTitle lines={["Soluciones para cada", "obra y cada equipo"]} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={site.ctaHref}>Solicitar personal</MagneticButton>
            <MagneticButton href="/contacto" variant="ghost">
              Hablemos
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <div id="contenido" className="scroll-mt-[var(--header-h)]">
        <ServiceTimeline items={SERVICIOS} />
      </div>

      <section id="seguridad" className="scroll-mt-[var(--header-h)] bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-end gap-8 border-b border-ink/10 pb-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Seguridad</p>
              <h2 className="font-display mt-4 text-3xl leading-[1.15] sm:text-5xl">
                {COMPROMISO_HSE.titulo}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">{COMPROMISO_HSE.texto}</p>
          </div>

          <div className="mt-16 lg:mt-20">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">¿Por qué trabajar con Hakamo?</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-snug sm:text-4xl">
              Valor para su directiva y su obra
            </h2>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
              {VALOR_HAKAMO.map((item, index) => (
                <article
                  key={item.titulo}
                  className="border-t border-ink/15 py-7 sm:px-6 sm:first:pl-0 lg:[&:nth-child(4)]:pr-0"
                >
                  <p className="font-display text-3xl leading-none text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-5 text-xl leading-snug">{item.titulo}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.descripcion}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night px-4 py-20 text-paper sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Cómo trabajamos</p>
              <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug sm:text-5xl">
                Un proceso claro, de principio a fin
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-paper/65 lg:pb-1">
              Simple, transparente y orientado a resultados desde el primer contacto.
            </p>
          </div>

          <ol className="mt-14 grid gap-x-8 lg:grid-cols-4">
            {PROCESO_EMPRESAS.map((paso) => (
              <li key={paso.paso} className="border-t border-glow/50 pt-6 pb-10">
                <p className="font-display text-4xl leading-none text-glow">{paso.paso}</p>
                <h3 className="font-display mt-6 text-2xl leading-snug">{paso.titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/65">{paso.descripcion}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-white/10 pt-16">
            <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Sectores que servimos</p>
            <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug sm:text-4xl">
              Experiencia donde la operación exige más
            </h2>
            <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
              {SECTORES.map((sector, index) => (
                <li key={sector.nombre} className="border-t border-white/15 py-7 sm:pr-8">
                  <p className="text-xs tracking-[0.2em] text-glow">{String(index + 1).padStart(2, "0")}</p>
                  <p className="font-display mt-3 text-2xl leading-snug">{sector.nombre}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-20 text-ink sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Marco legal dominicano</p>
            <h2 className="font-display mt-4 text-3xl leading-snug sm:text-4xl">
              Cumplimiento total con la ley dominicana
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Operamos bajo el Código Laboral (Ley 16-92) y las regulaciones de seguridad social
              vigentes. Asumimos la responsabilidad patronal.
            </p>
          </div>
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {MARCO_LEGAL.filter((item) => item.titulo !== "Seguridad y salud ocupacional").map((item, index) => (
              <li key={item.titulo} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6">
                <span className="font-display text-2xl leading-none text-accent sm:text-3xl" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-snug sm:text-2xl">{item.titulo}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{item.descripcion}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10 bg-night px-4 py-16 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl leading-snug sm:text-5xl">
              Garantice el éxito de su obra desde el día uno
            </h2>
            <p className="mt-4 text-sm leading-6 text-paper/70">
              Con personal calificado, sin complicaciones administrativas.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href="/empresas/solicitar">Solicitar personal</MagneticButton>
            <MagneticButton href="https://wa.me/18296790671" variant="ghost" external>
              WhatsApp
            </MagneticButton>
          </div>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
