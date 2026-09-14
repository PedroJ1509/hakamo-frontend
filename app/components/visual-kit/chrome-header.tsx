"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY_INFO } from "@/lib/data";
import type { NavLink } from "@/lib/visual-kit/types";
import { btnGlow, btnPrimary } from "@/lib/visual-kit/styles";
import { Logo } from "./logo";
import { MagneticButton } from "./magnetic-button";
import { PostulateCta } from "./postulate-cta";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ChromeHeader({
  name,
  links,
  ctaHref,
  ctaLabel,
  ctaExternal = false,
  cvHref,
  cvLabel,
  placement,
  tone,
}: {
  name: string;
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
  ctaExternal?: boolean;
  cvHref?: string;
  cvLabel?: string;
  placement: "fixed" | "sticky";
  tone: "night" | "paper";
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const night = tone === "night";
  const showCv = Boolean(cvHref && cvLabel);
  const solid = placement === "sticky" || open || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const barClass = [
    "chrome-header inset-x-0 top-0 transition-[background-color,box-shadow,border-color] duration-300",
    placement === "fixed" ? "fixed" : "sticky",
    solid
      ? night
        ? "chrome-header-solid-night"
        : "chrome-header-solid-paper"
      : "chrome-header-clear",
  ].join(" ");

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

  const cvCta = showCv ? (
    <PostulateCta href={cvHref!} label={cvLabel!} tone={tone} onNavigate={() => setOpen(false)} />
  ) : null;

  return (
    <>
      <header className={barClass}>
        <div className="chrome-header-inner mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-3 sm:gap-4 sm:px-5 xl:px-6">
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <Logo name={name} inverted={night} className={night ? "text-paper" : "text-ink"} />
            <span className={`chrome-header-tagline ${night ? "text-paper/40" : "text-muted"}`}>
              Gestión humana
            </span>
          </div>

          <nav
            className={`chrome-nav-tray mx-4 hidden min-w-0 flex-1 justify-center xl:flex ${
              night ? "chrome-nav-tray-night" : "chrome-nav-tray-paper"
            }`}
            aria-label="Principal"
          >
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`chrome-nav-link ${active ? "is-active" : ""} ${
                    night ? "chrome-nav-link-night" : "chrome-nav-link-paper"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center justify-end gap-2 xl:flex 2xl:gap-2.5">
            <a
              href={`tel:${COMPANY_INFO.whatsapp}`}
              className={`chrome-phone-chip ${night ? "chrome-phone-chip-night" : "chrome-phone-chip-paper"}`}
              aria-label="Llamar a Hakamo"
            >
              <PhoneIcon />
              <span className="chrome-phone-text">{COMPANY_INFO.telefono}</span>
            </a>
            <span className={`chrome-header-divider ${night ? "bg-white/15" : "bg-ink/10"}`} aria-hidden />
            {placement === "fixed" ? (
              <>
                {showCv ? (
                  <PostulateCta href={cvHref!} label={cvLabel!} tone={tone} size="sm" />
                ) : null}
                <MagneticButton href={ctaHref} size="sm" external={ctaExternal}>
                  {ctaLabel}
                </MagneticButton>
              </>
            ) : (
              <>
                {cvCta}
                {siteCta}
              </>
            )}
          </div>

          <button
            type="button"
            className={`chrome-menu-btn shrink-0 xl:hidden ${night ? "text-paper" : "text-ink"}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full transition ${
                  night ? "bg-paper" : "bg-ink"
                } ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full transition ${
                  night ? "bg-paper" : "bg-ink"
                } ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full transition ${
                  night ? "bg-paper" : "bg-ink"
                } ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          className={`chrome-mobile-panel fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[70] overflow-y-auto xl:hidden ${
            night ? "chrome-mobile-panel-night" : "chrome-mobile-panel-paper"
          }`}
        >
          <div className="mx-auto flex max-w-lg flex-col gap-8 px-5 py-8">
            <nav className="flex flex-col gap-1.5" aria-label="Móvil">
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`chrome-mobile-link ${active ? "is-active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{link.label}</span>
                    {active ? <span className="chrome-mobile-dot" aria-hidden /> : null}
                  </Link>
                );
              })}
            </nav>

            <div className={`chrome-mobile-meta ${night ? "border-white/10" : "border-ink/10"}`}>
              <a href={`tel:${COMPANY_INFO.whatsapp}`} className="chrome-mobile-meta-row" onClick={() => setOpen(false)}>
                <span className="chrome-mobile-meta-label">WhatsApp</span>
                <span>{COMPANY_INFO.telefono}</span>
              </a>
              <a href={`tel:${COMPANY_INFO.telefonoAlt.replace(/-/g, "")}`} className="chrome-mobile-meta-row" onClick={() => setOpen(false)}>
                <span className="chrome-mobile-meta-label">Teléfono</span>
                <span>{COMPANY_INFO.telefonoAlt}</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="chrome-mobile-meta-row" onClick={() => setOpen(false)}>
                <span className="chrome-mobile-meta-label">Correo</span>
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {placement === "fixed" ? (
                <>
                  {showCv ? (
                    <PostulateCta
                      href={cvHref!}
                      label={cvLabel!}
                      tone={tone}
                      onNavigate={() => setOpen(false)}
                    />
                  ) : null}
                  <MagneticButton href={ctaHref} external={ctaExternal}>
                    {ctaLabel}
                  </MagneticButton>
                </>
              ) : (
                <>
                  {cvCta}
                  {siteCta}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h2.2l1.1 3.2-1.4 1.1a12.5 12.5 0 0 0 5.3 5.3l1.1-1.4 3.2 1.1v2.2a1.6 1.6 0 0 1-1.7 1.6A14.8 14.8 0 0 1 4.4 6.2 1.6 1.6 0 0 1 6 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LandingHeader({
  name,
  links,
  ctaHref,
  ctaLabel,
  ctaExternal = false,
  cvHref,
  cvLabel,
  tone = "night",
}: {
  name: string;
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
  ctaExternal?: boolean;
  cvHref?: string;
  cvLabel?: string;
  tone?: "night" | "paper";
}) {
  return (
    <ChromeHeader
      name={name}
      links={links}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      ctaExternal={ctaExternal}
      cvHref={cvHref}
      cvLabel={cvLabel}
      placement={tone === "paper" ? "sticky" : "fixed"}
      tone={tone}
    />
  );
}
