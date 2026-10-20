import { ServicesLanding } from "@/app/components/visual-kit/landing/services-landing";
import { contenidoServicios, metadataServicios } from "@/lib/cms/servicios";

export const generateMetadata = metadataServicios;

export default async function ServiciosPage() {
  return <ServicesLanding contenido={await contenidoServicios()} />;
}
