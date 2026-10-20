"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { lineasTitulo } from "@/lib/cms/comun";
import type { Clip, ContenidoProyectos } from "@/lib/cms/proyectos";
import { LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";
import { Encabezado, paleta, SeccionBloque } from "../seccion";
import { FondoSeccion } from "../fondo-seccion";

const ESTADO_LABEL: Record<string, string> = {
  en_proceso: "En proceso",
  completado: "Completado",
  destacado: "Destacado",
};

/** Las imágenes del CMS vienen de otro dominio y se sirven tal cual. */
const externa = (src: string) => !src.startsWith("/");

function ClipStage({ clip }: { clip: Clip }) {
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
      {clip.video ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={clip.imagen}
          playsInline
          loop
          muted
          onClick={play}
        >
          <source src={clip.video} />
        </video>
      ) : (
        <Image src={clip.imagen} alt="" fill className="object-cover" sizes="100vw" unoptimized={externa(clip.imagen)} />
      )}
      <div className="hero-vignette" aria-hidden />
      <div className="hero-veil" aria-hidden />
      {!playing ? (
        clip.video ? (
          <button type="button" className="projects-stage-play" onClick={play}>
            <span className="projects-play-icon" aria-hidden />
            <span>{clip.textoBoton}</span>
          </button>
        ) : (
          <a href={clip.enlace} target="_blank" rel="noreferrer" className="projects-stage-play">
            <span className="projects-play-icon" aria-hidden />
            <span>{clip.textoBoton}</span>
          </a>
        )
      ) : null}
      <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-6xl items-end px-4 pb-16 sm:px-6 sm:pb-20">
        <Reveal from="up">
          <p className="text-[11px] uppercase tracking-[0.42em] text-glow">{clip.antetitulo}</p>
          <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug text-paper sm:text-5xl">{clip.titulo}</h2>
        </Reveal>
      </div>
    </div>
  );
}

