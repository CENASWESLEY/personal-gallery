"use client";
import { collections, totalPhotos } from "@/data/gallery";
import { PhotoTile } from "./PhotoTile";
import { CollectionArchive } from "./CollectionArchive";
import { useReveal } from "@/hooks/useReveal";
import type { Collection, ViewerSelection } from "@/types/gallery";

/** Honest placeholders separate confirmed clothing from pending event facts. */
function EventMetadata({ collection }: { collection: Collection }) {
  const detail = collection.details;
  return (
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
  );
}

/** Ten ordered chapters use distinct layout compositions and complete archives. */
export function Collections({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
  useReveal("mark-archive");
  return (
    <section
      id="collections"
      className="collections"
      aria-labelledby="collections-title"
    >
      <div className="archive-intro section-padding">
        <div className="section-kicker">
          <span>01 / THE COLLECTIONS</span>
          <span>10 CHAPTERS · {totalPhotos} PHOTOGRAPHS</span>
        </div>
        <div className="section-heading" data-reveal>
          <h2 id="collections-title">
            A life in chapters.
            <br />
            <span className="serif">In my own order.</span>
          </h2>
          <p lang="th">
            จากช่วงเวลาหนึ่ง สู่ตัวตนอีกด้าน
            <br />
            เรียงตามการเดินทาง พร้อมเรื่องราวที่กำลังจะถูกเติมเต็ม
          </p>
        </div>
        <nav className="chapter-index" aria-label="Jump to a collection">
          {collections.map((collection) => (
            <a key={collection.id} href={`#${collection.id}`}>
              <span>{collection.number}</span>
              {collection.title}
            </a>
          ))}
        </nav>
      </div>
      {collections.map((collection) => (
        <section
          key={collection.id}
          id={collection.id}
          className={`chapter chapter-${collection.layout} section-padding`}
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
                {collection.details.eventName || collection.title}
              </h3>
            </div>
            <span className="chapter-frame-count">
              {String(collection.photos.length).padStart(2, "0")}
              <small>FRAMES</small>
            </span>
          </div>
          <EventMetadata collection={collection} />
          <div className="selection-label">
            <span>CHAPTER HIGHLIGHTS</span>
            <span>THE SELECTED FRAMES</span>
          </div>
          <div
            className={`chapter-composition layout-${collection.layout}`}
            data-reveal
          >
            {collection.photos
              .slice(
                0,
                collection.layout === "contact" ||
                  collection.layout === "mosaic"
                  ? 5
                  : collection.layout === "diptych"
                    ? 2
                    : 3,
              )
              .map((photo, index) => (
                <PhotoTile
                  photo={photo}
                  index={index}
                  key={photo.id}
                  onOpen={() =>
                    onOpen({ collectionId: collection.id, photoIndex: index })
                  }
                />
              ))}
          </div>
          <CollectionArchive collection={collection} onOpen={onOpen} />
        </section>
      ))}
    </section>
  );
}
