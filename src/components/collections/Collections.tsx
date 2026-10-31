"use client";
import { collections } from "@/data/gallery";
import { CollectionSection } from "./CollectionSection";
import { CollectionOverview } from "./CollectionOverview";
import { useReveal } from "@/hooks/useReveal";
import type { ViewerSelection } from "@/types/gallery";

/** Shared collection components scale with the discovered folder manifest. */
export function Collections({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
  useReveal(collections);
  return (
    <section
      id="collections"
      className="collections"
      aria-labelledby="collections-title"
    >
      <CollectionOverview />
      {collections.map((collection) => (
        <CollectionSection
          key={collection.id}
          collection={collection}
          onOpen={onOpen}
        />
      ))}
    </section>
  );
}
