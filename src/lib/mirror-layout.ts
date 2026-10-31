import type { HeroMode } from "@/types/hero";

/** Deterministic geometry shared by autoplay, drag, step and reduced motion. */
export function mirrorTransform(
  mode: HeroMode,
  index: number,
  count: number,
  phase: number,
  width: number,
  reduced = false,
) {
  const radius = Math.min(width * 0.405, 600);
  if (mode === "rows") {
    const progress = (((index / Math.max(count, 1) + phase / 220) % 1) + 1) % 1;
    const angle = progress * Math.PI * 4;
    const depth = Math.cos(angle);
    const x = (progress - 0.5) * radius * 1.4 + Math.sin(angle) * radius * 0.42;
    return {
      x,
      y: 220 - progress * 470,
      rotation: Math.sin(angle) * 20 - 8,
      scale: 0.62 + (depth + 1) * 0.19,
      opacity: Math.min(1, progress / 0.07, (1 - progress) / 0.07),
      z: depth > 0 ? 24 : 3,
    };
  }
  if (mode === "shatter") {
    const progress = reduced
      ? 0.76
      : (((phase / 120 + index / Math.max(count, 1)) % 1) + 1) % 1;
    const spread = (index / Math.max(count - 1, 1)) * 2 - 1;
    const eased = 1 - Math.pow(1 - progress, 1.6);
    return {
      x: spread * radius * eased,
      y: 140 + (-260 - (index % 4) * 42) * eased,
      rotation: spread * (12 + progress * 33),
      scale: 0.4 + progress * 0.66,
      opacity: reduced
        ? 1
        : Math.min(1, progress / 0.12, (1 - progress) / 0.16),
      z: 1 + (index % 5),
    };
  }
  const angle = (((index / Math.max(count, 1)) * 360 + phase) * Math.PI) / 180;
  return {
    x: Math.sin(angle) * radius,
    y: Math.cos(angle) * (width < 600 ? 145 : 175),
    rotation: Math.sin(angle) * 19,
    scale: 0.81 + (Math.cos(angle) + 1) * 0.12,
    opacity: 1,
    z: Math.round((Math.cos(angle) + 1) * 4) + 1,
  };
}
