import type { Collection } from "@/types/gallery";
import { photographs } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";

/** A collection cover opens its own ordered exhibition in the photo viewer. */
export function CollectionCard({
  collection,
  onOpen,
}: {
  collection: Collection;
  onOpen: () => void;
}) {
  const cover = photographs[collection.cover];
  return (
    <article className="collection-card" data-reveal>
      <button
        className="collection-cover"
        onClick={onOpen}
        aria-label={`Explore ${collection.title}, ${collection.photos.length} photographs`}
      >
        <img
          src={cover.src}
          alt={cover.alt}
          style={{ objectPosition: cover.position }}
          loading="lazy"
          width="800"
          height="1000"
        />
        <div className="cover-top">
          <span>COLLECTION {collection.number}</span>
          <span className="cover-count">
            {String(collection.photos.length).padStart(2, "0")} FRAMES
          </span>
        </div>
        <span className="cover-view">
          Step inside <Icon name="arrow" />
        </span>
        <span className="cover-bottom">{collection.subtitle}</span>
        <span className="cover-corner">
          <Icon name="arrow" width="25" height="25" />
        </span>
      </button>
      <div className="collection-caption">
        <div>
          <span className="collection-number">/{collection.number}</span>
          <h3>
            <button onClick={onOpen}>{collection.title}</button>
          </h3>
        </div>
        <span>{collection.category}</span>
      </div>
      <p className="collection-description" lang="th">
        {collection.description}
      </p>
    </article>
  );
}
