"use client";

import { useMemo, useState } from "react";
import { SECTORES_OBRA, sectorPorSlug } from "@/lib/sectores";
import Image from "next/image";
import Link from "next/link";
import type { ContenidoHistorial, Obra } from "@/lib/cms/proyectos";
import { Grain } from "../grain";
import { LandingHeader } from "../chrome-header";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";

const ESTADO_LABEL: Record<string, string> = {
  en_proceso: "En proceso",
  completado: "Completado",
  destacado: "Destacado",
};

/** Cada estado con su color, para distinguirlos de un vistazo en la línea. */
const ESTADO_TONO: Record<string, { punto: string; texto: string; fondo: string }> = {
  en_proceso: { punto: "#2563EB", texto: "#1D4ED8", fondo: "rgba(37,99,235,0.10)" },
  completado: { punto: "#0F766E", texto: "#0F766E", fondo: "rgba(15,118,110,0.10)" },
  destacado: { punto: "#B45309", texto: "#B45309", fondo: "rgba(180,83,9,0.10)" },
};

const TONO_NEUTRO = { punto: "#64748B", texto: "#475569", fondo: "rgba(100,116,139,0.10)" };

/** Las imágenes del CMS vienen de otro dominio y se sirven tal cual. */
const externa = (src: string) => !src.startsWith("/");

type Filtro = "todos" | "en_proceso" | "completado" | "destacado";

function Insignia({ estado }: { estado: string | null }) {
  if (!estado) return null;
  const tono = ESTADO_TONO[estado] ?? TONO_NEUTRO;
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase"
      style={{ color: tono.texto, backgroundColor: tono.fondo }}
    >
      {ESTADO_LABEL[estado] ?? estado}
    </span>
  );
}

