import Link from "next/link";
import { Logo } from "@/app/components/visual-kit/logo";
import { FondoSeccion } from "@/app/components/visual-kit/fondo-seccion";
import { contenidoNoEncontrada } from "@/lib/cms/no-encontrada";

export default async function NotFound() {
  const c = await contenidoNoEncontrada();

  return (
    <main className="landing relative min-h-[100svh] overflow-hidden bg-night text-paper">
      <FondoSeccion fondo={c.fondo} priority />
      <div className="absolute inset-0" aria-hidden>
        <div className="hero-field hero-field--photo" />
        <div className="hero-vignette" />
        <div className="hero-veil" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,22,42,0.72)_0%,rgba(8,22,42,0.28)_55%,transparent_78%)]" />
      </div>

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
          <Logo inverted className="text-paper" />
          {c.botonSecundario ? (
            <Link href={c.botonSecundario.url} className="text-sm font-medium text-paper/80 transition hover:text-paper">
              {c.botonSecundario.texto}
            </Link>
          ) : null}
        </div>
      </header>

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-xl text-center">
          <p className="visit-rise font-display text-[clamp(4.5rem,14vw,7.5rem)] leading-none tracking-[-0.06em] text-glow">
            {c.antetitulo}
          </p>
          <h1 className="visit-rise font-display mt-3 text-balance text-[clamp(1.65rem,3.6vw,2.5rem)] leading-[1.08] tracking-[-0.03em] text-paper">
            {c.titulo}
          </h1>
          <p className="visit-rise mx-auto mt-3 max-w-md text-balance text-sm leading-6 text-paper/80 sm:text-base" style={{ animationDelay: "80ms" }}>
            {c.texto}
          </p>

          <div className="mx-auto mt-8 grid w-full gap-3 text-left sm:grid-cols-2">
            {c.elementos.map((way, index) => (
              <Link
                key={(way.enlace ?? "") + index}
                href={way.enlace || "/"}
                className="visit-rise group flex h-full flex-col rounded-[1.15rem] bg-white px-5 py-5 text-[#16375C] shadow-[0_22px_50px_-18px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${160 + index * 80}ms` }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#16375C]/55">
                  {way.etiqueta}
                </p>
                <p className="font-display mt-2 text-[1.35rem] leading-tight tracking-[-0.02em]">
                  {way.titulo}
                </p>
                <p className="mt-2 text-sm leading-5 text-[#16375C]/70">{way.texto}</p>
                <span className="mt-auto pt-4 text-sm font-semibold transition group-hover:translate-x-0.5">
                  {way.subtitulo || "Entrar →"}
                </span>
              </Link>
            ))}
          </div>

          {c.boton ? (
            <Link
              href={c.boton.url}
              className="visit-rise mt-6 inline-block text-sm font-medium text-paper/80 underline-offset-4 transition hover:text-paper hover:underline"
              style={{ animationDelay: "320ms" }}
            >
              {c.boton.texto}
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
