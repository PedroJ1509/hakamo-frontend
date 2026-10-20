"use client";

import { useId, useState } from "react";
import type { Seccion } from "@/lib/cms/comun";
import type { ServicioCatalogo } from "@/lib/cms/servicios";
import { FondoSeccion } from "./fondo-seccion";
import { MagneticButton } from "./magnetic-button";
import { Reveal } from "./reveal";

/** Catálogo de servicios con detalle desplegable. Textos y fondo: sección «catálogo» del CMS. */
export function ServiceTimeline({ items, seccion }: { items: ServicioCatalogo[]; seccion: Seccion }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section className="service-timeline relative isolate" id="catalogo">
      <FondoSeccion fondo={seccion.fondo} />
      <div className="lamp-glow" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal from="up" className="text-center">
          {seccion.antetitulo ? <p className="text-[11px] uppercase tracking-[0.32em] text-glow">{seccion.antetitulo}</p> : null}
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">{seccion.titulo}</h2>
          {seccion.texto ? (
            <div className="mt-6 flex justify-center">
              <p className="service-timeline-hint">{seccion.texto}</p>
            </div>
          ) : null}
        </Reveal>

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

        {seccion.boton ? (
          <Reveal from="up" className="mt-16 text-center">
            <MagneticButton href={seccion.boton.url} external={seccion.boton.url.startsWith("http")}>
              {seccion.boton.texto}
            </MagneticButton>
          </Reveal>
        ) : null}
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
  item: ServicioCatalogo;
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
          {item.etiquetas.length > 0 ? <p className="mt-3 text-xs leading-5 text-paper/45">{item.etiquetas.join(" · ")}</p> : null}
          {item.detalle || item.imagen ? (
            <div id={panelId} hidden={!open}>
              <div className="service-detail-in mt-4 max-w-2xl border-t border-white/10 pt-4">
                {item.imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element -- imagen del CMS de tamaño libre
                  <img src={item.imagen} alt={item.titulo} className="mb-4 aspect-[16/9] w-full rounded-2xl object-cover" loading="lazy" />
                ) : null}
                {item.detalle ? <p className="whitespace-pre-line text-sm leading-6 text-paper/85">{item.detalle}</p> : null}
              </div>
            </div>
          ) : null}
        </div>
        {item.detalle || item.imagen ? (
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
