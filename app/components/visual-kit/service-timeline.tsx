"use client";

import { useId, useState } from "react";
import { SERVICIOS } from "@/lib/data";
import { LANDING_COPY } from "@/lib/visual-kit/hakamo";
import { MagneticButton } from "./magnetic-button";
import { Reveal } from "./reveal";

type Servicio = (typeof SERVICIOS)[number];

export function ServiceTimeline({ items }: { items: readonly Servicio[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section className="service-timeline" id="catalogo">
      <div className="lamp-glow" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.32em] text-glow">Catálogo</p>
        <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl leading-snug sm:text-4xl">
          {LANDING_COPY.offeringsTitle}
        </h2>
        <div className="mt-6 flex justify-center">
          <p className="service-timeline-hint">Selecciona un servicio para ver el detalle</p>
        </div>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10 text-left">
          {items.map((item, index) => (
            <ServiceRow
              key={item.slug}
              item={item}
              index={index}
              open={openSlug === item.slug}
              onToggle={() => setOpenSlug(openSlug === item.slug ? null : item.slug)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <MagneticButton href="/contacto">¿Necesitas algo a medida?</MagneticButton>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
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
    <Reveal from="up" delay={index * 30}>
      <article className="grid gap-4 py-8 sm:grid-cols-[4.5rem_1fr_auto] sm:items-start sm:gap-8">
        <p className="font-display text-3xl leading-none text-glow">{n}</p>
        <div>
          <h3 className="font-display text-2xl leading-snug text-paper sm:text-[1.7rem]">{item.titulo}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-paper/70">{item.descripcion}</p>
          <p className="mt-3 text-xs leading-5 text-paper/45">{item.tags.join(" · ")}</p>
          {item.detalle ? (
            <div id={panelId} hidden={!open}>
              <p className="mt-4 max-w-2xl border-t border-white/10 pt-4 text-sm leading-6 text-paper/85">
                {item.detalle}
              </p>
            </div>
          ) : null}
        </div>
        {item.detalle ? (
          <button
            type="button"
            className="w-fit text-sm font-semibold text-glow"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
          >
            {open ? "Ocultar" : "Ver detalle"}
          </button>
        ) : (
          <a href="#seguridad" className="w-fit text-sm font-semibold text-glow">
            Ver detalle
          </a>
        )}
      </article>
    </Reveal>
  );
}
