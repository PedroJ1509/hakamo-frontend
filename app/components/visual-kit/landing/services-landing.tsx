"use client";

import HorizontalPanels from "@/app/components/ui/HorizontalPanels";
import { MARCO_LEGAL, PLANES, PROCESO_EMPRESAS, SECTORES, SERVICIOS, VALOR_HAKAMO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";
import { ServiceTimeline } from "../service-timeline";
import { StagePanel } from "../stage-panel";

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
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.services}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Lo que ofrecemos</p>
          <div className="mt-5">
            <CinematicTitle lines={["Soluciones integrales para", "su operación"]} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Outsourcing, reclutamiento, payroll, cumplimiento legal y supervisión en campo. Todo
            alineado a la normativa laboral dominicana.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={site.ctaHref}>Obtener cotización</MagneticButton>
            <MagneticButton href="/contacto" variant="ghost">
              Hablemos
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <ServiceTimeline items={SERVICIOS} />

      <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">¿Por qué Hakamo?</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Valor para su directiva y su obra
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALOR_HAKAMO.map((item, index) => (
              <Reveal key={item.titulo} delay={index * 60} from="up">
                <article className="h-full rounded-[1.6rem] border border-ink/10 bg-white p-5">
                  <h3 className="font-display text-lg text-ink">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-5 text-muted">{item.descripcion}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night px-4 py-16 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Sectores que servimos</p>
          <h2 className="font-display mt-3 text-2xl sm:text-3xl">Experiencia donde la operación exige más</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {SECTORES.map((sector) => (
              <span
                key={sector.nombre}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-paper/85"
              >
                {sector.nombre}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HorizontalPanels>
        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Marco legal dominicano</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Cumplimiento total con la ley dominicana
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Operamos bajo el Código Laboral (Ley 16-92) y las regulaciones de seguridad social
            vigentes. Asumimos la responsabilidad patronal.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MARCO_LEGAL.map((item) => (
              <article key={item.titulo} className="h-full rounded-[1.6rem] border border-ink/10 bg-white p-5">
                <h3 className="font-display text-lg text-ink">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-5 text-muted">{item.descripcion}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Cómo trabajamos</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Un proceso claro, de principio a fin
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-paper/65">
            Simple, transparente y orientado a resultados desde el primer contacto.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO_EMPRESAS.map((paso) => (
              <article key={paso.paso} className="h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <p className="font-display text-2xl text-glow">{paso.paso}</p>
                <h3 className="mt-3 font-display text-lg">{paso.titulo}</h3>
                <p className="mt-2 text-sm leading-5 text-paper/65">{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Elige tu plan</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Planes y precios
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Cumplimiento legal incluido en todos los planes. Cotización a medida según el tamaño y
            ritmo de tu operación.
          </p>
          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {PLANES.map((plan) => (
              <article
                key={plan.nombre}
                className={`h-full rounded-[1.6rem] p-5 ${
                  plan.destacado
                    ? "border border-accent bg-night text-paper"
                    : "border border-ink/10 bg-white"
                }`}
              >
                {plan.badge ? (
                  <p className={`text-[11px] uppercase tracking-[0.32em] ${plan.destacado ? "text-glow" : "text-accent"}`}>
                    {plan.badge}
                  </p>
                ) : null}
                <h3 className={`font-display text-xl ${plan.destacado ? "mt-1.5" : ""}`}>{plan.nombre}</h3>
                <p className={`mt-1 text-sm ${plan.destacado ? "text-paper/55" : "text-muted"}`}>{plan.precio}</p>
                <p className={`mt-2 text-sm leading-5 ${plan.destacado ? "text-paper/65" : "text-muted"}`}>
                  {plan.descripcion}
                </p>
                <ul className={`mt-3 space-y-1 text-[13px] leading-5 ${plan.destacado ? "text-paper/70" : "text-ink/80"}`}>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <MagneticButton
                    href={plan.ctaLink}
                    variant={plan.destacado ? "glow" : "ink"}
                    size="sm"
                  >
                    {plan.cta}
                  </MagneticButton>
                </div>
              </article>
            ))}
          </div>
        </StagePanel>
      </HorizontalPanels>

      <Marquee items={SERVICIOS.map((item) => item.titulo)} />
      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
