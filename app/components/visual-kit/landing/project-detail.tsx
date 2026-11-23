"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { ContenidoProyecto, Obra } from "@/lib/cms/proyectos";
import { anclaServicio, servicioDeRol } from "@/lib/sectores";
import { Grain } from "../grain";
import { LandingHeader } from "../chrome-header";
import { MagneticButton } from "../magnetic-button";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";
import { SeccionBloque } from "../seccion";

const ESTADO_LABEL: Record<string, string> = {
  en_proceso: "En proceso",
  completado: "Completado",
  destacado: "Destacado",
};

/** Las imágenes del CMS vienen de otro dominio y se sirven tal cual. */
const externa = (src: string) => !src.startsWith("/");

/** Foto a pantalla completa, con flechas y teclado (← → Esc). */
function Visor({ imagenes, indice, titulo, onCerrar, onIr }: {
  imagenes: string[];
  indice: number;
  titulo: string;
  onCerrar: () => void;
  onIr: (indice: number) => void;
}) {
  const total = imagenes.length;
  const anterior = useCallback(() => onIr((indice - 1 + total) % total), [indice, total, onIr]);
  const siguiente = useCallback(() => onIr((indice + 1) % total), [indice, total, onIr]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
    };
    window.addEventListener("keydown", tecla);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = overflow;
    };
  }, [onCerrar, anterior, siguiente]);

  const src = imagenes[indice];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${titulo}: foto ${indice + 1} de ${total}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <div className="relative h-[80svh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image src={src} alt={`${titulo}, foto ${indice + 1}`} fill className="object-contain" sizes="100vw" unoptimized={externa(src)} />
      </div>
      <button
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl text-paper transition hover:border-glow hover:text-glow"
      >
        ×
      </button>
      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); anterior(); }}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-2xl text-paper transition hover:border-glow hover:text-glow sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); siguiente(); }}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-2xl text-paper transition hover:border-glow hover:text-glow sm:right-6"
          >
            ›
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-paper/60">
            {indice + 1} / {total}
          </p>
        </>
      ) : null}
    </div>
  );
}

