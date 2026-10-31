"use client";
import { collections, heroPortrait } from "@/data/gallery";
import { useMirrorOrbit } from "@/hooks/useMirrorOrbit";
import { Icon } from "@/components/ui/Icon";
import type { ViewerSelection } from "@/types/gallery";
import type { HeroMode } from "@/types/hero";

/** Each irregular mirror contains exactly one different, original-color photo. */
export function MirrorOrbit({
  onOpen,
  mode = "orbit",
}: {
  onOpen: (selection: ViewerSelection) => void;
  mode?: HeroMode;
}) {
  const items = collections;
  const orbit = useMirrorOrbit(items.length, mode);
  const portraitId =
    mode === "rows"
      ? "c04-012"
      : mode === "shatter"
        ? "c04-006"
        : heroPortrait.id;
  const portraitSrc =
    mode === "rows"
      ? "/images/mark-back.webp"
      : mode === "shatter"
        ? "/images/mark-shatter.webp"
        : "/images/mark-standing.webp";
  const open = (collectionId: string, photoIndex = 0) => {
    if (orbit.suppressClick.current) {
      orbit.suppressClick.current = false;
      return;
    }
    onOpen({ collectionId, photoIndex });
  };
  return (
    <div className={`mirror-experience mode-${mode}`}>
      <div
        className="orbit-stage"
        ref={orbit.stage}
        {...orbit.handlers}
        aria-label={
          mode === "orbit"
            ? "Rotating photo mirrors"
            : mode === "shatter"
              ? "Glass emerging and rising behind Mark"
              : "Photographic film spiraling upward around Mark"
        }
      >
        <span className="orbit-wordmark" aria-hidden="true">
          MARK.
        </span>
        <div className="orbit-guide" aria-hidden="true" />
        {mode === "shatter" && (
          <div className="shatter-origin" aria-hidden="true" />
        )}
        {items.map((collection, index) => (
          <button
            key={`${collection.id}-${index}`}
            className={`orbit-shard shard-shape-${index % 5}`}
            aria-label={`Open ${collection.title} gallery`}
            onClick={() => open(collection.id)}
          >
            <span className="shard-face">
              <img
                src={collection.photos[0].thumbnail}
                alt=""
                draggable={false}
                loading={index > 5 ? "lazy" : "eager"}
              />
              <span className="shard-glint" />
            </span>
            <span className="shard-number">{collection.number}</span>
          </button>
        ))}
        <button
          className="hero-person"
          aria-label="Open Mark's black suit portrait gallery"
          onClick={() =>
            open(
              "black-suit",
              collections
                .find((c) => c.id === "black-suit")!
                .photos.findIndex((p) => p.id === portraitId),
            )
          }
        >
          <img
            src={portraitSrc}
            alt={
              mode === "rows"
                ? "Mark facing away in a black suit"
                : mode === "shatter"
                  ? "Mark standing with one hand in his hair"
                  : "Mark standing in a black suit"
            }
            draggable={false}
            fetchPriority="high"
          />
          <span className="person-hint">
            <Icon name="expand" width="15" height="15" /> STEP INTO MY WORLD
          </span>
        </button>
        <span className="stage-coordinate coordinate-left">
          ONE PERSON.
          <br />
          MANY SIDES.
        </span>
        <span className="stage-coordinate coordinate-right">
          {collections.length} CHAPTERS
          <br />
          ORIGINAL COLOR
        </span>
      </div>
      <div className="orbit-controls">
        <span>
          {mode === "orbit"
            ? "DRAG THE MIRRORS. FIND A DIFFERENT SIDE."
            : mode === "shatter"
              ? "FROM A SINGLE MOMENT. A THOUSAND SIDES."
              : "A SPIRAL OF MOMENTS. ALWAYS MOVING FORWARD."}
        </span>
        <div>
          <button
            className="icon-button"
            aria-label="Move mirrors backward"
            onClick={() => orbit.step(-1)}
          >
            <Icon name="left" />
          </button>
          <button
            className="orbit-play"
            onClick={() => orbit.setPlaying(!orbit.playing)}
            aria-label={
              orbit.playing ? "Pause glass animation" : "Play glass animation"
            }
          >
            <Icon
              name={orbit.playing ? "pause" : "play"}
              width="14"
              height="14"
            />
            {orbit.playing ? "Pause motion" : "Play motion"}
          </button>
          <button
            className="icon-button"
            aria-label="Move mirrors forward"
            onClick={() => orbit.step(1)}
          >
            <Icon name="right" />
          </button>
          {mode === "shatter" && (
            <button className="replay-burst" onClick={orbit.replay}>
              Replay burst <Icon name="spark" width="13" height="13" />
            </button>
          )}
        </div>
        <a href="#highlights">
          SCROLL TO EXPLORE <Icon name="down" width="14" height="14" />
        </a>
      </div>
    </div>
  );
}
