import type { Photograph } from "@/types/gallery";

/** Magnify around the configured focal point without replacing hover transforms. */
export function photoFraming(photo: Pick<Photograph, "position" | "zoom">) {
  const scale = Number.isFinite(photo.zoom) && photo.zoom >= 1 ? photo.zoom : 1;
  return {
    objectPosition: photo.position,
    transformOrigin: photo.position ?? "50% 50%",
    scale,
  };
}
