import Image from "next/image";
import Link from "next/link";
import { CLIENTES } from "@/lib/data";
import { SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { Logo } from "../logo";

const PROOF = [
  { valor: "10+", etiqueta: "años en construcción" },
  { valor: "2019", etiqueta: "empresa constituida" },
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
      <header className="gate-in relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <Logo name={site.name} inverted className="text-white" />
        <nav className="flex items-center gap-5 text-sm font-medium text-white/90" aria-label="Elegir experiencia">
          <Link href="/empresas" className="transition hover:text-white">
            Empresas
          </Link>
          <Link href="/empleos" className="transition hover:text-white">
            Empleos
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-6 text-center sm:px-8">
        <p className="gate-in text-[11px] font-medium uppercase tracking-[0.34em] text-white/75" style={{ animationDelay: "80ms" }}>
          Construcción · Industria · Gran escala
        </p>
        <h1
          className="gate-in font-display mt-5 text-[clamp(2.6rem,6.4vw,4.75rem)] leading-[1.05] tracking-[-0.03em] text-white"
          style={{ animationDelay: "160ms" }}
        >
          ¿Qué quieres hacer?
        </h1>
        <p className="gate-in mx-auto mt-4 max-w-md text-[15px] leading-6 text-white/80" style={{ animationDelay: "260ms" }}>
          Hakamo conecta empresas con talento para proyectos que construyen el país.
        </p>

        <div className="mt-10 grid w-full gap-4 text-left sm:grid-cols-2 sm:gap-5">
          <Link
            href="/empresas"
            className="gate-in group flex flex-col rounded-[1.35rem] bg-white px-6 py-6 text-[#16375C] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.4)] sm:px-7 sm:py-7"
            style={{ animationDelay: "380ms" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#16375C]/55">
              Soy empresa
            </p>
            <h2 className="font-display mt-3 text-[1.65rem] leading-[1.15] tracking-[-0.02em] sm:text-[1.85rem]">
              Quiero conocer cómo Hakamo puede ayudarme
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#16375C]/70">
              Soluciones de personal, reuniones y más para tu proyecto.
            </p>
            <span className="mt-6 inline-flex w-fit items-center rounded-full bg-[#16375C] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#0f2742]">
              Conocer Hakamo
              <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          </Link>

          <Link
            href="/empleos"
            className="gate-in group flex flex-col rounded-[1.35rem] bg-[#D7E7F8] px-6 py-6 text-[#16375C] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)] sm:px-7 sm:py-7"
            style={{ animationDelay: "500ms" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#16375C]/55">
              Busco empleo
            </p>
            <h2 className="font-display mt-3 text-[1.65rem] leading-[1.15] tracking-[-0.02em] sm:text-[1.85rem]">
              Quiero encontrar mi próxima oportunidad
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#16375C]/70">
              Vacantes en construcción, energía y salud e higiene.
            </p>
            <span className="mt-6 inline-flex w-fit items-center rounded-full bg-[#16375C] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#0f2742]">
              Ver vacantes
              <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          </Link>
        </div>

        <ul className="mt-9 grid w-full max-w-2xl grid-cols-3 gap-4">
          {PROOF.map((item, index) => (
            <li key={item.etiqueta} className="gate-in" style={{ animationDelay: `${620 + index * 90}ms` }}>
              <p className="font-display text-[1.85rem] leading-none tracking-[-0.03em] text-white sm:text-[2.4rem]">
                {item.valor}
              </p>
              <p className="mt-2 text-xs leading-4 text-white/70 sm:text-sm">{item.etiqueta}</p>
            </li>
          ))}
        </ul>
      </main>

      <footer className="relative mx-auto w-full max-w-5xl px-5 pt-4 pb-8 text-center sm:px-8">
        <p className="gate-in text-[11px] font-medium uppercase tracking-[0.28em] text-white/55" style={{ animationDelay: "900ms" }}>
          Empresas que confían en Hakamo
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-semibold text-white/90 sm:text-base">
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
