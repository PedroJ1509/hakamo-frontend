import { ServicesLanding } from "@/app/components/visual-kit/landing/services-landing";
import { testimonios } from "@/lib/cms/clientes";
import { obrasPorSector } from "@/lib/cms/proyectos";
import { contenidoServicios, metadataServicios } from "@/lib/cms/servicios";

export const generateMetadata = metadataServicios;

export default async function ServiciosPage() {
  const [contenido, conteo, citas] = await Promise.all([contenidoServicios(), obrasPorSector(), testimonios()]);
  return <ServicesLanding contenido={contenido} obrasPorSector={conteo} testimonios={citas} />;
}
