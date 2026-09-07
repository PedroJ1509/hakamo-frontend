import Link from "next/link";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";

export default function NotFound() {
  return (
    <main className="landing relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-paper">
      <div className="absolute inset-0" aria-hidden>
        <div className="hero-field" />
        <div className="hero-vignette" />
        <div className="hero-veil" />
      </div>

      <header className="chrome-header relative z-10 flex items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-lg tracking-tight text-paper">
          {SITE_PUBLIC.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-paper/65 lg:flex">
          {SITE_NAV.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-10 text-center sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Error 404</p>

        <p
          className="font-display mt-4 select-none text-[clamp(6rem,22vw,11rem)] leading-none tracking-[-0.04em] text-paper/[0.08]"
          aria-hidden
        >
          404
        </p>

        <h1 className="font-display -mt-10 max-w-xl text-[clamp(1.85rem,5vw,3rem)] leading-[1.1] tracking-[-0.03em] italic sm:-mt-14">
          Esta página no está en el expediente
        </h1>

        <p className="mt-5 max-w-md text-sm leading-6 text-paper/65 sm:text-base">
          La ruta no existe o fue movida. Vuelve al inicio o sigue hacia servicios, empleo o
          contacto.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={btnGlow}>
            Volver al inicio
          </Link>
          <Link href="/servicios" className={btnGhostOnNight}>
            Ver servicios
          </Link>
          <Link href="/contacto" className={btnGhostOnNight}>
            Contacto
          </Link>
        </div>

        <nav className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-paper/45 lg:hidden">
          {SITE_NAV.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-glow">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
