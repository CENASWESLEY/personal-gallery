import { collections, totalPhotos } from "@/data/gallery";
import { getCollectionCovers } from "@/data/collection-covers";
import { photoFraming } from "@/lib/photo-framing";
import { Icon } from "@/components/ui/Icon";

/** Photo-stack directory: each card is a deep link to its actual chapter. */
export function CollectionOverview() {
  return (
    <div className="archive-intro section-padding" id="collection-overview">
      <div className="section-kicker">
        <span>01 / THE COLLECTIONS</span>
        <span>
          {String(collections.length).padStart(2, "0")} CHAPTERS · {totalPhotos}{" "}
          PHOTOGRAPHS
        </span>
      </div>
      <div className="section-heading" data-reveal>
        <h2 id="collections-title">
          A life in chapters.
          <br />
          <span className="serif">Choose your moment.</span>
        </h2>
        <p lang="en">
          Every collection has a story of its own.
          <br />
          Choose a chapter. Take a closer look.
        </p>
      </div>
      <nav
        className="collection-overview-grid"
        aria-label="All collection folders"
      >
        {collections.map((collection) => (
          <a
            className="folder-card"
            key={collection.id}
            href={`#${collection.id}`}
            aria-label={`Explore ${collection.title} collection`}
          >
            <span className="folder-stack">
              {getCollectionCovers(collection).map((photo, index) => (
                <span className="folder-photo" key={photo.id}>
                  <img
                  src={photo.thumbnail}
                  alt={index === 0 ? photo.alt : ""}
                  loading="lazy"
                  style={photoFraming(photo)}
                />
                </span>
              ))}
              <span className="folder-count">
                {String(collection.photos.length).padStart(2, "0")} FRAMES
              </span>
            </span>
            <span className="folder-caption">
              <span className="folder-number">{collection.number}</span>
              <span>{collection.details.eventName || collection.title}</span>
              <Icon name="arrow" width="16" height="16" />
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
