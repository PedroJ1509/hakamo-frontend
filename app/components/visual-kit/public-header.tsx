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
}: {
  name: string;
  variant?: "light" | "dark";
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
  ctaExternal?: boolean;
}) {
  return (
    <ChromeHeader
      name={name}
      links={links}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      ctaExternal={ctaExternal}
      placement="sticky"
      tone={variant === "dark" ? "night" : "paper"}
    />
  );
}
