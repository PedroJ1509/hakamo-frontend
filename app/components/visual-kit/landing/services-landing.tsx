"use client";

import HorizontalPanels from "@/app/components/ui/HorizontalPanels";
import { MARCO_LEGAL, PLANES, PROCESO_EMPRESAS, SERVICIOS } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { LandingScrollExpand } from "../landing-scroll-expand";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { StagePanel } from "../stage-panel";

const CATALOGO_A = SERVICIOS.slice(0, 4);
const CATALOGO_B = SERVICIOS.slice(4);

function ServiceRows({
  items,
  offset,
  night,
}: {
  items: typeof SERVICIOS;
  offset: number;
  night?: boolean;
}) {
  return (
    <div className={`mt-10 divide-y border-y ${night ? "divide-white/10 border-white/10" : "divide-ink/10 border-ink/10"}`}>
      {items.map((item, index) => (
        <article
          key={item.slug}
          className="grid gap-3 py-6 md:grid-cols-[4rem_1fr_auto] md:items-end"
        >
          <span className={`font-display text-sm ${night ? "text-glow" : "text-accent"}`}>
            {String(offset + index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={`font-display text-xl tracking-tight sm:text-2xl ${night ? "" : "text-ink"}`}>
              {item.titulo}
            </h3>
            <p className={`mt-2 max-w-xl text-sm leading-6 ${night ? "text-paper/65" : "text-muted"}`}>
              {item.descripcion}
            </p>
          </div>
          <p className={`text-sm ${night ? "text-paper/55" : "text-muted"}`}>{item.tags.join(" · ")}</p>
        </article>
      ))}
    </div>
  );
}

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

      <section id="contenido" className="relative min-h-[100svh] overflow-hidden bg-night text-paper">
        <div className="absolute inset-0" aria-hidden>
          <div className="hero-field" />
          <div className="hero-vignette" />
          <div className="hero-veil" />
        </div>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Lo que ofrecemos</p>
          <div className="mt-5">
            <CinematicTitle lines={["Servicios especializados de", "talento humano"]} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Soluciones integrales diseñadas para la realidad empresarial dominicana, con pleno
            cumplimiento de la normativa laboral vigente.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={site.ctaHref}>Obtener cotización</MagneticButton>
            <MagneticButton href="/contacto" variant="ghost">
              Hablemos
            </MagneticButton>
          </div>
        </div>
      </section>

      <LandingScrollExpand title="Ocho soluciones">
        <h2>Un expediente, todo el ciclo laboral</h2>
        <p>De outsourcing a supervisión de obra — con cumplimiento legal dominicano.</p>
      </LandingScrollExpand>

      <HorizontalPanels>
        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Catálogo</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Ocho soluciones de capital humano
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            De outsourcing a supervisión de obra — todo con cumplimiento legal dominicano.
          </p>
          <ServiceRows items={CATALOGO_A} offset={0} />
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Catálogo</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            El resto del expediente
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Estudios, consultoría, documentación y supervisión para cerrar el ciclo laboral.
          </p>
          <ServiceRows items={CATALOGO_B} offset={4} night />
          <div className="mt-10">
            <MagneticButton href="/contacto">¿Necesitas algo a medida?</MagneticButton>
          </div>
        </StagePanel>

        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Marco legal dominicano</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Cumplimiento total con la ley dominicana
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Operamos bajo el Código Laboral (Ley 16-92) y las regulaciones de seguridad social
            vigentes. Asumimos la responsabilidad patronal.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MARCO_LEGAL.map((item) => (
              <article key={item.titulo} className="h-full rounded-[1.6rem] border border-ink/10 bg-white p-6">
                <h3 className="font-display text-xl text-ink">{item.titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.descripcion}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Cómo trabajamos</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Un proceso claro, de principio a fin
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Simple, transparente y orientado a resultados desde el primer contacto.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO_EMPRESAS.map((paso) => (
              <article key={paso.paso} className="h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                <p className="font-display text-3xl text-glow">{paso.paso}</p>
                <h3 className="mt-4 font-display text-xl">{paso.titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/65">{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Elige tu plan</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Planes y precios
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Cumplimiento legal incluido en todos los planes. Cotización a medida según el tamaño y
            ritmo de tu operación.
          </p>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {PLANES.map((plan) => (
              <article
                key={plan.nombre}
                className={`h-full rounded-[1.6rem] p-6 ${
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
                <h3 className={`font-display text-2xl ${plan.destacado ? "mt-2" : ""}`}>{plan.nombre}</h3>
                <p className={`mt-1 text-sm ${plan.destacado ? "text-paper/55" : "text-muted"}`}>{plan.precio}</p>
                <p className={`mt-3 text-sm leading-6 ${plan.destacado ? "text-paper/65" : "text-muted"}`}>
                  {plan.descripcion}
                </p>
                <ul className={`mt-5 space-y-2 text-sm ${plan.destacado ? "text-paper/70" : "text-ink/80"}`}>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-6">
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
