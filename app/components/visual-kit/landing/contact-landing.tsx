"use client";

import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/app/components/ui/ContactForm";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { Reveal } from "../reveal";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";

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
    href: `mailto:${COMPANY_INFO.emailReclutamiento}`,
    kicker: "Correo reclutamiento",
    title: COMPANY_INFO.emailReclutamiento,
    detail: "Vacantes y perfiles candidatos",
    external: false,
  },
];

const GALLERY = [
  {
    src: "/visual-kit/contact/meeting.jpg",
    alt: "Reunión comercial con apretón de manos en oficina luminosa",
    caption: "Conversación inicial",
  },
  {
    src: "/visual-kit/contact/workspace.jpg",
    alt: "Equipo de gestión humana colaborando en un espacio abierto",
    caption: "Equipo en operación",
  },
  {
    src: "/visual-kit/contact/lobby.jpg",
    alt: "Lobby moderno y luminoso listo para recibir clientes",
    caption: "Espacio de bienvenida",
  },
  {
    src: "/visual-kit/heroes/contact-rrhh.jpg",
    alt: "Profesionales de RRHH en reunión de seguimiento",
    caption: "Acompañamiento B2B",
  },
];

export function ContactLanding() {
  const site = SITE_PUBLIC;

  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <ScrollProgress />

      <a
        href="#formulario"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
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
        tone="paper"
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.contact} tone="paper" compact>
        <div className="landing-hero-inner landing-hero-inner-compact landing-hero-inner--start mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-accent">Hablemos</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] italic text-ink">
            Hablemos de
            <br />
            su proyecto
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-6 text-muted sm:text-base">
            Escríbenos a {COMPANY_INFO.email}, llámanos al {COMPANY_INFO.telefono} /{" "}
            {COMPANY_INFO.telefonoAlt} o escríbenos por WhatsApp. Respondemos en menos de 24 horas.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#formulario" className={btnPrimary}>
              Escribirnos ahora
            </a>
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
        </div>
      </LandingHeroSection>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Canales</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-snug text-ink sm:text-4xl">
              Cómo contactarnos
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((channel, index) => (
              <Reveal key={channel.href + channel.kicker} delay={index * 60} from="up">
                <a
                  href={channel.href}
                  className="group block h-full rounded-[1.5rem] border border-ink/8 bg-paper p-6 transition hover:border-accent/35 hover:bg-white sm:p-7"
                  {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{channel.kicker}</p>
                  <h3 className="font-display mt-3 break-all text-xl leading-snug text-ink sm:text-2xl">
                    {channel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{channel.detail}</p>
                  <p className="mt-5 text-sm font-semibold text-accent transition group-hover:translate-x-0.5">
                    Abrir →
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Presencia</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-snug text-ink sm:text-4xl">
              Espacios donde nace cada conversación
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              Montecristi y todo el territorio nacional. Un acompañamiento B2B claro, de la consulta
              inicial a la ejecución.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {GALLERY.map((item, index) => (
              <Reveal key={item.src} delay={index * 70} from="up">
                <figure className="group relative overflow-hidden rounded-[1.6rem] bg-white">
                  <div className={`relative ${index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/90 via-transparent to-transparent" />
                  </div>
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{item.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="formulario" className="bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Mensaje</p>
            <h2 className="font-display mt-3 text-3xl leading-snug text-ink sm:text-4xl">
              Cuéntanos tu operación
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted">
              Completa el formulario y te respondemos con alcance, tiempos y siguiente paso. También
              puedes escribirnos a {COMPANY_INFO.emailReclutamiento} si buscas talento.
            </p>
            <div className="mt-8 overflow-hidden rounded-[1.6rem]">
              <div className="relative aspect-[16/11]">
                <Image
                  src="/visual-kit/contact/meeting.jpg"
                  alt="Equipo Hakamo listo para hablar de su proyecto"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>

          <Reveal from="up" delay={80}>
            <div className="rounded-[1.8rem] border border-ink/8 bg-paper p-6 shadow-[0_18px_50px_color-mix(in_srgb,var(--ink)_5%,transparent)] sm:p-8">
              <ContactForm />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <MagneticButton href={COMPANY_INFO.social.whatsapp} variant="ink" external>
                WhatsApp {COMPANY_INFO.telefono}
              </MagneticButton>
              <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noreferrer" className={btnSecondary}>
                @hakamord
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 0% 50%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 45%), radial-gradient(ellipse at 100% 80%, color-mix(in srgb, var(--glow) 12%, transparent), transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Reveal from="up">
            <div className="grid items-stretch gap-6 lg:grid-cols-[1.25fr_0.95fr] lg:gap-10">
              <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[420px] lg:min-h-[520px]">
                <Image
                  src="/visual-kit/contact/lobby.jpg"
                  alt="Lobby luminoso de Hakamo en República Dominicana"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-paper/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/80">
                    República Dominicana
                  </p>
                  <p className="font-display mt-2 text-2xl text-paper sm:text-3xl">Montecristi</p>
                </div>
              </div>

              <div className="flex flex-col justify-center py-2 lg:py-6">
                <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Ubicación</p>
                <h2 className="font-display mt-4 text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.08] tracking-[-0.02em] text-ink">
                  Montecristi,
                  <span className="mt-1 block italic text-accent/90">República Dominicana</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted sm:text-base">
                  Operamos con presencia activa en Montecristi y en todo el territorio nacional.
                  Solicite su cotización hoy — impulsamos talentos, fortalecemos empresas.
                </p>

                <div className="mt-8 space-y-3 border-t border-ink/8 pt-7">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <PinIcon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">Base operativa</p>
                      <p className="mt-0.5 text-sm text-muted">Montecristi · zona noroeste</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <MapIcon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">Cobertura nacional</p>
                      <p className="mt-0.5 text-sm text-muted">Proyectos en todo el territorio dominicano</p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href="/como-llegar" className={btnPrimary}>
                    Cómo llegar
                  </Link>
                  <Link href="/agendar-visita" className={btnSecondary}>
                    Agendar visita
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} tone="paper" />
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2v-13Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 4.5v13M15 6.5v13" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
