"use client";

import { useState } from "react";
import { collections, totalPhotos } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";
import { CollectionCard } from "./CollectionCard";
import { useReveal } from "@/hooks/useReveal";
import type { ViewerSelection } from "@/types/gallery";

const filters = ["All collections", "Daylight", "After hours"] as const;

/** Filterable exhibition index. Layout preference is independent of filtering. */
export function Collections({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
  const [filter, setFilter] =
    useState<(typeof filters)[number]>("All collections");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const visible = collections.filter(
    (collection) =>
      filter === "All collections" || collection.category === filter,
  );
  useReveal(`${filter}-${layout}`);
  return (
    <section
      className="collections section-padding"
      id="collections"
      aria-labelledby="collections-title"
    >
      <div className="section-kicker" data-reveal>
        <span className="eyebrow">01 / THE COLLECTIONS</span>
        <span>
          {String(collections.length).padStart(2, "0")} STORIES. {totalPhotos}{" "}
          FRAMES.
        </span>
      </div>
      <div className="section-heading" data-reveal>
        <h2 id="collections-title">
          Different days.
          <br />
          <span className="serif">Different sides.</span>
        </h2>
        <p>
          Not just photographs. Little pieces of me.
          <br />
          <span lang="th">เลือกเรื่องราว แล้วเข้ามาดูให้ใกล้อีกนิด</span>
        </p>
      </div>
      <div className="collection-toolbar">
        <div className="filter-tabs" aria-label="Filter collections">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
              <sup>
                {String(
                  collections.filter(
                    (collection) =>
                      item === "All collections" ||
                      collection.category === item,
                  ).length,
                ).padStart(2, "0")}
              </sup>
            </button>
          ))}
        </div>
        <div className="view-toggle" aria-label="Collection layout">
          <button
            aria-label="Grid view"
            aria-pressed={layout === "grid"}
            onClick={() => setLayout("grid")}
          >
            <Icon name="grid" width="16" height="16" />
          </button>
          <button
            aria-label="List view"
            aria-pressed={layout === "list"}
            onClick={() => setLayout("list")}
          >
            <Icon name="list" width="19" height="19" />
          </button>
        </div>
      </div>
      <div className={`collection-grid ${layout === "list" ? "is-list" : ""}`}>
        {visible.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onOpen={() =>
              onOpen({ collectionId: collection.id, photoIndex: 0 })
            }
          />
        ))}
      </div>
      <div className="collection-end">
        <span className="small-cross">+</span>
        <span>A PERSONAL ARCHIVE, ALWAYS UNFOLDING.</span>
        <span className="small-cross">+</span>
      </div>
    </section>
  );
}
