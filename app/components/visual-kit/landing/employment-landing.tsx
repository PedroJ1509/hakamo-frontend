"use client";

import Image from "next/image";
import Link from "next/link";
import type { Seccion } from "@/lib/cms/comun";
import type { ContenidoCultura } from "@/lib/cms/cultura";
import { FondoSeccion } from "../fondo-seccion";
import { Reveal } from "../reveal";

const display = "font-[family-name:var(--font-space-grotesk)] font-extrabold tracking-[-0.03em]";
const wide = "chrome-frame mx-auto w-full";

const TILTS = ["sm:-rotate-2", "sm:translate-x-7 sm:rotate-1", "sm:-rotate-1"];

const externa = (src: string) => !src.startsWith("/");

/** Sección con fondo opcional del CMS. Con fondo oscuro, los textos pasan a claro. */
function Bloque({ seccion, id, className, children }: { seccion: Seccion; id?: string; className: string; children: React.ReactNode }) {
  const claro = seccion.fondo.tono === "claro";
  return (
    <section id={id} className={`relative isolate ${claro ? "text-white [&_.texto-suave]:text-white/75" : ""}`}>
      <FondoSeccion fondo={seccion.fondo} />
      <div className={`relative ${className}`}>{children}</div>
    </section>
  );
}

export function EmploymentLanding({ contenido }: { contenido: ContenidoCultura }) {
  const { portada, proceso, areas, formacion, actividades, siguiente, diferenciales } = contenido;

  return (
    <div className="bg-[#F5F7FB] text-[#0A2342]">
      {portada.mostrar ? (
        <Bloque seccion={portada} className={`${wide} grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:py-16`}>
          <Reveal from="left">
            {portada.antetitulo ? (
              <p className="inline-block rounded-full bg-[#FFE3C7] px-3.5 py-2 text-[15px] font-semibold text-[#7A3A00]">
                {portada.antetitulo}
              </p>
            ) : null}
            <h1 className={`${display} mt-5 max-w-[14ch] text-[clamp(3rem,4.6vw,5.4rem)] leading-[0.96]`}>{portada.titulo}</h1>
            {portada.texto ? (
              <p className="texto-suave mt-4 max-w-xl text-lg leading-relaxed text-[#33466A] sm:text-xl">{portada.texto}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {portada.boton ? (
                <a href={portada.boton.url} className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                  {portada.boton.texto}
                </a>
              ) : null}
              {portada.botonSecundario ? (
                <Link
                  href={portada.botonSecundario.url}
                  className="rounded-xl border-2 border-[#D5DDEC] bg-white px-6 py-3.5 text-[17px] font-semibold text-[#0A2342]"
                >
                  {portada.botonSecundario.texto}
                </Link>
              ) : null}
            </div>
          </Reveal>

          {portada.elementos.length > 0 ? (
            <Reveal from="right">
              <div className="flex min-h-[320px] w-full flex-col justify-center gap-4 rounded-[2rem] bg-[#1F5FD6] p-6 sm:min-h-[460px] sm:p-10 lg:p-12">
                {portada.elementos.map((card, index) => (
                  <article
                    key={card.titulo + index}
                    className={`empleos-float rounded-[1.15rem] bg-white px-5 py-5 text-[#0A2342] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${TILTS[index % TILTS.length]} ${index > 0 ? "hidden sm:block" : ""}`}
                    style={{ animationDelay: `${index * 0.35}s` }}
                  >
                    <p className="text-sm font-semibold text-[#1F5FD6]">{card.etiqueta}</p>
                    <p className={`${display} mt-1 text-[1.35rem] leading-tight`}>{card.titulo}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          ) : null}
        </Bloque>
      ) : null}

      <section className="empleos-tape relative isolate" aria-label="Lo que incluye trabajar con Hakamo">
        <FondoSeccion fondo={contenido.fondoDiferenciales} />
        <ul className="sr-only">
          {diferenciales.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="empleos-tape-track relative" aria-hidden>
          {[0, 1, 2, 3].flatMap((copy) =>
            diferenciales.map((item) => (
              <span key={`${copy}-${item}`} className="empleos-tape-item">
                <span className="text-[#7EB0FF]">✓</span>
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      {proceso.mostrar ? (
        <Bloque seccion={proceso} id="proceso" className={`scroll-mt-[var(--header-h)] ${wide} py-16`}>
          <h2 className={`${display} text-4xl sm:text-5xl`}>{proceso.titulo}</h2>
          {proceso.texto ? <p className="texto-suave mb-8 mt-2 text-[#33466A]">{proceso.texto}</p> : <div className="mb-8" />}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {proceso.elementos.map((paso, index) => (
              <Reveal key={paso.titulo + index} delay={index * 80}>
                <article className="h-full border-t-4 border-[#1F5FD6] pt-5">
                  <p className={`${display} text-5xl leading-none text-[#1F5FD6]`}>{paso.etiqueta || String(index + 1).padStart(2, "0")}</p>
                  <h3 className={`${display} mt-4 text-2xl`}>{paso.titulo}</h3>
                  {paso.subtitulo ? <p className="texto-suave mt-1 text-sm font-semibold text-[#4A5C7C]">{paso.subtitulo}</p> : null}
                  <p className="texto-suave mt-3 text-[#33466A]">{paso.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Bloque>
      ) : null}

      {areas.mostrar ? (
        <Bloque seccion={areas} className={`${wide} py-8`}>
          <h2 className={`${display} text-4xl sm:text-5xl`}>{areas.titulo}</h2>
          {areas.texto ? <p className="texto-suave mb-7 mt-2 text-[#33466A]">{areas.texto}</p> : <div className="mb-7" />}
          <div className="flex flex-wrap gap-3">
            {areas.elementos.map((area, index) => (
              <span key={area.titulo + index} className="rounded-full border-2 border-[#D5DDEC] bg-white px-6 py-3.5 font-semibold text-[#0A2342]">
                {area.titulo}
              </span>
            ))}
          </div>
        </Bloque>
      ) : null}

      {formacion.mostrar ? (
        <Bloque seccion={formacion} className={`${wide} py-12`}>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal from="left">
              <h2 className={`${display} text-4xl sm:text-5xl`}>{formacion.titulo}</h2>
              {formacion.texto ? <p className="texto-suave mt-4 max-w-xl text-lg leading-relaxed text-[#33466A]">{formacion.texto}</p> : null}
              {contenido.formacionTextos.map((item, index) => (
                <p key={item.titulo + index} className="texto-suave mt-5 max-w-xl leading-relaxed text-[#33466A]">
                  <span className="font-semibold">{item.titulo}.</span> {item.texto}
                </p>
              ))}
            </Reveal>
            {contenido.formacionFotos.length > 0 ? (
              <Reveal from="right" className="grid grid-cols-2 gap-4">
                {contenido.formacionFotos.slice(0, 2).map((foto, index) => (
                  <div key={foto.titulo + index} className={`relative aspect-[3/4] overflow-hidden rounded-[1.5rem] ${index === 1 ? "mt-8" : ""}`}>
                    <Image
                      src={foto.imagen!}
                      alt={foto.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 24vw"
                      unoptimized={externa(foto.imagen!)}
                    />
                  </div>
                ))}
              </Reveal>
            ) : null}
          </div>
        </Bloque>
      ) : null}

      {actividades.mostrar ? (
        <Bloque seccion={actividades} className={`${wide} py-8`}>
          <h2 className={`${display} text-4xl sm:text-5xl`}>{actividades.titulo}</h2>
          {actividades.texto ? <p className="texto-suave mt-2 text-[#33466A]">{actividades.texto}</p> : null}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {actividades.elementos.map((item, index) => (
              <Reveal key={item.titulo + index} delay={index * 70}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white text-[#0A2342] shadow-[0_2px_0_#D5DDEC] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,35,66,0.08)]">
                  {item.imagen ? (
                    <div className="relative aspect-[16/10]">
                      <Image src={item.imagen} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" unoptimized={externa(item.imagen)} />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h3 className={`${display} text-2xl`}>{item.titulo}</h3>
                    <p className="mt-2 text-[#33466A]">{item.texto}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Bloque>
      ) : null}

      {siguiente.mostrar ? (
        <Bloque seccion={siguiente} className={`${wide} py-10 pb-16 sm:pb-20`}>
          <div className="flex flex-wrap items-end justify-between gap-8 rounded-[2rem] bg-[#0A2342] p-8 text-white sm:p-14">
            <div>
              <h2 className={`${display} text-4xl sm:text-5xl`}>{siguiente.titulo}</h2>
              {siguiente.texto ? <p className="mt-3 max-w-md leading-relaxed text-[#C8D4EA]">{siguiente.texto}</p> : null}
            </div>
            <div className="flex flex-wrap gap-3">
              {siguiente.boton ? (
                <Link href={siguiente.boton.url} className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                  {siguiente.boton.texto}
                </Link>
              ) : null}
              {siguiente.botonSecundario ? (
                <Link href={siguiente.botonSecundario.url} className="rounded-xl bg-white px-6 py-3.5 text-[17px] font-semibold text-[#0A2342]">
                  {siguiente.botonSecundario.texto}
                </Link>
              ) : null}
            </div>
          </div>
        </Bloque>
      ) : null}
    </div>
  );
}
