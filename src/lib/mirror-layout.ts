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
    const perRow = Math.max(1, Math.ceil(count / 3));
    const row = Math.floor(index / perRow);
    const spacing = width < 600 ? 122 : 200;
    const span = Math.max(width + spacing, perRow * spacing);
    const direction = row === 1 ? -1 : 1;
    const x =
      (((((index % perRow) * spacing + phase * 4 * direction) % span) + span) %
        span) -
      span / 2;
    return {
      x,
      y: (row - 1) * (width < 600 ? 146 : 185),
      rotation: (index % 2 ? 1 : -1) * 7,
      scale: 1,
      opacity: 1,
      z: row + 1,
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