export function ProjectsLanding({ contenido }: { contenido: ContenidoProyectos }) {
  const { portada, galeria, obras, clip, cierre, listaObras } = contenido;
  const [principal, ...resto] = listaObras;
  const obrasClaro = obras.fondo.tono === "claro";

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

      <LandingHeader />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.projects} fondo={portada.fondo}>
        <div className="landing-hero-inner mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="visit-rise text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{portada.antetitulo}</p>
          <div className="visit-rise mt-5" style={{ animationDelay: "90ms" }}>
            <CinematicTitle lines={lineasTitulo(portada.titulo)} />
          </div>
          {portada.texto ? (
            <p className="visit-rise mx-auto mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base" style={{ animationDelay: "180ms" }}>
              {portada.texto}
            </p>
          ) : null}
          {portada.botonPrincipal || portada.botonSecundario ? (
            <div className="visit-rise mt-8 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "280ms" }}>
              {portada.botonPrincipal ? (
                <MagneticButton href={portada.botonPrincipal.url} external={portada.botonPrincipal.url.startsWith("http")}>
                  {portada.botonPrincipal.texto}
                </MagneticButton>
              ) : null}
              {portada.botonSecundario ? (
                <MagneticButton href={portada.botonSecundario.url} external={portada.botonSecundario.url.startsWith("http")} variant="ghost">
                  {portada.botonSecundario.texto}
                </MagneticButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </LandingHeroSection>

      {galeria.mostrar && galeria.elementos.length > 0 ? (
        <section
          className="grid bg-night"
          style={{ gridTemplateColumns: `repeat(${Math.min(galeria.elementos.length, 4)}, minmax(0, 1fr))` }}
          aria-label="Galería"
        >
          {galeria.elementos.map((foto, index) =>
            foto.imagen ? (
              <div
                key={foto.imagen + index}
                className="projects-strip-item relative h-28 overflow-hidden sm:h-40 md:h-52"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <Image
                  src={foto.imagen}
                  alt={foto.titulo}
                  fill
                  className="projects-photo object-cover"
                  sizes="33vw"
                  unoptimized={externa(foto.imagen)}
                />
              </div>
            ) : null,
          )}
        </section>
      ) : null}

      {obras.mostrar ? (
        <section id="obras" className="relative isolate scroll-mt-[var(--header-h)] bg-paper">
          <FondoSeccion fondo={obras.fondo} />
          {principal ? (
            <article className="relative min-h-[78svh] overflow-hidden bg-night text-paper">
              <Image src={principal.imagen} alt="" fill className="projects-hero-photo object-cover" sizes="100vw" unoptimized={externa(principal.imagen)} />
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
                <Reveal from="up" className="max-w-xl">
                  <p className="text-[11px] uppercase tracking-[0.42em] text-glow">
                    01{principal.estado ? ` · ${ESTADO_LABEL[principal.estado]}` : ""}
                  </p>
                  <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.03em]">{principal.titulo}</h2>
                  <p className="mt-5 max-w-md text-sm leading-6 text-paper/75 sm:text-base">{principal.texto}</p>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-glow">{principal.rol}</p>
                </Reveal>
              </div>
            </article>
          ) : null}

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            {obras.titulo ? (
              <div className="pt-14 sm:pt-16">
                <div className={paleta(obras.fondo.tono).texto}>
                  <Encabezado s={obras} p={paleta(obras.fondo.tono)} />
                </div>
              </div>
            ) : null}
            {resto.map((project, index) => {
              const n = index + 2;
              const imageFirst = index % 2 === 1;
              const media = (
                <Reveal
                  from={imageFirst ? "left" : "right"}
                  className={`projects-frame relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] ${index % 2 === 0 ? "lg:mt-10" : ""}`}
                >
                  <Image
                    src={project.imagen}
                    alt=""
                    fill
                    className="projects-photo object-cover"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    unoptimized={externa(project.imagen)}
                  />
                </Reveal>
              );
              const copy = (
                <Reveal from={imageFirst ? "right" : "left"} delay={80} className={imageFirst ? "lg:pr-6" : "lg:pl-4"}>
                  <p className={`font-display text-5xl leading-none sm:text-6xl ${obrasClaro ? "text-glow/80" : "text-accent/80"}`}>
                    {String(n).padStart(2, "0")}
                  </p>
                  <p className={`mt-4 text-[11px] uppercase tracking-[0.28em] ${obrasClaro ? "text-glow" : "text-accent"}`}>
                    {[project.estado ? ESTADO_LABEL[project.estado] : "", project.sector].filter(Boolean).join(" · ")}
                  </p>
                  <h2 className={`font-display mt-3 max-w-md text-3xl leading-snug sm:text-4xl ${obrasClaro ? "text-paper" : "text-ink"}`}>
                    {project.titulo}
                  </h2>
                  <p className={`mt-4 max-w-md text-sm leading-6 ${obrasClaro ? "text-paper/65" : "text-muted"}`}>{project.texto}</p>
                  <p className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] ${obrasClaro ? "text-paper/70" : "text-ink/70"}`}>
                    {project.rol}
                  </p>
                </Reveal>
              );

              return (
                <article
                  key={project.id}
                  className={`grid items-center gap-8 border-t py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20 ${obrasClaro ? "border-white/10" : "border-ink/10"}`}
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
      ) : null}

      {clip.mostrar ? (
        <section id="en-campo" className="scroll-mt-[var(--header-h)]">
          <ClipStage clip={clip} />
        </section>
      ) : null}

      {cierre.mostrar ? (
        <SeccionBloque fondo={cierre.fondo} base="paper" className="px-4 py-20 sm:px-6 sm:py-24">
          {(p) => (
            <Reveal from="up" className="mx-auto max-w-3xl text-center">
              {cierre.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.42em] ${p.acento}`}>{cierre.antetitulo}</p> : null}
              <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl">{cierre.titulo}</h2>
              {cierre.texto ? <p className={`mx-auto mt-5 max-w-md text-sm leading-6 ${p.suave}`}>{cierre.texto}</p> : null}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {cierre.boton ? (
                  <MagneticButton href={cierre.boton.url} external={cierre.boton.url.startsWith("http")} variant={cierre.fondo.tono === "claro" ? "glow" : "ink"}>
                    {cierre.boton.texto}
                  </MagneticButton>
                ) : null}
                {cierre.botonSecundario ? (
                  <a
                    href={cierre.botonSecundario.url}
                    className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition ${
                      cierre.fondo.tono === "claro" ? "border-white/25 text-paper hover:border-glow hover:text-glow" : "border-ink/15 text-ink hover:border-accent hover:text-accent"
                    }`}
                  >
                    {cierre.botonSecundario.texto}
                  </a>
                ) : null}
              </div>
            </Reveal>
          )}
        </SeccionBloque>
      ) : null}

      <PublicFooter />
    </div>
  );
}
