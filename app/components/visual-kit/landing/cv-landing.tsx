"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Division, Vacante } from "@/types";
import { COMPANY_INFO } from "@/lib/data";
import { resolveVacanteImage, type VacanteCard } from "@/lib/demo-vacantes";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { CvBuilder } from "../cv/cv-builder";
import { CvUpload } from "../cv/cv-upload";
import { EmptyState } from "../empty-state";
import { Reveal } from "../reveal";
import { MODALIDAD_LABEL } from "./jobs-landing";

type Mode = "builder" | "upload" | null;

const STEPS = [
  { n: "01", title: "Revisa vacantes", hint: "O deja tu perfil abierto" },
  { n: "02", title: "Arma o sube tu CV", hint: "Te guiamos paso a paso" },
  { n: "03", title: "Te contactamos", hint: "Si hay un puesto para ti" },
];

const BENEFITS = ["Gratis", "Vacantes reales", "Te ayudamos con el CV", "Te avisamos"];

function isCerrada(vacante: Vacante) {
  return vacante.estado === "cerrada";
}

function CategoryIcon({ slug }: { slug: string }) {
  const common = "h-6 w-6 text-accent";
  if (slug === "energia") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (slug === "salud-higiene") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10Z" />
      </svg>
    );
  }
  if (slug === "administracion") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M3 12h18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 20h16M6 20V10l6-4 6 4v10" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function CvLanding({
  vacantes = [],
  divisiones = [],
}: {
  vacantes?: VacanteCard[];
  divisiones?: Division[];
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);
  const [query, setQuery] = useState("");

  const destacadas = useMemo(
    () => vacantes.filter((item) => !isCerrada(item)).slice(0, 3),
    [vacantes],
  );

  const categories = useMemo(() => {
    return divisiones
      .map((div) => ({
        slug: div.slug,
        nombre: div.nombre,
        count: vacantes.filter((item) => item.division?.slug === div.slug).length,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count || a.nombre.localeCompare(b.nombre, "es"));
  }, [divisiones, vacantes]);

  const abiertas = vacantes.filter((item) => !isCerrada(item)).length;

  const choose = (next: Mode) => {
    setMode(next);
    requestAnimationFrame(() => {
      document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const searchJobs = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/empleos/vacantes?q=${encodeURIComponent(term)}` : "/empleos/vacantes");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[56svh] overflow-hidden sm:min-h-[62svh]">
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
                "linear-gradient(100deg, color-mix(in srgb, var(--paper) 94%, white) 0%, color-mix(in srgb, var(--paper) 82%, white) 36%, color-mix(in srgb, var(--paper) 18%, transparent) 62%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[56svh] max-w-6xl flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[62svh] sm:justify-center sm:px-6 sm:pb-12 sm:pt-28">
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
              <a href="/empleos/vacantes" className={btnSecondary}>
                Ver vacantes
              </a>
              <a href="#tu-cv" className="text-sm font-semibold text-accent">
                Dejar mi CV →
              </a>
            </div>

            {abiertas > 0 ? (
              <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-accent">
                {abiertas} vacante{abiertas === 1 ? "" : "s"} abierta{abiertas === 1 ? "" : "s"}
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

      <section id="categorias" className="scroll-mt-[var(--header-h)] bg-soft px-4 py-10 text-ink sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-3xl text-ink sm:text-4xl">Explora por categoría</h2>
          <p className="mt-2 text-center text-sm text-muted">Encuentra oportunidades en tu área</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/empleos/vacantes?categoria=${category.slug}`}
                  className="rounded-2xl border border-ink/8 bg-white px-3 py-5 text-center shadow-sm transition hover:border-accent"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-soft">
                    <CategoryIcon slug={category.slug} />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink">
                    {category.nombre}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {category.count} vacante{category.count === 1 ? "" : "s"}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section id="vacantes" className="scroll-mt-[var(--header-h)] border-t border-ink/8 bg-soft px-4 py-10 text-ink sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[11px] uppercase tracking-[0.32em] text-accent">Vacantes</p>
          <h2 className="font-display mt-3 text-center text-3xl leading-snug text-ink sm:text-4xl">
            Oportunidades abiertas
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted">
            Tres puestos para empezar. El listado completo, con filtros, está en Vacantes.
          </p>

          {destacadas.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                kicker="Vacantes"
                title="Ahora no hay puestos abiertos"
                text="Deja tu perfil y te avisamos cuando haya uno para ti."
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {destacadas.map((vacante, index) => (
                <Link
                  key={vacante.documentId}
                  href={`/empleos/vacantes/${vacante.documentId}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm transition hover:border-accent"
                >
                  <div className="relative h-32">
                    <Image
                      src={resolveVacanteImage(vacante, index)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                      {vacante.division?.nombre}
                    </p>
                    <h3 className="font-display mt-2 text-xl text-ink">{vacante.titulo}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {[vacante.ubicacion, vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-accent">Ver puesto →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/empleos/vacantes" className={btnPrimary}>
              Ver todas las vacantes
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 text-ink sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[11px] uppercase tracking-[0.32em] text-accent">El proceso</p>
          <h2 className="font-display mt-3 text-center text-3xl text-ink sm:text-4xl">Cómo postularte</h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="rounded-2xl bg-soft px-5 py-5">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-accent">{step.n}</p>
                <h3 className="font-display mt-2 text-lg text-ink sm:text-xl">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.hint}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tu CV */}
      <section id="tu-cv" className="scroll-mt-[var(--header-h)] border-t border-ink/8 bg-soft px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Tu perfil</p>
            <h2 className="font-display mt-3 text-3xl text-ink sm:text-4xl">Deja tu perfil</h2>
            <p className="mt-3 text-sm text-muted">
              Crea tu CV con nosotros o súbelo. Quedas en nuestra base y te avisamos. También puedes enviarlo a{" "}
              <a href={`mailto:${COMPANY_INFO.emailReclutamiento}`} className="font-semibold text-accent">
                {COMPANY_INFO.emailReclutamiento}
              </a>
              .
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

      {mode ? (
      <section id="formulario" className="scroll-mt-[var(--header-h)] bg-paper px-4 pb-20 pt-2 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-3xl">
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
      ) : null}

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
