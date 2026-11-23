"use client";

import { usePathname } from "next/navigation";
import { useSitio } from "@/app/components/sitio-context";
import type { NavLink } from "@/lib/visual-kit/types";
import { conSubmenus } from "@/lib/visual-kit/submenus";
import { SiteHeader } from "./site-header";

function isActive(pathname: string, href: string, links: NavLink[]) {
  const path = href.split("#")[0] || "/";
  if (path === "/") return pathname === "/";
  if (pathname === path) return true;
  const childActive = links.some((other) => {
    const otherPath = other.href.split("#")[0];
    if (otherPath === path || !otherPath.startsWith(`${path}/`)) return false;
    return pathname === otherPath || pathname.startsWith(`${otherPath}/`);
  });
  if (childActive) return false;
  return pathname.startsWith(`${path}/`);
}

/** Destino que se muestra como botón principal en vez de como enlace del menú. */
const SOLICITAR = "/empresas/solicitar";

/**
 * Cabecera de las páginas de empresas. El menú sale de la Configuración del
 * sitio; los submenús, de lib/visual-kit/submenus. "Solicitar personal" pasa a
 * ser el botón principal y "Busco empleo" vive en el cambio de audiencia.
 */
export function ChromeHeader({
  name,
  links,
  cvHref,
  cvLabel,
  placement,
  tone,
}: {
  name?: string;
  links?: NavLink[];
  /** Solo si una página quiere otro botón principal. */
  cvHref?: string;
  cvLabel?: string;
  placement: "fixed" | "sticky";
  tone: "night" | "paper";
}) {
  const sitio = useSitio();
  const pathname = usePathname();
  const menu = links ?? sitio.menuEmpresas;

  const solicitar = menu.find((l) => l.href === SOLICITAR);
  const cta =
    cvHref && cvLabel
      ? { texto: cvLabel, url: cvHref }
      : solicitar
        ? { texto: solicitar.label === "Solicitar" ? "Solicitar personal" : solicitar.label, url: solicitar.href }
        : sitio.botonCabeceraEmpresas;

  const items = conSubmenus(menu, sitio.submenus, solicitar && !(cvHref && cvLabel) ? [SOLICITAR] : []);

  return (
    <SiteHeader
      items={items}
      nombre={name ?? sitio.nombre}
      tone={tone}
      placement={placement}
      cta={cta}
      audiencia="empresas"
      // Las anclas no marcan activo: si no, todo el submenú de una página se encendería.
      activo={(href) => !href.includes("#") && isActive(pathname, href, menu)}
    />
  );
}

export function LandingHeader({
  name,
  links,
  cvHref,
  cvLabel,
  tone = "night",
}: {
  name?: string;
  links?: NavLink[];
  cvHref?: string;
  cvLabel?: string;
  tone?: "night" | "paper";
}) {
  return (
    <ChromeHeader
      name={name}
      links={links}
      cvHref={cvHref}
      cvLabel={cvLabel}
      placement={tone === "paper" ? "sticky" : "fixed"}
      tone={tone}
    />
  );
}
