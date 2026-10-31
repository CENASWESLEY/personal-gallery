import { PhotoTile } from "./PhotoTile";
import type { Collection, ViewerSelection } from "@/types/gallery";

/** One borderless 3×2 composition across every chapter; never repeats photos. */
export function FeaturedPhotoGrid({
  collection,
  onOpen,
}: {
  collection: Collection;
  onOpen: (selection: ViewerSelection) => void;
}) {
  return (
    <div className="featured-photo-grid" data-reveal>
      {collection.photos.slice(0, 6).map((photo, index) => (
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
  );
}