function FilaObra({ obra, indice }: { obra: Obra; indice: number }) {
  const tono = obra.estado ? (ESTADO_TONO[obra.estado] ?? TONO_NEUTRO) : TONO_NEUTRO;

  return (
    <Reveal delay={Math.min(indice, 4) * 60}>
      <Link
        href={`/proyectos/${obra.id}`}
        className="group relative grid grid-cols-[auto_1fr] gap-4 rounded-2xl p-3 transition-colors hover:bg-ink/[0.04] sm:gap-5 sm:p-4"
      >
        {/* Punto sobre la línea de tiempo */}
        <span
          aria-hidden
          className="absolute top-7 -left-[calc(0.75rem+1px)] hidden h-2.5 w-2.5 rounded-full ring-4 ring-paper transition-transform duration-300 group-hover:scale-150 sm:block"
          style={{ backgroundColor: tono.punto }}
        />

        <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28">
          <Image
            src={obra.imagen}
            alt=""
            fill
            sizes="112px"
            unoptimized={externa(obra.imagen)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>

        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <Insignia estado={obra.estado} />
            {obra.fecha ? <span className="text-xs text-ink/50 first-letter:uppercase">{obra.fecha}</span> : null}
          </span>
          <span className="mt-1.5 block text-balance text-base font-bold text-ink sm:text-lg">
            {obra.titulo}
          </span>
          <span className="mt-1 block text-sm text-ink/60">{obra.sector}</span>
          {obra.rol ? <span className="mt-0.5 block text-sm text-ink/45">{obra.rol}</span> : null}
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent">
            Ver proyecto
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function ProjectsHistory({
  contenido,
  sectorInicial = null,
}: {
  contenido: ContenidoHistorial;
  /** Llega desde /servicios: el historial abre ya filtrado por ese sector. */
  sectorInicial?: string | null;
}) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [sector, setSector] = useState<string | null>(sectorPorSlug(sectorInicial)?.slug ?? null);

  const todas = useMemo(() => contenido.grupos.flatMap((g) => g.obras), [contenido.grupos]);

  // Solo se ofrecen los sectores que tienen alguna obra.
  const sectoresDisponibles = useMemo(
    () => SECTORES_OBRA.filter((s) => todas.some((o) => o.sectores?.includes(s.slug))),
    [todas],
  );

  // Los conteos por estado respetan el sector elegido.
  const delSector = sector ? todas.filter((o) => o.sectores?.includes(sector)) : todas;
  const contar = (estado: string) => delSector.filter((o) => o.estado === estado).length;

  // Filtrar no debe dejar años vacíos colgando en la línea de tiempo.
  const grupos = useMemo(() => {
    if (filtro === "todos" && !sector) return contenido.grupos;
    return contenido.grupos
      .map((g) => ({
        ...g,
        obras: g.obras.filter(
          (o) => (filtro === "todos" || o.estado === filtro) && (!sector || o.sectores?.includes(sector)),
        ),
      }))
      .filter((g) => g.obras.length > 0);
  }, [contenido.grupos, filtro, sector]);

  const visibles = grupos.reduce((n, g) => n + g.obras.length, 0);
  const nombreSector = sectorPorSlug(sector)?.nombre;

  /** La dirección refleja el sector, para poder compartir la vista filtrada. */
  const elegirSector = (slug: string | null) => {
    setSector(slug);
    const url = slug ? `${window.location.pathname}?sector=${slug}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  };

  const filtros: { clave: Filtro; etiqueta: string; cuantos: number }[] = [
    { clave: "todos", etiqueta: "Todos", cuantos: delSector.length },
    { clave: "en_proceso", etiqueta: "En proceso", cuantos: contar("en_proceso") },
    { clave: "completado", etiqueta: "Completados", cuantos: contar("completado") },
    { clave: "destacado", etiqueta: "Destacados", cuantos: contar("destacado") },
  ];

  return (
    <div className="bg-paper">
      <ScrollProgress />
      <Grain />
      <LandingHeader />

      {/* Portada */}
      <section className="relative isolate overflow-hidden bg-night px-5 pt-28 pb-16 text-paper sm:px-8 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.3em] text-paper/60 uppercase">
              {contenido.antetitulo}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-[family-name:var(--font-space-grotesk)] mt-4 text-balance text-[clamp(2.1rem,6vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
              {contenido.titulo}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
              {contenido.texto}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-sm text-paper/55">
              {nombreSector ? (
                <>
                  Viendo <strong className="font-semibold text-paper">{nombreSector}</strong> · {delSector.length}{" "}
                  {delSector.length === 1 ? "obra" : "obras"}
                </>
              ) : (
                <>
                  <strong className="font-semibold text-paper">{contenido.total}</strong> obras ·{" "}
                  {contenido.grupos.filter((g) => g.anio !== null).length} años de recorrido
                </>
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filtros por estado */}
      <section className="sticky top-0 z-20 border-b border-ink/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-2 px-5 py-3 sm:px-8">
          {filtros.map((f) => {
            const activo = filtro === f.clave;
            return (
              <button
                key={f.clave}
                type="button"
                onClick={() => setFiltro(f.clave)}
                aria-pressed={activo}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  activo ? "bg-night text-paper" : "text-ink/60 hover:bg-ink/[0.06] hover:text-ink"
                }`}
              >
                {f.etiqueta}
                <span className={activo ? "ml-1.5 text-paper/60" : "ml-1.5 text-ink/35"}>{f.cuantos}</span>
              </button>
            );
          })}

          {sectoresDisponibles.length > 0 ? (
            <label className="ml-auto flex items-center gap-2 text-sm text-ink/60">
              <span className="font-semibold">Sector</span>
              <select
                value={sector ?? ""}
                onChange={(e) => elegirSector(e.target.value || null)}
                className="rounded-full border border-ink/15 bg-white px-3 py-2 text-sm font-semibold text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Todos los sectores</option>
                {sectoresDisponibles.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.nombre}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto w-full max-w-5xl">
          {grupos.length === 0 ? (
            <p className="py-16 text-center text-ink/55">Ninguna obra con esos filtros todavía.</p>
          ) : (
            grupos.map((grupo) => (
              <div key={grupo.anio ?? "sin-fecha"} className="grid gap-4 sm:grid-cols-[7rem_1fr] sm:gap-8">
                {/* El año acompaña al bloque mientras se recorre */}
                <div className="sm:sticky sm:top-20 sm:self-start sm:pt-4">
                  <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-extrabold tracking-[-0.03em] text-ink/85 sm:text-4xl">
                    {grupo.anio ?? "Sin fecha"}
                  </p>
                  <p className="mt-1 text-xs text-ink/45">
                    {grupo.obras.length} {grupo.obras.length === 1 ? "obra" : "obras"}
                  </p>
                </div>

                <div className="relative pb-10 sm:border-l sm:border-ink/12 sm:pb-14 sm:pl-6">
                  <div className="flex flex-col gap-2">
                    {grupo.obras.map((obra, i) => (
                      <FilaObra key={obra.id} obra={obra} indice={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}

          {(filtro !== "todos" || sector) && visibles > 0 ? (
            <p className="mt-2 text-sm text-ink/45">
              Mostrando {visibles} de {contenido.total} obras.
            </p>
          ) : null}
        </div>
      </section>

      {/* Cierre */}
      <section className="border-t border-ink/10 px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-5">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-extrabold tracking-[-0.02em] text-ink sm:text-2xl">
              ¿Su próximo proyecto?
            </h2>
            <p className="mt-1.5 text-sm text-ink/60">
              Armamos el equipo, la nómina y el cumplimiento desde el primer día.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/proyectos"
              className="inline-flex items-center rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              Volver a proyectos
            </Link>
            <Link
              href="/empresas/solicitar"
              className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Solicitar personal
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
