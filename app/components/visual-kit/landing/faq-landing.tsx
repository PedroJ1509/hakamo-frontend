"use client";

import { useSitio } from "@/app/components/sitio-context";
import { useId, useState } from "react";
import Link from "next/link";
import { lineasTitulo } from "@/lib/cms/comun";
import type { ContenidoFaq } from "@/lib/cms/faq";
import { enlaceSitio, textoConContacto } from "@/lib/cms/sitio";
import { LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";
import { FondoSeccion } from "../fondo-seccion";
import { Grain } from "../grain";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { SeccionBloque } from "../seccion";

function FaqItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: { pregunta: string; respuesta: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={`faq-item ${open ? "is-open" : ""}`}>
      <button
        id={buttonId}
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="faq-index" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="faq-question">{item.pregunta}</span>
        <span className="faq-icon" aria-hidden>
          <span className="faq-icon-bar faq-icon-bar--h" />
          <span className="faq-icon-bar faq-icon-bar--v" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-panel"
        hidden={!open}
      >
        <p className="faq-answer">{item.respuesta}</p>
      </div>
    </div>
  );
}

function FaqList({ items }: { items: { pregunta: string; respuesta: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <FaqItem
          key={item.pregunta + index}
          item={item}
          index={index}
          open={open === index}
          onToggle={() => setOpen((current) => (current === index ? null : index))}
        />
      ))}
    </div>
  );
}

export function FaqLanding({ contenido }: { contenido: ContenidoFaq }) {
  const { contacto } = useSitio();
  const { portada, grupos, fondoPreguntas, ayuda } = contenido;
  const [grupo, setGrupo] = useState(0);
  const activo = grupos[grupo] ?? grupos[0];
  const [linea1, ...resto] = lineasTitulo(portada.titulo);

  return (
    <div className="faq-night landing min-h-[100svh] bg-night text-paper">
      <ScrollProgress />
      <Grain />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        Saltar al contenido
      </a>

      <LandingHeader />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.faq} fondo={portada.fondo} compact>
        <div className="landing-hero-inner landing-hero-inner-compact landing-hero-inner--start mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{portada.antetitulo}</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] text-paper">
            {linea1}
            {resto.length > 0 ? <span className="mt-1 block italic text-glow">{resto.join(" ")}</span> : null}
          </h1>
          {portada.texto ? <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">{portada.texto}</p> : null}
          </div>
        </div>
      </LandingHeroSection>

      <section className="relative isolate bg-night px-4 py-16 sm:px-6 sm:py-24">
        <FondoSeccion fondo={fondoPreguntas} />
        <div className="relative mx-auto max-w-3xl">
          {grupos.length > 1 ? (
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Temas">
              {grupos.map((item, index) => (
                <button
                  key={item.nombre + index}
                  type="button"
                  role="tab"
                  aria-selected={grupo === index}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    grupo === index
                      ? "bg-glow text-night"
                      : "border border-white/20 bg-transparent text-paper/70 hover:border-glow hover:text-glow"
                  }`}
                  onClick={() => setGrupo(index)}
                >
                  {item.nombre}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-10" role="tabpanel">
            <FaqList key={grupo} items={activo.preguntas} />
          </div>
        </div>
      </section>

      {ayuda.mostrar ? (
        <SeccionBloque fondo={ayuda.fondo} base="night" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          {(p) => (
            <div className="mx-auto max-w-xl text-center">
              {ayuda.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{ayuda.antetitulo}</p> : null}
              <h2 className="font-display mt-3 text-3xl sm:text-4xl">{ayuda.titulo}</h2>
              {ayuda.texto ? <p className={`mt-4 text-sm leading-6 ${p.suave}`}>{textoConContacto(ayuda.texto, contacto)}</p> : null}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {ayuda.boton ? (
                  <Link href={enlaceSitio(ayuda.boton.url, contacto)} className={btnGlow}>
                    {ayuda.boton.texto}
                  </Link>
                ) : null}
                {ayuda.botonSecundario ? (
                  <a
                    href={enlaceSitio(ayuda.botonSecundario.url, contacto)}
                    target="_blank"
                    rel="noreferrer"
                    className={btnGhostOnNight}
                  >
                    {ayuda.botonSecundario.texto}
                  </a>
                ) : null}
              </div>
            </div>
          )}
        </SeccionBloque>
      ) : null}

      <PublicFooter />
    </div>
  );
}
