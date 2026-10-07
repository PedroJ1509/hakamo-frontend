import Link from "next/link";
import { CLIENTES } from "@/lib/data";
import { SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";
import { Logo } from "../logo";

export function GateLanding() {
  const site = SITE_PUBLIC;

  return (
    <div className="landing flex min-h-[100svh] flex-col bg-night text-paper">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo name={site.name} inverted className="text-paper" />
        <nav className="flex items-center gap-4 text-sm font-semibold" aria-label="Elegir experiencia">
          <Link href="/empresas" className="text-paper/80 transition hover:text-glow">
            Empresas
          </Link>
          <Link href="/cv" className="text-paper/80 transition hover:text-glow">
            Talentos
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 text-center sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Hakamo</p>
        <h1 className="font-display mt-5 text-[clamp(2.4rem,7vw,4.6rem)] leading-[1.02] tracking-[-0.03em]">
          ¿Qué quieres hacer?
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-paper/70 sm:text-base">
          Hakamo conecta empresas con talento para construcción, industria y proyectos de gran escala.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/empresas" className={`${btnGlow} w-full sm:w-auto`}>
            Busco talento
          </Link>
          <Link href="/cv" className={`${btnGhostOnNight} w-full sm:w-auto`}>
            Busco empleo
          </Link>
        </div>
        <p className="mt-6 text-sm text-paper/55">
          Busco talento abre la experiencia para empresas. Busco empleo abre las vacantes.
        </p>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-paper/45">
          Empresas que trabajan con Hakamo
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-paper/70">
          {CLIENTES.map((cliente) => (
            <li key={cliente.nombre}>{cliente.nombre}</li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
