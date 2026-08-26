"use client";

import ContactForm from "@/app/components/ui/ContactForm";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { LandingScrollExpand } from "../landing-scroll-expand";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { Reveal } from "../reveal";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";

const CHANNELS = [
  {
    href: "https://wa.me/18296790671",
    kicker: "WhatsApp",
    title: "829-679-0671",
    external: true,
  },
  {
    href: `tel:${COMPANY_INFO.telefono}`,
    kicker: "Teléfono",
    title: COMPANY_INFO.telefono,
    external: false,
  },
  {
    href: `mailto:${COMPANY_INFO.email}`,
    kicker: "Correo",
    title: COMPANY_INFO.email,
    external: false,
  },
];

export function ContactLanding() {
  const site = SITE_PUBLIC;

  return (
    <div className="landing">
      <ScrollProgress />
      <Grain />

      <a
        href="#formulario"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        Saltar al formulario
      </a>

      <LandingHeader name={site.name} links={SITE_NAV} ctaHref="#formulario" ctaLabel="Escribirnos" />

      <section id="contenido" className="relative min-h-[100svh] overflow-hidden bg-night text-paper">
        <div className="absolute inset-0" aria-hidden>
          <div className="hero-field" />
          <div className="hero-vignette" />
          <div className="hero-veil" />
        </div>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Hablemos</p>
          <div className="mt-5">
            <CinematicTitle lines={["¿Listo para optimizar tu", "capital humano?"]} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Cuéntanos tu necesidad. Un especialista de Hakamo te contacta para diseñar la solución,
            sin compromiso. Respondemos en menos de 24 horas.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#formulario">Escribirnos ahora</MagneticButton>
            <MagneticButton href="https://wa.me/18296790671" variant="ghost" external>
              WhatsApp
            </MagneticButton>
          </div>
        </div>
      </section>

      <LandingScrollExpand title="Estamos listos">
        <h2>Te respondemos en menos de 24 horas</h2>
        <p>WhatsApp, teléfono o el formulario. Elige el canal y un especialista de Hakamo te contacta.</p>
      </LandingScrollExpand>

      <section className="bg-paper px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          {CHANNELS.map((channel, index) => (
            <Reveal key={channel.href} delay={index * 80} from="up">
              <a
                href={channel.href}
                className="group block"
                {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{channel.kicker}</p>
                <h2 className="font-display mt-3 break-all text-2xl leading-snug text-ink sm:text-3xl">
                  {channel.title}
                </h2>
                <p className="mt-4 text-sm text-muted transition group-hover:text-accent">Ver →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee items={["WhatsApp", "Cotización", "Menos de 24 horas", COMPANY_INFO.ubicacion]} />

      <section id="formulario" className="bg-paper px-4 pb-24 pt-16 sm:px-6">
        <div className="mx-auto max-w-xl">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Mensaje</p>
            <h2 className="font-display mt-3 text-3xl leading-snug text-ink sm:text-4xl">
              Cuéntanos tu operación
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              Completa el formulario y te respondemos con alcance, tiempos y siguiente paso.
            </p>
            <div className="glass-panel mt-10 rounded-[2rem] p-7">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
