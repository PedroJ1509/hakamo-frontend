"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Division, Vacante } from "@/types";
import { resolveVacanteImage, type VacanteCard } from "@/lib/demo-vacantes";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { EmptyState } from "../empty-state";
import { LandingHeroSection } from "../landing-hero-section";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";

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

type TiempoFilter = "" | "remoto" | "parcial" | "completo";

const TIEMPO_OPTIONS: { value: TiempoFilter; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "remoto", label: "Remoto" },
  { value: "parcial", label: "Parcial" },
  { value: "completo", label: "Completo" },
];

function matchesTiempo(vacante: Vacante, tiempo: TiempoFilter) {
  if (!tiempo) return true;
  if (tiempo === "remoto") return vacante.modalidad === "remoto";
  if (tiempo === "parcial") return vacante.tipo === "medio_tiempo";
  return vacante.tipo === "tiempo_completo";
}

export function JobsLanding({
  vacantes,
  divisiones,
  total,
}: {
  vacantes: VacanteCard[];
  divisiones: Division[];
  total: number;
}) {
  const site = SITE_PUBLIC;
  const [nombre, setNombre] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [area, setArea] = useState("");
  const [tiempo, setTiempo] = useState<TiempoFilter>("");

  const locations = useMemo(() => {
    const set = new Set(
      vacantes.map((item) => item.ubicacion?.trim()).filter((value): value is string => Boolean(value)),
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, [vacantes]);

  const filtered = useMemo(() => {
    const q = nombre.trim().toLowerCase();
    return vacantes.filter((item) => {
      if (q && !item.titulo.toLowerCase().includes(q)) return false;
      if (localizacion && item.ubicacion !== localizacion) return false;
      if (area && item.division?.slug !== area) return false;
      if (!matchesTiempo(item, tiempo)) return false;
      return true;
    });
  }, [vacantes, nombre, localizacion, area, tiempo]);

  const clearFilters = () => {
    setNombre("");
    setLocalizacion("");
    setArea("");
    setTiempo("");
  };

  const hasFilters = Boolean(nombre || localizacion || area || tiempo);

  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <ScrollProgress />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Saltar al contenido
      </a>

      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref="/cv"
        ctaLabel="Postúlate aquí"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
        tone="paper"
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.jobs} tone="paper" compact>
        <div className="landing-hero-inner landing-hero-inner-compact landing-hero-inner--start mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-accent">Vacantes</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] text-ink">
            Trabaja con
            <span className="mt-1 block italic text-accent">nosotros</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-6 text-muted sm:text-base">
            Oportunidades en construcción, energía e infraestructura. Postúlate o deja tu perfil.
          </p>
          {total > 0 ? (
            <p className="mt-6 text-[11px] uppercase tracking-[0.32em] text-accent">
              {total} vacante{total === 1 ? "" : "s"} disponible{total === 1 ? "" : "s"}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#vacantes" className={btnPrimary}>
              Ver vacantes
            </a>
            <a href="/cv" className={btnSecondary}>
              Dejar mi perfil
            </a>
          </div>
          </div>
        </div>
      </LandingHeroSection>

      <section id="vacantes" className="relative bg-white px-4 py-16 text-ink sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[11px] uppercase tracking-[0.32em] text-accent">Listado</p>
          <h2 className="font-display mt-3 text-center text-3xl leading-snug text-ink sm:text-4xl">
            Vacantes abiertas
          </h2>

          <form
            className="jobs-filters mt-10"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="jobs-filter-field">
              <span className="visit-label">Nombre</span>
              <input
                type="search"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Buscar por puesto"
                className="visit-input"
              />
            </label>

            <label className="jobs-filter-field">
              <span className="visit-label">Localización</span>
              <select
                value={localizacion}
                onChange={(event) => setLocalizacion(event.target.value)}
                className="visit-input"
              >
                <option value="">Todas</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>

            <label className="jobs-filter-field">
              <span className="visit-label">Área</span>
              <select
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="visit-input"
              >
                <option value="">Todas</option>
                {divisiones.map((div) => (
                  <option key={div.id} value={div.slug}>
                    {div.nombre}
                  </option>
                ))}
              </select>
            </label>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Tiempo
            </span>
            {TIEMPO_OPTIONS.map((option) => (
              <button
                key={option.value || "all"}
                type="button"
                onClick={() => setTiempo(option.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  tiempo === option.value
                    ? "bg-accent text-paper"
                    : "border border-ink/10 bg-white text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {option.label}
              </button>
            ))}
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-2 text-xs font-semibold text-accent underline-offset-2 hover:underline"
              >
                Limpiar
              </button>
            ) : null}
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
          </p>

          {filtered.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                kicker="Vacantes"
                title="No hay vacantes con esos filtros"
                text="Prueba otro nombre, ciudad, área o tipo de tiempo."
              />
            </div>
          ) : (
            <div className="jobs-masonry mt-8">
              {filtered.map((vacante, index) => {
                const meta = [
                  vacante.division?.nombre,
                  vacante.ubicacion,
                  vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null,
                ]
                  .filter(Boolean)
                  .join(" · ");
                const maxLen = index % 3 === 0 ? 140 : index % 3 === 1 ? 80 : 40;
                const excerpt = vacante.descripcion?.replace(/\s+/g, " ").trim().slice(0, maxLen) || null;
                const showExcerpt = Boolean(excerpt && excerpt.length > 24);
                const image = resolveVacanteImage(vacante, index);
                const ratioClass =
                  index % 3 === 0
                    ? "jobs-masonry-media--tall"
                    : index % 3 === 1
                      ? "jobs-masonry-media--wide"
                      : "jobs-masonry-media--square";

                return (
                  <Link
                    key={vacante.documentId}
                    href={`/empleos/${vacante.documentId}`}
                    className="jobs-masonry-item group"
                  >
                    <div className={`jobs-masonry-media ${ratioClass}`}>
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="jobs-masonry-body">
                      <span className="font-display text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display mt-2 text-xl tracking-tight text-ink transition group-hover:text-accent sm:text-2xl">
                        {vacante.titulo}
                      </h3>
                      {meta ? <p className="mt-2 text-sm leading-6 text-muted">{meta}</p> : null}
                      {showExcerpt ? (
                        <p className="mt-3 text-sm leading-6 text-ink/70">
                          {excerpt}
                          {vacante.descripcion && vacante.descripcion.length > excerpt!.length ? "…" : ""}
                        </p>
                      ) : null}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-ink/8 pt-4">
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                          {vacante.modalidad === "remoto"
                            ? "Remoto"
                            : TIPO_LABEL[vacante.tipo] ?? vacante.tipo}
                        </span>
                        <span className="text-sm text-accent transition group-hover:translate-x-0.5">
                          Ver →
                        </span>
                      </div>
                      {vacante.salario ? (
                        <p className="mt-3 text-sm font-medium text-ink">{vacante.salario}</p>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-ink/8 bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">¿No ves tu perfil?</p>
          <h2 className="font-display mt-3 text-3xl leading-snug text-ink sm:text-4xl">
            Déjanos tu expediente de todas formas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted">
            Guardamos tu perfil y te contactamos cuando surja una oportunidad que se ajuste a ti.
          </p>
          <div className="mt-8">
            <a href="/cv" className={btnPrimary}>
              Registrar perfil
            </a>
          </div>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} tone="paper" />
    </div>
  );
}
