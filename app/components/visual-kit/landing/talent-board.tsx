"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Division, Vacante } from "@/types";
import type { VacanteCard } from "@/lib/demo-vacantes";
import { EmptyState } from "../empty-state";
import { MODALIDAD_LABEL, TIPO_LABEL } from "./jobs-landing";
import { TEXTOS_VACANTES, type TextosVacantes } from "@/lib/cms/vacantes";

type DisponibilidadFilter = "" | "activa" | "cerrada";
type TipoFilter = "" | Vacante["tipo"];
type ModalidadFilter = "" | Vacante["modalidad"];

function tipoOptions(t: TextosVacantes): { value: TipoFilter; label: string }[] {
  return [
    { value: "", label: t.cualquierContrato },
    { value: "tiempo_completo", label: TIPO_LABEL.tiempo_completo },
    { value: "medio_tiempo", label: TIPO_LABEL.medio_tiempo },
    { value: "contrato", label: TIPO_LABEL.contrato },
  ];
}

function modalidadOptions(t: TextosVacantes): { value: ModalidadFilter; label: string }[] {
  return [
    { value: "", label: t.cualquierModalidad },
    { value: "presencial", label: MODALIDAD_LABEL.presencial },
    { value: "hibrido", label: MODALIDAD_LABEL.hibrido },
    { value: "remoto", label: MODALIDAD_LABEL.remoto },
  ];
}

const TAG: Record<string, string> = {
  construccion: "bg-[#E6EEFC] text-[#1747A8]",
  energia: "bg-[#FFEFD9] text-[#7A3A00]",
  "salud-higiene": "bg-[#DDF3E8] text-[#12623D]",
  administracion: "bg-[#F3E8FF] text-[#6B21A8]",
};

const SELECT =
  "mt-1 w-full rounded-xl border border-[#D5DDEC] bg-white px-3 py-2.5 text-sm text-[#0A2342] outline-none focus:border-[#1F5FD6]";

const PAGE_SIZES = [10, 20, 30] as const;

function pageWindow(current: number, count: number) {
  const pages = new Set([1, count, current - 1, current, current + 1]);
  return [...pages].filter((page) => page >= 1 && page <= count).sort((a, b) => a - b);
}

/** Colores de la etiqueta de área: los de la División en el CMS si los tiene. */
function tagStyle(division?: Division | null) {
  if (!division?.colorPrimario && !division?.colorSecundario) return undefined;
  return { color: division.colorPrimario || undefined, backgroundColor: division.colorSecundario || undefined };
}

function tagClass(slug?: string) {
  return TAG[slug ?? ""] ?? "bg-[#E6EEFC] text-[#1747A8]";
}

