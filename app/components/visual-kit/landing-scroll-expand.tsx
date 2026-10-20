"use client";

import type { ReactNode } from "react";
import ScrollExpand from "./scroll-expand";

export function LandingScrollExpand({
  title,
  children,
  alt = "Equipo de profesionales de gestión humana",
  src = "/visual-kit/obra.jpg",
  scrollHint = "Baja para continuar",
}: {
  title: string;
  children?: ReactNode;
  alt?: string;
  /** Imagen o video (.mp4, .webm) que se expande. */
  src?: string;
  scrollHint?: string;
}) {
  return (
    <ScrollExpand
      src={src}
      mediaType={/\.(mp4|webm|mov)$/i.test(src) ? "video" : "image"}
      alt={alt}
      title={title}
      scrollHint={scrollHint}
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
