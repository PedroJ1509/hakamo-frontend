"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/visual-kit/types";

export function PanelNav({
  links,
  variant = "rail",
}: {
  links: NavLink[];
  variant?: "rail" | "bar";
}) {
  const pathname = usePathname();
  const rail = variant === "rail";

  return (
    <nav className={rail ? "flex flex-col gap-1" : "flex gap-1 overflow-x-auto px-4 pb-3 sm:px-6"}>
      {links.map((link) => {
        const active = pathname === link.href;
        const className = rail
          ? active
            ? "rounded-2xl bg-white/10 px-3 py-2.5 text-sm text-glow"
            : "rounded-2xl px-3 py-2.5 text-sm text-paper/55 transition hover:bg-white/5 hover:text-paper"
          : active
            ? "rounded-full bg-glow px-3 py-1.5 text-sm text-night"
            : "rounded-full px-3 py-1.5 text-sm text-paper/55 hover:bg-white/10 hover:text-paper";
        return (
          <Link key={link.href} href={link.href} className={className}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
