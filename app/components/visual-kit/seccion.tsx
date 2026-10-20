import type { ReactNode } from "react";
import type { Fondo, Item, Seccion } from "@/lib/cms/comun";
import { FondoSeccion } from "./fondo-seccion";
import { MagneticButton } from "./magnetic-button";
import { Reveal } from "./reveal";

/** Clases de texto y bordes para leer bien sobre un fondo claro (`oscuro`) u oscuro (`claro`). */
export function paleta(tono: Fondo["tono"]) {
  return tono === "claro"
    ? { texto: "text-paper", suave: "text-paper/65", acento: "text-glow", borde: "border-white/15", linea: "border-white/10", divisor: "divide-white/10", fuerte: "border-glow/50" }
    : { texto: "text-ink", suave: "text-muted", acento: "text-accent", borde: "border-ink/15", linea: "border-ink/10", divisor: "divide-ink/10", fuerte: "border-ink/15" };
}

export type Paleta = ReturnType<typeof paleta>;

/**
 * Sección de página con el fondo del CMS. `base` es el fondo del diseño original
 * (`paper` claro o `night` oscuro) y queda debajo si el CMS no pone imagen ni color.
 */
export function SeccionBloque({
  fondo,
  base,
  className = "px-4 py-20 sm:px-6 sm:py-28",
  children,
}: {
  fondo: Fondo;
  base: "paper" | "night";
  className?: string;
  children: (p: Paleta) => ReactNode;
}) {
  const p = paleta(fondo.tono);
  return (
    <section className={`relative isolate ${base === "night" ? "bg-night" : "bg-paper"} ${p.texto} ${className}`}>
      <FondoSeccion fondo={fondo} />
      <div className="relative mx-auto max-w-6xl">{children(p)}</div>
    </section>
  );
}

export const numero = (index: number) => String(index + 1).padStart(2, "0");

/** Imagen opcional de un elemento, subida en el CMS. */
export function ItemImagen({ item, className = "mb-5 aspect-[4/3] w-full rounded-2xl object-cover" }: { item: Item; className?: string }) {
  if (!item.imagen) return null;
  // eslint-disable-next-line @next/next/no-img-element -- imagen del CMS de tamaño libre
  return <img src={item.imagen} alt={item.titulo} className={className} loading="lazy" />;
}

/** Antetítulo, título y texto de una sección. `lado` pone el texto a la derecha del título en pantallas grandes. */
export function Encabezado({ s, p, lado = false, grande = true }: { s: Seccion; p: Paleta; lado?: boolean; grande?: boolean }) {
  const titulo = `font-display ${lado ? "max-w-xl" : "max-w-3xl"} text-3xl leading-snug ${grande ? "sm:text-5xl" : "sm:text-4xl"}`;
  return (
    <Reveal from="up">
      {s.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{s.antetitulo}</p> : null}
      {lado ? (
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className={titulo}>{s.titulo}</h2>
          {s.texto ? <p className={`max-w-sm text-sm leading-6 ${p.suave}`}>{s.texto}</p> : null}
        </div>
      ) : (
        <>
          <h2 className={`${titulo} ${s.antetitulo ? "mt-3" : ""}`}>{s.titulo}</h2>
          {s.texto ? <p className={`mt-4 max-w-xl text-sm leading-6 ${p.suave}`}>{s.texto}</p> : null}
        </>
      )}
    </Reveal>
  );
}

export function BotonSeccion({ s }: { s: Seccion }) {
  if (!s.boton) return null;
  return (
    <Reveal from="up" className="mt-12">
      <MagneticButton href={s.boton.url} external={s.boton.url.startsWith("http")} variant={s.fondo.tono === "claro" ? "glow" : "ink"}>
        {s.boton.texto}
      </MagneticButton>
    </Reveal>
  );
}

/** Secciones que en el diseño continúan la anterior: sin padding arriba y con una línea divisoria. */
export const CONTINUA = "px-4 pb-20 sm:px-6 sm:pb-28";
