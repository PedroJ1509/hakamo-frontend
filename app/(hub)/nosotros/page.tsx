import { AboutLanding } from "@/app/components/visual-kit/landing/about-landing";
import { contenidoNosotros, metadataNosotros } from "@/lib/cms/nosotros";

export const generateMetadata = metadataNosotros;

export default async function NosotrosPage() {
  return <AboutLanding contenido={await contenidoNosotros()} />;
}
