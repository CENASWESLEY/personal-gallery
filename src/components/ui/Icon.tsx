import type { SVGProps } from "react";

type IconName =
  | "arrow"
  | "down"
  | "close"
  | "left"
  | "right"
  | "sun"
  | "moon"
  | "grid"
  | "list"
  | "expand"
  | "zoom"
  | "play"
  | "pause"
  | "spark"
  | "menu";
const paths: Record<IconName, string> = {
  arrow: "M5 19 19 5M5 5h14v14",
  down: "M12 4v16m-7-7 7 7 7-7",
  close: "m6 6 12 12M6 18 18 6",
  left: "m14 6-6 6 6 6",
  right: "m10 6 6 6-6 6",
  sun: "M12 3V1m0 22v-2M3 12H1m22 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  moon: "M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z",
  grid: "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z",
  list: "M3 5h18M3 12h18M3 19h18",
  expand: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
  zoom: "M11 8v6m-3-3h6m2 5 5 5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  play: "m8 4 12 8-12 8Z",
  pause: "M8 4v16M16 4v16",
  spark:
    "m12 1 2.1 7.9L22 6l-5.1 6 5.1 6-7.9-2.9L12 23l-2.1-7.9L2 18l5.1-6L2 6l7.9 2.9Z",
  menu: "M3 8h18M3 16h18",
};

/** Lightweight, consistent line icons; labels belong to their parent controls. */
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
