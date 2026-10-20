import { VisitLanding } from "@/app/components/visual-kit/landing/visit-landing";
import { contenidoSolicitar, metadataSolicitar } from "@/lib/cms/solicitar";

export const generateMetadata = metadataSolicitar;

export default async function SolicitarPage() {
  return <VisitLanding contenido={await contenidoSolicitar()} />;
}
