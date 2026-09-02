import type { Metadata } from "next";
import { ServicesLanding } from "@/app/components/visual-kit/landing/services-landing";

export const metadata: Metadata = {
  title: "Servicios — Hakamo",
  description:
    "Servicios especializados de outsourcing de personal, reclutamiento, nómina y consultoría laboral para empresas dominicanas.",
};

export default function ServiciosPage() {
  return <ServicesLanding />;
}
