"use client";

import { useSitio } from "@/app/components/sitio-context";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Division, Vacante } from "@/types";
import type { VacanteCard } from "@/lib/demo-vacantes";
import { CvBuilder } from "../cv/cv-builder";
import { CvUpload } from "../cv/cv-upload";
import { EmptyState } from "../empty-state";
import { Reveal } from "../reveal";
import { MODALIDAD_LABEL } from "./jobs-landing";
import type { Seccion } from "@/lib/cms/comun";
import type { ContenidoEmpleos } from "@/lib/cms/empleos";
import { enlaceSitio, textoConContacto } from "@/lib/cms/sitio";
import { FondoSeccion } from "../fondo-seccion";

type Mode = "builder" | "upload" | null;

const TAG: Record<string, string> = {
  construccion: "bg-[#E6EEFC] text-[#1747A8]",
  energia: "bg-[#FFEFD9] text-[#7A3A00]",
  "salud-higiene": "bg-[#DDF3E8] text-[#12623D]",
  administracion: "bg-[#F3E8FF] text-[#6B21A8]",
};

const TILTS = ["lg:-rotate-1", "lg:rotate-1", "lg:-rotate-1"];

const display = "font-[family-name:var(--font-space-grotesk)] font-extrabold tracking-[-0.03em]";
const wide = "chrome-frame mx-auto w-full";

function isCerrada(vacante: Vacante) {
  return vacante.estado === "cerrada";
}

function tagClass(slug?: string) {
  return TAG[slug ?? ""] ?? "bg-[#E6EEFC] text-[#1747A8]";
}

/** Colores de la etiqueta de área: los de la División en el CMS si los tiene, si no los de siempre. */
function tagStyle(division?: Division | null) {
  if (!division?.colorPrimario && !division?.colorSecundario) return undefined;
  return { color: division.colorPrimario || undefined, backgroundColor: division.colorSecundario || undefined };
}

/** Sección con fondo opcional del CMS. Con fondo oscuro, los textos pasan a claro. */
function Bloque({ seccion, id, className, children }: { seccion: Seccion; id?: string; className: string; children: React.ReactNode }) {
  const claro = seccion.fondo.tono === "claro";
  return (
    <section
      id={id}
      className={`relative isolate ${className} ${claro ? "text-white [&_.texto-suave]:text-white/75" : ""}`}
    >
      <FondoSeccion fondo={seccion.fondo} />
      <div className="relative">{children}</div>
    </section>
  );
}

function placeLine(vacante: VacanteCard) {
  return [vacante.ubicacion, vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null]
    .filter(Boolean)
    .join(" · ");
}

