import type { Metadata } from "next";
import { ContactLanding } from "@/app/components/visual-kit/landing/contact-landing";

export const metadata: Metadata = {
  title: "Contacto — Hakamo",
  description:
    "Contáctanos para obtener una cotización o resolver tus dudas. Respondemos en menos de 24 horas.",
};

export default function ContactoPage() {
  return <ContactLanding />;
}
