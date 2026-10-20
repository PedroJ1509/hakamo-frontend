"use client";

import { createContext, useContext, type ReactNode } from "react";
import { resolverSitio, type Sitio } from "@/lib/cms/sitio";

const SitioContext = createContext<Sitio>(resolverSitio(null));

/** Reparte la configuración del sitio (logo, contacto, menús, pie) a toda la app. */
export function SitioProvider({ sitio, children }: { sitio: Sitio; children: ReactNode }) {
  return <SitioContext.Provider value={sitio}>{children}</SitioContext.Provider>;
}

export function useSitio() {
  return useContext(SitioContext);
}