export function CvLanding({
  vacantes = [],
  divisiones = [],
  contenido,
}: {
  vacantes?: VacanteCard[];
  divisiones?: Division[];
  contenido: ContenidoEmpleos;
}) {
  const router = useRouter();
  const { contacto } = useSitio();
  const { portada, areas, sinVacantes, masOportunidades, como, tuCv, beneficios } = contenido;
  const [crear, subir] = tuCv.elementos;
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
      <div className={`relative isolate ${portada.fondo.tono === "claro" ? "text-white [&_.texto-suave]:text-white/75" : ""}`}>
      <FondoSeccion fondo={portada.fondo} />
      <section className={`relative ${wide} grid items-center gap-8 py-6 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:py-16`}>
        <Reveal from="left" className="min-w-0">
          {abiertas > 0 ? (
            <p className="inline-block rounded-full bg-[#FFE3C7] px-3.5 py-2 text-sm font-semibold text-[#7A3A00] sm:text-[15px]">
              {abiertas} vacante{abiertas === 1 ? "" : "s"} abierta{abiertas === 1 ? "" : "s"}
            </p>
          ) : null}
          <h1 className={`${display} mt-4 max-w-full text-balance text-[clamp(2.15rem,8.5vw,5.4rem)] leading-[0.98] sm:mt-5 sm:max-w-[14ch]`}>
            {portada.titulo}
          </h1>
          {portada.texto ? (
            <p className="texto-suave mt-4 max-w-xl text-base leading-relaxed text-[#33466A] sm:text-xl">{portada.texto}</p>
          ) : null}
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
              placeholder={contenido.textoBuscador}
              className="min-h-12 w-full flex-1 bg-transparent px-3.5 text-[17px] text-[#0A2342] outline-none placeholder:text-[#4A5C7C]"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white"
            >
              {contenido.botonBuscar}
            </button>
          </form>
          {portada.botonSecundario ? (
            <a href={portada.botonSecundario.url} className="mt-5 inline-block font-semibold text-[#1F5FD6] underline">
              {portada.botonSecundario.texto}
            </a>
          ) : null}
        </Reveal>

        {destacadas.length > 0 ? (
          <Reveal from="right" className="min-w-0">
          <div className="flex w-full min-w-0 flex-col justify-center gap-3 overflow-hidden rounded-[1.5rem] bg-[#1F5FD6] p-4 sm:min-h-[420px] sm:gap-4 sm:rounded-[2rem] sm:p-10 lg:min-h-[460px] lg:p-12">
            {destacadas.map((vacante, index) => (
              <Link
                key={vacante.documentId}
                href={`/empleos/vacantes/${vacante.documentId}`}
                className={`empleos-float min-w-0 rounded-[1.15rem] bg-white px-4 py-4 text-[#0A2342] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-5 sm:py-5 ${TILTS[index] ?? ""} ${index > 0 ? "hidden sm:block" : ""}`}
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <p className="text-sm font-semibold text-[#1F5FD6]">{vacante.division?.nombre}</p>
                <p className={`${display} mt-1 text-balance text-[1.15rem] leading-tight break-words sm:text-[1.35rem]`}>{vacante.titulo}</p>
                <p className="mt-1 text-sm text-[#4A5C7C] sm:text-[15px]">{placeLine(vacante)}</p>
              </Link>
            ))}
          </div>
          </Reveal>
        ) : null}
      </section>
      </div>

      <section className="empleos-tape relative isolate" aria-label="Qué incluye postularte">
        <FondoSeccion fondo={contenido.fondoBeneficios} />
        <ul className="sr-only">
          {beneficios.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="empleos-tape-track relative" aria-hidden>
          {Array.from({ length: 12 }, (_, copy) =>
            beneficios.map((item) => (
              <span key={`${copy}-${item}`} className="empleos-tape-item">
                <span className="text-[#7EB0FF]">✓</span>
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      {areas.mostrar ? (
      <Bloque seccion={areas} id="categorias" className={`scroll-mt-[var(--header-h)] ${wide} pb-4 pt-16 sm:pt-20`}>
        <h2 className={`${display} text-balance text-[clamp(1.75rem,6vw,2.25rem)]`}>{areas.titulo}</h2>
        {areas.texto ? <p className="texto-suave mb-7 mt-2 text-[#33466A]">{areas.texto}</p> : <div className="mb-7" />}
        {categories.length === 0 ? (
          <EmptyState kicker={sinVacantes.antetitulo} title={sinVacantes.titulo} text={sinVacantes.texto} />
        ) : (
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/empleos/vacantes?categoria=${category.slug}`}
                className="max-w-full rounded-full border-2 border-[#D5DDEC] bg-white px-4 py-3 text-[15px] font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-[#1F5FD6] sm:px-6 sm:py-3.5 sm:text-base"
              >
                {category.nombre}
                <span className="ml-2 text-[#4A5C7C]">{category.count}</span>
              </Link>
            ))}
            {areas.boton ? (
              <Link href={areas.boton.url} className="rounded-full bg-[#0A2342] px-5 py-3 text-[15px] font-semibold text-white sm:px-6 sm:py-4 sm:text-base">
                {areas.boton.texto}
              </Link>
            ) : null}
          </div>
        )}
      </Bloque>
      ) : null}

      {masOportunidades.mostrar && siguientes.length > 0 ? (
        <Bloque seccion={masOportunidades} id="vacantes" className={`scroll-mt-[var(--header-h)] ${wide} py-12`}>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <h2 className={`${display} text-balance text-[clamp(1.75rem,6vw,2.25rem)]`}>{masOportunidades.titulo}</h2>
            {masOportunidades.boton ? (
              <Link href={masOportunidades.boton.url} className="font-semibold text-[#1F5FD6] underline">
                {masOportunidades.boton.texto}
              </Link>
            ) : null}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {siguientes.map((vacante, index) => (
              <Reveal key={vacante.documentId} delay={index * 90}>
                <Link
                  href={`/empleos/vacantes/${vacante.documentId}`}
                  className="flex h-full min-w-0 flex-col gap-3 rounded-3xl bg-white p-5 shadow-[0_2px_0_#D5DDEC] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,35,66,0.08)] sm:gap-3.5 sm:p-7"
                >
                  <span className={`w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${tagClass(vacante.division?.slug)}`} style={tagStyle(vacante.division)}>
                    {vacante.division?.nombre}
                  </span>
                  <h3 className={`${display} text-balance text-[1.35rem] leading-tight break-words sm:text-[1.6rem]`}>{vacante.titulo}</h3>
                  <p className="text-[#4A5C7C]">{placeLine(vacante)}</p>
                  <span className="mt-4 font-semibold text-[#1F5FD6]">{masOportunidades.botonSecundario?.texto ?? "Ver puesto →"}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Bloque>
      ) : null}

      {como.mostrar ? (
      <Bloque seccion={como} id="como" className={`scroll-mt-[var(--header-h)] ${wide} py-12`}>
        <h2 className={`${display} mb-6 text-balance text-[clamp(1.75rem,6vw,2.25rem)] sm:mb-8`}>{como.titulo}</h2>
        {como.texto ? <p className="texto-suave -mt-3 mb-8 max-w-xl text-[#33466A]">{como.texto}</p> : null}
        <ol className="grid gap-5 md:grid-cols-3">
          {como.elementos.map((step, index) => (
            <li key={step.titulo + index}>
              <Link
                href={step.enlace || "#"}
                className="block h-full border-t-4 border-[#1F5FD6] pt-5 transition duration-300 hover:-translate-y-0.5"
              >
                <p className={`${display} text-4xl leading-none text-[#1F5FD6] sm:text-5xl`}>{step.etiqueta || String(index + 1).padStart(2, "0")}</p>
                <h3 className={`${display} mt-3 text-xl sm:text-2xl`}>{step.titulo}</h3>
                <p className="texto-suave mt-1.5 text-[#33466A]">{step.texto}</p>
              </Link>
            </li>
          ))}
        </ol>
      </Bloque>
      ) : null}

      {tuCv.mostrar ? (
      <Bloque seccion={tuCv} id="tu-cv" className={`scroll-mt-[var(--header-h)] ${wide} py-10 pb-16 sm:pb-20`}>
        <div className="flex flex-col gap-6 rounded-[1.5rem] bg-[#0A2342] p-5 text-white sm:gap-8 sm:rounded-[2rem] sm:p-10 lg:flex-row lg:gap-10 lg:p-14">
          <div className="min-w-0 lg:min-w-[20rem] lg:flex-1">
            <h2 className={`${display} text-balance text-[clamp(1.75rem,6vw,2.75rem)]`}>{tuCv.titulo}</h2>
            {tuCv.texto ? (
              <p className="mt-3 max-w-md leading-relaxed text-[#C8D4EA]">
                <TextoConCorreo texto={tuCv.texto} correo={contacto.emailReclutamiento} contacto={contacto} />
              </p>
            ) : null}
            {tuCv.boton ? (
              <a
                href={enlaceSitio(tuCv.boton.url, contacto)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block max-w-full rounded-xl bg-[#25D366] px-5 py-3.5 text-[15px] font-semibold leading-snug text-[#06311A] sm:text-base"
              >
                {textoConContacto(tuCv.boton.texto, contacto)}
              </a>
            ) : null}
          </div>
          <div className="grid min-w-0 gap-3 sm:gap-4 lg:min-w-[24rem] lg:flex-1">
            <button
              type="button"
              id="crear"
              onClick={() => choose("builder")}
              className={`flex min-w-0 items-center justify-between gap-3 rounded-[1.15rem] bg-[#1F5FD6] px-5 py-5 text-left text-white sm:rounded-[1.25rem] sm:px-7 sm:py-6 ${
                mode === "builder" ? "ring-2 ring-white" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm opacity-85">{crear.etiqueta}</span>
                <span className={`${display} text-[1.35rem] sm:text-[1.6rem]`}>{crear.titulo}</span>
              </span>
              <span className="text-3xl" aria-hidden>
                →
              </span>
            </button>
            <button
              type="button"
              id="subir"
              onClick={() => choose("upload")}
              className={`flex min-w-0 items-center justify-between gap-3 rounded-[1.15rem] bg-white px-5 py-5 text-left text-[#0A2342] sm:rounded-[1.25rem] sm:px-7 sm:py-6 ${
                mode === "upload" ? "ring-2 ring-[#1F5FD6]" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm text-[#4A5C7C]">{subir.etiqueta}</span>
                <span className={`${display} text-[1.35rem] sm:text-[1.6rem]`}>{subir.titulo}</span>
              </span>
              <span className="text-3xl" aria-hidden>
                →
              </span>
            </button>
          </div>
        </div>

        {mode ? (
          <div id="formulario" className="mt-6 min-w-0 rounded-[1.5rem] bg-white p-4 text-[#0A2342] shadow-[0_2px_0_#D5DDEC] sm:rounded-[2rem] sm:p-10">
            {mode === "builder" ? (
              <>
                <div className="mb-10">
                  <p className="text-sm font-semibold text-[#1F5FD6]">{crear.titulo}</p>
                  <h2 className={`${display} mt-2 text-balance text-[clamp(1.6rem,5vw,2.25rem)]`}>{crear.texto}</h2>
                </div>
                <CvBuilder />
              </>
            ) : (
              <>
                <div className="mb-10">
                  <p className="text-sm font-semibold text-[#1F5FD6]">{subir.titulo}</p>
                  <h2 className={`${display} mt-2 text-balance text-[clamp(1.6rem,5vw,2.25rem)]`}>{subir.texto}</h2>
                </div>
                <CvUpload />
              </>
            )}
          </div>
        ) : null}
      </Bloque>
      ) : null}
    </div>
  );
}

/** Texto del CMS donde `{correoReclutamiento}` se vuelve un enlace de correo. */
function TextoConCorreo({ texto, correo, contacto }: { texto: string; correo: string; contacto: Parameters<typeof textoConContacto>[1] }) {
  const partes = texto.split("{correoReclutamiento}");
  return (
    <>
      {partes.map((parte, i) => (
        <span key={i}>
          {textoConContacto(parte, contacto)}
          {i < partes.length - 1 ? (
            <a href={`mailto:${correo}`} className="font-semibold break-words text-white underline">
              {correo}
            </a>
          ) : null}
        </span>
      ))}
    </>
  );
}
