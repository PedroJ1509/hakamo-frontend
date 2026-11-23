import Image from "next/image";
import type { Testimonio } from "@/lib/cms/clientes";
import { Reveal } from "./reveal";

/** Iniciales para cuando el autor no tiene logo. */
const iniciales = (texto: string) =>
  texto
    .split(/\s+/)
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

/**
 * Testimonios de clientes. Con uno solo se muestra en grande; con varios, en
 * rejilla (máximo tres, para que no se convierta en un muro de texto).
 */
export function Testimonios({
  testimonios,
  antetitulo = "Lo que dicen nuestros clientes",
  titulo = "La operación habla por nosotros",
  className = "",
}: {
  testimonios: Testimonio[];
  antetitulo?: string;
  titulo?: string;
  className?: string;
}) {
  if (testimonios.length === 0) return null;
  const lista = testimonios.slice(0, 3);
  const unico = lista.length === 1;

  return (
    <section className={`px-4 py-16 sm:px-6 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal from="up" className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1F5FD6]">{antetitulo}</p>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-balance text-3xl leading-tight text-[#0A2342] sm:text-4xl">
            {titulo}
          </h2>
        </Reveal>

        <ul className={`mt-10 grid gap-5 ${unico ? "mx-auto max-w-3xl" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {lista.map((t, index) => (
            <li key={t.autor + index}>
              <Reveal from="up" delay={index * 90} className="h-full">
                <figure className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_2px_0_#D5DDEC] sm:p-8">
                  {t.ejemplo ? (
                    <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Ejemplo
                    </span>
                  ) : null}

                  <span aria-hidden className="font-display text-6xl leading-none text-[#1F5FD6]/25">
                    &ldquo;
                  </span>
                  <blockquote
                    className={`font-display -mt-4 flex-1 text-[#0A2342] ${unico ? "text-2xl leading-snug sm:text-3xl" : "text-lg leading-relaxed"}`}
                  >
                    {t.texto}
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-[#D5DDEC] pt-5">
                    {t.logo ? (
                      <span className="relative block h-10 w-16 shrink-0">
                        <Image
                          src={t.logo}
                          alt=""
                          fill
                          sizes="64px"
                          unoptimized={!t.logo.startsWith("/") || t.logo.endsWith(".svg")}
                          className="object-contain mix-blend-multiply"
                        />
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F0FC] text-sm font-bold text-[#1F5FD6]"
                      >
                        {iniciales(t.autor)}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#0A2342]">{t.autor}</span>
                      {t.detalle ? <span className="block text-xs text-[#33466A]">{t.detalle}</span> : null}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
