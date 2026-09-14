import type { Metadata } from "next";
import { AboutLanding } from "@/app/components/visual-kit/landing/about-landing";

export const metadata: Metadata = {
  title: "Nosotros — Hakamo",
  description:
    "Startup dominicana de outsourcing de personal, reclutamiento y gestión de proyectos para el sector construcción. Misión, visión, valores y trayectoria de Hakamo.",
};

export default function NosotrosPage() {
  return <AboutLanding />;
}
