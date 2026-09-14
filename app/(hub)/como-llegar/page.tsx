import type { Metadata } from "next";
import { DirectionsLanding } from "@/app/components/visual-kit/landing/directions-landing";

export const metadata: Metadata = {
  title: "Cómo llegar — Hakamo",
  description:
    "Calcula el tiempo de llegada a Hakamo en Montecristi y consulta el mapa con tu ruta.",
};

export default function ComoLlegarPage() {
  return <DirectionsLanding />;
}
