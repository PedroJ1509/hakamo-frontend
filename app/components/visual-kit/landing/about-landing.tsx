"use client";

import HorizontalPanels from "@/app/components/ui/HorizontalPanels";
import { CLIENTES, EQUIPO, MISION_VISION, VALORES } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { StagePanel } from "../stage-panel";

const MVV = [MISION_VISION.mision, MISION_VISION.vision, MISION_VISION.valores];

export function AboutLanding() {
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

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.about}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Quiénes somos</p>
          <div className="mt-5">
            <CinematicTitle lines={["Su aliado estratégico en", "gestión humana"]} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Empresa dominicana de outsourcing y gestión humana especializada en construcción,
            plantas industriales y proyectos de gran escala. Acompañamiento B2B integral desde la
            atracción del talento hasta la supervisión en campo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/servicios">Ver servicios</MagneticButton>
            <MagneticButton href="/contacto" variant="ghost">
              Hablemos
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <HorizontalPanels>
        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Nuestra identidad</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Lo que nos mueve, hacia dónde vamos
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Tres principios que sostienen cada decisión que tomamos, desde a quién contratamos hasta
            cómo acompañamos a cada cliente.
          </p>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {MVV.map((item, index) => (
              <article key={item.titulo} className="grid gap-3 py-5 md:grid-cols-[4rem_1fr] md:items-start">
                <span className="font-display text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg tracking-tight text-ink sm:text-xl">{item.titulo}</h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-5 text-muted">{item.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Nuestros principios</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Los pilares que nos definen
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Cumplimiento, transparencia, eficiencia en terreno y seguridad primero guían cada
            operación.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {VALORES.map((valor) => (
              <article key={valor.titulo} className="h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-lg">{valor.titulo}</h3>
                <p className="mt-2 text-sm leading-5 text-paper/65">{valor.descripcion}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Las personas detrás</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Un equipo conectado alrededor de ti
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Cada área de Hakamo trabaja sobre el mismo expediente. No te pasan de mano en mano: una
            sola coordinación acompaña tu proceso de principio a fin.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {EQUIPO.map((persona) => (
              <article key={persona.cargo} className="rounded-[1.6rem] border border-ink/10 bg-white p-5">
                <p className="font-display text-xl text-accent">{persona.iniciales}</p>
                <h3 className="font-display mt-2 text-lg text-ink">{persona.cargo}</h3>
                <p className="mt-1 text-sm text-muted">{persona.area}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <MagneticButton href="/contacto" variant="ink">
              Hablar con el equipo
            </MagneticButton>
          </div>
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Confianza comprobada</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Empresas que han confiado en Hakamo
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Operaciones de energía, construcción, ingeniería y retail nos confían la gestión de su
            personal. Cada proyecto sostiene su propio equipo, con la misma exigencia.
          </p>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {CLIENTES.map((cliente, index) => (
              <article key={cliente.nombre} className="grid gap-2 py-4 md:grid-cols-[4rem_1fr_auto] md:items-end">
                <span className="font-display text-sm text-glow">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg sm:text-xl">{cliente.nombre}</h3>
                <p className="text-sm text-paper/55">{cliente.sector}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <MagneticButton href="/servicios">Ver servicios</MagneticButton>
          </div>
        </StagePanel>
      </HorizontalPanels>

      <Marquee items={CLIENTES.map((item) => item.nombre)} />
      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
