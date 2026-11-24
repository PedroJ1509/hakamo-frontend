"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSitio } from "@/app/components/sitio-context";
import type { NavItem } from "@/lib/visual-kit/submenus";
import { Logo } from "./logo";

type Boton = { texto: string; url: string };

/**
 * Cabecera de todo el sitio, en dos pisos como la de ISA: una barra superior
 * con contacto y el cambio de audiencia, y debajo la navegación a todo el
 * ancho con submenús. En móvil queda un solo piso y el menú abre en acordeón.
 */
export function SiteHeader({
  items,
  nombre,
  logoHref = "/",
  etiqueta,
  tone,
  placement,
  cta,
  audiencia,
  activo,
}: {
  items: NavItem[];
  nombre?: string;
  logoHref?: string;
  /** Texto pequeño junto al logo, p. ej. "Portal de empleo". */
  etiqueta?: string;
  tone: "night" | "paper";
  placement: "fixed" | "sticky";
  /** Acción principal, a la derecha. */
  cta?: Boton | null;
  /** Qué lado del sitio se está viendo: marca el cambio de audiencia. */
  audiencia: "empresas" | "empleos";
  activo: (href: string) => boolean;
}) {
  const { contacto, redes } = useSitio();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [movilAbierto, setMovilAbierto] = useState(false);
  const [desplegado, setDesplegado] = useState<string | null>(null);
  const [acordeon, setAcordeon] = useState<string | null>(null);
  const cierre = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const night = tone === "night";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cambiar de página cierra todo lo abierto. Se ajusta durante el render
  // (patrón recomendado por React) en vez de con un efecto en cascada.
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setMovilAbierto(false);
    setDesplegado(null);
    setAcordeon(null);
  }

  useEffect(() => {
    document.body.style.overflow = movilAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [movilAbierto]);

  // Escape cierra; un clic fuera del menú cierra el desplegable.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMovilAbierto(false);
      setDesplegado(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDesplegado(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Un pequeño margen al salir con el ratón, para poder cruzar hasta el panel.
  // Un desplegable puede abrirse por "hover" (se cierra al salir el ratón) o por
  // clic/teclado (queda fijado hasta otro clic, Escape o pulsar fuera). Sin esta
  // distinción, pasar el ratón lo abría y el clic en la flecha lo CERRABA, y en
  // pantallas táctiles el toque (hover + clic) lo abría y cerraba al instante.
  const modo = useRef<"hover" | "fijo">("hover");
  const abrir = (href: string) => {
    if (cierre.current) window.clearTimeout(cierre.current);
    if (desplegado !== href) modo.current = "hover";
    setDesplegado(href);
  };
  const cerrarLuego = () => {
    if (cierre.current) window.clearTimeout(cierre.current);
    cierre.current = window.setTimeout(() => {
      if (modo.current === "hover") setDesplegado(null);
    }, 140);
  };
  const alternar = (href: string) => {
    if (desplegado === href && modo.current === "fijo") {
      setDesplegado(null);
      return;
    }
    modo.current = "fijo";
    setDesplegado(href);
  };

  const estaActivo = (item: NavItem) => activo(item.href) || Boolean(item.children?.some((c) => activo(c.href)));

  const claseBarra = [
    "site-header inset-x-0 top-0",
    placement === "fixed" ? "fixed" : "sticky",
    night ? "site-header-night" : "site-header-paper",
    scrolled || movilAbierto ? "is-solid" : "",
  ].join(" ");

  return (
    <>
      <header className={claseBarra}>
        {/* ── Piso 1: contacto y audiencia (solo escritorio) ── */}
        <div className="site-topbar">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6">
            <div className="flex min-w-0 items-center gap-5">
              <a href={contacto.whatsappUrl} target="_blank" rel="noreferrer" className="site-topbar-link">
                <IconoWhatsapp />
                {contacto.telefono}
              </a>
              <a href={`mailto:${contacto.email}`} className="site-topbar-link">
                <IconoCorreo />
                {contacto.email}
              </a>
              {/* El envoltorio decide la visibilidad: .site-topbar-link fija su propio display. */}
              {contacto.direccion ? (
                <span className="hidden xl:inline-flex">
                  <span className="site-topbar-link">
                    <IconoUbicacion />
                    {contacto.direccion}
                  </span>
                </span>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-4">
              {redes.length > 0 ? (
                <ul className="flex items-center gap-3" aria-label="Redes sociales">
                  {redes.map((red) => (
                    <li key={red.url}>
                      <a href={red.url} target="_blank" rel="noreferrer" className="site-topbar-link" aria-label={red.nombre}>
                        <IconoRed nombre={red.nombre} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
              <CambioAudiencia audiencia={audiencia} />
            </div>
          </div>
        </div>

        {/* ── Piso 2: navegación ── */}
        <div className="site-bar">
          <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6">
            <div className="flex shrink-0 items-center gap-3">
              <Logo name={nombre} href={logoHref} inverted={night} className={night ? "text-paper" : "text-ink"} />
              {etiqueta ? (
                <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.18em] xl:inline ${night ? "text-glow" : "text-accent"}`}>
                  {etiqueta}
                </span>
              ) : null}
            </div>

            <nav ref={navRef} className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Principal">
              {items.map((item) =>
                item.children ? (
                  <MenuDesplegable
                    key={item.href}
                    item={item}
                    night={night}
                    activo={estaActivo(item)}
                    esActivo={activo}
                    abierto={desplegado === item.href}
                    onAbrir={() => abrir(item.href)}
                    onCerrarLuego={cerrarLuego}
                    onAlternar={() => alternar(item.href)}
                    onElegir={() => setDesplegado(null)}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`site-nav-link ${night ? "site-nav-link-night" : "site-nav-link-paper"} ${estaActivo(item) ? "is-active" : ""}`}
                    aria-current={activo(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              {cta ? (
                <Link href={cta.url} className={`site-cta hidden lg:inline-flex ${night ? "site-cta-night" : "site-cta-paper"}`}>
                  {cta.texto}
                </Link>
              ) : null}
              <button
                type="button"
                className={`chrome-menu-btn shrink-0 lg:hidden ${night ? "text-paper" : "text-ink"}`}
                aria-expanded={movilAbierto}
                aria-controls="menu-movil"
                aria-label={movilAbierto ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setMovilAbierto((v) => !v)}
              >
                <Hamburguesa abierto={movilAbierto} claro={night} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Menú móvil en acordeón ── */}
      {movilAbierto ? (
        <div
          id="menu-movil"
          className={`chrome-mobile-panel fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[70] overflow-y-auto lg:hidden ${
            night ? "chrome-mobile-panel-night" : "chrome-mobile-panel-paper"
          }`}
        >
          <div className="mx-auto flex max-w-lg flex-col gap-7 px-5 py-6">
            <CambioAudiencia audiencia={audiencia} movil night={night} />

            <nav className="flex flex-col" aria-label="Móvil">
              {items.map((item) => (
                <div key={item.href} className={`border-b ${night ? "border-white/10" : "border-ink/10"}`}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`flex-1 py-3.5 text-lg font-semibold ${estaActivo(item) ? (night ? "text-glow" : "text-accent") : ""}`}
                      onClick={() => setMovilAbierto(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center"
                        aria-expanded={acordeon === item.href}
                        aria-label={`${acordeon === item.href ? "Ocultar" : "Ver"} opciones de ${item.label}`}
                        onClick={() => setAcordeon(acordeon === item.href ? null : item.href)}
                      >
                        <Flecha abierta={acordeon === item.href} />
                      </button>
                    ) : null}
                  </div>
                  {item.children && acordeon === item.href ? (
                    <ul className="pb-3 pl-3">
                      {item.children.map((hijo) => (
                        <li key={hijo.href}>
                          <Link
                            href={hijo.href}
                            className={`block rounded-lg px-3 py-2.5 text-[15px] ${night ? "text-paper/75 hover:bg-white/5" : "text-ink/70 hover:bg-ink/[0.04]"}`}
                            onClick={() => setMovilAbierto(false)}
                          >
                            {hijo.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </nav>

            {cta ? (
              <Link href={cta.url} className={`site-cta flex justify-center ${night ? "site-cta-night" : "site-cta-paper"}`} onClick={() => setMovilAbierto(false)}>
                {cta.texto}
              </Link>
            ) : null}

            <div className={`chrome-mobile-meta ${night ? "border-white/10" : "border-ink/10"}`}>
              <a href={contacto.whatsappUrl} target="_blank" rel="noreferrer" className="chrome-mobile-meta-row">
                <span className="chrome-mobile-meta-label">WhatsApp</span>
                <span>{contacto.telefono}</span>
              </a>
              <a href={contacto.telefonoAltUrl} className="chrome-mobile-meta-row">
                <span className="chrome-mobile-meta-label">Teléfono</span>
                <span>{contacto.telefonoAlt}</span>
              </a>
              <a href={`mailto:${contacto.email}`} className="chrome-mobile-meta-row">
                <span className="chrome-mobile-meta-label">Correo</span>
                <span className="truncate">{contacto.email}</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MenuDesplegable({
  item,
  night,
  activo,
  esActivo,
  abierto,
  onAbrir,
  onCerrarLuego,
  onAlternar,
  onElegir,
}: {
  item: NavItem;
  night: boolean;
  activo: boolean;
  esActivo: (href: string) => boolean;
  abierto: boolean;
  onAbrir: () => void;
  onCerrarLuego: () => void;
  onAlternar: () => void;
  /** Se eligió un enlace del desplegable: cierra aunque estuviera fijado. */
  onElegir: () => void;
}) {
  const panelId = useId();
  const hijos = item.children ?? [];

  return (
    <div className="relative" onMouseEnter={onAbrir} onMouseLeave={onCerrarLuego}>
      <div className={`site-nav-link ${night ? "site-nav-link-night" : "site-nav-link-paper"} ${activo ? "is-active" : ""} site-nav-link-desplegable`}>
        <Link href={item.href} aria-current={esActivo(item.href) ? "page" : undefined}>
          {item.label}
        </Link>
        {/* Botón aparte: el texto navega y la flecha abre, también con teclado. */}
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded"
          aria-expanded={abierto}
          aria-controls={panelId}
          aria-label={`${abierto ? "Ocultar" : "Ver"} opciones de ${item.label}`}
          onClick={onAlternar}
        >
          <Flecha abierta={abierto} />
        </button>
      </div>

      <div id={panelId} hidden={!abierto} className="absolute left-1/2 top-full z-[80] -translate-x-1/2 pt-3">
        <ul className="site-dropdown min-w-[15rem] max-w-[20rem]">
          {hijos.map((hijo) => (
            <li key={hijo.href}>
              <Link
                href={hijo.href}
                className={`site-dropdown-link ${esActivo(hijo.href) ? "is-active" : ""}`}
                onClick={onElegir}
              >
                {hijo.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** "Empresas | Empleos": las dos audiencias a un clic, como en la puerta. */
function CambioAudiencia({ audiencia, movil = false, night = true }: { audiencia: "empresas" | "empleos"; movil?: boolean; night?: boolean }) {
  const opciones = [
    { clave: "empresas", texto: "Soy empresa", url: "/empresas" },
    { clave: "empleos", texto: "Busco empleo", url: "/empleos" },
  ] as const;

  return (
    <div className={movil ? `site-switch site-switch-movil ${night ? "" : "site-switch-claro"}` : "site-switch"} role="group" aria-label="Elegir sección">
      {opciones.map((o) => (
        <Link key={o.clave} href={o.url} className={`site-switch-opcion ${audiencia === o.clave ? "is-active" : ""}`} aria-current={audiencia === o.clave ? "true" : undefined}>
          {o.texto}
        </Link>
      ))}
    </div>
  );
}

function Flecha({ abierta }: { abierta: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className={`transition-transform duration-200 ${abierta ? "rotate-180" : ""}`}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hamburguesa({ abierto, claro }: { abierto: boolean; claro: boolean }) {
  const color = claro ? "bg-paper" : "bg-ink";
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span className={`absolute left-0 h-0.5 w-5 rounded-full transition ${color} ${abierto ? "top-1.5 rotate-45" : "top-0"}`} />
      <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full transition ${color} ${abierto ? "opacity-0" : "opacity-100"}`} />
      <span className={`absolute left-0 h-0.5 w-5 rounded-full transition ${color} ${abierto ? "top-1.5 -rotate-45" : "top-3"}`} />
    </span>
  );
}

const svg = "h-3.5 w-3.5 shrink-0";

function IconoWhatsapp() {
  return (
    <svg className={svg} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5c0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7A11.8 11.8 0 0 0 23.8 12c0-3.2-1.2-6.1-3.4-8.4Z" />
    </svg>
  );
}

function IconoCorreo() {
  return (
    <svg className={svg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconoUbicacion() {
  return (
    <svg className={svg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function IconoRed({ nombre }: { nombre: string }) {
  const n = nombre.toLowerCase();
  if (n.includes("instagram")) {
    return (
      <svg className={svg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (n.includes("linkedin")) {
    return (
      <svg className={svg} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
      </svg>
    );
  }
  if (n.includes("facebook")) {
    return (
      <svg className={svg} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z" />
      </svg>
    );
  }
  return <span className="text-[11px] font-semibold">{nombre.slice(0, 2)}</span>;
}
