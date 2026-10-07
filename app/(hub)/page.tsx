import type { Metadata } from "next";
import { GateLanding } from "@/app/components/visual-kit/landing/gate-landing";

export const metadata: Metadata = {
  title: "Hakamo | Empresas y talento",
  description:
    "Hakamo conecta empresas con talento. Elige si buscas personal para tu operación o si buscas empleo.",
};

export default function HomePage() {
  return <GateLanding />;
}
