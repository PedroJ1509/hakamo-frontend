"use client";

import ContactForm from "@/app/components/ui/ContactForm";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";
import { Grain } from "../grain";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { Reveal } from "../reveal";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { RoutePanel } from "./route-panel";

const CHANNELS = [
  {
    href: COMPANY_INFO.social.whatsapp,
    kicker: "WhatsApp / Cotizaciones",
    title: COMPANY_INFO.telefono,
    detail: "Respuesta rápida para proyectos y consultas",
    external: true,
  },
  {
    href: `tel:+1${COMPANY_INFO.telefonoAlt.replace(/-/g, "")}`,
    kicker: "Teléfono",
    title: COMPANY_INFO.telefonoAlt,
    detail: "Línea directa con el equipo Hakamo",
    external: false,
  },
  {
    href: `mailto:${COMPANY_INFO.email}`,
    kicker: "Correo gestión",
    title: COMPANY_INFO.email,
    detail: "Cotizaciones y atención empresarial",
    external: false,
  },
  {
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.ubicacion)}`,
    kicker: "Dirección",
    title: COMPANY_INFO.ubicacion,
    detail: "Oficina de Hakamo",
    external: true,
  },
  {
    href: COMPANY_INFO.social.instagram,
    kicker: "Redes",
    title: "Instagram @hakamord",
    detail: "LinkedIn · Hakamo",
    external: true,
  },
];

export function ContactLanding() {
  const site = SITE_PUBLIC;

  return (
    <div className="landing min-h-[100svh] bg-night text-paper">
      <ScrollProgress />
      <Grain />

      <a
        href="#formulario"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        Saltar al formulario
      </a>

      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref="#formulario"
        ctaLabel="Escribirnos"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.contact}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Hablemos</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] text-paper">
            Hablemos de
            <span className="mt-1 block italic text-glow">su proyecto</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-paper/70 sm:text-base">
            Escríbenos o llámanos. Respondemos en menos de 24 horas.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#formulario" className={btnGlow}>
              Escribirnos ahora
            </a>
            <a href="#ruta" className={btnGhostOnNight}>
              Cómo llegar
            </a>
          </div>
        </div>
      </LandingHeroSection>

      <section className="bg-night px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Canales</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-snug text-paper sm:text-4xl">
              Cómo contactarnos
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((channel, index) => (
              <Reveal key={channel.href + channel.kicker} delay={index * 60} from="up">
                <a
                  href={channel.href}
                  className="group block h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:border-glow/40 sm:p-7"
                  {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-glow">{channel.kicker}</p>
                  <h3 className="font-display mt-3 break-all text-xl leading-snug text-paper sm:text-2xl">
                    {channel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-paper/65">{channel.detail}</p>
                  <p className="mt-5 text-sm font-semibold text-glow transition group-hover:translate-x-0.5">
                    Abrir →
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="formulario" className="bg-night px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Mensaje</p>
            <h2 className="font-display mt-3 text-3xl leading-snug text-paper sm:text-4xl">
              Cuéntanos tu operación
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-paper/65">
              Completa el formulario y te respondemos con alcance, tiempos y siguiente paso.
            </p>
          </Reveal>

          <Reveal from="up" delay={80}>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 sm:p-8">
              <ContactForm tone="night" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ruta" className="scroll-mt-24 bg-night px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Ubicación</p>
            <h2 className="font-display mt-3 text-3xl leading-snug text-paper sm:text-4xl">Cómo llegar</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
              Hakamo está en {COMPANY_INFO.ubicacion}. El mapa ya muestra el punto. Calcula el tiempo
              desde tu ubicación o desde una ciudad.
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal from="up" delay={60}>
              <RoutePanel />
            </Reveal>
          </div>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
