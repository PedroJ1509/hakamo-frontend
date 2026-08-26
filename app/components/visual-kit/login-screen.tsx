import type { ReactNode } from "react";
import { Logo } from "./logo";

export function LoginScreen({
  name,
  kicker = "Personal",
  title,
  text,
  children,
  backHref = "/",
  backLabel = "Volver al sitio",
}: {
  name: string;
  kicker?: string;
  title: string;
  text?: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <main className="relative flex min-h-full flex-1 flex-col justify-center overflow-hidden bg-night px-4 py-16 text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_srgb,var(--glow)_16%,transparent),transparent_46%)]"
      />
      <div className="relative mx-auto w-full max-w-md">
        <Logo name={name} inverted className="text-paper" />
        <p className="mt-10 text-[11px] uppercase tracking-[0.32em] text-glow">{kicker}</p>
        <h1 className="font-display mt-3 text-4xl leading-[0.95]">{title}</h1>
        {text ? <p className="mt-3 text-sm leading-6 text-paper/65">{text}</p> : null}
        <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/95 p-6 text-ink shadow-[0_24px_80px_color-mix(in_srgb,var(--night)_35%,transparent)]">
          {children}
        </div>
        <a href={backHref} className="mt-6 inline-block text-sm text-paper/55 hover:text-glow">
          {backLabel}
        </a>
      </div>
    </main>
  );
}
