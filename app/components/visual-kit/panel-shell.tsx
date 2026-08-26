import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { PanelNav } from "./panel-nav";
import type { NavLink } from "@/lib/visual-kit/types";

export function PanelShell({
  siteName,
  userName,
  eyebrow,
  links,
  homeHref = "/",
  onSignOut,
  children,
}: {
  siteName: string;
  userName: string;
  eyebrow: string;
  links: NavLink[];
  homeHref?: string;
  onSignOut?: () => void | Promise<void>;
  children: ReactNode;
}) {
  const exit = (
    <form action={onSignOut}>
      <button
        type="submit"
        className="rounded-full px-3 py-1.5 text-sm text-paper/55 transition hover:bg-white/10 hover:text-glow"
      >
        Salir
      </button>
    </form>
  );

  return (
    <div className="min-h-full lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="relative hidden flex-col bg-night text-paper lg:sticky lg:top-0 lg:flex lg:h-svh lg:px-5 lg:py-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-16 top-24 h-48 w-48 rounded-full bg-glow/20 blur-3xl" />
        </div>
        <div className="relative flex h-full flex-col">
          <p className="text-[11px] uppercase tracking-[0.22em] text-glow">{eyebrow}</p>
          <div className="mt-4">
            <Logo name={siteName} inverted className="text-paper" />
          </div>
          <div className="mt-10 flex-1">
            <PanelNav links={links} />
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="truncate text-sm text-paper/70">{userName}</p>
            <div className="mt-3 flex gap-2">
              <Link
                href={homeHref}
                className="rounded-full px-3 py-1.5 text-sm text-paper/55 transition hover:bg-white/10 hover:text-glow"
              >
                Sitio
              </Link>
              {onSignOut ? exit : null}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-h-full flex-col bg-paper">
        <header className="bg-night text-paper lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Logo name={siteName} inverted compact className="text-paper" />
            <div className="flex items-center gap-1">
              <Link href={homeHref} className="rounded-full px-3 py-1.5 text-sm text-paper/70">
                Sitio
              </Link>
              {onSignOut ? exit : null}
            </div>
          </div>
          <PanelNav links={links} variant="bar" />
        </header>
        <div className="relative flex-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--glow)_14%,transparent),transparent_55%)]"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
