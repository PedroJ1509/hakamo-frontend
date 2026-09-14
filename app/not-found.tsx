import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/app/components/visual-kit/logo";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";

export default function NotFound() {
  const bg = LANDING_HERO_BACKGROUNDS.home;

  return (
    <main className="landing relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-paper">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={bg.src}
          alt=""
          fill
          priority
          className="hero-photo"
          style={{ objectPosition: bg.objectPosition ?? "50% 45%" }}
          sizes="100vw"
        />
        <div className="hero-field hero-field--photo" />
        <div className="hero-vignette" />
        <div className="hero-veil" />
      </div>

      <header className="chrome-header relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo name={SITE_PUBLIC.name} inverted />
        <nav className="hidden items-center gap-6 text-sm text-paper/65 lg:flex">
          {SITE_NAV.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href={SITE_PUBLIC.ctaHref} className={`${btnGlow} hidden lg:inline-flex`}>
          {SITE_PUBLIC.ctaLabel}
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-20 pt-8 text-center sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">404</p>
        <h1 className="font-display mt-5 max-w-xl text-[clamp(1.85rem,5.5vw,3.15rem)] leading-[1.08] tracking-[-0.03em] italic">
          Esta página no existe
        </h1>
        <p className="mt-5 max-w-md text-sm leading-6 text-paper/70 sm:text-base">
          El enlace puede estar roto o la ruta ya no está disponible. Te llevamos de vuelta a Hakamo.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={btnGlow}>
            Ir al inicio
          </Link>
          <Link href="/servicios" className={btnGhostOnNight}>
            Ver servicios
          </Link>
        </div>
      </div>
    </main>
  );
}
