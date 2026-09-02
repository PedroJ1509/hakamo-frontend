"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import HorizontalPanels from "@/app/components/ui/HorizontalPanels";
import type { Division, Vacante } from "@/types";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { CinematicTitle } from "../cinematic-title";
import { EmptyState } from "../empty-state";
import { Grain } from "../grain";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { StagePanel } from "../stage-panel";

export const MODALIDAD_LABEL: Record<string, string> = {
  presencial: "Presencial",
  remoto: "Remoto",
  hibrido: "Híbrido",
};

export const TIPO_LABEL: Record<string, string> = {
  tiempo_completo: "Tiempo completo",
  medio_tiempo: "Medio tiempo",
  contrato: "Contrato",
};

function Chip({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active ? "bg-night text-paper" : "border border-ink/10 bg-white text-muted hover:border-accent"
      }`}
    >
      {children}
    </Link>
  );
}

export function JobsLanding({
  vacantes,
  divisiones,
  divisionSlug,
  tipo,
  total,
}: {
  vacantes: Vacante[];
  divisiones: Division[];
  divisionSlug?: string;
  tipo?: string;
  total: number;
}) {
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

      <LandingHeader name={site.name} links={SITE_NAV} ctaHref="/empleo" ctaLabel="Registrar perfil" />

      <section id="contenido" className="relative min-h-[100svh] overflow-hidden bg-night text-paper">
        <div className="absolute inset-0" aria-hidden>
          <div className="hero-field" />
          <div className="hero-vignette" />
          <div className="hero-veil" />
        </div>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Vacantes</p>
          <div className="mt-5">
            <CinematicTitle lines={["Trabaja con", "nosotros"]} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Oportunidades en proyectos de construcción, energía e infraestructura. Postúlate o deja tu
            perfil para cuando abra una vacante.
          </p>
          {total > 0 ? (
            <p className="mt-6 text-[11px] uppercase tracking-[0.32em] text-glow">
              {total} vacante{total === 1 ? "" : "s"} disponible{total === 1 ? "" : "s"}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#vacantes">Ver vacantes</MagneticButton>
            <MagneticButton href="/empleo" variant="ghost">
              Dejar mi perfil
            </MagneticButton>
          </div>
        </div>
      </section>

      <section id="vacantes" className="relative bg-paper px-4 py-20 text-ink sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Listado</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Vacantes abiertas
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip href="/empleos" active={!divisionSlug}>
              Todas
            </Chip>
            {divisiones.map((div) => (
              <Chip
                key={div.id}
                href={`/empleos?division=${div.slug}${tipo ? `&tipo=${tipo}` : ""}`}
                active={divisionSlug === div.slug}
              >
                {div.nombre}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(TIPO_LABEL).map(([key, label]) => (
              <Chip
                key={key}
                href={`/empleos?${divisionSlug ? `division=${divisionSlug}&` : ""}tipo=${key}`}
                active={tipo === key}
              >
                {label}
              </Chip>
            ))}
          </div>

          {vacantes.length === 0 ? (
            <div className="mt-12">
              <EmptyState
                kicker="Vacantes"
                title="No hay vacantes disponibles"
                text="Intenta con otro filtro o deja tu perfil para cuando abra una oportunidad."
              />
            </div>
          ) : (
            <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {vacantes.map((vacante, index) => (
                <Link
                  key={vacante.documentId}
                  href={`/empleos/${vacante.documentId}`}
                  className="service-row group grid gap-3 py-6 md:grid-cols-[4rem_1fr_auto] md:items-end"
                >
                  <span className="font-display text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                      {vacante.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {[
                        vacante.division?.nombre,
                        vacante.ubicacion,
                        vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null,
                        vacante.salario,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p className="text-sm text-muted">
                    {TIPO_LABEL[vacante.tipo] ?? vacante.tipo}
                    <span className="ml-2 text-accent transition group-hover:translate-x-0.5">→</span>
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <HorizontalPanels>
        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">¿No ves tu perfil?</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Déjanos tu expediente de todas formas
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Guardamos tu perfil y te contactamos cuando surja una oportunidad que se ajuste a ti.
          </p>
          <div className="mt-10">
            <MagneticButton href="/empleo">Registrar perfil</MagneticButton>
          </div>
        </StagePanel>
      </HorizontalPanels>

      <Marquee
        items={
          vacantes.length > 0 ? vacantes.map((item) => item.titulo) : ["Vacantes", "Talento dominicano", "Hakamo"]
        }
      />
      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
