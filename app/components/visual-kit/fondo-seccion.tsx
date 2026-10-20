import Image from "next/image";
import type { Fondo } from "@/lib/cms/comun";

/** Capa de fondo de una sección: color, imagen o video, y la capa que oscurece para leer el texto. */
export function FondoSeccion({ fondo, priority = false, sizes = "100vw" }: { fondo: Fondo; priority?: boolean; sizes?: string }) {
  const externa = fondo.imagen !== null && !fondo.imagen.startsWith("/");

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={fondo.color ? { backgroundColor: fondo.color } : undefined}>
      {fondo.imagen && fondo.esVideo ? (
        <video
          src={fondo.imagen}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: fondo.posicion }}
        />
      ) : fondo.imagen ? (
        <Image
          src={fondo.imagen}
          alt={fondo.alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized={externa}
          className="object-cover"
          style={{ objectPosition: fondo.posicion }}
        />
      ) : null}
      {fondo.colorCapa && fondo.opacidadCapa > 0 ? (
        <div className="absolute inset-0" style={{ backgroundColor: fondo.colorCapa, opacity: fondo.opacidadCapa / 100 }} />
      ) : null}
    </div>
  );
}
