"use client";

import { POSTULATE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { PostulateHeader } from "./postulate-header";
import { PublicFooter } from "./public-footer";
import { ScrollProgress } from "./scroll-progress";

export function PostulateLayout({ children }: { children: React.ReactNode }) {
  const site = SITE_PUBLIC;

  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <ScrollProgress />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Saltar al contenido
      </a>

      <PostulateHeader />

      <div id="contenido">{children}</div>

      <PublicFooter
        site={site}
        links={POSTULATE_NAV}
        tone="paper"
        ctaHref="/empleos/vacantes"
        ctaLabel="Buscar empleo"
        staffHref="/empresas"
        staffLabel="Empresas"
      />
    </div>
  );
}
