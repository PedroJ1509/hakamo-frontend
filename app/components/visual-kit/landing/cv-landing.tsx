"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Division, Vacante } from "@/types";
import { COMPANY_INFO } from "@/lib/data";
import { resolveVacanteImage, type VacanteCard } from "@/lib/demo-vacantes";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { CvBuilder } from "../cv/cv-builder";
import { CvUpload } from "../cv/cv-upload";
import { EmptyState } from "../empty-state";
import { Reveal } from "../reveal";
import { MODALIDAD_LABEL, TIPO_LABEL } from "./jobs-landing";

type Mode = "builder" | "upload" | null;
type TiempoFilter = "" | "remoto" | "parcial" | "completo";

const STEPS = [
  { n: "01", title: "Revisa vacantes", hint: "O deja tu perfil abierto" },
  { n: "02", title: "Arma o sube tu CV", hint: "Te guiamos paso a paso" },
  { n: "03", title: "Te contactamos", hint: "Si hay un puesto para ti" },
];

const BENEFITS = ["Gratis", "Vacantes reales", "Te ayudamos con el CV", "Te avisamos"];

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

export function CvLanding({
  vacantes = [],
  divisiones = [],
}: {
  vacantes?: VacanteCard[];
  divisiones?: Division[];
}) {
  const [mode, setMode] = useState<Mode>(null);
  const [query, setQuery] = useState("");
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
    const q = query.trim().toLowerCase();
    return vacantes.filter((item) => {
      if (q && !item.titulo.toLowerCase().includes(q) && !item.descripcion?.toLowerCase().includes(q)) {
        return false;
      }
      if (localizacion && item.ubicacion !== localizacion) return false;
      if (area && item.division?.slug !== area) return false;
      if (!matchesTiempo(item, tiempo)) return false;
      return true;
    });
  }, [vacantes, query, localizacion, area, tiempo]);

  const hasFilters = Boolean(query || localizacion || area || tiempo);

  const clearFilters = () => {
    setQuery("");
    setLocalizacion("");
    setArea("");
    setTiempo("");
  };

  const choose = (next: Mode) => {
    setMode(next);
    requestAnimationFrame(() => {
      document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const searchJobs = (event: React.FormEvent) => {
    event.preventDefault();
    document.getElementById("vacantes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70svh] overflow-hidden sm:min-h-[76svh]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/visual-kit/heroes/cv-seeker.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[62%_22%] sm:object-[70%_18%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, color-mix(in srgb, var(--paper) 92%, white) 0%, color-mix(in srgb, var(--paper) 78%, transparent) 38%, color-mix(in srgb, var(--paper) 28%, transparent) 68%, color-mix(in srgb, var(--paper) 55%, transparent) 100%), linear-gradient(180deg, color-mix(in srgb, var(--paper) 35%, transparent) 0%, transparent 35%, color-mix(in srgb, var(--paper) 88%, white) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:min-h-[76svh] sm:justify-center sm:px-6 sm:pb-20 sm:pt-28">
          <div className="max-w-xl text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-accent">
              Postúlate en Hakamo
            </p>
            <h1 className="font-display mt-4 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-ink">
              Encuentra tu próxima
              <span className="mt-1 block italic text-accent">oportunidad</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted sm:text-base">
              Revisa vacantes o deja tu CV. Todo en un solo lugar, gratis.
            </p>

            <form
              onSubmit={searchJobs}
              className="mt-8 flex w-full max-w-xl flex-col gap-2 rounded-[1.4rem] border border-ink/10 bg-white/95 p-2 shadow-[0_18px_50px_color-mix(in_srgb,var(--ink)_10%,transparent)] backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full sm:p-1.5"
            >
              <label className="sr-only" htmlFor="buscar-empleo">
                Buscar empleo
              </label>
              <input
                id="buscar-empleo"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cargo, área o palabra clave…"
                className="w-full flex-1 rounded-full border-0 bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
              />
              <button type="submit" className={`${btnPrimary} w-full sm:w-auto sm:shrink-0`}>
                Buscar
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href="#vacantes" className={btnSecondary}>
                Ver vacantes
              </a>
              <a href="#tu-cv" className="text-sm font-semibold text-accent">
                Dejar mi CV →
              </a>
            </div>

            {vacantes.length > 0 ? (
              <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-accent">
                {vacantes.length} vacante{vacantes.length === 1 ? "" : "s"} abierta
                {vacantes.length === 1 ? "" : "s"}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="border-y border-ink/8 bg-white px-4 py-5 sm:px-6">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between">
          {BENEFITS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Cómo postularte */}
      <section className="bg-paper px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl text-ink sm:text-3xl">Cómo postularte</h2>
          <ol className="apply-timeline mt-8">
            {STEPS.map((step, index) => (
              <li key={step.n} className="apply-timeline-item">
                <span className="apply-timeline-dot" aria-hidden>
                  {step.n}
                </span>
                {index < STEPS.length - 1 ? <span className="apply-timeline-line" aria-hidden /> : null}
                <div className="apply-timeline-content">
                  <h3 className="font-display text-lg text-ink sm:text-xl">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.hint}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vacantes */}
      <section id="vacantes" className="scroll-mt-[var(--header-h)] bg-white px-4 py-16 text-ink sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[11px] uppercase tracking-[0.32em] text-accent">Vacantes</p>
          <h2 className="font-display mt-3 text-center text-3xl leading-snug text-ink sm:text-4xl">
            Oportunidades abiertas
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted">
            Filtra por puesto, ciudad o área. Si no ves tu perfil, deja tu CV más abajo.
          </p>

          <form className="jobs-filters mt-10" onSubmit={(event) => event.preventDefault()}>
            <label className="jobs-filter-field">
              <span className="visit-label">Nombre</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
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
                text="Prueba otra búsqueda o deja tu perfil más abajo."
              />
              <div className="mt-6 text-center">
                <a href="#tu-cv" className={btnPrimary}>
                  Dejar mi CV
                </a>
              </div>
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
                    href={`/cv/vacantes/${vacante.documentId}`}
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

      {/* Tu CV */}
      <section id="tu-cv" className="scroll-mt-[var(--header-h)] border-t border-ink/8 bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Tu CV</p>
            <h2 className="font-display mt-3 text-3xl text-ink sm:text-4xl">Deja tu perfil</h2>
            <p className="mt-3 text-sm text-muted">
              Crea tu CV con nosotros o súbelo. Quedas en nuestra base y te avisamos.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <button
              type="button"
              id="crear"
              onClick={() => choose("builder")}
              className={`group flex items-center justify-between gap-4 rounded-[1.35rem] border bg-white px-6 py-5 text-left transition ${
                mode === "builder"
                  ? "border-accent ring-2 ring-accent/25"
                  : "border-ink/8 hover:border-accent/40"
              }`}
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  Sin CV
                </p>
                <h3 className="font-display mt-1 text-xl text-ink sm:text-2xl">Crear mi CV</h3>
              </div>
              <span className="text-accent" aria-hidden>
                →
              </span>
            </button>

            <button
              type="button"
              id="subir"
              onClick={() => choose("upload")}
              className={`group flex items-center justify-between gap-4 rounded-[1.35rem] border bg-white px-6 py-5 text-left transition ${
                mode === "upload"
                  ? "border-accent ring-2 ring-accent/25"
                  : "border-ink/8 hover:border-accent/40"
              }`}
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  Ya tengo CV
                </p>
                <h3 className="font-display mt-1 text-xl text-ink sm:text-2xl">Subir archivo</h3>
              </div>
              <span className="text-accent" aria-hidden>
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      <section id="formulario" className="scroll-mt-[var(--header-h)] bg-paper px-4 pb-20 pt-2 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          {!mode && (
            <div className="border-t border-ink/10 px-2 py-12 text-center">
              <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Siguiente paso</p>
              <h2 className="font-display mt-3 text-2xl italic text-ink sm:text-3xl">
                Elige crear o subir tu CV arriba
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                Cuando selecciones una opción, el formulario aparecerá aquí.
              </p>
            </div>
          )}

          {mode === "builder" && (
            <Reveal from="up">
              <div className="mb-10">
                <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Constructor</p>
                <h2 className="font-display mt-2 text-3xl italic text-ink">Vamos a armar tu CV juntos</h2>
              </div>
              <CvBuilder />
            </Reveal>
          )}

          {mode === "upload" && (
            <Reveal from="up">
              <div className="mb-10">
                <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Subir archivo</p>
                <h2 className="font-display mt-2 text-3xl italic text-ink">
                  Carga tu CV y déjanos tus datos
                </h2>
              </div>
              <CvUpload />
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-ink/8 bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            ¿Dudas? WhatsApp <span className="font-semibold text-ink">{COMPANY_INFO.telefono}</span>
          </p>
          <a href={COMPANY_INFO.social.whatsapp} target="_blank" rel="noreferrer" className={btnPrimary}>
            WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
