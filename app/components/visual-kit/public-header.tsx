"use client";

import type { NavLink } from "@/lib/visual-kit/types";
import { ChromeHeader } from "./chrome-header";

export function PublicHeader({
  name,
  variant = "light",
  links,
  ctaHref,
  ctaLabel,
  ctaExternal = false,
  cvHref,
  cvLabel,
}: {
  name: string;
  variant?: "light" | "dark";
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
  ctaExternal?: boolean;
  cvHref?: string;
  cvLabel?: string;
}) {
  return (
    <ChromeHeader
      name={name}
      links={links}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      ctaExternal={ctaExternal}
      cvHref={cvHref}
      cvLabel={cvLabel}
      placement="sticky"
      tone={variant === "dark" ? "night" : "paper"}
    />
  );
}
