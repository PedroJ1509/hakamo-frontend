"use client";

import { useEffect, useRef } from "react";

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function LightField({ active = true }: { active?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.55, y: 0.4 };
    const target = { x: 0.55, y: 0.4 };
    let raf = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width;
      target.y = (event.clientY - rect.top) / rect.height;
    };

    const lamp = (x: number, y: number, rx: number, ry: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.scale(rx, ry);
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      time += reduced ? 0 : 0.004;

      ctx.fillStyle = cssVar("--night") || "#111";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      const glow = cssVar("--glow") || "#ddd";
      const accent = cssVar("--accent") || "#666";
      lamp(width * 0.72, height * (0.12 + Math.sin(time) * 0.02), width * 0.38, height * 0.14, glow, 0.22);
      lamp(width * 0.78, height * 0.42, width * 0.2, height * 0.36, accent, 0.16);
      lamp(width * (0.18 + Math.sin(time * 0.7) * 0.02), height * 0.72, width * 0.16, height * 0.1, accent, 0.1);
      lamp(width * mouse.x, height * mouse.y, width * 0.14, height * 0.09, glow, 0.1);
      ctx.globalCompositeOperation = "source-over";

      if (!reduced && active) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    if (active) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
