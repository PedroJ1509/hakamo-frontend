"use client";

import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { LandingScrollExpand } from "../landing-scroll-expand";
import { PublicFooter } from "../public-footer";
import { StatsCounter } from "../stats-counter";
import { QUIENES_SOMOS } from "@/lib/data";
import type { LandingCopy, NavLink, Offering, SitePublic, Stat } from "@/lib/visual-kit/types";
import { LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";

function splitTitle(title: string) {
  const index = title.indexOf(",");
  if (index === -1) return [title];
  return [title.slice(0, index + 1), title.slice(index + 1).trim()];
}

const DOORS = [
  { href: "/nosotros", kicker: "Nosotros", title: "Quiénes somos" },
  { href: "/servicios", kicker: "Servicios", title: "Seis soluciones" },
  { href: "/proyectos", kicker: "Proyectos", title: "Obras en campo" },
  { href: "/empresas/solicitar", kicker: "Talento", title: "Solicitar personal" },
];

export function HomeLanding({
  site,
  nav,
  stats,
  offerings,
  copy,
}: {
  site: SitePublic;
  nav: NavLink[];
  stats: Stat[];
  offerings: Offering[];
  copy: LandingCopy;
}) {
  const lines = splitTitle(site.heroTitle);

  return (
    <div className="landing">
      <ScrollProgress />
      <Grain />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        {copy.skip}
      </a>

      <LandingHeader
        name={site.name}
        links={nav}
        ctaHref={site.ctaHref}
        ctaLabel={site.ctaLabel}
        ctaExternal={site.ctaHref.startsWith("http")}
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.home}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{site.name}</p>
          <div className="mt-5">
            <CinematicTitle lines={lines} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">{site.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={site.ctaHref} external={site.ctaHref.startsWith("http")}>
              {site.ctaLabel}
            </MagneticButton>
            <MagneticButton href="/servicios" variant="ghost">
              Ver servicios
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <LandingScrollExpand title="Talento" alt="Equipo de profesionales de gestión humana">
        <p>Soluciones integrales para la gestión empresarial, de la planificación a la ejecución.</p>
      </LandingScrollExpand>

      <section className="bg-paper px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <StatsCounter stats={stats} />
        </div>
      </section>

      <section id="contenido" className="bg-paper px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{QUIENES_SOMOS.titulo}</p>
            <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug text-ink sm:text-4xl">
              Su aliado estratégico en gestión humana
            </h2>
            <div className="mt-6">
              <MagneticButton href="/nosotros" variant="ink">
                Conocer Hakamo
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={offerings.map((item) => item.name)} />

      <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {DOORS.map((door, index) => (
            <Reveal key={door.href} delay={index * 60} from="up">
              <a href={door.href} className="group block">
                <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{door.kicker}</p>
                <h2 className="font-display mt-3 text-2xl leading-snug text-ink sm:text-3xl">{door.title}</h2>
                <p className="mt-4 text-sm text-muted transition group-hover:text-accent">Ver →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <PublicFooter site={site} links={nav} />
    </div>
  );
}
