"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PROJECT_FEATURES, PROJECT_FIELD_GALLERY } from "@/lib/demo-proyectos";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { Marquee } from "../marquee";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";

const ESTADO_LABEL: Record<string, string> = {
  en_proceso: "En proceso",
  completado: "Completado",
  destacado: "Destacado",
};

const STRIP = PROJECT_FIELD_GALLERY.filter((item) => item.type === "image").slice(0, 3);
const CLIPS = PROJECT_FIELD_GALLERY.filter((item) => item.type === "video");

function ClipStage({
  poster,
  alt,
  href,
  label,
  src,
}: {
  poster: string;
  alt: string;
  href?: string;
  label?: string;
  src?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative min-h-[70svh] overflow-hidden bg-night">
      {src ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={poster}
          playsInline
          loop
          muted
          onClick={play}
        >
          <source src={src} />
        </video>
      ) : (
        <Image src={poster} alt={alt} fill className="object-cover" sizes="100vw" />
      )}
      <div className="hero-vignette" aria-hidden />
      <div className="hero-veil" aria-hidden />
      {!playing ? (
        src ? (
          <button type="button" className="projects-stage-play" onClick={play}>
            <span className="projects-play-icon" aria-hidden />
            <span>{label ?? "Reproducir"}</span>
          </button>
        ) : (
          <a href={href ?? "https://instagram.com/hakamord"} target="_blank" rel="noreferrer" className="projects-stage-play">
            <span className="projects-play-icon" aria-hidden />
            <span>{label ?? "Ver clip"}</span>
          </a>
        )
      ) : null}
      <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-6xl items-end px-4 pb-16 sm:px-6 sm:pb-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-glow">En campo</p>
          <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug text-paper sm:text-5xl">
            La obra, de cerca
          </h2>
        </div>
      </div>
    </div>
  );
}

export function ProjectsLanding() {
  const site = SITE_PUBLIC;
  const leadClip = CLIPS[0];

  return (
    <div className="landing">
      <ScrollProgress />
      <Grain />

      <a
        href="#obras"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
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
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.projects}>
        <div className="landing-hero-inner mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Proyectos</p>
          <div className="mt-5">
            <CinematicTitle lines={["Obras que sostienen", "la operación"]} />
          </div>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
            Construcción, energía e infraestructura. El talento en campo, de Manzanillo a todo el país.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#obras">Ver obras</MagneticButton>
            <MagneticButton href="#en-campo" variant="ghost">
              En campo
            </MagneticButton>
          </div>
        </div>
      </LandingHeroSection>

      <section className="grid grid-cols-3 bg-night" aria-label="Galería">
        {STRIP.map((photo) =>
          photo.type === "image" ? (
            <div key={photo.id} className="relative h-28 overflow-hidden sm:h-40 md:h-52">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="33vw" />
            </div>
          ) : null,
        )}
      </section>

      <section id="obras" className="scroll-mt-[var(--header-h)] bg-paper">
        {PROJECT_FEATURES[0] ? (
          <article className="relative min-h-[78svh] overflow-hidden bg-night text-paper">
            <Image
              src={PROJECT_FEATURES[0].imagen}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="hero-vignette" aria-hidden />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, color-mix(in srgb, var(--night) 82%, transparent) 0%, color-mix(in srgb, var(--night) 42%, transparent) 48%, transparent 100%)",
              }}
              aria-hidden
            />
            <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl items-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
              <div className="max-w-xl">
                <p className="text-[11px] uppercase tracking-[0.42em] text-glow">
                  01 · {ESTADO_LABEL[PROJECT_FEATURES[0].estado]}
                </p>
                <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.03em]">
                  {PROJECT_FEATURES[0].titulo}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-paper/75 sm:text-base">
                  {PROJECT_FEATURES[0].texto}
                </p>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-glow">
                  {PROJECT_FEATURES[0].rol}
                </p>
              </div>
            </div>
          </article>
        ) : null}

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {PROJECT_FEATURES.slice(1).map((project, index) => {
            const n = index + 2;
            const imageFirst = index % 2 === 1;
            const media = (
              <div className={`relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] ${index % 2 === 0 ? "lg:mt-10" : ""}`}>
                <Image
                  src={project.imagen}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                />
              </div>
            );
            const copy = (
              <div className={imageFirst ? "lg:pr-6" : "lg:pl-4"}>
                <p className="font-display text-5xl leading-none text-accent/80 sm:text-6xl">
                  {String(n).padStart(2, "0")}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-accent">
                  {ESTADO_LABEL[project.estado]} · {project.sector}
                </p>
                <h2 className="font-display mt-3 max-w-md text-3xl leading-snug text-ink sm:text-4xl">
                  {project.titulo}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-muted">{project.texto}</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70">
                  {project.rol}
                </p>
              </div>
            );

            return (
              <article
                key={project.id}
                className="grid items-center gap-8 border-t border-ink/10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20"
              >
                {imageFirst ? (
                  <>
                    {media}
                    {copy}
                  </>
                ) : (
                  <>
                    {copy}
                    {media}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="en-campo" className="scroll-mt-[var(--header-h)]">
        {leadClip && leadClip.type === "video" ? (
          <ClipStage
            poster={leadClip.poster}
            alt={leadClip.alt}
            href={leadClip.href}
            label={leadClip.label}
            src={leadClip.src}
          />
        ) : null}

      </section>

      <Marquee items={["Grupo Cafra", "Energía 2000", "Lindsayca Group", "TSK Dominicana", "Grupo Ramos"]} />

      <section className="bg-paper px-4 py-20 text-ink sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.42em] text-accent">Siguiente obra</p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">¿Su próximo proyecto?</h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted">
            Armamos el equipo, la nómina y el acompañamiento en campo desde el día uno.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/empresas/solicitar" variant="ink">
              Solicitar personal
            </MagneticButton>
            <a
              href="/empleos"
              className="inline-flex items-center justify-center rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              Busco empleo
            </a>
          </div>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
