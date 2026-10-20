import { FaqLanding } from "@/app/components/visual-kit/landing/faq-landing";
import { contenidoFaq, metadataFaq } from "@/lib/cms/faq";

export const generateMetadata = metadataFaq;

export default async function FaqPage() {
  return <FaqLanding contenido={await contenidoFaq()} />;
}
