"use client";

import { ChromeHeader } from "./chrome-header";

/** Cabecera del blog y del equipo. Todo sale de la Configuración del sitio. */
export function PublicHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  return <ChromeHeader placement="sticky" tone={variant === "dark" ? "night" : "paper"} />;
}
