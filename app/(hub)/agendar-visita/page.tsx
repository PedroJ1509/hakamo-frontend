import type { Metadata } from "next";
import { VisitLanding } from "@/app/components/visual-kit/landing/visit-landing";

export const metadata: Metadata = {
  title: "Agendar visita — Hakamo",
  description:
    "Agenda una visita con Hakamo. Cuéntanos el motivo y te contactamos por WhatsApp y correo.",
};

export default function AgendarVisitaPage() {
  return <VisitLanding />;
}
