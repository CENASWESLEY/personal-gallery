"use client";
import { useState } from "react";
import { highlights } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";
import type { ViewerSelection } from "@/types/gallery";

/** Equal-sized floating film frames drift right; focus/hover pause the reel. */
export function Highlights({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
  const [paused, setPaused] = useState(false);
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
          <p>
            A few moments I keep coming back to.
            <br />
            My personal favorites, in motion.
          </p>
          <div className="reel-controls">
            <button
              className="text-link"
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
            >
              <Icon name={paused ? "play" : "pause"} width="14" height="14" />
              {paused ? "Play film" : "Pause film"}
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
      <div className={`film-reel-window ${paused ? "is-paused" : ""}`}>
        <div className="film-reel-track">
          {[0, 1, 2].map((copy) => (
            <div
              className="film-reel-group"
              key={copy}
              aria-hidden={copy > 0 ? true : undefined}
            >
              {highlights.map((photo, index) => (
                <button
                  className="highlight-film-card"
                  key={photo.id}
                  tabIndex={copy > 0 ? -1 : 0}
                  aria-label={`View ${photo.title}`}
                  onClick={() =>
                    onOpen({ collectionId: "highlights", photoIndex: index })
                  }
                >
                  <span className="film-perforations" />
                  <img
                    src={photo.thumbnail}
                    alt={copy === 0 ? photo.alt : ""}
                    loading="lazy"
                  />
                  <span className="film-card-caption">
                    MARK. / SELECTED FRAME{" "}
                    <i>{String(index + 1).padStart(2, "0")}</i>
                  </span>
                  <span className="film-perforations" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="reel-footer">
        <span>A MOVING ARCHIVE OF FAVORITES</span>
        <span>{highlights.length} SELECTED FRAMES</span>
      </div>
    </section>
  );
}
