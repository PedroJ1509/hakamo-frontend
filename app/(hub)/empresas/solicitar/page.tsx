import type { Metadata } from "next";
import { VisitLanding } from "@/app/components/visual-kit/landing/visit-landing";

export const metadata: Metadata = {
  title: "Solicitar — Hakamo",
  description:
    "Solicita personal, una reunión o un mensaje. El formulario cambia según lo que necesitas.",
};

export default function SolicitarPage() {
  return <VisitLanding />;
}
