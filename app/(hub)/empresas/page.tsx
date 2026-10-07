import type { Metadata } from "next";
import { HomeLanding } from "@/app/components/visual-kit/landing/home-landing";
import {
  LANDING_COPY,
  LANDING_OFFERINGS,
  LANDING_STATS,
  SITE_NAV,
  SITE_PUBLIC,
} from "@/lib/visual-kit/hakamo";

export const metadata: Metadata = {
  title: "Empresas — Hakamo",
  description:
    "Outsourcing, reclutamiento, payroll y supervisión para construcción e industria. Solicita el personal que tu proyecto necesita.",
};

export default function EmpresasPage() {
  return (
    <HomeLanding
      site={SITE_PUBLIC}
      nav={SITE_NAV}
      stats={LANDING_STATS}
      offerings={LANDING_OFFERINGS}
      copy={LANDING_COPY}
    />
  );
}
