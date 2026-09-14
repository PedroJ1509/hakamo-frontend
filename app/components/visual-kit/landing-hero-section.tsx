import Image from "next/image";
import type { ReactNode } from "react";
import type { LandingHeroBackground } from "@/lib/visual-kit/types";

export function LandingHeroSection({
  background,
  id = "contenido",
  compact = false,
  tone = "night",
  children,
}: {
  background: LandingHeroBackground;
  id?: string;
  compact?: boolean;
  tone?: "night" | "paper";
  children: ReactNode;
}) {
  const paper = tone === "paper";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        paper ? "bg-paper text-ink" : "bg-night text-paper"
      } ${compact ? "min-h-[72svh] sm:min-h-[78svh]" : "min-h-[100svh]"}`}
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={background.src}
          alt=""
          fill
          priority={background.priority}
          className="hero-photo"
          style={{ objectPosition: background.objectPosition ?? "50% 45%" }}
          sizes="100vw"
        />
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
      </div>
      {children}
    </section>
  );
}
