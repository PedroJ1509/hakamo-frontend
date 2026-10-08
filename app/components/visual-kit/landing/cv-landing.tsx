"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Division, Vacante } from "@/types";
import { COMPANY_INFO } from "@/lib/data";
import type { VacanteCard } from "@/lib/demo-vacantes";
import { CvBuilder } from "../cv/cv-builder";
import { CvUpload } from "../cv/cv-upload";
import { EmptyState } from "../empty-state";
import { Reveal } from "../reveal";
import { MODALIDAD_LABEL } from "./jobs-landing";

type Mode = "builder" | "upload" | null;

const STEPS = [
  { n: "01", title: "Elige un área", hint: "O busca por puesto y ciudad.", href: "#categorias" },
  { n: "02", title: "Abre el puesto", hint: "Postúlate desde la vacante.", href: "/empleos/vacantes" },
  { n: "03", title: "O deja tu CV", hint: "Si aún no hay match, te avisamos.", href: "#tu-cv" },
];

const BENEFITS = ["Gratis", "Vacantes reales", "Te ayudamos con el CV", "Te avisamos"];

const TAG: Record<string, string> = {
  construccion: "bg-[#E6EEFC] text-[#1747A8]",
  energia: "bg-[#FFEFD9] text-[#7A3A00]",
  "salud-higiene": "bg-[#DDF3E8] text-[#12623D]",
  administracion: "bg-[#F3E8FF] text-[#6B21A8]",
};

const TILTS = ["sm:-rotate-2", "sm:translate-x-7 sm:rotate-1", "sm:-rotate-1"];

const display = "font-[family-name:var(--font-space-grotesk)] font-extrabold tracking-[-0.03em]";
const wide = "chrome-frame mx-auto w-full";

function isCerrada(vacante: Vacante) {
  return vacante.estado === "cerrada";
}

function tagClass(slug?: string) {
  return TAG[slug ?? ""] ?? "bg-[#E6EEFC] text-[#1747A8]";
}