function formatFecha(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day).toLocaleDateString("es-DO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function TalentBoard({
  textos: t = TEXTOS_VACANTES,
  items,
  divisiones,
  activeSlug,
  query,
  onQuery,
  localizacion,
  locations,
  onLocalizacion,
  tipo,
  onTipo,
  modalidad,
  onModalidad,
  disponibilidad,
  onDisponibilidad,
  onCategory,
  onClear,
  openCounts,
  closedCount,
}: {
  items: VacanteCard[];
  divisiones: Division[];
  activeSlug: string;
  query: string;
  onQuery: (value: string) => void;
  localizacion: string;
  locations: string[];
  onLocalizacion: (value: string) => void;
  tipo: TipoFilter;
  onTipo: (value: TipoFilter) => void;
  modalidad: ModalidadFilter;
  onModalidad: (value: ModalidadFilter) => void;
  disponibilidad: DisponibilidadFilter;
  onDisponibilidad: (value: DisponibilidadFilter) => void;
  onCategory: (slug: string) => void;
  onClear: () => void;
  /** Textos del CMS; los que falten salen de los de siempre. */
  textos?: TextosVacantes;
  openCounts: Record<string, number>;
  closedCount: number;
}) {
  const categories = [
    { value: "", label: t.todasLasAreas },
    ...divisiones.map((item) => ({ value: item.slug, label: item.nombre })),
  ];
  const showingClosed = disponibilidad !== "activa";
  const detailActive = Boolean(localizacion || tipo || modalidad);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [areaQuery, setAreaQuery] = useState("");
  const areasRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | null>(10);
  const listRef = useRef<HTMLUListElement>(null);
  const hasFilters = Boolean(query || detailActive || activeSlug || showingClosed);
  const size = pageSize ?? Math.max(items.length, 1);
  const pageCount = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * size;
  const visible = items.slice(start, start + size);

  useEffect(() => {
    setPage(1);
  }, [query, localizacion, tipo, modalidad, disponibilidad, activeSlug, items.length]);

  useEffect(() => {
    if (!areasOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!areasRef.current?.contains(event.target as Node)) setAreasOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAreasOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [areasOpen]);

  const activeCategory = categories.find((item) => item.value === activeSlug) ?? categories[0];
  const visibleAreas = categories.filter((item) =>
    item.label.toLowerCase().includes(areaQuery.trim().toLowerCase()),
  );

  const goTo = (next: number) => {
    setPage(next);
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ block: "start" });
    });
  };

  return (
    <div className="mt-6">
      <form onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="buscar-vacante">
          {t.buscador}
        </label>
        <div className="flex items-center gap-2 rounded-2xl bg-white px-3 shadow-[0_8px_30px_rgba(10,35,66,0.08)]">
          <svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0 text-[#4A5C7C]">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M16 16.5 20 20.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            id="buscar-vacante"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder={t.buscador}
            className="min-h-12 w-full bg-transparent text-[17px] text-[#0A2342] outline-none placeholder:text-[#4A5C7C]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQuery("")}
              className="shrink-0 rounded-full px-2 py-1 text-sm font-semibold text-[#1F5FD6]"
            >
              {t.borrar}
            </button>
          ) : null}
        </div>
      </form>

      <div ref={areasRef} className="relative mt-4">
        <button
          type="button"
          aria-expanded={areasOpen}
          aria-haspopup="listbox"
          onClick={() => setAreasOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-left shadow-[0_2px_0_#D5DDEC] sm:max-w-sm"
        >
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-[#4A5C7C]">{t.etiquetaArea}</span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-[#0A2342]">{activeCategory?.label}</span>
          </span>
          <span className="shrink-0 text-sm font-semibold text-[#4A5C7C]">{openCounts[activeSlug] ?? 0}</span>
        </button>
        {areasOpen ? (
          <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[#D5DDEC] bg-white shadow-[0_16px_40px_rgba(10,35,66,0.12)] sm:max-w-sm">
            {categories.length > 8 ? (
              <input
                type="search"
                value={areaQuery}
                onChange={(event) => setAreaQuery(event.target.value)}
                placeholder={t.buscarArea}
                className="w-full border-b border-[#D5DDEC] px-4 py-3 text-sm text-[#0A2342] outline-none placeholder:text-[#4A5C7C]"
              />
            ) : null}
            <ul role="listbox" aria-label="Áreas" className="max-h-64 overflow-y-auto overscroll-contain py-1">
              {visibleAreas.length === 0 ? (
                <li className="px-4 py-3 text-sm text-[#4A5C7C]">{t.sinAreas}</li>
              ) : (
                visibleAreas.map((item) => {
                  const selected = activeSlug === item.value;
                  return (
                    <li key={item.value || "todas"}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          onCategory(item.value);
                          setAreasOpen(false);
                          setAreaQuery("");
                        }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm ${
                          selected ? "bg-[#E6EEFC] font-semibold text-[#0A2342]" : "text-[#33466A] hover:bg-[#F5F7FB]"
                        }`}
                      >
                        <span className="min-w-0 truncate">{item.label}</span>
                        <span className="shrink-0 text-xs font-semibold text-[#4A5C7C]">{openCounts[item.value] ?? 0}</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        className="mt-4 text-sm font-semibold text-[#1F5FD6] sm:hidden"
        aria-expanded={detailsOpen || detailActive}
        onClick={() => setDetailsOpen((value) => !value)}
      >
        {detailsOpen || detailActive ? t.ocultarFiltros : t.mostrarFiltros}
      </button>

      <div className={`mt-3 gap-3 sm:mt-4 sm:grid sm:grid-cols-3 ${detailsOpen || detailActive ? "grid" : "hidden"}`}>
        <label className="text-xs font-semibold text-[#33466A]">
          {t.etiquetaCiudad}
          <select value={localizacion} onChange={(event) => onLocalizacion(event.target.value)} className={SELECT}>
            <option value="">{t.todas}</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#33466A]">
          {t.etiquetaContrato}
          <select value={tipo} onChange={(event) => onTipo(event.target.value as TipoFilter)} className={SELECT}>
            {tipoOptions(t).map((option) => (
              <option key={option.value || "any"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#33466A]">
          {t.etiquetaModalidad}
          <select
            value={modalidad}
            onChange={(event) => onModalidad(event.target.value as ModalidadFilter)}
            className={SELECT}
          >
            {modalidadOptions(t).map((option) => (
              <option key={option.value || "any"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm font-semibold text-[#33466A]">
          {items.length} {items.length === 1 ? t.puesto : t.puestos}
          {disponibilidad === "activa" ? ` ${t.abiertos}` : ""}
        </p>
        {closedCount > 0 ? (
          <button
            type="button"
            onClick={() => onDisponibilidad(showingClosed ? "activa" : "")}
            className="text-sm font-semibold text-[#1F5FD6] underline-offset-2 hover:underline"
          >
            {showingClosed ? t.ocultarCerradas : `${t.verCerradas} (${closedCount})`}
          </button>
        ) : null}
        {hasFilters ? (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-[#33466A] underline-offset-2 hover:underline"
          >
            {t.limpiarFiltros}
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title={t.sinResultadosTitulo}
            text={t.sinResultadosTexto}
          />
        </div>
      ) : (
        <ul ref={listRef} className="mt-4 scroll-mt-28 space-y-3">
          {visible.map((vacante, index) => {
            const cerrada = vacante.estado === "cerrada";
            const fecha = formatFecha(vacante.fechaPublicacion);
            const meta = [
              vacante.ubicacion,
              vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null,
              TIPO_LABEL[vacante.tipo] ?? vacante.tipo,
            ].filter(Boolean);
            return (
              <li key={vacante.documentId} className="empleos-rise" style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}>
                <Link
                  href={`/empleos/vacantes/${vacante.documentId}`}
                  className={`group block rounded-3xl bg-white p-5 shadow-[0_2px_0_#D5DDEC] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(10,35,66,0.08)] sm:p-6 ${
                    cerrada ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {vacante.division?.nombre ? (
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tagClass(vacante.division.slug)}`} style={tagStyle(vacante.division)}>
                            {vacante.division.nombre}
                          </span>
                        ) : null}
                        {cerrada ? (
                          <span className="rounded-full bg-[#0A2342] px-3 py-1 text-xs font-semibold text-white">{t.cerrada}</span>
                        ) : null}
                      </div>
                      <h3 className="font-[family-name:var(--font-space-grotesk)] mt-3 text-balance text-xl font-extrabold leading-tight tracking-[-0.03em] break-words text-[#0A2342] sm:text-2xl">
                        {vacante.titulo}
                      </h3>
                      {vacante.descripcion ? (
                        <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-[#4A5C7C] sm:text-base">
                          {vacante.descripcion}
                        </p>
                      ) : null}
                      <p className="mt-3 text-sm text-[#33466A]">{meta.join(" · ")}</p>
                      {vacante.salario ? (
                        <p className="mt-1 text-sm font-semibold text-[#0A2342]">{vacante.salario}</p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
                      {fecha ? <p className="order-2 text-sm text-[#4A5C7C] sm:order-1">{fecha}</p> : null}
                      <span className="order-1 inline-flex rounded-full bg-[#1F5FD6] px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#1747A8] sm:order-2">
                        {cerrada ? t.verDetalle : t.verPuesto}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {items.length > 0 ? (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-[#D5DDEC] pt-5 sm:flex-row">
          <nav aria-label="Páginas de vacantes" className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={current === 1}
                onClick={() => goTo(current - 1)}
                className="rounded-full border-2 border-[#D5DDEC] bg-white px-4 py-2 text-sm font-semibold text-[#0A2342] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.anterior}
              </button>
              {pageWindow(current, pageCount).map((number, index, list) => {
                const gap = index > 0 && number - list[index - 1] > 1;
                return (
                  <span key={number} className="contents">
                    {gap ? <span className="px-1 text-[#4A5C7C]">…</span> : null}
                    <button
                      type="button"
                      aria-current={number === current ? "page" : undefined}
                      onClick={() => goTo(number)}
                      className={`size-10 rounded-full text-sm font-semibold ${
                        number === current ? "bg-[#1F5FD6] text-white" : "bg-white text-[#0A2342] shadow-[0_2px_0_#D5DDEC]"
                      }`}
                    >
                      {number}
                    </button>
                  </span>
                );
              })}
              <button
                type="button"
                disabled={current === pageCount}
                onClick={() => goTo(current + 1)}
                className="rounded-full border-2 border-[#D5DDEC] bg-white px-4 py-2 text-sm font-semibold text-[#0A2342] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.siguiente}
              </button>
          </nav>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="mr-1 text-sm font-semibold text-[#33466A]">{t.porPagina}</p>
            {PAGE_SIZES.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={pageSize === option}
                onClick={() => {
                  setPageSize(option);
                  setPage(1);
                }}
                className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                  pageSize === option
                    ? "border-[#1F5FD6] bg-[#1F5FD6] text-white"
                    : "border-[#D5DDEC] bg-white text-[#0A2342] hover:border-[#1F5FD6]"
                }`}
              >
                {option}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={pageSize == null}
              onClick={() => {
                setPageSize(null);
                setPage(1);
              }}
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                pageSize == null
                  ? "border-[#0A2342] bg-[#0A2342] text-white"
                  : "border-[#D5DDEC] bg-white text-[#0A2342] hover:border-[#1F5FD6]"
              }`}
            >
              {t.todasPorPagina}
            </button>
            <p className="ml-1 text-sm text-[#4A5C7C]">
              {visible.length} {t.de} {items.length}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
