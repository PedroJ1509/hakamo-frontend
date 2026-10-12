import Image from "next/image";
import Link from "next/link";
import { CLIENTES } from "@/lib/data";
import { SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { Logo } from "../logo";

const PROOF = [
  { valor: "10+", etiqueta: "años en construcción" },
  { valor: "2019", etiqueta: "constitución como empresa" },
  { valor: "2021", etiqueta: "nacimiento del outsourcing" },
  { valor: "100%", etiqueta: "cumplimiento normativo" },
];

export function GateLanding() {
  const site = SITE_PUBLIC;

  return (
    <div
      className="landing relative flex min-h-[100svh] flex-col text-white"
      style={{ backgroundColor: "#16375C" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/visual-kit/heroes/home-rrhh.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0e2744]/70" />
      </div>
      <div aria-hidden className="gate-lines pointer-events-none absolute inset-0" />
      <header className="gate-in relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 pt-[max(0.85rem,env(safe-area-inset-top))] pb-2 sm:px-8 sm:pt-[max(1.35rem,env(safe-area-inset-top))]">
        <Logo name={site.name} inverted className="shrink-0 text-white" />
        <nav className="flex shrink-0 items-center gap-3 text-[13px] font-medium whitespace-nowrap text-white/90 sm:gap-5 sm:text-sm" aria-label="Elegir experiencia">
          <Link href="/empresas" className="transition hover:text-white">
            Empresas
          </Link>
          <Link href="/empleos" className="transition hover:text-white">
            Empleos
          </Link>
        </nav>
      </header>

      <main className="gate-main mx-auto flex w-full min-w-0 max-w-5xl flex-1 flex-col items-center px-4 py-2 text-center sm:px-8">
        <p className="gate-in max-w-full text-balance text-[10px] font-medium uppercase tracking-[0.14em] text-white/75 sm:text-[11px] sm:tracking-[0.28em] lg:tracking-[0.34em]" style={{ animationDelay: "80ms" }}>
          Construcción · Industria · Gran escala
        </p>
        <h1
          className="gate-title gate-in font-display mt-[clamp(0.7rem,1.6vh,1.25rem)] max-w-full text-balance text-[clamp(1.85rem,min(7.2vw,6vh),4.75rem)] leading-[1.02] tracking-[-0.03em] text-white"
          style={{ animationDelay: "160ms" }}
        >
          ¿Qué quieres hacer?
        </h1>
        <p className="gate-lead gate-in mx-auto mt-[clamp(0.55rem,1.2vh,1rem)] max-w-md text-balance text-sm leading-5 text-white/80 sm:text-[15px] sm:leading-6" style={{ animationDelay: "260ms" }}>
          Hakamo conecta empresas con talento para proyectos que construyen el país.
        </p>

        <div className="gate-choices mt-[clamp(1rem,2.4vh,2.5rem)] grid w-full min-w-0 gap-3 text-left sm:grid-cols-2 sm:gap-[clamp(0.75rem,1.6vh,1.25rem)]">
          <Link
            href="/empresas"
            className="gate-choice gate-in group flex h-full min-w-0 flex-col rounded-[1.15rem] bg-white px-4 py-[clamp(0.9rem,1.8vh,1.75rem)] text-[#16375C] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.4)] sm:rounded-[1.35rem] sm:px-7"
            style={{ animationDelay: "380ms" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#16375C]/55 sm:text-[11px] sm:tracking-[0.22em]">
              Soy empresa
            </p>
            <h2 className="font-display mt-2 text-balance text-[clamp(1.2rem,2.35vh,1.85rem)] leading-[1.15] tracking-[-0.02em]">
              Quiero conocer cómo Hakamo puede ayudarme
            </h2>
            <p className="mt-2 text-[13px] leading-5 text-[#16375C]/70 sm:text-sm sm:leading-6">
              Soluciones de personal, reuniones y más para tu proyecto.
            </p>
            <span className="mt-auto block pt-[clamp(0.85rem,1.6vh,1.5rem)]">
              <span className="inline-flex w-fit items-center rounded-full bg-[#16375C] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#0f2742]">
                Conocer Hakamo
                <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </span>
            </span>
          </Link>

          <Link
            href="/empleos"
            className="gate-choice gate-in group flex h-full min-w-0 flex-col rounded-[1.15rem] bg-[#D7E7F8] px-4 py-[clamp(0.9rem,1.8vh,1.75rem)] text-[#16375C] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)] sm:rounded-[1.35rem] sm:px-7"
            style={{ animationDelay: "500ms" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#16375C]/55 sm:text-[11px] sm:tracking-[0.22em]">
              Busco empleo
            </p>
            <h2 className="font-display mt-2 text-balance text-[clamp(1.2rem,2.35vh,1.85rem)] leading-[1.15] tracking-[-0.02em]">
              Quiero encontrar mi próxima oportunidad
            </h2>
            <p className="mt-2 text-[13px] leading-5 text-[#16375C]/70 sm:text-sm sm:leading-6">
              Vacantes en construcción, energía y salud e higiene.
            </p>
            <span className="mt-auto block pt-[clamp(0.85rem,1.6vh,1.5rem)]">
              <span className="inline-flex w-fit items-center rounded-full bg-[#16375C] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#0f2742]">
                Ver vacantes
                <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </span>
            </span>
          </Link>
        </div>

        <ul className="mt-[clamp(1rem,2.2vh,2.25rem)] grid w-full max-w-3xl grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 sm:gap-x-6">
          {PROOF.map((item, index) => (
            <li key={item.etiqueta} className="gate-in min-w-0" style={{ animationDelay: `${620 + index * 90}ms` }}>
              <p className="font-display text-[clamp(1.4rem,3vh,2.4rem)] leading-none tracking-[-0.03em] text-white">
                {item.valor}
              </p>
              <p className="mt-1 text-balance text-[11px] leading-snug text-white/70 sm:text-sm">{item.etiqueta}</p>
            </li>
          ))}
        </ul>
      </main>

      <footer className="relative mx-auto w-full max-w-5xl pt-[clamp(0.35rem,1vh,1rem)] pl-4 pr-24 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center sm:pl-8 lg:px-8 lg:pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <p className="gate-in text-balance text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 sm:text-[11px] sm:tracking-[0.28em]" style={{ animationDelay: "900ms" }}>
          Empresas que confían en Hakamo
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[13px] font-semibold text-white/90 sm:gap-x-7 sm:text-base">
          {CLIENTES.map((cliente, index) => (
            <li key={cliente.nombre} className="gate-in" style={{ animationDelay: `${980 + index * 70}ms` }}>
              {cliente.nombre}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
