import type { Metadata } from "next";
import { EmploymentLanding } from "@/app/components/visual-kit/landing/employment-landing";

export const metadata: Metadata = {
  title: "Empleo — Hakamo",
  description:
    "Encuentra tu próxima oportunidad laboral. Registra tu perfil y te contactamos cuando haya una vacante que encaje contigo.",
};

export default function EmpleoPage() {
  return <EmploymentLanding />;
}
