import type { Metadata } from "next";
import { AboutLanding } from "@/app/components/visual-kit/landing/about-landing";

export const metadata: Metadata = {
  title: "Nosotros — Hakamo",
  description:
    "Conoce a Hakamo: su aliado estratégico en gestión humana para construcción, plantas industriales y proyectos de gran escala.",
};

export default function NosotrosPage() {
  return <AboutLanding />;
}
