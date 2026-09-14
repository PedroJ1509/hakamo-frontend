"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { btnGhostOnNight, btnSecondary } from "@/lib/visual-kit/styles";

export function PostulateCta({
  href,
  label,
  tone = "night",
  size = "md",
  className = "",
  onNavigate,
}: {
  href: string;
  label: string;
  tone?: "night" | "paper";
  size?: "sm" | "md";
  className?: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [launching, setLaunching] = useState(false);

  const base = tone === "night" ? btnGhostOnNight : btnSecondary;
  const sizeClass = size === "sm" ? "!px-4 !py-2 text-xs sm:text-sm" : "";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (launching) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    onNavigate?.();

    if (reduceMotion) {
      router.push(href);
      return;
    }

    setLaunching(true);
    window.setTimeout(() => {
      router.push(href);
    }, 400);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`postulate-cta relative inline-flex overflow-hidden ${base} ${sizeClass} ${className}`}
      whileHover={launching ? undefined : { scale: 1.05, y: -1 }}
      whileTap={launching ? undefined : { scale: 0.93 }}
      animate={
        launching
          ? {
              scale: [1, 0.88, 1.1, 1],
              transition: { duration: 0.4, times: [0, 0.3, 0.65, 1], ease: "easeOut" },
            }
          : { scale: 1 }
      }
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <span className="relative z-[1]">{label}</span>
      {launching ? (
        <span
          className={`postulate-cta-burst ${tone === "night" ? "postulate-cta-burst-glow" : ""}`}
          aria-hidden
        />
      ) : null}
    </motion.a>
  );
}
