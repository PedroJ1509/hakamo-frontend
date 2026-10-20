import Image from "next/image";
import type { ReactNode } from "react";
import type { Fondo } from "@/lib/cms/comun";
import type { LandingHeroBackground } from "@/lib/visual-kit/types";

export function LandingHeroSection({
  background,
  id = "contenido",
  compact = false,
  tone = "night",
  fondo,
  children,
}: {
  background: LandingHeroBackground;
  /** Fondo editado en el CMS. Si viene, reemplaza la foto, el color y la capa del hero. */
  fondo?: Fondo;
  id?: string;
  compact?: boolean;
  tone?: "night" | "paper";
  children: ReactNode;
}) {
  const paper = tone === "paper";
  const src = fondo ? fondo.imagen : background.src;
  const externa = src !== null && !src.startsWith("/");
  const posicion = fondo?.posicion ?? background.objectPosition ?? "50% 45%";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        paper ? "bg-paper text-ink" : "bg-night text-paper"
      } ${compact ? "min-h-[72svh] sm:min-h-[78svh]" : "min-h-[100svh]"}`}
      style={fondo?.color ? { backgroundColor: fondo.color } : undefined}
    >
      <div className="absolute inset-0" aria-hidden>
        {src && fondo?.esVideo ? (
          <video src={src} autoPlay muted loop playsInline className="hero-photo absolute inset-0 h-full w-full object-cover" style={{ objectPosition: posicion }} />
        ) : src ? (
          <Image
            src={src}
            alt=""
            fill
            priority={background.priority}
            unoptimized={externa}
            className="hero-photo"
            style={{ objectPosition: posicion }}
            sizes="100vw"
          />
        ) : null}
        {paper ? (
          <>
            <div className="hero-field hero-field--photo-light" />
            <div className="hero-veil-light" />
          </>
        ) : (
          <>
            <div className="hero-field hero-field--photo" />
            <div className="hero-vignette" />
            <div className="hero-veil" />
          </>
        )}
        {fondo?.colorCapa && fondo.opacidadCapa > 0 ? (
          <div className="absolute inset-0" style={{ backgroundColor: fondo.colorCapa, opacity: fondo.opacidadCapa / 100 }} />
        ) : null}
      </div>
      {children}
    </section>
  );
}
