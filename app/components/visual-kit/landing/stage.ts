export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function windowed(x: number, enter0: number, enter1: number, leave0: number, leave1: number) {
  return smoothstep(enter0, enter1, x) * (1 - smoothstep(leave0, leave1, x));
}
