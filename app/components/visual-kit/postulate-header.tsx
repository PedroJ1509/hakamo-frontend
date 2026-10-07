"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { POSTULATE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { btnPrimary } from "@/lib/visual-kit/styles";
import { Logo } from "./logo";

function sectionFromHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace("#", "");
}

function isSectionActive(hash: string, href: string) {
  const target = href.split("#")[1] ?? "";
  if (!target) return false;
  if (!hash) return target === "vacantes";
  return hash === target;
}

export function PostulateHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const site = SITE_PUBLIC;
  const onLanding = pathname === "/cv";

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
    if (!onLanding) {
      setActiveHash("");
      return;
    }

    const syncHash = () => setActiveHash(sectionFromHash());
    syncHash();
    window.addEventListener("hashchange", syncHash);

    const sections = ["vacantes", "tu-cv"].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveHash(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4] },
    );
    sections.forEach((el) => observer.observe(el!));

    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, [onLanding]);

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
    "chrome-header inset-x-0 top-0 sticky transition-[background-color,box-shadow,border-color] duration-300",
    open || scrolled ? "chrome-header-solid-paper" : "chrome-header-clear",
  ].join(" ");

  return (
    <>
      <header className={barClass}>
        <div className="chrome-header-inner mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5 xl:px-6">
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <Logo name={site.name} inverted={false} className="text-ink" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-accent sm:inline">
              Talentos
            </span>
          </div>

          <nav
            className="chrome-nav-tray chrome-nav-tray-paper hidden flex-1 justify-center lg:flex"
            aria-label="Portal de empleo"
          >
            {POSTULATE_NAV.map((link) => {
              const hash = link.href.split("#")[1];
              const active = hash
                ? onLanding && isSectionActive(activeHash, link.href)
                : pathname === link.href;
              const href = hash && onLanding ? `#${hash}` : link.href;
              return (
                <a
                  key={link.href}
                  href={href}
                  className={`chrome-nav-link chrome-nav-link-paper ${active ? "is-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex">
            <Link
              href="/empresas"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-accent"
            >
              Empresas
            </Link>
            <Link href="/cv#vacantes" className={btnPrimary}>
              Buscar empleo
            </Link>
          </div>

          <button
            type="button"
            className="chrome-menu-btn shrink-0 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="postulate-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-ink transition ${open ? "top-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-ink transition ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-ink transition ${open ? "top-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="postulate-menu"
          className="chrome-mobile-panel chrome-mobile-panel-paper fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[70] overflow-y-auto lg:hidden"
        >
          <div className="mx-auto flex max-w-lg flex-col gap-8 px-5 py-8">
            <nav className="flex flex-col gap-1.5" aria-label="Portal móvil">
              {POSTULATE_NAV.map((link) => {
                const hash = link.href.split("#")[1];
                const active = hash
                  ? onLanding && isSectionActive(activeHash, link.href)
                  : pathname === link.href;
                const href = hash && onLanding ? `#${hash}` : link.href;
                return (
                  <a
                    key={link.href}
                    href={href}
                    className={`chrome-mobile-link ${active ? "is-active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{link.label}</span>
                    {active ? <span className="chrome-mobile-dot" aria-hidden /> : null}
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3">
              <Link
                href="/empresas"
                className="text-center text-sm font-semibold text-muted transition hover:text-accent"
                onClick={() => setOpen(false)}
              >
                Empresas
              </Link>
              <Link href="/cv#vacantes" className={btnPrimary} onClick={() => setOpen(false)}>
                Buscar empleo
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
