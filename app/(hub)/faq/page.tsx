import type { Metadata } from "next";
import { FaqLanding } from "@/app/components/visual-kit/landing/faq-landing";

export const metadata: Metadata = {
  title: "Preguntas frecuentes — Hakamo",
  description:
    "Respuestas sobre outsourcing, reclutamiento, payroll, cumplimiento laboral, supervisión y seguridad ocupacional de Hakamo.",
};

export default function FaqPage() {
  return <FaqLanding />;
}
