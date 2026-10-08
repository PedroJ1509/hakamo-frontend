"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Division, Vacante } from "@/types";
import type { VacanteCard } from "@/lib/demo-vacantes";
import { EmptyState } from "../empty-state";
import { MODALIDAD_LABEL, TIPO_LABEL } from "./jobs-landing";

type DisponibilidadFilter = "" | "activa" | "cerrada";
type TipoFilter = "" | Vacante["tipo"];
type ModalidadFilter = "" | Vacante["modalidad"];

const TIPO_OPTIONS: { value: TipoFilter; label: string }[] = [
  { value: "", label: "Cualquiera" },
  { value: "tiempo_completo", label: "Tiempo completo" },
  { value: "medio_tiempo", label: "Medio tiempo" },
  { value: "contrato", label: "Contrato" },
];

const MODALIDAD_OPTIONS: { value: ModalidadFilter; label: string }[] = [
  { value: "", label: "Cualquiera" },
  { value: "presencial", label: "Presencial" },
  { value: "hibrido", label: "Híbrido" },
  { value: "remoto", label: "Remoto" },
];

const DISPONIBILIDAD_OPTIONS: { value: DisponibilidadFilter; label: string }[] = [
  { value: "", label: "Todas" },
  { value: "activa", label: "Disponibles" },
  { value: "cerrada", label: "No disponibles" },
];

const PAGE_SIZES = [3, 6, 9] as const;
const WINDOW = 5;

const TAG: Record<string, string> = {
  construccion: "bg-[#E6EEFC] text-[#1747A8]",
  energia: "bg-[#FFEFD9] text-[#7A3A00]",
  "salud-higiene": "bg-[#DDF3E8] text-[#12623D]",
  administracion: "bg-[#F3E8FF] text-[#6B21A8]",
};

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

