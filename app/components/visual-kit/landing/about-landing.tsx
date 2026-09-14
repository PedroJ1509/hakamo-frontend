"use client";

import HorizontalPanels from "@/app/components/ui/HorizontalPanels";
import {
  ACTIVIDADES_COLABORADORES,
  CLIENTES,
  COBERTURA,
  COMPROMISO_HSE,
  EQUIPO,
  FERIA_TRABAJO,
  FORMACION,
  HISTORIA,
  MISION_TRANSFORMADORA,
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
import { Marquee } from "../marquee";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";
import { StagePanel } from "../stage-panel";

const MV = [MISION_VISION.mision, MISION_VISION.vision];

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
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            {QUIENES_SOMOS.lead}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-paper/60">
            {QUIENES_SOMOS.aliado}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-paper/55">
            {QUIENES_SOMOS.responsabilidad}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/servicios">Ver servicios</MagneticButton>
            <MagneticButton href="/contacto" variant="ghost">
              Hablemos
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <HorizontalPanels>
        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Nuestra trayectoria</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            De la obra al talento que la sostiene
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{QUIENES_SOMOS.origen}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{QUIENES_SOMOS.resultado}</p>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {HISTORIA.map((item, index) => (
              <article key={item.ano} className="grid gap-3 py-5 md:grid-cols-[4.5rem_1fr] md:items-start">
                <span className="font-display text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{item.ano}</p>
                  <h3 className="font-display mt-1 text-lg tracking-tight text-ink sm:text-xl">{item.titulo}</h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-5 text-muted">{item.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Dossier · Pilares</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Su aliado estratégico en gestión humana
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-paper/65">{QUIENES_SOMOS.aliado}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PILARES.map((pilar) => (
              <article key={pilar.titulo} className="h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-lg sm:text-xl">{pilar.titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-paper/65">{pilar.descripcion}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Lo que nos mueve</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Misión y visión
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Generar oportunidades para las personas y crecimiento sostenible para cada cliente.
          </p>
          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {MV.map((item) => (
              <article key={item.titulo} className="h-full rounded-[1.6rem] border border-ink/10 bg-white p-5">
                <h3 className="font-display text-lg sm:text-xl text-ink">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.texto}</p>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="paper">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Nuestra misión transformadora</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Tres compromisos que sostienen cada proyecto
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Talento, respeto y crecimiento sostenible. Así medimos el valor que aportamos.
          </p>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {MISION_TRANSFORMADORA.map((item, index) => (
              <article key={item.titulo} className="grid gap-3 py-5 md:grid-cols-[4rem_1fr] md:items-start">
                <span className="font-display text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg tracking-tight text-ink sm:text-xl">{item.titulo}</h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-5 text-muted">{item.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </StagePanel>

        <StagePanel tone="night">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Confianza comprobada</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Empresas que han confiado en Hakamo
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Operaciones de construcción, energía, ingeniería y retail nos confían la gestión de su
            personal. Cada proyecto sostiene su propio equipo, con la misma exigencia.
          </p>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {CLIENTES.map((cliente, index) => (
              <article key={cliente.nombre} className="grid gap-2 py-4 md:grid-cols-[4rem_1fr_auto] md:items-end">
                <span className="font-display text-sm text-glow">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg sm:text-xl">{cliente.nombre}</h3>
                <p className="text-sm text-paper/55">{cliente.sector}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <MagneticButton href="/servicios">Ver servicios</MagneticButton>
          </div>
        </StagePanel>
      </HorizontalPanels>

      <section className="bg-night px-4 py-20 text-paper sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Nuestros valores</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl">
            Los pilares que nos definen
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-paper/65">
            Siete principios que guían cada contrato, cada obra y cada relación con colaboradores y clientes.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map((valor, index) => (
              <Reveal key={valor.titulo} delay={index * 50} from="up">
                <article className="h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="font-display text-lg">{valor.titulo}</h3>
                  <p className="mt-2 text-sm leading-5 text-paper/65">{valor.descripcion}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <Reveal from="up">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{COBERTURA.titulo}</p>
            <h2 className="font-display mt-3 text-3xl leading-snug text-ink sm:text-4xl">
              Montecristi y todo el país
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">{COBERTURA.texto}</p>
            <div className="mt-8 grid gap-3">
              {COBERTURA.puntos.map((punto) => (
                <article key={punto.titulo} className="rounded-[1.6rem] border border-ink/10 bg-white p-5">
                  <h3 className="font-display text-lg text-ink">{punto.titulo}</h3>
                  <p className="mt-2 text-sm leading-5 text-muted">{punto.texto}</p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal from="up" delay={80}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Seguridad</p>
            <h2 className="font-display mt-3 text-3xl leading-snug text-ink sm:text-4xl">
              {COMPROMISO_HSE.titulo}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">{COMPROMISO_HSE.texto}</p>
            <div className="mt-8 rounded-[1.6rem] border border-ink/10 bg-white p-5">
              <h3 className="font-display text-lg text-ink">{FERIA_TRABAJO.titulo}</h3>
              <p className="mt-2 text-sm leading-5 text-muted">{FERIA_TRABAJO.texto}</p>
            </div>
            <div className="mt-3 rounded-[1.6rem] border border-ink/10 bg-white p-5">
              <h3 className="font-display text-lg text-ink">{FORMACION.titulo}</h3>
              <p className="mt-2 text-sm leading-5 text-muted">{FORMACION.texto}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Vida en Hakamo</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Actividades y servicio al colaborador
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Nos comprometemos a cumplir rigurosamente la normativa vigente en cada proyecto, y a
            cuidar a las personas que lo hacen posible.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVIDADES_COLABORADORES.map((item, index) => (
              <Reveal key={item.titulo} delay={index * 50} from="up">
                <article className="h-full rounded-[1.6rem] border border-ink/10 bg-white p-5">
                  <h3 className="font-display text-lg text-ink">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-5 text-muted">{item.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Las personas detrás</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Un equipo conectado alrededor de ti
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Cada área de Hakamo trabaja sobre el mismo expediente. No te pasan de mano en mano: una
            sola coordinación acompaña tu proceso de principio a fin.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EQUIPO.map((persona) => (
              <article key={persona.cargo} className="rounded-[1.6rem] border border-ink/10 bg-white p-5">
                <p className="font-display text-xl text-accent">{persona.iniciales}</p>
                <h3 className="font-display mt-2 text-lg text-ink">{persona.cargo}</h3>
                <p className="mt-1 text-sm text-muted">{persona.area}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <MagneticButton href="/contacto" variant="ink">
              Hablar con el equipo
            </MagneticButton>
          </div>
        </div>
      </section>

      <Marquee items={CLIENTES.map((item) => item.nombre)} />
      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