function placeLine(vacante: VacanteCard) {
  return [vacante.ubicacion, vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null]
    .filter(Boolean)
    .join(" · ");
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

  const abiertasLista = useMemo(
    () => vacantes.filter((item) => !isCerrada(item)),
    [vacantes],
  );
  const destacadas = abiertasLista.slice(0, 3);
  const siguientes = abiertasLista.slice(3, 6);

  const categories = useMemo(() => {
    return divisiones
      .map((div) => ({
        slug: div.slug,
        nombre: div.nombre,
        count: vacantes.filter((item) => item.division?.slug === div.slug && !isCerrada(item)).length,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count || a.nombre.localeCompare(b.nombre, "es"));
  }, [divisiones, vacantes]);

  const abiertas = abiertasLista.length;

  const choose = (next: Mode) => {
    setMode((current) => (current === next ? null : next));
  };

  const searchJobs = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/empleos/vacantes?q=${encodeURIComponent(term)}` : "/empleos/vacantes");
  };

  return (
    <div className="bg-[#F5F7FB] text-[#0A2342]">
      <section className={`${wide} grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:py-16`}>
        <Reveal from="left" className="min-w-0">
          {abiertas > 0 ? (
            <p className="inline-block rounded-full bg-[#FFE3C7] px-3.5 py-2 text-[15px] font-semibold text-[#7A3A00]">
              {abiertas} vacante{abiertas === 1 ? "" : "s"} abierta{abiertas === 1 ? "" : "s"}
            </p>
          ) : null}
          <h1 className={`${display} mt-5 max-w-[14ch] text-[clamp(3rem,4.6vw,5.4rem)] leading-[0.98]`}>
            Tu próxima oportunidad empieza aquí.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#33466A] sm:text-xl">
            Busca un puesto o deja tu CV. Si hay match, te contactamos.
          </p>
          <form
            onSubmit={searchJobs}
            className="mt-8 flex w-full flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgba(10,35,66,0.1)] sm:flex-row sm:items-center"
          >
            <label className="sr-only" htmlFor="buscar-empleo">
              Buscar empleo
            </label>
            <input
              id="buscar-empleo"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Puesto, área o ciudad"
              className="min-h-12 w-full flex-1 bg-transparent px-3.5 text-[17px] text-[#0A2342] outline-none placeholder:text-[#4A5C7C]"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white"
            >
              Buscar
            </button>
          </form>
          <a href="#tu-cv" className="mt-5 inline-block font-semibold text-[#1F5FD6] underline">
            ¿No ves tu puesto? Deja tu CV →
          </a>
        </Reveal>

        {destacadas.length > 0 ? (
          <Reveal from="right" className="min-w-0">
          <div className="flex min-h-[320px] w-full flex-col justify-center gap-4 rounded-[2rem] bg-[#1F5FD6] p-6 sm:min-h-[460px] sm:p-10 lg:p-12">
            {destacadas.map((vacante, index) => (
              <Link
                key={vacante.documentId}
                href={`/empleos/vacantes/${vacante.documentId}`}
                className={`empleos-float rounded-[1.15rem] bg-white px-5 py-5 text-[#0A2342] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${TILTS[index] ?? ""} ${index > 0 ? "hidden sm:block" : ""}`}
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <p className="text-sm font-semibold text-[#1F5FD6]">{vacante.division?.nombre}</p>
                <p className={`${display} mt-1 text-[1.35rem] leading-tight`}>{vacante.titulo}</p>
                <p className="mt-1 text-[15px] text-[#4A5C7C]">{placeLine(vacante)}</p>
              </Link>
            ))}
          </div>
          </Reveal>
        ) : null}
      </section>

      <section className="empleos-tape" aria-label="Qué incluye postularte">
        <ul className="sr-only">
          {BENEFITS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="empleos-tape-track" aria-hidden>
          {Array.from({ length: 12 }, (_, copy) =>
            BENEFITS.map((item) => (
              <span key={`${copy}-${item}`} className="empleos-tape-item">
                <span className="text-[#7EB0FF]">✓</span>
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      <section id="categorias" className={`scroll-mt-[var(--header-h)] ${wide} pb-4 pt-16 sm:pt-20`}>
        <h2 className={`${display} text-4xl`}>Elige tu área</h2>
        <p className="mb-7 mt-2 text-[#33466A]">Si ninguna de arriba es la tuya, entra por categoría.</p>
        {categories.length === 0 ? (
          <EmptyState
            kicker="Vacantes"
            title="Ahora no hay puestos abiertos"
            text="Deja tu perfil y te avisamos cuando haya uno para ti."
          />
        ) : (
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/empleos/vacantes?categoria=${category.slug}`}
                className="rounded-full border-2 border-[#D5DDEC] bg-white px-6 py-3.5 font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-[#1F5FD6]"
              >
                {category.nombre}
                <span className="ml-2 text-[#4A5C7C]">{category.count}</span>
              </Link>
            ))}
            <Link href="/empleos/vacantes" className="rounded-full bg-[#0A2342] px-6 py-4 font-semibold text-white">
              Ver todas →
            </Link>
          </div>
        )}
      </section>

      {siguientes.length > 0 ? (
        <section id="vacantes" className={`scroll-mt-[var(--header-h)] ${wide} py-12`}>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <h2 className={`${display} text-4xl`}>Más oportunidades</h2>
            <Link href="/empleos/vacantes" className="font-semibold text-[#1F5FD6] underline">
              Ver todas las vacantes →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {siguientes.map((vacante, index) => (
              <Reveal key={vacante.documentId} delay={index * 90}>
                <Link
                  href={`/empleos/vacantes/${vacante.documentId}`}
                  className="flex h-full flex-col gap-3.5 rounded-3xl bg-white p-7 shadow-[0_2px_0_#D5DDEC] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,35,66,0.08)]"
                >
                  <span className={`w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${tagClass(vacante.division?.slug)}`}>
                    {vacante.division?.nombre}
                  </span>
                  <h3 className={`${display} text-[1.6rem] leading-tight`}>{vacante.titulo}</h3>
                  <p className="text-[#4A5C7C]">{placeLine(vacante)}</p>
                  <span className="mt-4 font-semibold text-[#1F5FD6]">Ver puesto →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section id="como" className={`scroll-mt-[var(--header-h)] ${wide} py-12`}>
        <h2 className={`${display} mb-8 text-4xl`}>Cómo postularte</h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n}>
              <Link
                href={step.href}
                className="block h-full border-t-4 border-[#1F5FD6] pt-5 transition duration-300 hover:-translate-y-0.5"
              >
                <p className={`${display} text-5xl leading-none text-[#1F5FD6]`}>{step.n}</p>
                <h3 className={`${display} mt-3 text-2xl`}>{step.title}</h3>
                <p className="mt-1.5 text-[#33466A]">{step.hint}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="tu-cv" className={`scroll-mt-[var(--header-h)] ${wide} py-10 pb-16 sm:pb-20`}>
        <div className="flex flex-wrap gap-10 rounded-[2rem] bg-[#0A2342] p-8 text-white sm:p-14">
          <div className="min-w-[min(100%,20rem)] flex-1">
            <h2 className={`${display} text-4xl sm:text-[2.75rem]`}>Deja tu perfil</h2>
            <p className="mt-3 max-w-md leading-relaxed text-[#C8D4EA]">
              Quedas en nuestra base y te avisamos. También puedes escribir a{" "}
              <a href={`mailto:${COMPANY_INFO.emailReclutamiento}`} className="font-semibold text-white underline">
                {COMPANY_INFO.emailReclutamiento}
              </a>
              .
            </p>
            <a
              href={COMPANY_INFO.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-xl bg-[#25D366] px-5 py-3.5 font-semibold text-[#06311A]"
            >
              ¿Dudas? WhatsApp {COMPANY_INFO.telefono}
            </a>
          </div>
          <div className="grid min-w-[min(100%,24rem)] flex-1 gap-4">
            <button
              type="button"
              id="crear"
              onClick={() => choose("builder")}
              className={`flex items-center justify-between rounded-[1.25rem] bg-[#1F5FD6] px-7 py-6 text-left text-white ${
                mode === "builder" ? "ring-2 ring-white" : ""
              }`}
            >
              <span>
                <span className="block text-sm opacity-85">Sin CV</span>
                <span className={`${display} text-[1.6rem]`}>Crear mi CV</span>
              </span>
              <span className="text-3xl" aria-hidden>
                →
              </span>
            </button>
            <button
              type="button"
              id="subir"
              onClick={() => choose("upload")}
              className={`flex items-center justify-between rounded-[1.25rem] bg-white px-7 py-6 text-left text-[#0A2342] ${
                mode === "upload" ? "ring-2 ring-[#1F5FD6]" : ""
              }`}
            >
              <span>
                <span className="block text-sm text-[#4A5C7C]">Ya tengo CV</span>
                <span className={`${display} text-[1.6rem]`}>Subir archivo</span>
              </span>
              <span className="text-3xl" aria-hidden>
                →
              </span>
            </button>
          </div>
        </div>

        {mode ? (
          <div id="formulario" className="mt-6 rounded-[2rem] bg-white p-6 text-[#0A2342] shadow-[0_2px_0_#D5DDEC] sm:p-10">
            {mode === "builder" ? (
              <>
                <div className="mb-10">
                  <p className="text-sm font-semibold text-[#1F5FD6]">Constructor</p>
                  <h2 className={`${display} mt-2 text-4xl`}>Vamos a armar tu CV juntos</h2>
                </div>
                <CvBuilder />
              </>
            ) : (
              <>
                <div className="mb-10">
                  <p className="text-sm font-semibold text-[#1F5FD6]">Subir archivo</p>
                  <h2 className={`${display} mt-2 text-4xl`}>Carga tu CV y déjanos tus datos</h2>
                </div>
                <CvUpload />
              </>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