/** Tarjeta de otra obra, que lleva a su página. */
function TarjetaObra({ obra, textoVer }: { obra: Obra; textoVer: string }) {
  return (
    <Link href={`/proyectos/${obra.id}`} className="group block">
      <div className="projects-frame relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={obra.imagen}
          alt=""
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={externa(obra.imagen)}
        />
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-accent">
        {[obra.estado ? ESTADO_LABEL[obra.estado] : "", obra.sector].filter(Boolean).join(" · ")}
      </p>
      <h3 className="font-display mt-2 text-2xl leading-snug text-ink transition group-hover:text-accent">{obra.titulo}</h3>
      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition group-hover:gap-3 group-hover:text-accent">
        {textoVer} <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

export function ProjectDetail({ contenido }: { contenido: ContenidoProyecto }) {
  const { obra, otras, ficha, cierre } = contenido;
  const [visor, setVisor] = useState<number | null>(null);
  const cerrar = useCallback(() => setVisor(null), []);

  // El rol enlaza al servicio que lo describe: la obra prueba el servicio.
  const servicioRol = servicioDeRol(obra.rol);
  const datosFicha: { etiqueta: string; valor: string; url?: string }[] = [
    { etiqueta: "Cliente", valor: obra.cliente },
    { etiqueta: "Ubicación", valor: obra.ubicacion },
    { etiqueta: "Sector", valor: obra.sector },
    {
      etiqueta: "Rol de Hakamo",
      valor: obra.rol,
      url: servicioRol ? `/servicios#${anclaServicio(servicioRol)}` : undefined,
    },
    { etiqueta: "Estado", valor: obra.estado ? ESTADO_LABEL[obra.estado] : "" },
    { etiqueta: "Fecha", valor: obra.fecha },
  ].filter((d) => d.valor);

  const galeria = obra.imagenes.length > 1 ? obra.imagenes : [];

  return (
    <div className="landing">
      <ScrollProgress />
      <Grain />
      <LandingHeader />

      {/* Portada: la primera foto de la obra a pantalla completa */}
      <section className="relative isolate min-h-[82svh] overflow-hidden bg-night text-paper">
        <Image src={obra.imagen} alt="" fill priority className="projects-hero-photo object-cover" sizes="100vw" unoptimized={externa(obra.imagen)} />
        <div className="hero-vignette" aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, color-mix(in srgb, var(--night) 92%, transparent) 0%, color-mix(in srgb, var(--night) 45%, transparent) 55%, color-mix(in srgb, var(--night) 25%, transparent) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20">
          <Link
            href="/proyectos#obras"
            className="visit-rise mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-paper/80 transition hover:border-glow hover:text-glow"
          >
            <span aria-hidden>←</span> {ficha.textoVolver}
          </Link>
          {obra.estado || obra.sector ? (
            <p className="visit-rise text-[11px] uppercase tracking-[0.42em] text-glow" style={{ animationDelay: "80ms" }}>
              {[obra.estado ? ESTADO_LABEL[obra.estado] : "", obra.sector].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          <h1
            className="visit-rise font-display mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5.4rem)] leading-[1.02] tracking-[-0.03em]"
            style={{ animationDelay: "160ms" }}
          >
            {obra.titulo}
          </h1>
          {obra.texto ? (
            <p className="visit-rise mt-6 max-w-2xl text-base leading-7 text-paper/75 sm:text-lg" style={{ animationDelay: "240ms" }}>
              {obra.texto}
            </p>
          ) : null}
        </div>
      </section>

      {/* Cifras destacadas */}
      {obra.datos.length > 0 ? (
        <section className="border-b border-white/10 bg-night text-paper">
          <div
            className="mx-auto grid max-w-6xl gap-px px-4 sm:px-6"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 11rem), 1fr))` }}
          >
            {obra.datos.map((d, i) => (
              <Reveal key={d.etiqueta + i} from="up" delay={i * 80} className="py-10">
                <p className="font-display text-4xl text-glow sm:text-5xl">{d.valor}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-paper/60">{d.etiqueta}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Relato de la obra y su ficha */}
      <section className="bg-paper px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="min-w-0">
            {obra.contenido ? (
              <Reveal from="up">
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-a:text-accent prose-strong:text-ink">
                  <ReactMarkdown>{obra.contenido}</ReactMarkdown>
                </div>
              </Reveal>
            ) : obra.texto ? (
              <Reveal from="up">
                <p className="text-lg leading-8 text-muted">{obra.texto}</p>
              </Reveal>
            ) : null}

            {obra.alcance.length > 0 ? (
              <Reveal from="up" delay={80} className="mt-12">
                <h2 className="font-display text-3xl text-ink">{ficha.tituloAlcance}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {obra.alcance.map((item, i) => (
                    <li key={item + i} className="flex gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4 text-sm leading-6 text-ink">
                      <span className="font-display text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>

          {datosFicha.length > 0 ? (
            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <Reveal from="right">
                <div className="rounded-3xl bg-night p-7 text-paper">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-glow">{ficha.tituloFicha}</p>
                  <dl className="mt-6 space-y-5">
                    {datosFicha.map((d) => (
                      <div key={d.etiqueta} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                        <dt className="text-[11px] uppercase tracking-[0.2em] text-paper/50">{d.etiqueta}</dt>
                        <dd className="mt-1 text-sm leading-6 text-paper first-letter:uppercase">
                          {d.url ? (
                            <Link
                              href={d.url}
                              className="group underline decoration-paper/30 underline-offset-4 transition hover:text-glow hover:decoration-glow"
                            >
                              {d.valor}
                              <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                                &rarr;
                              </span>
                            </Link>
                          ) : (
                            d.valor
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </aside>
          ) : null}
        </div>
      </section>

      {/* Galería: cada foto se abre en grande */}
      {galeria.length > 0 ? (
        <section className="bg-night px-4 py-16 text-paper sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal from="up">
              <h2 className="font-display text-3xl sm:text-4xl">{ficha.tituloGaleria}</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {galeria.map((src, i) => (
                <Reveal key={src + i} from="up" delay={(i % 3) * 80} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                  <button
                    type="button"
                    onClick={() => setVisor(i)}
                    aria-label={`Ver foto ${i + 1} en grande`}
                    className="group relative block aspect-square w-full overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                      unoptimized={externa(src)}
                    />
                    <span className="absolute inset-0 bg-night/0 transition group-hover:bg-night/20" aria-hidden />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Otras obras */}
      {otras.length > 0 ? (
        <section className="bg-paper px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal from="up">
                <h2 className="font-display text-3xl text-ink sm:text-4xl">{ficha.tituloOtros}</h2>
              </Reveal>
              <Link href="/proyectos#obras" className="text-sm font-semibold text-ink/70 transition hover:text-accent">
                {ficha.textoVolver} →
              </Link>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {otras.map((o, i) => (
                <Reveal key={o.id} from="up" delay={i * 80}>
                  <TarjetaObra obra={o} textoVer={ficha.textoVerProyecto} />
                </Reveal>
              ))}
            </div>
          </div>
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

      {visor !== null ? <Visor imagenes={galeria} indice={visor} titulo={obra.titulo} onCerrar={cerrar} onIr={setVisor} /> : null}
    </div>
  );
}
