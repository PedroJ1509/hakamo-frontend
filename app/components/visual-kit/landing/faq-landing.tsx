"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { COMPANY_INFO, FAQ } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";

const FAQ_PROCESO = [
  {
    pregunta: "¿Cuál es el proceso de selección de candidatos?",
    respuesta:
      "Nuestro proceso incluye: publicación de vacante, filtrado de hojas de vida, entrevistas iniciales, pruebas técnicas y psicométricas (según el perfil), entrevista final y presentación de terna al cliente.",
  },
  {
    pregunta: "¿Puedo participar en el proceso de selección?",
    respuesta:
      "Sí, el cliente puede participar en las etapas finales del proceso. Coordinamos entrevistas conjuntas y compartimos los reportes de evaluación de cada candidato.",
  },
  {
    pregunta: "¿Qué pasa si el candidato seleccionado no funciona?",
    respuesta:
      "Ofrecemos un período de garantía. Si el candidato no cumple con las expectativas en ese período, lo reemplazamos sin costo adicional.",
  },
  {
    pregunta: "¿Qué incluye el servicio de gestión de nómina?",
    respuesta:
      "Cálculo de nómina y pagos, control de costos laborales, reportes TSS y Ministerio de Hacienda, e incidencias laborales — con puntualidad y cumplimiento normativo.",
  },
  {
    pregunta: "¿Cómo garantizan la confidencialidad?",
    respuesta:
      "Protocolos estrictos de confidencialidad y acuerdos de no divulgación (NDA) con cada empresa cliente.",
  },
];

const GROUPS = [
  { id: "generales", label: "Generales", items: FAQ },
  { id: "proceso", label: "Selección y nómina", items: FAQ_PROCESO },
] as const;

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
          key={item.pregunta}
          item={item}
          index={index}
          open={open === index}
          onToggle={() => setOpen((current) => (current === index ? null : index))}
        />
      ))}
    </div>
  );
}

export function FaqLanding() {
  const site = SITE_PUBLIC;
  const [group, setGroup] = useState<(typeof GROUPS)[number]["id"]>("generales");
  const active = GROUPS.find((item) => item.id === group) ?? GROUPS[0];

  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <ScrollProgress />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Saltar al contenido
      </a>

      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref="/contacto"
        ctaLabel="Contactar"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
        tone="paper"
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.faq} tone="paper" compact>
        <div className="landing-hero-inner landing-hero-inner-compact landing-hero-inner--start mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-accent">FAQ</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] text-ink">
            Preguntas
            <span className="mt-1 block italic text-accent">frecuentes</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-6 text-muted sm:text-base">
            Outsourcing, reclutamiento, payroll, cumplimiento y seguridad ocupacional.
          </p>
          </div>
        </div>
      </LandingHeroSection>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Temas">
            {GROUPS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={group === item.id}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  group === item.id
                    ? "bg-accent text-paper"
                    : "border border-ink/10 bg-paper text-muted hover:border-accent hover:text-accent"
                }`}
                onClick={() => setGroup(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-10" role="tabpanel">
            <FaqList key={active.id} items={[...active.items]} />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Más ayuda</p>
          <h2 className="font-display mt-3 text-3xl text-ink sm:text-4xl">¿No está tu respuesta?</h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Escríbenos a {COMPANY_INFO.email} o por WhatsApp al {COMPANY_INFO.telefono}. Respondemos
            en menos de 24 horas.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contacto" className={btnPrimary}>
              Contactar
            </Link>
            <a
              href={COMPANY_INFO.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={btnSecondary}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} tone="paper" />
    </div>
  );
}
