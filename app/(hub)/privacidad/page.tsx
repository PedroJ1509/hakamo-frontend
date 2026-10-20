import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getSitio, textoConContacto } from "@/lib/cms/sitio";
import { contenidoPrivacidad, metadataPrivacidad } from "@/lib/cms/privacidad";
import { FondoSeccion } from "@/app/components/visual-kit/fondo-seccion";
import { Logo } from "@/app/components/visual-kit/logo";
import { paleta } from "@/app/components/visual-kit/seccion";

export const generateMetadata = metadataPrivacidad;

export default async function PrivacidadPage() {
  const [{ contacto }, contenido] = await Promise.all([getSitio(), contenidoPrivacidad()]);
  const p = paleta(contenido.fondo.tono);
  const claro = contenido.fondo.tono === "claro";

  return (
    <div className={`relative isolate min-h-[100svh] bg-paper ${p.texto}`}>
      <FondoSeccion fondo={contenido.fondo} />
      <header className="relative mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo inverted={claro} />
        <nav className="flex gap-4 text-sm font-semibold">
          {contenido.menu.map((enlace) => (
            <Link key={enlace.url + enlace.texto} href={enlace.url} className={`${p.suave} ${claro ? "hover:text-glow" : "hover:text-accent"}`}>
              {enlace.texto}
            </Link>
          ))}
        </nav>
      </header>
      <main className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className={`text-[11px] uppercase tracking-[0.32em] ${p.acento}`}>{contenido.antetitulo}</p>
        <h1 className="font-display mt-3 text-4xl">{contenido.titulo}</h1>
        <div
          className={`mt-8 space-y-5 text-sm leading-7 ${p.suave} [&_a]:underline [&_h2]:font-display [&_h2]:pt-4 [&_h2]:text-2xl [&_h3]:font-semibold [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:font-semibold [&_ul]:list-disc ${
            claro ? "[&_h2]:text-paper [&_h3]:text-paper [&_strong]:text-paper" : "[&_h2]:text-ink [&_h3]:text-ink [&_strong]:text-ink"
          }`}
        >
          <ReactMarkdown>{textoConContacto(contenido.contenido, contacto)}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