function FilterRadios<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (next: T) => void;
}) {
  return (
    <fieldset className="border-t border-[#D5DDEC] pt-4">
      <legend className="text-sm font-semibold text-[#0A2342]">{legend}</legend>
      <div className="mt-3 space-y-2">
        {options.map((option) => (
          <label key={option.value || "any"} className="flex cursor-pointer items-center gap-2 text-sm text-[#33466A]">
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="accent-[var(--accent)]"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function TalentBoard({
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
}) {
  const active = divisiones.find((item) => item.slug === activeSlug);
  const [pageSize, setPageSize] = useState<number | null>(6);
  const listRef = useRef<HTMLUListElement>(null);
  const visible = pageSize == null ? items : items.slice(0, pageSize);
  const inScroll = pageSize == null && items.length > WINDOW;

  useLayoutEffect(() => {
    const ul = listRef.current;
    if (!ul) return;

    const fit = () => {
      if (!inScroll) {
        ul.style.maxHeight = "";
        return;
      }
      const last = ul.querySelectorAll(":scope > li")[WINDOW - 1] as HTMLElement | undefined;
      if (!last) {
        ul.style.maxHeight = "";
        return;
      }
      const height = last.getBoundingClientRect().bottom - ul.getBoundingClientRect().top;
      ul.style.maxHeight = `${Math.ceil(height)}px`;
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [inScroll, items]);

  return (
    <div className="mt-8">
      <form
        className="flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgba(10,35,66,0.1)] sm:flex-row sm:items-center"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="sr-only" htmlFor="buscar-categoria">
          Buscar en {active?.nombre ?? "esta categoría"}
        </label>
        <input
          id="buscar-categoria"
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Puesto, área o ciudad"
          className="min-h-12 w-full flex-1 bg-transparent px-3.5 text-[17px] text-[#0A2342] outline-none placeholder:text-[#4A5C7C]"
        />
        <button type="submit" className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
          Buscar
        </button>
      </form>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="rounded-3xl bg-white p-5 shadow-[0_2px_0_#D5DDEC]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0A2342]">Filtros</p>
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-semibold text-[#1F5FD6] underline-offset-2 hover:underline"
            >
              Limpiar
            </button>
          </div>

          <FilterRadios
            legend="Categoría"
            name="categoria"
            value={activeSlug}
            options={[
              { value: "", label: "Todas" },
              ...divisiones.map((item) => ({ value: item.slug, label: item.nombre })),
            ]}
            onChange={onCategory}
          />

          <fieldset className="border-t border-[#D5DDEC] pt-4">
            <legend className="text-sm font-semibold text-[#0A2342]">Localización</legend>
            <select
              value={localizacion}
              onChange={(event) => onLocalizacion(event.target.value)}
              className="mt-3 w-full rounded-xl border border-[#D5DDEC] bg-[#F5F7FB] px-3 py-2 text-sm text-[#0A2342] outline-none focus:border-[#1F5FD6]"
            >
              <option value="">Todas</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </fieldset>

          <FilterRadios
            legend="Tipo de contrato"
            name="tipo"
            value={tipo}
            options={TIPO_OPTIONS}
            onChange={onTipo}
          />
          <FilterRadios
            legend="Modalidad"
            name="modalidad"
            value={modalidad}
            options={MODALIDAD_OPTIONS}
            onChange={onModalidad}
          />
          <FilterRadios
            legend="Disponibilidad"
            name="disponibilidad-board"
            value={disponibilidad}
            options={DISPONIBILIDAD_OPTIONS}
            onChange={onDisponibilidad}
          />
        </aside>

        <div>
          <p className="text-sm font-semibold text-[#33466A]">
            {visible.length === items.length ? items.length : `${visible.length} de ${items.length}`} resultado
            {items.length === 1 ? "" : "s"}
            {active ? ` en ${active.nombre}` : ""}
          </p>

          {items.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                kicker="Vacantes"
                title="No hay vacantes con esos filtros"
                text="Prueba otra categoría o deja tu perfil más abajo."
              />
            </div>
          ) : (
            <ul
              ref={listRef}
              className={`mt-4 space-y-4 ${inScroll ? "empleos-scroll" : ""}`}
            >
              {visible.map((vacante, index) => {
                const cerrada = vacante.estado === "cerrada";
                const fecha = formatFecha(vacante.fechaPublicacion);
                return (
                  <li
                    key={vacante.documentId}
                    className="empleos-rise"
                    style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
                  >
                    <Link
                      href={`/empleos/vacantes/${vacante.documentId}`}
                      className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-[0_2px_0_#D5DDEC] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,35,66,0.08)] sm:p-6"
                    >
                      <div className="min-w-0 flex-1">
                        {vacante.division?.nombre ? (
                          <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${tagClass(vacante.division.slug)}`}>
                            {vacante.division.nombre}
                          </span>
                        ) : null}
                        <h3 className="font-[family-name:var(--font-space-grotesk)] mt-3 text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[#0A2342]">
                          {vacante.titulo}
                        </h3>
                        <p className="mt-2 text-[#4A5C7C]">
                          {[vacante.ubicacion, vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-[#F5F7FB] px-2.5 py-1 text-xs font-semibold text-[#33466A]">
                            {TIPO_LABEL[vacante.tipo] ?? vacante.tipo}
                          </span>
                          {cerrada ? (
                            <span className="rounded-full bg-[#0A2342] px-2.5 py-1 text-xs font-semibold text-white">
                              No disponible
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="hidden shrink-0 text-right text-sm text-[#4A5C7C] sm:block">
                        {fecha ? <p>{fecha}</p> : null}
                        <p className="mt-3 font-semibold text-[#1F5FD6]">Ver puesto →</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {items.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <p className="mr-1 text-sm font-semibold text-[#33466A]">Mostrar</p>
              {PAGE_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setPageSize(size)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                    pageSize === size
                      ? "border-[#1F5FD6] bg-[#1F5FD6] text-white"
                      : "border-[#D5DDEC] bg-white text-[#0A2342] hover:border-[#1F5FD6]"
                  }`}
                >
                  {size}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPageSize(null)}
                className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                  pageSize == null
                    ? "border-[#0A2342] bg-[#0A2342] text-white"
                    : "border-[#D5DDEC] bg-white text-[#0A2342] hover:border-[#1F5FD6]"
                }`}
              >
                Todas
              </button>
              <p className="ml-2 text-sm text-[#4A5C7C]">
                {visible.length} de {items.length}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
