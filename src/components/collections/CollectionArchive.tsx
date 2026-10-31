"use client";
import { useEffect, useRef, useState } from "react";
import { PhotoTile } from "./PhotoTile";
import { Icon } from "@/components/ui/Icon";
import type { Collection, ViewerSelection } from "@/types/gallery";

/** All photos remain reachable in bounded pages; no silent preview truncation. */
export function CollectionArchive({
  collection,
  onOpen,
}: {
  collection: Collection;
  onOpen: (selection: ViewerSelection) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const pageSize = 8;
  const totalPages = Math.ceil(collection.photos.length / pageSize);
  const go = (next: number) => {
    setPage(next);
    grid.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  useEffect(() => {
    if (expanded && page > 0)
      grid.current
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus({ preventScroll: true });
  }, [page, expanded]);
  return (
    <div className="collection-archive">
      <div className="archive-bar">
        <span>
          {String(collection.photos.length).padStart(2, "0")} PHOTOGRAPHS{" "}
          <i> / ORIGINAL COLOR</i>
        </span>
        <div>
          <button
            className="text-link"
            onClick={() =>
              onOpen({ collectionId: collection.id, photoIndex: 0 })
            }
          >
            Open gallery <Icon name="expand" width="15" height="15" />
          </button>
          <button
            className="archive-toggle"
            aria-expanded={expanded}
            aria-controls={`archive-${collection.id}`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? "Close archive"
              : `View all ${collection.photos.length} photos`}
            <Icon name={expanded ? "close" : "down"} width="15" height="15" />
          </button>
        </div>
      </div>
      {expanded && (
        <div
          className="archive-content"
          id={`archive-${collection.id}`}
          ref={grid}
        >
          <div className="archive-grid">
            {collection.photos
              .slice(page * pageSize, (page + 1) * pageSize)
              .map((photo, index) => (
                <PhotoTile
                  key={photo.id}
                  photo={photo}
                  index={page * pageSize + index}
                  onOpen={() =>
                    onOpen({
                      collectionId: collection.id,
                      photoIndex: page * pageSize + index,
                    })
                  }
                />
              ))}
          </div>
          <div className="pagination">
            <p aria-live="polite">
              Photos {page * pageSize + 1}–
              {Math.min((page + 1) * pageSize, collection.photos.length)} of{" "}
              {collection.photos.length}
            </p>
            <div>
              <button
                className="icon-button"
                aria-label={`Previous page in ${collection.title}`}
                disabled={page === 0}
                onClick={() => go(page - 1)}
              >
                <Icon name="left" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className="page-button"
                  key={index}
                  aria-label={`Page ${index + 1} in ${collection.title}`}
                  aria-current={page === index ? "page" : undefined}
                  onClick={() => go(index)}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
              <button
                className="icon-button"
                aria-label={`Next page in ${collection.title}`}
                disabled={page === totalPages - 1}
                onClick={() => go(page + 1)}
              >
                <Icon name="right" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
