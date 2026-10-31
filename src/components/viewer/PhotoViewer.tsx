"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { viewerGroups } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";
import type { ViewerSelection } from "@/types/gallery";

interface PhotoViewerProps {
  selection: ViewerSelection;
  onClose: () => void;
}

/**
 * Modal exhibition viewer. Native dialog supplies focus containment and Escape;
 * arrow keys navigate, thumbnails select, and zoom follows the pointer.
 * Background scroll and the triggering element's focus are restored on exit.
 */
export function PhotoViewer({ selection, onClose }: PhotoViewerProps) {
  const collection = viewerGroups.find(
    (item) => item.id === selection.collectionId,
  )!;
  const [index, setIndex] = useState(selection.photoIndex);
  const [zoomed, setZoomed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const photo = collection.photos[index];

  useEffect(() => {
    const revealActive = () =>
      dialog.current
        ?.querySelector<HTMLElement>('.viewer-thumbnails [aria-pressed="true"]')
        ?.scrollIntoView({
          block: "nearest",
          inline: "center",
          behavior: "instant",
        });
    revealActive();
    const observer = new ResizeObserver(revealActive);
    const track = dialog.current?.querySelector(".viewer-thumbnails");
    if (track) observer.observe(track);
    return () => observer.disconnect();
  }, [index]);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + collection.photos.length) % collection.photos.length);
      setZoomed(false);
      if (image.current) image.current.style.transformOrigin = "50% 50%";
    },
    [collection.photos.length],
  );

  useEffect(() => {
    // Warm adjacent frames so navigation avoids a network-bound blank frame.
    for (const offset of [-1, 1]) {
      const adjacent = new Image();
      adjacent.src =
        collection.photos[
          (index + offset + collection.photos.length) % collection.photos.length
        ].src;
    }
  }, [index, collection.photos]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setZoomed(false);
        setIndex((current) => (current + 1) % collection.photos.length);
      }
    }, 4200);
    return () => window.clearInterval(timer);
  }, [playing, collection.photos.length]);

  return (
    <dialog
      ref={dialog}
      className="photo-dialog"
      aria-labelledby="viewer-title"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(index - 1);
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="viewer-shell">
        <div className="viewer-header">
          <div>
            <span className="eyebrow">COLLECTION {collection.number}</span>
            <h2 id="viewer-title">{collection.title}</h2>
          </div>
          <div className="viewer-tools">
            <label className="viewer-jump">
              JUMP TO FRAME
              <select
                aria-label="Jump to photograph"
                value={index}
                onChange={(event) => {
                  setPlaying(false);
                  goTo(Number(event.target.value));
                }}
              >
                {collection.photos.map((item, photoIndex) => (
                  <option key={item.id} value={photoIndex}>
                    {String(photoIndex + 1).padStart(2, "0")} /{" "}
                    {String(collection.photos.length).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="icon-button"
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              aria-pressed={playing}
              onClick={() => setPlaying(!playing)}
            >
              <Icon name={playing ? "pause" : "play"} />
            </button>
            <button
              className="icon-button"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              aria-pressed={zoomed}
              onClick={() => {
                setZoomed(!zoomed);
                setPlaying(false);
              }}
            >
              <Icon name="zoom" />
            </button>
            <button
              className="icon-button viewer-close"
              aria-label="Close photo viewer"
              onClick={onClose}
              autoFocus
            >
              <Icon name="close" width="24" height="24" />
            </button>
          </div>
        </div>
        <div className="viewer-stage">
          <button
            className="viewer-nav previous"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photograph"
          >
            <Icon name="left" width="25" height="25" />
          </button>
          <button
            className={`viewer-image-wrap ${zoomed ? "zoomed" : ""}`}
            aria-label={`${photo.title}. ${zoomed ? "Click to zoom out" : "Click to zoom in"}`}
            onPointerDown={(event) => {
              suppressClick.current = false;
              if (event.pointerType === "touch" && !zoomed)
                swipeStart.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerUp={(event) => {
              if (!swipeStart.current) return;
              const dx = event.clientX - swipeStart.current.x;
              const dy = event.clientY - swipeStart.current.y;
              swipeStart.current = null;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
                suppressClick.current = true;
                setPlaying(false);
                goTo(index + (dx < 0 ? 1 : -1));
              }
            }}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
            onClick={() => {
              if (suppressClick.current) {
                suppressClick.current = false;
                return;
              }
              setZoomed(!zoomed);
              setPlaying(false);
            }}
            onPointerMove={(event) => {
              if (!zoomed || event.pointerType !== "mouse") return;
              const rect = event.currentTarget.getBoundingClientRect();
              if (image.current)
                image.current.style.transformOrigin = `${((event.clientX - rect.left) / rect.width) * 100}% ${((event.clientY - rect.top) / rect.height) * 100}%`;
            }}
          >
            <img ref={image} key={photo.id} src={photo.src} alt={photo.alt} />
          </button>
          <button
            className="viewer-nav next"
            onClick={() => goTo(index + 1)}
            aria-label="Next photograph"
          >
            <Icon name="right" width="25" height="25" />
          </button>
        </div>
        <div className="viewer-caption" aria-live="polite">
          <span>{photo.title}</span>
          <span>
            {String(index + 1).padStart(2, "0")} <i>/</i>{" "}
            {String(collection.photos.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className="viewer-thumbnails"
          aria-label="Photographs in this collection"
        >
          {collection.photos.map((item, photoIndex) => (
            <button
              key={item.id}
              aria-label={`View ${item.title}`}
              aria-pressed={photoIndex === index}
              onClick={() => goTo(photoIndex)}
            >
              <img src={item.thumbnail} alt="" />
            </button>
          ))}
        </div>
        <p className="viewer-hint">
          ← → TO EXPLORE <span>·</span> CLICK IMAGE TO ZOOM <span>·</span> ESC
          TO LEAVE
        </p>
      </div>
    </dialog>
  );
}
