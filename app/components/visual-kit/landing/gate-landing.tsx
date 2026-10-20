import Image from "next/image";
import Link from "next/link";
import type { ContenidoPuerta, OpcionPuerta } from "@/lib/cms/puerta";
import { FondoSeccion } from "../fondo-seccion";
import { Logo } from "../logo";

export function GateLanding({ contenido }: { contenido: ContenidoPuerta }) {
  return (
    <div
      className="landing relative flex min-h-[100svh] flex-col text-white"
      style={{ backgroundColor: contenido.fondo.color ?? "#16375C" }}
    >
      <FondoSeccion fondo={contenido.fondo} priority />
      <div aria-hidden className="gate-lines pointer-events-none absolute inset-0" />
      <header className="gate-in relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 pt-[max(0.85rem,env(safe-area-inset-top))] pb-2 sm:px-8 sm:pt-[max(1.35rem,env(safe-area-inset-top))]">
        <Logo inverted className="shrink-0 text-white" />
        <nav className="flex shrink-0 items-center gap-3 text-[13px] font-medium whitespace-nowrap text-white/90 sm:gap-5 sm:text-sm" aria-label="Elegir experiencia">
          {contenido.menu.map((enlace) => (
            <Link key={enlace.url + enlace.texto} href={enlace.url} className="transition hover:text-white">
              {enlace.texto}
            </Link>
          ))}
        </nav>
      </header>

      <main className="gate-main relative mx-auto flex w-full min-w-0 max-w-5xl flex-1 flex-col items-center px-4 py-2 text-center sm:px-8">
        <p className="gate-in max-w-full text-balance text-[10px] font-medium uppercase tracking-[0.14em] text-white/75 sm:text-[11px] sm:tracking-[0.28em] lg:tracking-[0.34em]" style={{ animationDelay: "80ms" }}>
          {contenido.antetitulo}
        </p>
        <h1
          className="gate-title gate-in font-display mt-[clamp(0.7rem,1.6vh,1.25rem)] max-w-full text-balance text-[clamp(1.85rem,min(7.2vw,6vh),4.75rem)] leading-[1.02] tracking-[-0.03em] text-white"
          style={{ animationDelay: "160ms" }}
        >
          {contenido.titulo}
        </h1>
        <p className="gate-lead gate-in mx-auto mt-[clamp(0.55rem,1.2vh,1rem)] max-w-md text-balance text-sm leading-5 text-white/80 sm:text-[15px] sm:leading-6" style={{ animationDelay: "260ms" }}>
          {contenido.texto}
        </p>

        <div className="gate-choices mt-[clamp(1rem,2.4vh,2.5rem)] grid w-full min-w-0 gap-3 text-left sm:grid-cols-2 sm:gap-[clamp(0.75rem,1.6vh,1.25rem)]">
          <OpcionCard opcion={contenido.opcionEmpresa} delay={380} />
          <OpcionCard opcion={contenido.opcionEmpleo} delay={500} />
        </div>

        <ul className="mt-[clamp(1rem,2.2vh,2.25rem)] grid w-full max-w-3xl grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 sm:gap-x-6">
          {contenido.datos.map((item, index) => (
            <li key={item.etiqueta + index} className="gate-in min-w-0" style={{ animationDelay: `${620 + index * 90}ms` }}>
              <p className="font-display text-[clamp(1.4rem,3vh,2.4rem)] leading-none tracking-[-0.03em] text-white">
                {item.valor}
              </p>
              <p className="mt-1 text-balance text-[11px] leading-snug text-white/70 sm:text-sm">{item.etiqueta}</p>
            </li>
          ))}
        </ul>
      </main>

      {contenido.clientes.length > 0 ? (
        <footer className="relative mx-auto w-full max-w-5xl pt-[clamp(0.35rem,1vh,1rem)] pl-4 pr-24 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center sm:pl-8 lg:px-8 lg:pb-[max(1.75rem,env(safe-area-inset-bottom))]">
          <p className="gate-in text-balance text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 sm:text-[11px] sm:tracking-[0.28em]" style={{ animationDelay: "900ms" }}>
            {contenido.tituloClientes}
          </p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[13px] font-semibold text-white/90 sm:gap-x-7 sm:text-base">
            {contenido.clientes.map((cliente, index) => (
              <li key={cliente + index} className="gate-in" style={{ animationDelay: `${980 + index * 70}ms` }}>
                {cliente}
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </div>
  );
}

function OpcionCard({ opcion, delay }: { opcion: OpcionPuerta; delay: number }) {
  const externa = opcion.imagenFondo !== null && !opcion.imagenFondo.startsWith("/");

  return (
    <Link
      href={opcion.boton.url}
      className="gate-choice gate-in group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[1.15rem] px-4 py-[clamp(0.9rem,1.8vh,1.75rem)] text-[#16375C] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.4)] sm:rounded-[1.35rem] sm:px-7"
      style={{ animationDelay: `${delay}ms`, backgroundColor: opcion.colorFondo }}
    >
      {opcion.imagenFondo ? (
        <span aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image src={opcion.imagenFondo} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" unoptimized={externa} className="object-cover" />
          <span className="absolute inset-0 opacity-85" style={{ backgroundColor: opcion.colorFondo }} />
        </span>
      ) : null}
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#16375C]/55 sm:text-[11px] sm:tracking-[0.22em]">
        {opcion.etiqueta}
      </p>
      <h2 className="font-display mt-2 text-balance text-[clamp(1.2rem,2.35vh,1.85rem)] leading-[1.15] tracking-[-0.02em]">
        {opcion.titulo}
      </h2>
      <p className="mt-2 text-[13px] leading-5 text-[#16375C]/70 sm:text-sm sm:leading-6">{opcion.texto}</p>
      <span className="mt-auto block pt-[clamp(0.85rem,1.6vh,1.5rem)]">
        <span className="inline-flex w-fit items-center rounded-full bg-[#16375C] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#0f2742]">
          {opcion.boton.texto}
          <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
