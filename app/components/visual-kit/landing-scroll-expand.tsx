"use client";

import type { ReactNode } from "react";
import ScrollExpand from "./scroll-expand";

export function LandingScrollExpand({
  title,
  children,
  alt = "Equipo en un proyecto de infraestructura",
}: {
  title: string;
  children?: ReactNode;
  alt?: string;
}) {
  return (
    <ScrollExpand
      src="/visual-kit/obra.jpg"
      alt={alt}
      title={title}
      scrollHint="Baja para continuar"
      useWindowScroll
      startWidth={48}
      startHeight={54}
      startRadius={28}
      overlayScrim={0.52}
      scrollDistance={0.85}
      holdDistance={0.06}
      smoothing={0}
    >
      {children}
    </ScrollExpand>
  );
}
