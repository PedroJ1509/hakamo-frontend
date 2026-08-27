"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Stat } from "@/lib/visual-kit/types";

function parseStat(value: string) {
  const suffix = value.match(/[^\d.,\s]+$/)?.[0] ?? "";
  const amount = Number(value.replace(/[^\d]/g, "")) || 0;
  return { amount, suffix };
}

function formatAmount(n: number, grouped: boolean) {
  const rounded = Math.round(n);
  return grouped ? rounded.toLocaleString("en-US") : String(rounded);
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { amount, suffix } = parseStat(value);
  const grouped = amount >= 1000;
  const display = useTransform(count, (latest) => `${formatAmount(latest, grouped)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      count.set(amount);
      return;
    }
    const controls = animate(count, amount, { duration: 1.8, ease: "easeOut" });
    return controls.stop;
  }, [amount, count, grouped, inView, suffix]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
}

export function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
      {stats.map((item, index) => (
        <motion.article
          key={item.label}
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
        >
          <p className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
            <Counter value={item.value} />
          </p>
          <p className="mx-auto mt-3 max-w-[12rem] text-sm leading-6 text-muted">{item.label}</p>
        </motion.article>
      ))}
    </div>
  );
}
