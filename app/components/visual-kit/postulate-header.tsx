"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { POSTULATE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { Logo } from "./logo";

const SECTIONS = ["categorias", "como", "tu-cv"];

function sectionFromHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace("#", "");
}

function isActive(pathname: string, hash: string, href: string) {
  const targetHash = href.split("#")[1] ?? "";
  const path = href.split("#")[0] || "/";

  if (targetHash) return pathname === "/empleos" && hash === targetHash;
  if (path === "/empleos") return pathname === "/empleos" && !hash;
  if (path === "/empleos/vacantes") {
    return pathname === path || pathname.startsWith(`${path}/`);
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function PostulateHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const site = SITE_PUBLIC;
  const onLanding = pathname === "/empleos";

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

    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActiveHash(best);
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.6] },
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
    "chrome-header chrome-header-paper inset-x-0 top-0 sticky",
    scrolled && !open ? "is-compact" : "",
  ].join(" ");

  return (
    <>
      <header className={barClass}>
        <div className="chrome-header-inner mx-auto flex items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5 xl:px-6">
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <Logo name={site.name} href="/empleos" inverted={false} className="text-ink" />
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
              const active = isActive(pathname, onLanding ? activeHash : "", link.href);
              const href = hash && onLanding ? `#${hash}` : link.href;
              return (
                <a
                  key={link.href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`chrome-nav-link chrome-nav-link-paper ${active ? "is-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center justify-end lg:flex">
            <Link
              href="/empresas"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-accent"
            >
              Empresas
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
                const active = isActive(pathname, onLanding ? activeHash : "", link.href);
                const href = hash && onLanding ? `#${hash}` : link.href;
                return (
                  <a
                    key={link.href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`chrome-mobile-link ${active ? "is-active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{link.label}</span>
                    {active ? <span className="chrome-mobile-dot" aria-hidden /> : null}
                  </a>
                );
              })}
            </nav>

            <Link
              href="/empresas"
              className="text-center text-sm font-semibold text-muted transition hover:text-accent"
              onClick={() => setOpen(false)}
            >
              Empresas
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
