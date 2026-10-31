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
    // Keep six spaced lanes behind the portrait. Replace a photo only at the
    // invisible wrap boundary, so the next image rises in from below naturally.
    const raw = index / Math.max(count, 1) + (reduced ? 0.18 : phase / 260);
    const cycle = Math.floor(raw);
    const progress = raw - cycle;
    const lanes = [-0.92, 0.73, -0.52, 0.97, -0.78, 0.49];
    const sway = Math.sin(progress * Math.PI * 2 + index) * radius * 0.025;
    return {
      x: lanes[index % lanes.length] * radius + sway,
      y: 340 - progress * 700,
      rotation: (index % 2 ? 9 : -11) + Math.sin(progress * Math.PI) * 5,
      scale: 0.78 + (index % 3) * 0.07,
      opacity: reduced ? 1 : Math.min(1, progress / 0.1, (1 - progress) / 0.1),
      z: 2 + (index % 3),
      cycle: reduced ? 0 : cycle,
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
