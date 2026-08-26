"use client";

import dynamic from "next/dynamic";
import HorizontalPanels from "@/app/components/ui/HorizontalPanels";
import { AREAS_EMPLEO, PROCESO_CANDIDATOS } from "@/lib/data";
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

const EmpleoForm = dynamic(() => import("@/app/components/ui/EmpleoForm"), {
  loading: () => <div className="min-h-[420px] animate-pulse rounded-[1.6rem] border border-white/10 bg-white/5" aria-hidden />,
});

const BENEFICIOS = [
  "Tu perfil queda en nuestra base de candidatos activos",
  "Te contactamos directamente por WhatsApp cuando hay una vacante",
  "Sin costo alguno para el candidato",
  "Trabajamos con empresas líderes en República Dominicana",
  "Soporte durante todo el proceso de integración",
];

export function EmploymentLanding() {
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

      <LandingHeader name={site.name} links={SITE_NAV} ctaHref="#registro" ctaLabel="Registrar perfil" />

      <section id="contenido" className="relative min-h-[100svh] overflow-hidden bg-night text-paper">
        <div className="absolute inset-0" aria-hidden>
          <div className="hero-field" />
          <div className="hero-vignette" />
          <div className="hero-veil" />
        </div>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Únete al equipo</p>
          <div className="mt-5">
            <CinematicTitle lines={["Encuentra tu próxima", "oportunidad laboral"]} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Conectamos talento dominicano con las empresas más importantes del país. Envía tu
            currículum y te contactamos cuando haya una oportunidad para tu perfil.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#registro">Registra tu perfil</MagneticButton>
            <MagneticButton href="/servicios" variant="ghost">
              Ver servicios
            </MagneticButton>
          </div>
        </div>
      </section>

      <LandingScrollExpand title="Tu perfil">
        <h2>Te contactamos cuando abra la vacante</h2>
        <p>Deja tu expediente. Sin costo para el candidato, con empresas en todo el país.</p>
      </LandingScrollExpand>

      <HorizontalPanels>
        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Candidatos</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Trabaja en proyectos de alto impacto
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Hakamo conecta profesionales dominicanos con proyectos en construcción, energía,
            manufactura y servicios.
          </p>
          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {BENEFICIOS.map((item, index) => (
              <article key={item} className="grid gap-4 py-6 md:grid-cols-[4rem_1fr] md:items-start">
                <span className="font-display text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-display text-xl tracking-tight text-ink sm:text-2xl">{item}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Cómo trabajamos</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Del registro al proyecto
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Un proceso claro para que tu perfil llegue a la operación correcta.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO_CANDIDATOS.map((paso) => (
              <article key={paso.paso} className="h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                <p className="font-display text-3xl text-glow">{paso.paso}</p>
                <h3 className="mt-4 font-display text-xl">{paso.titulo}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-paper/45">{paso.subtitulo}</p>
                <p className="mt-3 text-sm leading-6 text-paper/65">{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Sectores</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Áreas donde colocamos talento
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Indica tu área al registrarte. Así priorizamos las vacantes que encajan contigo.
          </p>
          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {AREAS_EMPLEO.map((area, index) => (
              <article key={area} className="grid gap-4 py-5 md:grid-cols-[4rem_1fr] md:items-center">
                <span className="font-display text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">{area}</h3>
              </article>
            ))}
          </div>
        </StagePanel>
      </HorizontalPanels>

      <section id="registro" className="relative overflow-hidden bg-night px-4 py-24 text-paper sm:px-6 sm:py-32">
        <div className="lamp-glow" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Registra tu perfil</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">Deja tu expediente</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Completa tus datos y te contactamos cuando haya una vacante que encaje contigo. Sin costo
            para el candidato.
          </p>
          <div className="mt-12">
            <EmpleoForm />
          </div>
        </div>
      </section>

      <Marquee items={AREAS_EMPLEO} />
      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
