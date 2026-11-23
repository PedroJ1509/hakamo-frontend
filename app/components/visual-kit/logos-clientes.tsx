import Image from "next/image";
import type { ClienteLogo } from "@/lib/cms/clientes";
import { Reveal } from "./reveal";

/**
 * Franja de logos para fondos claros. En gris hasta pasar el ratón, para que
 * cinco marcas de colores distintos no compitan con el resto de la página.
 */
export function LogosClientes({ clientes, titulo }: { clientes: ClienteLogo[]; titulo: string }) {
  if (clientes.length === 0) return null;

  return (
    <section className="px-4 pb-4 pt-14 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-6xl border-t border-ink/10 pt-10">
        <Reveal from="up">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">{titulo}</p>
        </Reveal>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {clientes.map((cliente, index) => (
            <li key={cliente.nombre + index}>
              <Reveal from="up" delay={index * 60}>
                {cliente.logo ? (
                  <span className="relative block h-10 w-28 sm:h-12 sm:w-32" title={cliente.nombre}>
                    <Image
                      src={cliente.logo}
                      alt={cliente.nombre}
                      fill
                      sizes="128px"
                      // El optimizador rechaza svg, y no sirve dominios fuera de remotePatterns.
                      unoptimized={!cliente.logo.startsWith("/") || cliente.logo.endsWith(".svg")}
                      // multiply funde el fondo blanco de los jpg con el fondo claro.
                      className="object-contain opacity-60 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-ink/55">{cliente.nombre}</span>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
