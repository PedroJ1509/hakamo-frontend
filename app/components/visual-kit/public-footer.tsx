import Link from "next/link";
import { Logo } from "./logo";
import type { NavLink, SitePublic } from "@/lib/visual-kit/types";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";

export function PublicFooter({
  site,
  links,
  staffHref = "/empleo",
  staffLabel = "Buscar empleo",
}: {
  site: SitePublic;
  links: NavLink[];
  staffHref?: string;
  staffLabel?: string;
}) {
  return (
    <footer className="relative overflow-hidden bg-night text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-glow/14 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_auto] lg:items-end">
          <div>
            <Logo name={site.name} inverted className="text-paper" />
            <p className="mt-10 text-[11px] uppercase tracking-[0.32em] text-glow">{site.name}</p>
            <p className="font-display mt-4 max-w-xl text-2xl leading-snug sm:text-3xl">{site.tagline}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col lg:items-end">
            <a href={site.ctaHref} className={`${btnGlow} w-full sm:w-auto`}>
              {site.ctaLabel}
            </a>
            {site.address ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
                target="_blank"
                rel="noreferrer"
                className={`${btnGhostOnNight} w-full sm:w-auto`}
              >
                Cómo llegar
              </a>
            ) : null}
          </div>
        </div>

        <dl className="mt-16 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {site.address ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.28em] text-glow">Dirección</dt>
              <dd className="mt-3 text-sm leading-6 text-paper/65">{site.address}</dd>
            </div>
          ) : null}
          {site.phone ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.28em] text-glow">Teléfono</dt>
              <dd className="mt-3 text-sm text-paper/65">{site.phone}</dd>
            </div>
          ) : null}
          {site.email ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.28em] text-glow">Correo</dt>
              <dd className="mt-3 text-sm text-paper/65">{site.email}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-glow">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <Link href={staffHref} className="hover:text-glow">
              {staffLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
