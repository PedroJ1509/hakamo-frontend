import Link from "next/link";
import type { Division, Vacante } from "@/types";
import type { VacanteCard } from "@/lib/demo-vacantes";
import { btnPrimary } from "@/lib/visual-kit/styles";
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
    <fieldset className="border-t border-ink/8 pt-4">
      <legend className="text-sm font-semibold text-ink">{legend}</legend>
      <div className="mt-3 space-y-2">
        {options.map((option) => (
          <label key={option.value || "any"} className="flex cursor-pointer items-center gap-2 text-sm text-ink/80">
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

  return (
    <div className="mt-8">
      <form
        className="flex flex-col gap-2 sm:flex-row"
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
          placeholder="Cargo o palabra clave…"
          className="w-full rounded-full border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
        <button type="submit" className={`${btnPrimary} shrink-0`}>
          Buscar
        </button>
      </form>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-ink/8 bg-paper p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">Filtros</p>
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-semibold text-accent underline-offset-2 hover:underline"
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

          <fieldset className="border-t border-ink/8 pt-4">
            <legend className="text-sm font-semibold text-ink">Localización</legend>
            <select
              value={localizacion}
              onChange={(event) => onLocalizacion(event.target.value)}
              className="mt-3 w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-accent"
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
          <p className="text-sm text-muted">
            {items.length} resultado{items.length === 1 ? "" : "s"}
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
            <ul className="mt-4 space-y-3">
              {items.map((vacante) => {
                const cerrada = vacante.estado === "cerrada";
                const fecha = formatFecha(vacante.fechaPublicacion);
                return (
                  <li key={vacante.documentId}>
                    <Link
                      href={`/empleos/vacantes/${vacante.documentId}`}
                      className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-4 transition hover:border-accent/40"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-xs font-semibold tracking-wide text-accent">
                        HK
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
                          {vacante.titulo}
                        </h3>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                          Hakamo
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                            {TIPO_LABEL[vacante.tipo] ?? vacante.tipo}
                          </span>
                          {vacante.division?.nombre ? (
                            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink/70">
                              {vacante.division.nombre}
                            </span>
                          ) : null}
                          {vacante.modalidad ? (
                            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink/70">
                              {MODALIDAD_LABEL[vacante.modalidad] ?? vacante.modalidad}
                            </span>
                          ) : null}
                          {cerrada ? (
                            <span className="rounded-full bg-night px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-paper">
                              No disponible
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="hidden shrink-0 text-right text-sm text-muted sm:block">
                        <p>{vacante.ubicacion}</p>
                        {fecha ? <p className="mt-1 text-xs">{fecha}</p> : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
