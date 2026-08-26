"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

export function MagneticButton({
  href,
  children,
  variant = "glow",
  external = false,
  size = "md",
}: {
  href: string;
  children: ReactNode;
  variant?: "glow" | "ghost" | "ink";
  external?: boolean;
  size?: "sm" | "md";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const palette =
    variant === "glow"
      ? "bg-glow text-night hover:bg-[color-mix(in_srgb,var(--glow)_80%,white)]"
      : variant === "ink"
        ? "bg-night text-paper hover:bg-[color-mix(in_srgb,var(--night)_88%,white)]"
        : "border border-paper/25 bg-white/5 text-paper hover:bg-white/10";

  const className = `magnetic-btn ${size === "sm" ? "magnetic-btn-sm" : ""} ${palette}`;

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0, 0)";
  };

  const props = {
    ref,
    className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    children,
  };

  const native = external || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (native) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      />
    );
  }

  return <Link href={href} {...props} />;
}
