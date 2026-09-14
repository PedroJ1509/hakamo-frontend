"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { CvBuilder } from "../cv/cv-builder";
import { CvUpload } from "../cv/cv-upload";
import { LandingHeader } from "../chrome-header";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";

type Mode = "builder" | "upload" | null;

const STEPS = [
  { n: "01", title: "Arma o sube tu CV", hint: "Te guiamos o cargas el archivo" },
  { n: "02", title: "Envías tu perfil", hint: "Quedas en nuestra base" },
  { n: "03", title: "Te contactamos", hint: "Si hay una vacante para ti" },
];

const BENEFITS = ["Gratis", "Vacantes reales", "Te ayudamos con el CV", "Te avisamos"];

const AREA_SHORT: { label: string; q: string }[] = [
  { label: "Construcción", q: "Construcción e Infraestructura" },
  { label: "Energía", q: "Energía y Electricidad" },
  { label: "Salud e higiene", q: "Salud e Higiene" },
  { label: "Seguridad", q: "Seguridad industrial y eléctrica" },
  { label: "Oficina", q: "Administración y Oficina" },
  { label: "Mantenimiento", q: "Mantenimiento" },
  { label: "Industria", q: "Manufactura e Industria" },
  { label: "Retail", q: "Retail y Comercio" },
  { label: "Logística", q: "Transporte y Logística" },
];

export function CvLanding() {
  const site = SITE_PUBLIC;
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);
  const [query, setQuery] = useState("");

  const choose = (next: Mode) => {
    setMode(next);
    requestAnimationFrame(() => {
      document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const searchJobs = (event: React.FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/empleos?q=${encodeURIComponent(q)}` : "/empleos");
  };

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
        ctaHref="/contacto"
        ctaLabel="Contactar"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
        tone="paper"
      />

      {/* Hero */}
      <section id="contenido" className="relative min-h-[72svh] overflow-hidden sm:min-h-[78svh]">
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

        <div className="relative mx-auto flex min-h-[72svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:min-h-[78svh] sm:justify-center sm:px-6 sm:pb-20 sm:pt-28">
          <div className="max-w-xl text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-accent">
              Empleo en República Dominicana
            </p>
            <h1 className="font-display mt-4 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-ink">
              Encuentra tu próxima
              <span className="mt-1 block italic text-accent">oportunidad</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted sm:text-base">
              Busca vacantes o deja tu CV. Gratis y fácil.
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
                Buscar empleos
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/empleos" className={btnSecondary}>
                Ver vacantes
              </Link>
              <button
                type="button"
                onClick={() => choose("builder")}
                className="text-sm font-semibold text-accent"
              >
                Crear mi CV →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios en una sola franja */}
      <section className="border-y border-ink/8 bg-white px-4 py-5 sm:px-6">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between sm:gap-x-4">
          {BENEFITS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Áreas + pasos juntos, más visual */}
      <section className="bg-paper px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <div className="text-center">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">¿En qué área?</h2>
              <Link href="/empleos" className="mt-2 inline-block text-sm font-semibold text-accent">
                Ver vacantes →
              </Link>
            </div>
            <div className="mt-5 flex justify-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {AREA_SHORT.map((area) => (
                <Link
                  key={area.label}
                  href={`/empleos?q=${encodeURIComponent(area.q)}`}
                  className="shrink-0 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm text-ink transition hover:border-accent hover:text-accent"
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
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
        </div>
      </section>

      {/* Dos caminos CV */}
      <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Deja tu perfil</h2>
            <p className="mt-3 text-sm text-muted">Crea tu CV o súbelo. Luego lo enviamos a Hakamo.</p>
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

      <section id="formulario" className="bg-paper px-4 pb-20 pt-6 sm:px-6 sm:pb-24">
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
          <div className="flex flex-wrap gap-3">
            <a href={COMPANY_INFO.social.whatsapp} target="_blank" rel="noreferrer" className={btnPrimary}>
              WhatsApp
            </a>
            <Link href="/empleos" className={btnSecondary}>
              Vacantes
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} tone="paper" />
    </div>
  );
}
