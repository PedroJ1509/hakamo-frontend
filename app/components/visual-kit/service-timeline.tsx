"use client";

import { SERVICIOS } from "@/lib/data";
import { MagneticButton } from "./magnetic-button";
import { Reveal } from "./reveal";

type Servicio = (typeof SERVICIOS)[number];

export function ServiceTimeline({ items }: { items: readonly Servicio[] }) {
  return (
    <section className="service-timeline" id="catalogo">
      <div className="lamp-glow" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Catálogo</p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
          Seis soluciones integrales para su operación
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
          De outsourcing a supervisión en campo — todo con cumplimiento legal dominicano.
        </p>

        <div className="service-timeline-track mt-16">
          <span className="service-timeline-line" aria-hidden />
          {items.map((item, index) => {
            const odd = index % 2 === 0;
            return (
              <article key={item.slug} className={`service-timeline-item ${odd ? "is-odd" : "is-even"}`}>
                <span className="service-timeline-dot" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Reveal from={odd ? "left" : "right"} delay={index * 40} className="service-timeline-card-wrap">
                  <div className="service-timeline-card">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display mt-3 text-2xl leading-snug text-ink sm:text-[1.7rem]">{item.titulo}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.descripcion}</p>
                    <p className="mt-4 text-xs leading-5 text-ink/55">{item.tags.join(" · ")}</p>
                  </div>
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
