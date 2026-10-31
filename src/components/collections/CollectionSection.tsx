import { CollectionArchive } from "./CollectionArchive";
import { FeaturedPhotoGrid } from "./FeaturedPhotoGrid";
import type { Collection, ViewerSelection } from "@/types/gallery";

/** Consistent chapter anatomy separates verified facts from pending details. */
export function CollectionSection({
  collection,
  onOpen,
}: {
  collection: Collection;
  onOpen: (selection: ViewerSelection) => void;
}) {
  const detail = collection.details;
  return (
    <section
      id={collection.id}
      className="chapter section-padding"
      aria-labelledby={`title-${collection.id}`}
    >
      <div className="chapter-topline">
        <span>CHAPTER {collection.number}</span>
        <span>{collection.english}</span>
        <span>MARK. / PERSONAL ARCHIVE</span>
      </div>
      <div className="chapter-heading" data-reveal>
        <span className="chapter-big-number">{collection.number}</span>
        <div>
          <p className="eyebrow">{collection.english}</p>
          <h3 id={`title-${collection.id}`}>
            {detail.eventName || collection.title}
          </h3>
        </div>
        <span className="chapter-frame-count">
          {String(collection.photos.length).padStart(2, "0")}
          <small>FRAMES</small>
        </span>
      </div>
      <div className="event-details">
        <dl>
          <div>
            <dt>สถานที่ / PLACE</dt>
            <dd className={!detail.location ? "pending" : ""}>
              {detail.location || "รอระบุสถานที่"}
            </dd>
          </div>
          <div>
            <dt>วัน & เวลา / WHEN</dt>
            <dd className={!detail.date ? "pending" : ""}>
              {[detail.date, detail.time].filter(Boolean).join(" · ") ||
                "รอระบุวันและเวลา"}
            </dd>
          </div>
          <div>
            <dt>สไตล์ / THE LOOK</dt>
            <dd>{detail.outfit}</dd>
          </div>
        </dl>
        {detail.story && <p className="event-story">{detail.story}</p>}
      </div>
      <div className="selection-label">
        <span>CHAPTER HIGHLIGHTS</span>
        <span>THE SELECTED FRAMES</span>
      </div>
      <FeaturedPhotoGrid collection={collection} onOpen={onOpen} />
      <CollectionArchive collection={collection} onOpen={onOpen} />
    </section>
  );
}
