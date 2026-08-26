import type { Metadata } from "next";
import { AboutLanding } from "@/app/components/visual-kit/landing/about-landing";

export const metadata: Metadata = {
  title: "Nosotros — Hakamo Outsourcing",
  description:
    "Conoce a Hakamo Outsourcing: misión, visión, valores y el equipo detrás del talento dominicano.",
};

export default function NosotrosPage() {
  return <AboutLanding />;
}
