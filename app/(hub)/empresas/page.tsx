import { HomeLanding } from "@/app/components/visual-kit/landing/home-landing";
import { contenidoEmpresas, metadataEmpresas } from "@/lib/cms/empresas";
import { LANDING_COPY } from "@/lib/visual-kit/hakamo";

export const generateMetadata = metadataEmpresas;

export default async function EmpresasPage() {
  return <HomeLanding copy={LANDING_COPY} contenido={await contenidoEmpresas()} />;
}
