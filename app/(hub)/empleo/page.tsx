import type { Metadata } from "next";
import { EmploymentLanding } from "@/app/components/visual-kit/landing/employment-landing";

export const metadata: Metadata = {
  title: "Cultura — Hakamo",
  description:
    "Cómo es trabajar con Hakamo: proceso, áreas, formación, vida laboral y cuidado al colaborador.",
};

export default function EmpleoPage() {
  return <EmploymentLanding />;
}
