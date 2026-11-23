"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSitio } from "@/app/components/sitio-context";
import { conSubmenus } from "@/lib/visual-kit/submenus";
import { SiteHeader } from "./site-header";

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
  const [activeHash, setActiveHash] = useState("");
  const sitio = useSitio();
  const onLanding = pathname === "/empleos";

  useEffect(() => {
    if (!onLanding) return;

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

  return (
    <SiteHeader
      items={conSubmenus(sitio.menuEmpleos, sitio.submenus)}
      logoHref="/empleos"
      etiqueta="Portal de empleo"
      tone="paper"
      placement="sticky"
      // La acción que más importa a un candidato sin vacante a la vista.
      cta={{ texto: "Deja tu CV", url: "/empleos#tu-cv" }}
      audiencia="empleos"
      // Fuera de /empleos no hay sección activa: se deriva en vez de guardarse.
      activo={(href) => isActive(pathname, onLanding ? activeHash : "", href)}
    />
  );
}
