import { ContactLanding } from "@/app/components/visual-kit/landing/contact-landing";
import { contenidoContacto, metadataContacto } from "@/lib/cms/contacto";

export const generateMetadata = metadataContacto;

export default async function ContactoPage() {
  return <ContactLanding contenido={await contenidoContacto()} />;
}
