"use client";

import ContactForm from "@/app/components/ui/ContactForm";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { Reveal } from "../reveal";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";

const CHANNELS = [
  {
    href: "https://wa.me/18296790671",
    kicker: "WhatsApp / Cotizaciones",
    title: "829-679-0671",
    external: true,
  },
  {
    href: `mailto:${COMPANY_INFO.email}`,
    kicker: "Correo general",
    title: COMPANY_INFO.email,
    external: false,
  },
  {
    href: `mailto:${COMPANY_INFO.emailReclutamiento}`,
    kicker: "Reclutamiento",
    title: COMPANY_INFO.emailReclutamiento,
    external: false,
  },
  {
    href: COMPANY_INFO.social.instagram,
    kicker: "Instagram",
    title: "@hakamord",
    external: true,
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

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.contact}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Hablemos</p>
          <div className="mt-5">
            <CinematicTitle lines={["Hablemos de", "su proyecto"]} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Garantice el éxito de su obra desde el día uno con personal calificado, sin
            complicaciones administrativas. Respondemos en menos de 24 horas.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#formulario">Escribirnos ahora</MagneticButton>
            <MagneticButton href="https://wa.me/18296790671" variant="ghost" external>
              WhatsApp
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <section className="bg-paper px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
