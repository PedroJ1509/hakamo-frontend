"use client";

import { useId, useState } from "react";
import { SERVICIOS } from "@/lib/data";
import { MagneticButton } from "./magnetic-button";
import { Reveal } from "./reveal";

type Servicio = (typeof SERVICIOS)[number];

function ServiceCard({
  item,
  index,
  open,
  onToggle,
}: {
  item: Servicio;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const n = String(index + 1).padStart(2, "0");

  return (
    <div className={`service-timeline-card ${open ? "is-open" : ""}`}>
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{n}</p>
      <h3 className="font-display mt-3 text-2xl leading-snug text-ink sm:text-[1.7rem]">{item.titulo}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{item.descripcion}</p>
      <p className="mt-4 text-xs leading-5 text-ink/55">{item.tags.join(" · ")}</p>

      <div
        id={panelId}
        className="service-timeline-detail"
        aria-hidden={!open}
      >
        <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-6 text-ink/80">{item.detalle}</p>
      </div>

      <button
        type="button"
        className="service-timeline-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{open ? "Ocultar" : "Ver detalle"}</span>
        <svg
          className="service-timeline-chevron"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
        >
          <path
            d="M3.5 5.25 7 8.75l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export function ServiceTimeline({ items }: { items: readonly Servicio[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section className="service-timeline" id="catalogo">
      <div className="lamp-glow" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Catálogo</p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
          Cinco soluciones para su operación
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
          Outsourcing, reclutamiento, gestión documental, nómina y supervisión de obras — con cumplimiento legal dominicano.
        </p>
        <p className="service-timeline-hint mt-6">
          Selecciona un servicio para ver el detalle
        </p>

        <div className="service-timeline-track mt-12">
          <span className="service-timeline-line" aria-hidden />
          {items.map((item, index) => {
            const odd = index % 2 === 0;
            const open = openSlug === item.slug;
            return (
              <article key={item.slug} className={`service-timeline-item ${odd ? "is-odd" : "is-even"}`}>
                <span className="service-timeline-dot" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Reveal from={odd ? "left" : "right"} delay={index * 40} className="service-timeline-card-wrap">
                  <ServiceCard
                    item={item}
                    index={index}
                    open={open}
                    onToggle={() => setOpenSlug(open ? null : item.slug)}
                  />
                </Reveal>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <MagneticButton href="/contacto">¿Necesitas algo a medida?</MagneticButton>
        </div>
      </div>
    </section>
  );
}
