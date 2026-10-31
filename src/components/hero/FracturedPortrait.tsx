"use client";

import { useRef, useState, type CSSProperties } from "react";
import { photographs } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";

/** Polygon facets share one image coordinate system, forming a broken mirror. */
const facets = [
  { clip: "polygon(0 0, 52% 0, 44% 37%, 0 18%)", x: -17, y: -14, rotate: -3 },
  {
    clip: "polygon(54% 0, 100% 0, 100% 25%, 47% 38%)",
    x: 16,
    y: -16,
    rotate: 3,
  },
  {
    clip: "polygon(0 20%, 43% 39%, 35% 64%, 0 80%)",
    x: -24,
    y: 3,
    rotate: -3.5,
  },
  {
    clip: "polygon(46% 40%, 100% 27%, 100% 73%, 67% 66%)",
    x: 21,
    y: -1,
    rotate: 2,
  },
  {
    clip: "polygon(45% 41%, 65% 68%, 51% 100%, 30% 100%, 37% 65%)",
    x: 0,
    y: 15,
    rotate: -1,
  },
  {
    clip: "polygon(0 83%, 34% 67%, 27% 100%, 0 100%)",
    x: -18,
    y: 19,
    rotate: -5,
  },
  {
    clip: "polygon(68% 69%, 100% 76%, 100% 100%, 54% 100%)",
    x: 22,
    y: 20,
    rotate: 4,
  },
];

/** Interactive CSS glass sculpture. Hover or activate to separate the facets. */
export function FracturedPortrait({ onOpen }: { onOpen: () => void }) {
  const [shattered, setShattered] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`portrait-scene ${shattered ? "is-shattered" : ""}`}
      ref={frame}
    >
      <div className="portrait-coordinate top-coordinate">
        FIG. 01 — THE MANY SIDES OF ME
      </div>
      <button
        className="fractured-portrait"
        aria-label="Open the featured portrait in the gallery"
        onClick={onOpen}
        onPointerMove={(event) => {
          if (
            event.pointerType !== "mouse" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          )
            return;
          const rect = event.currentTarget.getBoundingClientRect();
          frame.current?.style.setProperty(
            "--tilt-x",
            `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`,
          );
          frame.current?.style.setProperty(
            "--tilt-y",
            `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`,
          );
        }}
        onPointerLeave={() => {
          frame.current?.style.setProperty("--tilt-x", "0deg");
          frame.current?.style.setProperty("--tilt-y", "0deg");
        }}
      >
        <span className="portrait-base" />
        {facets.map((facet, index) => (
          <span
            key={index}
            className={`glass-facet facet-${index}`}
            style={
              {
                clipPath: facet.clip,
                "--shard-x": `${facet.x}px`,
                "--shard-y": `${facet.y}px`,
                "--shard-r": `${facet.rotate}deg`,
              } as CSSProperties
            }
          >
            <img
              src={photographs["05"].src}
              alt=""
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </span>
        ))}
        <span className="portrait-open">
          <Icon name="expand" /> Explore the frame
        </span>
      </button>
      <span className="floating-fragment fragment-one" aria-hidden="true" />
      <span className="floating-fragment fragment-two" aria-hidden="true" />
      <div className="portrait-label">
        <span>
          ONE PERSON.
          <br />
          MANY PERSPECTIVES.
        </span>
        <button
          onClick={() => setShattered(!shattered)}
          aria-pressed={shattered}
        >
          <Icon name="spark" width="16" height="16" />
          {shattered ? "Rebuild the glass" : "Break the glass"}
        </button>
      </div>
    </div>
  );
}
