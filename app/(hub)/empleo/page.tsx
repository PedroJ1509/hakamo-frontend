import { EmploymentLanding } from "@/app/components/visual-kit/landing/employment-landing";
import { contenidoCultura, metadataCultura } from "@/lib/cms/cultura";
import { obrasSeleccionadas } from "@/lib/cms/proyectos";

export const generateMetadata = metadataCultura;

export default async function EmpleoPage() {
  const [contenido, obras] = await Promise.all([contenidoCultura(), obrasSeleccionadas(3)]);
  return <EmploymentLanding contenido={contenido} obras={obras} />;
}
