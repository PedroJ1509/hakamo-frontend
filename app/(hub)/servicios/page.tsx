import type { Metadata } from "next";
import { ServicesLanding } from "@/app/components/visual-kit/landing/services-landing";

export const metadata: Metadata = {
  title: "Servicios — Hakamo",
  description:
    "Outsourcing de personal operativo y técnico, reclutamiento, gestión documental, nómina y supervisión de proyectos para el sector construcción.",
};

export default function ServiciosPage() {
  return <ServicesLanding />;
}
