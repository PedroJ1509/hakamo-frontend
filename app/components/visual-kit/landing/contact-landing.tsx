"use client";

import { useSitio } from "@/app/components/sitio-context";
import { lineasTitulo, type Item } from "@/lib/cms/comun";
import type { ContenidoContacto } from "@/lib/cms/contacto";
import type { Contacto, Red } from "@/lib/cms/sitio";
import ContactForm from "@/app/components/ui/ContactForm";
import { LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";
import { Grain } from "../grain";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { Reveal } from "../reveal";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { Encabezado, ItemImagen, SeccionBloque } from "../seccion";
import { RoutePanel } from "./route-panel";

/** Tarjetas de contacto armadas con los datos de la Configuración del sitio. */
function canalesDesdeContacto(contacto: Contacto, redes: Red[]): Item[] {
  const canales: Omit<Item, "subtitulo">[] = [
    { etiqueta: "WhatsApp / Cotizaciones", titulo: contacto.telefono, texto: "Respuesta rápida para proyectos y consultas", enlace: contacto.whatsappUrl, imagen: null },
    { etiqueta: "Teléfono", titulo: contacto.telefonoAlt, texto: "Línea directa con el equipo Hakamo", enlace: contacto.telefonoAltUrl, imagen: null },
    { etiqueta: "Correo gestión", titulo: contacto.email, texto: "Cotizaciones y atención empresarial", enlace: `mailto:${contacto.email}`, imagen: null },
    { etiqueta: "Dirección", titulo: contacto.direccion, texto: "Oficina de Hakamo", enlace: contacto.mapaUrl, imagen: null },
    {
      etiqueta: "Redes",
      titulo: redes[0]?.texto || redes[0]?.nombre || "",
      texto: redes.slice(1).map((red) => red.texto || red.nombre).join(" · "),
      enlace: redes[0]?.url ?? "",
      imagen: null,
    },
  ];
  return canales.filter((canal) => canal.enlace && canal.titulo).map((canal) => ({ ...canal, subtitulo: "" }));
}

const externo = (href: string) => /^https?:/.test(href);

export function ContactLanding({ contenido }: { contenido: ContenidoContacto }) {
  const { contacto, redes } = useSitio();
  const { portada, canales, formulario, ruta } = contenido;
  const [linea1, ...resto] = lineasTitulo(portada.titulo);
  const tarjetas = canales.elementos.length > 0 ? canales.elementos : canalesDesdeContacto(contacto, redes);

  return (
    <div className="landing min-h-[100svh] bg-night text-paper">
      <ScrollProgress />
      <Grain />

      <a
        href="#formulario"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        Saltar al formulario
      </a>

      <LandingHeader />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.contact} fondo={portada.fondo}>
        <div className="landing-hero-inner mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">{portada.antetitulo}</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] text-paper">
            {linea1}
            {resto.length > 0 ? <span className="mt-1 block italic text-glow">{resto.join(" ")}</span> : null}
          </h1>
          {portada.texto ? <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-paper/70 sm:text-base">{portada.texto}</p> : null}
          {portada.botonPrincipal || portada.botonSecundario ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {portada.botonPrincipal ? (
                <a href={portada.botonPrincipal.url} className={btnGlow}>
                  {portada.botonPrincipal.texto}
                </a>
              ) : null}
              {portada.botonSecundario ? (
                <a href={portada.botonSecundario.url} className={btnGhostOnNight}>
                  {portada.botonSecundario.texto}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </LandingHeroSection>

      {canales.mostrar ? (
        <SeccionBloque fondo={canales.fondo} base="night" className="px-4 py-16 sm:px-6 sm:py-20">
          {(p) => (
            <>
              <Encabezado s={canales} p={p} grande={false} />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {tarjetas.map((canal, index) => (
                  <Reveal key={(canal.enlace ?? "") + index} delay={index * 60} from="up">
                    <a
                      href={canal.enlace ?? "#"}
                      className={`group block h-full rounded-[1.5rem] border p-6 transition sm:p-7 ${
                        canales.fondo.tono === "claro" ? "border-white/10 bg-white/5 hover:border-glow/40" : "border-ink/10 bg-ink/5 hover:border-accent/40"
                      }`}
                      {...(externo(canal.enlace ?? "") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      <ItemImagen item={canal} className="mb-4 aspect-[16/9] w-full rounded-2xl object-cover" />
                      <p className={`text-[11px] uppercase tracking-[0.28em] ${p.acento}`}>{canal.etiqueta}</p>
                      <h3 className="font-display mt-3 break-all text-xl leading-snug sm:text-2xl">{canal.titulo}</h3>
                      {canal.texto ? <p className={`mt-2 text-sm leading-6 ${p.suave}`}>{canal.texto}</p> : null}
                      <p className={`mt-5 text-sm font-semibold transition group-hover:translate-x-0.5 ${p.acento}`}>
                        {canales.boton?.texto ?? "Abrir →"}
                      </p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </SeccionBloque>
      ) : null}

      {formulario.mostrar ? (
        <div id="formulario" className="scroll-mt-24">
          <SeccionBloque fondo={formulario.fondo} base="night" className="px-4 py-16 sm:px-6 sm:py-24">
            {(p) => (
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <Reveal from="up">
                  {formulario.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{formulario.antetitulo}</p> : null}
                  <h2 className="font-display mt-3 text-3xl leading-snug sm:text-4xl">{formulario.titulo}</h2>
                  {formulario.texto ? <p className={`mt-4 max-w-md text-sm leading-6 ${p.suave}`}>{formulario.texto}</p> : null}
                </Reveal>

                <Reveal from="up" delay={80}>
                  <div className={`rounded-[1.8rem] border border-white/10 p-6 text-paper sm:p-8 ${formulario.fondo.tono === "claro" ? "bg-white/5" : "bg-night"}`}>
                    <ContactForm tone="night" />
                  </div>
                </Reveal>
              </div>
            )}
          </SeccionBloque>
        </div>
      ) : null}

      {ruta.mostrar ? (
        <div id="ruta" className="scroll-mt-24">
          <SeccionBloque fondo={ruta.fondo} base="night" className="px-4 py-16 sm:px-6 sm:py-24">
            {(p) => (
              <>
                <Reveal from="up">
                  {ruta.antetitulo ? <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{ruta.antetitulo}</p> : null}
                  <h2 className="font-display mt-3 text-3xl leading-snug sm:text-4xl">{ruta.titulo}</h2>
                  {ruta.texto ? (
                    <p className={`mt-4 max-w-xl text-sm leading-6 ${p.suave}`}>{ruta.texto.replaceAll("{direccion}", contacto.direccion)}</p>
                  ) : null}
                </Reveal>
                <div className="mt-10 text-paper">
                  <Reveal from="up" delay={60}>
                    <RoutePanel />
                  </Reveal>
                </div>
              </>
            )}
          </SeccionBloque>
        </div>
      ) : null}

      <PublicFooter />
    </div>
  );
}
