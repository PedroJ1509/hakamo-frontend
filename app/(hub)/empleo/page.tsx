import { EmploymentLanding } from "@/app/components/visual-kit/landing/employment-landing";
import { contenidoCultura, metadataCultura } from "@/lib/cms/cultura";

export const generateMetadata = metadataCultura;

export default async function EmpleoPage() {
  return <EmploymentLanding contenido={await contenidoCultura()} />;
}
