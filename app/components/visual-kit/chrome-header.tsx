"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/visual-kit/types";
import { btnGlow, btnPrimary } from "@/lib/visual-kit/styles";
import { Logo } from "./logo";
import { MagneticButton } from "./magnetic-button";

export function ChromeHeader({
  name,
  links,
  ctaHref,
  ctaLabel,
  ctaExternal = false,
  placement,
  tone,
}: {
  name: string;
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
  ctaExternal?: boolean;
  placement: "fixed" | "sticky";
  tone: "night" | "paper";
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const night = tone === "night";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const barTone =
    placement === "sticky"
      ? night
        ? "border-b border-white/10 bg-night/90 backdrop-blur"
        : "border-b border-ink/8 bg-paper/90 backdrop-blur"
      : open || scrolled
        ? "bg-night/90 backdrop-blur-md"
        : "bg-transparent";

  const linkMute = night ? "text-paper/70 hover:text-paper" : "text-muted hover:text-ink";
  const iconColor = night ? "bg-paper" : "bg-ink";

  const siteCtaClass = night ? btnGlow : btnPrimary;
  const siteCta = ctaExternal ? (
    <a href={ctaHref} target="_blank" rel="noreferrer" className={siteCtaClass} onClick={() => setOpen(false)}>
      {ctaLabel}
    </a>
  ) : (
    <Link href={ctaHref} className={siteCtaClass} onClick={() => setOpen(false)}>
      {ctaLabel}
    </Link>
  );

  return (
    <>
      <header className={`chrome-header inset-x-0 top-0 ${placement === "fixed" ? "fixed" : "sticky"} ${barTone}`}>
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Logo name={name} inverted={night} className={night ? "text-paper" : "text-ink"} />

          <nav className={`hidden items-center gap-5 text-sm lg:flex xl:gap-7 ${night ? "text-paper/70" : "text-muted"}`}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`transition ${linkMute}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            {placement === "fixed" ? (
              <MagneticButton href={ctaHref} size="sm" external={ctaExternal}>
                {ctaLabel}
              </MagneticButton>
            ) : (
              siteCta
            )}
          </div>

          <button
            type="button"
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full lg:hidden ${
              night ? "text-paper" : "text-ink"
            }`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full ${iconColor} transition ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full ${iconColor} transition ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full ${iconColor} transition ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[70] overflow-y-auto px-6 py-8 lg:hidden ${
            night ? "bg-night text-paper" : "bg-paper text-ink"
          }`}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-2 py-3 text-lg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6">
              {placement === "fixed" ? (
                <MagneticButton href={ctaHref} external={ctaExternal}>
                  {ctaLabel}
                </MagneticButton>
              ) : (
                siteCta
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}

export function LandingHeader({
  name,
  links,
  ctaHref,
  ctaLabel,
  ctaExternal = false,
}: {
  name: string;
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
  ctaExternal?: boolean;
}) {
  return (
    <ChromeHeader
      name={name}
      links={links}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      ctaExternal={ctaExternal}
      placement="fixed"
      tone="night"
    />
  );
}
