"use client";
import { highlights } from "@/data/gallery";
import { PhotoTile } from "./PhotoTile";
import { Icon } from "@/components/ui/Icon";
import { useRef } from "react";
import type { ViewerSelection } from "@/types/gallery";

/** Dedicated, fully browsable highlight reel before every chronological chapter. */
export function Highlights({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) =>
    track.current?.scrollBy({
      left: direction * track.current.clientWidth * 0.7,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <section
      className="highlights section-padding"
      id="highlights"
      aria-labelledby="highlights-title"
    >
      <div className="section-kicker">
        <span>00 / THE HIGHLIGHTS</span>
        <span>A FEW FAVORITES. ALL ORIGINAL.</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2 id="highlights-title">
          First impressions.
          <br />
          <span className="serif">Lasting frames.</span>
        </h2>
        <div className="highlight-intro">
          <p lang="th">
            บางมุมที่ชอบ บางช่วงเวลาที่อยากให้คุณเห็นก่อน
            <br />
            Highlight ที่ผมชอบที่สุด
          </p>
          <div className="reel-controls">
            <button
              className="icon-button"
              onClick={() => scroll(-1)}
              aria-label="Previous highlights"
            >
              <Icon name="left" />
            </button>
            <button
              className="icon-button"
              onClick={() => scroll(1)}
              aria-label="Next highlights"
            >
              <Icon name="right" />
            </button>
            <button
              className="text-link"
              disabled={!highlights.length}
              onClick={() =>
                onOpen({ collectionId: "highlights", photoIndex: 0 })
              }
            >
              Explore my favorites <Icon name="arrow" width="15" height="15" />
            </button>
          </div>
        </div>
      </div>
      <div className="highlight-reel" ref={track}>
        {highlights.map((photo, index) => (
          <div className="highlight-slide" key={photo.id}>
            <PhotoTile
              photo={photo}
              index={index}
              onOpen={() =>
                onOpen({ collectionId: "highlights", photoIndex: index })
              }
            />
            <span>
              {index < 3 ? "THE SELECTED FRAME" : "A DIFFERENT PERSPECTIVE"}
              <i> / {String(index + 1).padStart(2, "0")}</i>
            </span>
          </div>
        ))}
      </div>
      <div className="reel-footer">
        <span>SCROLL SIDEWAYS TO EXPLORE</span>
        <span>
          {highlights.length
            ? `01 — ${String(highlights.length).padStart(2, "0")}`
            : "NEW FRAMES COMING SOON"}
        </span>
      </div>
    </section>
  );
}
