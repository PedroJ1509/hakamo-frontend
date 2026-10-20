import { GateLanding } from "@/app/components/visual-kit/landing/gate-landing";
import { contenidoPuerta, metadataPuerta } from "@/lib/cms/puerta";

export const generateMetadata = metadataPuerta;

export default async function HomePage() {
  return <GateLanding contenido={await contenidoPuerta()} />;
}
