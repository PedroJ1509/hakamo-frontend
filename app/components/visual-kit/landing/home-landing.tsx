"use client";

import { CinematicTitle } from "../cinematic-title";
import { FondoSeccion } from "../fondo-seccion";
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
import { LogosClientes } from "../logos-clientes";
import { ObrasStrip } from "../obras-strip";
import type { ClienteLogo, Testimonio } from "@/lib/cms/clientes";
import { Testimonios } from "../testimonios";
import type { Obra } from "@/lib/cms/proyectos";
import { lineasTitulo } from "@/lib/cms/comun";
import type { ContenidoEmpresas } from "@/lib/cms/empresas";
import type { LandingCopy } from "@/lib/visual-kit/types";
import { LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";

export function HomeLanding({
  copy,
  contenido,
  obras = [],
  clientes = [],
  testimonios = [],
}: {
  copy: LandingCopy;
  contenido: ContenidoEmpresas;
  /** Prueba de experiencia: antes, /empresas solo enlazaba a /proyectos. */
  obras?: Obra[];
  clientes?: ClienteLogo[];
  testimonios?: Testimonio[];
}) {
  const { portada, imagenExpandible, fondoDatos, fondoCinta, fondoAccesos } = contenido;
  const lines = lineasTitulo(portada.titulo);
  const accesosClaro = fondoAccesos.tono === "claro";

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

      <LandingHeader />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.home} fondo={portada.fondo}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{portada.antetitulo}</p>
          <div className="mt-5">
            <CinematicTitle lines={lines} />
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">{portada.texto}</p>
          {portada.botonPrincipal || portada.botonSecundario ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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

      <LandingScrollExpand
        title={imagenExpandible.titulo}
        alt={imagenExpandible.alt}
        src={imagenExpandible.imagen}
        scrollHint={imagenExpandible.indicacion}
      >
        <p>{imagenExpandible.texto}</p>
      </LandingScrollExpand>

      <section className="relative isolate bg-paper px-4 py-20 sm:px-6 sm:py-28">
        <FondoSeccion fondo={fondoDatos} />
        <div className="relative mx-auto max-w-6xl">
          <StatsCounter stats={contenido.datos.map((d) => ({ value: d.valor, label: d.etiqueta }))} tono={fondoDatos.tono} />
        </div>
      </section>

      <div id="contenido" />

      <div className="relative isolate">
        <FondoSeccion fondo={fondoCinta} />
        <div className={fondoCinta.color || fondoCinta.imagen ? "relative [&_.marquee]:bg-transparent" : "relative"}>
          <Marquee items={contenido.cinta} />
        </div>
      </div>

      {/* Prueba antes del menú: quien llega aquí ve obras y clientes sin salir de la página. */}
      {obras.length > 0 || clientes.length > 0 || testimonios.length > 0 ? (
        <div className="bg-paper">
          <ObrasStrip
            obras={obras}
            antetitulo="Obras en campo"
            titulo="Así se ve el trabajo de Hakamo"
            texto="Equipos completos, nómina al día y cumplimiento en regla, en obras de energía, construcción e industria."
            enlace={{ texto: "Ver todas las obras", url: "/proyectos" }}
            className="pb-6 sm:pb-8"
          />
          <LogosClientes clientes={clientes} titulo="Empresas que confían en Hakamo" />
          {/* Tras los logos: primero quiénes son, luego qué dicen. */}
          <Testimonios testimonios={testimonios} className="pt-10 sm:pt-12" />
        </div>
      ) : null}

      <section className="relative isolate bg-paper px-4 py-20 sm:px-6 sm:py-24">
        <FondoSeccion fondo={fondoAccesos} />
        <div className="relative mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {contenido.accesos.map((acceso, index) => (
            <Reveal key={acceso.url + index} delay={index * 60} from="up">
              <a href={acceso.url} className="group block">
                {acceso.imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element -- imagen del CMS de tamaño libre
                  <img src={acceso.imagen} alt="" className="mb-4 aspect-[4/3] w-full rounded-2xl object-cover" loading="lazy" />
                ) : null}
                <p className={`text-[11px] uppercase tracking-[0.32em] ${accesosClaro ? "text-glow" : "text-accent"}`}>{acceso.antetitulo}</p>
                <h2 className={`font-display mt-3 text-2xl leading-snug sm:text-3xl ${accesosClaro ? "text-paper" : "text-ink"}`}>{acceso.titulo}</h2>
                <p className={`mt-4 text-sm transition ${accesosClaro ? "text-paper/70 group-hover:text-glow" : "text-muted group-hover:text-accent"}`}>
                  {acceso.textoEnlace}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
