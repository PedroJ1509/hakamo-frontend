"use client";

import {
  ACTIVIDADES_COLABORADORES,
  CLIENTES,
  EQUIPO,
  FERIA_TRABAJO,
  FORMACION,
  HISTORIA,
  MISION_VISION,
  PILARES,
  QUIENES_SOMOS,
  VALORES,
} from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";

const CUIDADO = [FERIA_TRABAJO, FORMACION];

export function AboutLanding() {
  const site = SITE_PUBLIC;

  return (
    <div className="landing">
      <ScrollProgress />
      <Grain />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        Saltar al contenido
      </a>

      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref={site.ctaHref}
        ctaLabel={site.ctaLabel}
        ctaExternal={site.ctaHref.startsWith("http")}
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.about}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{QUIENES_SOMOS.titulo}</p>
          <div className="mt-5">
            <CinematicTitle lines={["Outsourcing de gestión humana", "para el sector construcción"]} />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-paper/70 sm:text-base">
            {QUIENES_SOMOS.lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/servicios">Ver servicios</MagneticButton>
            <MagneticButton href="/contacto" variant="ghost">
              Hablemos
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <div id="contenido">
        <section className="bg-paper px-4 py-20 text-ink sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Nuestra trayectoria</p>
            <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-5xl">
              De la obra al talento que la sostiene
            </h2>
            <div className="mt-14 grid lg:grid-cols-2">
              {HISTORIA.map((item) => (
                <article key={item.ano} className="border-t border-ink/15 py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-4xl leading-none text-accent">{item.ano}</p>
                  <h3 className="font-display mt-5 text-2xl leading-snug">{item.titulo}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted">{item.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-night px-4 py-20 text-paper sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Lo que nos mueve</p>
            <h2 className="font-display mt-3 text-3xl leading-snug sm:text-5xl">Misión y visión</h2>
            <div className="mt-14 grid lg:grid-cols-2">
              <article className="border-t border-glow/50 py-8 lg:pr-12">
                <h3 className="font-display text-2xl leading-snug">{MISION_VISION.mision.titulo}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-paper/70">{MISION_VISION.mision.texto}</p>
              </article>
              <article className="border-t border-glow/50 py-8 lg:pl-12">
                <h3 className="font-display text-2xl leading-snug">{MISION_VISION.vision.titulo}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-paper/70">{MISION_VISION.vision.texto}</p>
              </article>
            </div>

            <div className="mt-16 grid gap-10 border-t border-white/10 pt-16 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Nuestros valores</p>
                <h2 className="font-display mt-3 text-3xl leading-snug sm:text-4xl">
                  Los principios que nos definen
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-paper/65">
                  Siete principios que guían cada contrato, cada obra y cada relación con colaboradores y clientes.
                </p>
              </div>
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {VALORES.map((valor, index) => (
                  <li key={valor.titulo} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[4rem_minmax(0,1fr)]">
                    <span className="font-display text-xl leading-none text-glow" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-snug">{valor.titulo}</h3>
                      <p className="mt-2 text-sm leading-6 text-paper/65">{valor.descripcion}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-paper px-4 py-20 text-ink sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Dossier · Pilares</p>
            <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display max-w-xl text-3xl leading-snug sm:text-5xl">
                Su aliado estratégico en gestión humana
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted">{QUIENES_SOMOS.resultado}</p>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
              {PILARES.map((pilar, index) => (
                <article key={pilar.titulo} className="border-t border-ink/15 py-7 sm:px-6 sm:first:pl-0">
                  <p className="font-display text-3xl leading-none text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-5 text-xl leading-snug">{pilar.titulo}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{pilar.descripcion}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-night px-4 py-20 text-paper sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal from="up">
              <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Las personas detrás</p>
              <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="font-display max-w-xl text-3xl leading-snug sm:text-5xl">
                  Un equipo conectado alrededor de ti
                </h2>
                <p className="max-w-sm text-sm leading-6 text-paper/65">
                  Cada área de Hakamo trabaja sobre el mismo expediente. No te pasan de mano en mano: una
                  sola coordinación acompaña tu proceso de principio a fin.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
              {EQUIPO.map((persona, index) => (
                <Reveal key={persona.cargo} delay={index * 90} from="up">
                  <article
                    className={`border-t border-white/15 py-7 sm:px-6 ${index === 0 ? "sm:pl-0" : ""}`}
                  >
                    <p className="font-display text-3xl leading-none text-glow">{persona.iniciales}</p>
                    <h3 className="font-display mt-5 text-xl leading-snug">{persona.cargo}</h3>
                    <p className="mt-2 text-sm text-paper/65">{persona.area}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-20 border-t border-white/10 pt-16">
              <Reveal from="up">
                <h2 className="font-display max-w-xl text-3xl leading-snug sm:text-4xl">Formación y captación</h2>
              </Reveal>
              <div className="mt-10 grid lg:grid-cols-2">
                {CUIDADO.map((item, index) => (
                  <Reveal key={item.titulo} delay={index * 120} from={index === 0 ? "left" : "right"}>
                    <article
                      className={`border-t border-white/15 py-8 lg:px-8 ${index === 0 ? "lg:pl-0" : "lg:pr-0"}`}
                    >
                      <h3 className="font-display text-2xl leading-snug">{item.titulo}</h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-paper/65">{item.texto}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-20 border-t border-white/10 pt-16">
              <Reveal from="up">
                <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Vida en Hakamo</p>
                <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug sm:text-4xl">
                  Actividades y servicio al colaborador
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
                  Nos comprometemos a cumplir rigurosamente la normativa vigente en cada proyecto, y a
                  cuidar a las personas que lo hacen posible.
                </p>
              </Reveal>
              <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {ACTIVIDADES_COLABORADORES.map((item, index) => (
                  <li key={item.titulo}>
                    <Reveal delay={index * 70} from="up">
                      <div className="grid gap-2 py-5 md:grid-cols-[16rem_minmax(0,1fr)] md:items-baseline md:gap-10">
                        <h3 className="font-display text-xl leading-snug">{item.titulo}</h3>
                        <p className="text-sm leading-6 text-paper/65">{item.texto}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-paper px-4 py-20 text-ink sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Confianza comprobada</p>
            <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display max-w-xl text-3xl leading-snug sm:text-5xl">
                Empresas que han confiado en Hakamo
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted">
                Operaciones de construcción, energía, ingeniería y retail nos confían la gestión de su
                personal. Cada proyecto sostiene su propio equipo, con la misma exigencia.
              </p>
            </div>
            <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
              {CLIENTES.map((cliente, index) => (
                <article key={cliente.nombre} className="grid gap-2 py-6 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                  <span className="font-display text-xl text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl leading-snug">{cliente.nombre}</h3>
                  <p className="text-sm text-muted">{cliente.sector}</p>
                </article>
              ))}
            </div>
            <div className="mt-12">
              <MagneticButton href="/empresas/solicitar" variant="ink">
                Solicitar personal
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>

      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
