"use client";

import { motion } from "framer-motion";
import type { Stat } from "@/lib/visual-kit/types";

export function StatsCounter({ stats, tono = "oscuro" }: { stats: Stat[]; tono?: "oscuro" | "claro" }) {
  const claro = tono === "claro";
  return (
    <div
      className={`mx-auto grid gap-x-6 gap-y-12 ${
        stats.length > 2 ? "grid-cols-2 lg:grid-cols-4" : "max-w-3xl grid-cols-2"
      }`}
    >
      {stats.map((item, index) => (
        <motion.article
          key={item.label}
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
        >
          <p className={`font-display text-4xl tracking-tight sm:text-5xl ${claro ? "text-paper" : "text-ink"}`}>{item.value}</p>
          <p className={`mx-auto mt-3 max-w-[12rem] text-sm leading-6 ${claro ? "text-paper/75" : "text-muted"}`}>{item.label}</p>
        </motion.article>
      ))}
    </div>
  );
}
