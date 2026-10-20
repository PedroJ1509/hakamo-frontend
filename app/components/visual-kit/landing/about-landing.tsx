"use client";

import { lineasTitulo } from "@/lib/cms/comun";
import type { ContenidoNosotros } from "@/lib/cms/nosotros";
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

export function AboutLanding({ contenido }: { contenido: ContenidoNosotros }) {
  const { portada, trayectoria, misionVision, valores, pilares, equipo, formacion, actividades, clientes } = contenido;

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

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.about} fondo={portada.fondo}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="visit-rise text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{portada.antetitulo}</p>
          <div className="visit-rise mt-5" style={{ animationDelay: "90ms" }}>
            <CinematicTitle lines={lineasTitulo(portada.titulo)} />
          </div>
          <p className="visit-rise mt-6 max-w-2xl text-sm leading-6 text-paper/70 sm:text-base" style={{ animationDelay: "180ms" }}>
            {portada.texto}
          </p>
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

      <div id="contenido">
        {trayectoria.mostrar ? (
          <SeccionBloque fondo={trayectoria.fondo} base="paper">
            {(p) => (
              <>
                <Encabezado s={trayectoria} p={p} />
                <div className="mt-14 grid lg:grid-cols-2">
                  {trayectoria.elementos.map((item, index) => (
                    <Reveal
                      key={item.titulo + index}
                      from="up"
                      delay={index * 80}
                      className={`border-t ${p.borde} py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0`}
                    >
                      <ItemImagen item={item} />
                      <p className={`font-display text-4xl leading-none ${p.acento}`}>{item.etiqueta}</p>
                      <h3 className="font-display mt-5 text-2xl leading-snug">{item.titulo}</h3>
                      <p className={`mt-3 max-w-md text-sm leading-6 ${p.suave}`}>{item.texto}</p>
                    </Reveal>
                  ))}
                </div>
                <BotonSeccion s={trayectoria} />
              </>
            )}
          </SeccionBloque>
        ) : null}

        {misionVision.mostrar ? (
          <SeccionBloque fondo={misionVision.fondo} base="night">
            {(p) => (
              <>
                <Encabezado s={misionVision} p={p} />
                <div className="mt-14 grid lg:grid-cols-2">
                  {misionVision.elementos.map((item, index) => (
                    <Reveal
                      key={item.titulo + index}
                      from={index % 2 === 0 ? "left" : "right"}
                      delay={index * 80}
                      className={`border-t ${p.fuerte} py-8 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}
                    >
                      <ItemImagen item={item} />
                      <h3 className="font-display text-2xl leading-snug">{item.titulo}</h3>
                      <p className={`mt-4 max-w-md text-sm leading-6 ${p.suave}`}>{item.texto}</p>
                    </Reveal>
                  ))}
                </div>
                <BotonSeccion s={misionVision} />
              </>
            )}
          </SeccionBloque>
        ) : null}

        {valores.mostrar ? (
          <SeccionBloque fondo={valores.fondo} base="night" className={CONTINUA}>
            {(p) => (
              <div className={`grid gap-10 border-t ${p.linea} pt-16 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16`}>
                <Reveal from="left">
                  {valores.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{valores.antetitulo}</p> : null}
                  <h2 className="font-display mt-3 text-3xl leading-snug sm:text-4xl">{valores.titulo}</h2>
                  {valores.texto ? <p className={`mt-4 max-w-sm text-sm leading-6 ${p.suave}`}>{valores.texto}</p> : null}
                  <BotonSeccion s={valores} />
                </Reveal>
                <ol className={`divide-y ${p.divisor} border-y ${p.linea}`}>
                  {valores.elementos.map((valor, index) => (
                    <li key={valor.titulo + index}>
                      <Reveal
                        from="up"
                        delay={index * 50}
                        className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[4rem_minmax(0,1fr)]"
                      >
                        <span className={`font-display text-xl leading-none ${p.acento}`} aria-hidden>
                          {valor.etiqueta || numero(index)}
                        </span>
                        <div>
                          <h3 className="font-display text-xl leading-snug">{valor.titulo}</h3>
                          <p className={`mt-2 text-sm leading-6 ${p.suave}`}>{valor.texto}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </SeccionBloque>
        ) : null}

        {pilares.mostrar ? (
          <SeccionBloque fondo={pilares.fondo} base="paper">
            {(p) => (
              <>
                <Encabezado s={pilares} p={p} lado />
                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
                  {pilares.elementos.map((pilar, index) => (
                    <Reveal key={pilar.titulo + index} from="up" delay={index * 70} className={`border-t ${p.borde} py-7 sm:px-6 sm:first:pl-0`}>
                      <ItemImagen item={pilar} />
                      <p className={`font-display text-3xl leading-none ${p.acento}`}>{pilar.etiqueta || numero(index)}</p>
                      <h3 className="font-display mt-5 text-xl leading-snug">{pilar.titulo}</h3>
                      <p className={`mt-3 text-sm leading-6 ${p.suave}`}>{pilar.texto}</p>
                    </Reveal>
                  ))}
                </div>
                <BotonSeccion s={pilares} />
              </>
            )}
          </SeccionBloque>
        ) : null}

        {equipo.mostrar ? (
          <SeccionBloque fondo={equipo.fondo} base="night">
            {(p) => (
              <>
                <Encabezado s={equipo} p={p} lado />
                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
                  {equipo.elementos.map((persona, index) => (
                    <Reveal key={persona.titulo + index} delay={index * 90} from="up">
                      <article className={`border-t ${p.borde} py-7 sm:px-6 ${index === 0 ? "sm:pl-0" : ""}`}>
                        {persona.imagen ? (
                          <ItemImagen item={persona} className="h-20 w-20 rounded-full object-cover" />
                        ) : (
                          <p className={`font-display text-3xl leading-none ${p.acento}`}>{persona.etiqueta}</p>
                        )}
                        <h3 className="font-display mt-5 text-xl leading-snug">{persona.titulo}</h3>
                        <p className={`mt-2 text-sm ${p.suave}`}>{persona.texto}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
                <BotonSeccion s={equipo} />
              </>
            )}
          </SeccionBloque>
        ) : null}

        {formacion.mostrar ? (
          <SeccionBloque fondo={formacion.fondo} base="night" className={CONTINUA}>
            {(p) => (
              <div className={`border-t ${p.linea} pt-16`}>
                <Encabezado s={formacion} p={p} grande={false} />
                <div className="mt-10 grid lg:grid-cols-2">
                  {formacion.elementos.map((item, index) => (
                    <Reveal key={item.titulo + index} delay={index * 120} from={index % 2 === 0 ? "left" : "right"}>
                      <article className={`border-t ${p.borde} py-8 lg:px-8 ${index % 2 === 0 ? "lg:pl-0" : "lg:pr-0"}`}>
                        <ItemImagen item={item} />
                        <h3 className="font-display text-2xl leading-snug">{item.titulo}</h3>
                        <p className={`mt-3 max-w-md text-sm leading-6 ${p.suave}`}>{item.texto}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
                <BotonSeccion s={formacion} />
              </div>
            )}
          </SeccionBloque>
        ) : null}

        {actividades.mostrar ? (
          <SeccionBloque fondo={actividades.fondo} base="night" className={CONTINUA}>
            {(p) => (
              <div className={`border-t ${p.linea} pt-16`}>
                <Encabezado s={actividades} p={p} grande={false} />
                <ul className={`mt-10 divide-y ${p.divisor} border-y ${p.linea}`}>
                  {actividades.elementos.map((item, index) => (
                    <li key={item.titulo + index}>
                      <Reveal delay={index * 70} from="up">
                        <div className="grid gap-2 py-5 md:grid-cols-[16rem_minmax(0,1fr)] md:items-baseline md:gap-10">
                          <h3 className="font-display text-xl leading-snug">{item.titulo}</h3>
                          <div>
                            <ItemImagen item={item} className="mb-3 aspect-[16/9] w-full max-w-md rounded-2xl object-cover" />
                            <p className={`text-sm leading-6 ${p.suave}`}>{item.texto}</p>
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
                <BotonSeccion s={actividades} />
              </div>
            )}
          </SeccionBloque>
        ) : null}

        {clientes.mostrar ? (
          <SeccionBloque fondo={clientes.fondo} base="paper">
            {(p) => (
              <>
                <Encabezado s={clientes} p={p} lado />
                <div className={`mt-14 divide-y ${p.divisor} border-y ${p.linea}`}>
                  {contenido.listaClientes.map((cliente, index) => (
                    <Reveal
                      key={cliente.nombre + index}
                      from="up"
                      delay={index * 40}
                      className="grid gap-2 py-6 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
                    >
                      <span className={`font-display text-xl ${p.acento}`}>{numero(index)}</span>
                      <h3 className="font-display text-2xl leading-snug">{cliente.nombre}</h3>
                      <p className={`text-sm ${p.suave}`}>{cliente.sector}</p>
                    </Reveal>
                  ))}
                </div>
                <BotonSeccion s={clientes} />
              </>
            )}
          </SeccionBloque>
        ) : null}
      </div>

      <PublicFooter />
    </div>
  );
}
