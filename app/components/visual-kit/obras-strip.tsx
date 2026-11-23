import Image from "next/image";
import Link from "next/link";
import type { Obra } from "@/lib/cms/proyectos";
import { Reveal } from "./reveal";

const ESTADO_LABEL: Record<string, string> = {
  en_proceso: "En proceso",
  completado: "Completado",
  destacado: "Destacado",
};

/** Las imágenes del CMS vienen de otro dominio y se sirven tal cual. */
const externa = (src: string) => !src.startsWith("/");

/**
 * Franja de obras reales para usar fuera de /proyectos: en el embudo de
 * empresa son la prueba de experiencia, y en el de candidatos responden a
 * "¿dónde voy a trabajar?".
 */
export function ObrasStrip({
  obras,
  antetitulo,
  titulo,
  texto,
  enlace,
  id,
  className = "",
}: {
  obras: Obra[];
  antetitulo: string;
  titulo: string;
  texto?: string;
  enlace?: { texto: string; url: string };
  id?: string;
  className?: string;
}) {
  if (obras.length === 0) return null;

  return (
    <section id={id} className={`relative scroll-mt-[var(--header-h)] px-4 py-16 sm:px-6 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal from="up">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1F5FD6]">{antetitulo}</p>
            <h2 className="font-display mt-3 max-w-2xl text-balance text-3xl leading-tight text-[#0A2342] sm:text-4xl">{titulo}</h2>
            {texto ? <p className="mt-3 max-w-xl text-sm leading-6 text-[#33466A] sm:text-base">{texto}</p> : null}
          </Reveal>
          {enlace ? (
            <Reveal from="up" delay={80}>
              <Link
                href={enlace.url}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F5FD6] underline-offset-4 hover:underline"
              >
                {enlace.texto}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ) : null}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {obras.map((obra, index) => (
            <li key={obra.id}>
              <Reveal from="up" delay={index * 80}>
                <Link
                  href={`/proyectos/${obra.id}`}
                  className="group block h-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_0_#D5DDEC] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-26px_rgba(10,35,66,0.5)]"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    <Image
                      src={obra.imagen}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      unoptimized={externa(obra.imagen)}
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {obra.estado ? (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0A2342] backdrop-blur">
                        {ESTADO_LABEL[obra.estado] ?? obra.estado}
                      </span>
                    ) : null}
                  </span>
                  <span className="block p-5">
                    <span className="block text-xs text-[#33466A]/75 first-letter:uppercase">
                      {[obra.sector, obra.fecha].filter(Boolean).join(" · ")}
                    </span>
                    <span className="font-display mt-1.5 block text-xl leading-snug text-[#0A2342]">{obra.titulo}</span>
                    {obra.texto ? (
                      <span className="mt-2 line-clamp-2 block text-sm leading-6 text-[#33466A]">{obra.texto}</span>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1F5FD6]">
                      Ver la obra
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
