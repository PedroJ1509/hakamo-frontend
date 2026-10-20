"use client";

import { useSitio } from "@/app/components/sitio-context";
import { lineasTitulo } from "@/lib/cms/comun";
import type { ContenidoServicios } from "@/lib/cms/servicios";
import { LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { CinematicTitle } from "../cinematic-title";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";
import { BotonSeccion, CONTINUA, Encabezado, ItemImagen, numero, SeccionBloque } from "../seccion";
import { ServiceTimeline } from "../service-timeline";

export function ServicesLanding({ contenido }: { contenido: ContenidoServicios }) {
  const { contacto } = useSitio();
  const { portada, catalogo, seguridad, valor, proceso, sectores, marcoLegal, cierre } = contenido;

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

      <LandingHeader />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.services} fondo={portada.fondo}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="visit-rise text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{portada.antetitulo}</p>
          <div className="visit-rise mt-5" style={{ animationDelay: "90ms" }}>
            <CinematicTitle lines={lineasTitulo(portada.titulo)} />
          </div>
          {portada.texto ? (
            <p className="visit-rise mt-6 max-w-2xl text-sm leading-6 text-paper/70 sm:text-base" style={{ animationDelay: "150ms" }}>
              {portada.texto}
            </p>
          ) : null}
          {portada.botonPrincipal || portada.botonSecundario ? (
            <div className="visit-rise mt-8 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "200ms" }}>
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

      <div id="contenido" className="scroll-mt-[var(--header-h)]">
        {catalogo.mostrar ? <ServiceTimeline items={contenido.servicios} seccion={catalogo} /> : null}
      </div>

      {seguridad.mostrar ? (
        <div id="seguridad" className="scroll-mt-[var(--header-h)]">
          <SeccionBloque fondo={seguridad.fondo} base="paper" className="px-4 pt-20 pb-12 sm:px-6 sm:pt-28">
            {(p) => (
              <div className={`grid items-end gap-8 border-b ${p.linea} pb-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16`}>
                <Reveal from="left">
                  {seguridad.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{seguridad.antetitulo}</p> : null}
                  <h2 className="font-display mt-4 text-3xl leading-[1.15] sm:text-5xl">{seguridad.titulo}</h2>
                </Reveal>
                <Reveal from="right" delay={80}>
                  <p className={`max-w-xl text-base leading-7 ${p.suave} lg:justify-self-end`}>{seguridad.texto}</p>
                  <BotonSeccion s={seguridad} />
                </Reveal>
              </div>
            )}
          </SeccionBloque>
        </div>
      ) : null}

      {valor.mostrar ? (
        <SeccionBloque fondo={valor.fondo} base="paper" className="px-4 pt-4 pb-20 sm:px-6 sm:pb-28">
          {(p) => (
            <div className="mt-12 lg:mt-16">
              <Encabezado s={valor} p={p} grande={false} />
              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
                {valor.elementos.map((item, index) => (
                  <Reveal
                    key={item.titulo + index}
                    from="up"
                    delay={index * 70}
                    className={`border-t ${p.borde} py-7 sm:px-6 sm:first:pl-0 lg:[&:nth-child(4)]:pr-0`}
                  >
                    <ItemImagen item={item} />
                    <p className={`font-display text-3xl leading-none ${p.acento}`}>{item.etiqueta || numero(index)}</p>
                    <h3 className="font-display mt-5 text-xl leading-snug">{item.titulo}</h3>
                    <p className={`mt-3 text-sm leading-6 ${p.suave}`}>{item.texto}</p>
                  </Reveal>
                ))}
              </div>
              <BotonSeccion s={valor} />
            </div>
          )}
        </SeccionBloque>
      ) : null}

      {proceso.mostrar ? (
        <SeccionBloque fondo={proceso.fondo} base="night">
          {(p) => (
            <>
              <Encabezado s={proceso} p={p} lado />
              <ol className="mt-14 grid gap-x-8 lg:grid-cols-4">
                {proceso.elementos.map((paso, index) => (
                  <li key={paso.titulo + index}>
                    <Reveal from="up" delay={index * 80} className={`border-t ${p.fuerte} pt-6 pb-10`}>
                      <ItemImagen item={paso} />
                      <p className={`font-display text-4xl leading-none ${p.acento}`}>{paso.etiqueta || numero(index)}</p>
                      <h3 className="font-display mt-6 text-2xl leading-snug">{paso.titulo}</h3>
                      <p className={`mt-3 text-sm leading-6 ${p.suave}`}>{paso.texto}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
              <BotonSeccion s={proceso} />
            </>
          )}
        </SeccionBloque>
      ) : null}

      {sectores.mostrar ? (
        <SeccionBloque fondo={sectores.fondo} base="night" className={CONTINUA}>
          {(p) => (
            <div className={`border-t ${p.linea} pt-16`}>
              <Encabezado s={sectores} p={p} grande={false} />
              <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
                {sectores.elementos.map((sector, index) => (
                  <li key={sector.titulo + index}>
                    <Reveal from="up" delay={index * 60} className={`border-t ${p.borde} py-7 sm:pr-8`}>
                      <ItemImagen item={sector} />
                      <p className={`text-xs tracking-[0.2em] ${p.acento}`}>{sector.etiqueta || numero(index)}</p>
                      <p className="font-display mt-3 text-2xl leading-snug">{sector.titulo}</p>
                      {sector.texto ? <p className={`mt-2 text-sm leading-6 ${p.suave}`}>{sector.texto}</p> : null}
                    </Reveal>
                  </li>
                ))}
              </ul>
              <BotonSeccion s={sectores} />
            </div>
          )}
        </SeccionBloque>
      ) : null}

      {marcoLegal.mostrar ? (
        <SeccionBloque fondo={marcoLegal.fondo} base="paper">
          {(p) => (
            <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-20">
              <Reveal from="left" className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
                {marcoLegal.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{marcoLegal.antetitulo}</p> : null}
                <h2 className="font-display mt-4 text-3xl leading-snug sm:text-4xl">{marcoLegal.titulo}</h2>
                {marcoLegal.texto ? <p className={`mt-4 max-w-sm text-sm leading-6 ${p.suave}`}>{marcoLegal.texto}</p> : null}
                <BotonSeccion s={marcoLegal} />
              </Reveal>
              <ol className={`divide-y ${p.divisor} border-y ${p.linea}`}>
                {marcoLegal.elementos.map((item, index) => (
                  <li key={item.titulo + index}>
                    <Reveal
                      from="up"
                      delay={index * 50}
                      className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <span className={`font-display text-2xl leading-none ${p.acento} sm:text-3xl`} aria-hidden>
                        {item.etiqueta || numero(index)}
                      </span>
                      <div>
                        <h3 className="font-display text-xl leading-snug sm:text-2xl">{item.titulo}</h3>
                        <p className={`mt-2 max-w-xl text-sm leading-6 ${p.suave}`}>{item.texto}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </SeccionBloque>
      ) : null}

      {cierre.mostrar ? (
        <SeccionBloque fondo={cierre.fondo} base="night" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          {(p) => (
            <Reveal from="up" className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl leading-snug sm:text-5xl">{cierre.titulo}</h2>
                {cierre.texto ? <p className={`mt-4 text-sm leading-6 ${p.suave}`}>{cierre.texto}</p> : null}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {cierre.boton ? (
                  <MagneticButton href={cierre.boton.url} external={cierre.boton.url.startsWith("http")}>
                    {cierre.boton.texto}
                  </MagneticButton>
                ) : null}
                <MagneticButton href={contacto.whatsappUrl} variant="ghost" external>
                  WhatsApp
                </MagneticButton>
              </div>
            </Reveal>
          )}
        </SeccionBloque>
      ) : null}

      <PublicFooter />
    </div>
  );
}
