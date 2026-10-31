import type { Collection, Photograph } from "@/types/gallery";

/**
 * Album overview covers, independent of the chapter highlight order.
 * Each filename list runs front cover, left rear image, right rear image.
 * Stable collection IDs and source filenames survive library reordering.
 */
export const collectionCovers: Record<string, string[]> = {
  "cooperative-competition": [
    "S__16040091_0.jpg",
    "S__16040089_0.jpg",
    "S__16072709_0.jpg",
  ],
  graduation: [
    "S__16039947_0.jpg",
    "S__16039945_0.jpg",
    "S__16039955_0.jpg",
  ],
  "black-suit": [
    "S__16039960_0.jpg",
    "S__16039969_0.jpg",
    "S__16039962_0.jpg",
  ],
  coeidol: [
    "S__16039992_0.jpg",
    "S__16039986_0.jpg",
    "S__16039987_0.jpg",
  ],
  "bkk-challenge": [
    "S__16040002_0.jpg",
    "S__16040003_0.jpg",
    "S__16040001_0.jpg",
  ],
  "cafe-bkk-challenge": [
    "S__16048133_0.jpg",
    "S__16048131_0.jpg",
    "S__16048132_0.jpg",
  ],
  "blue-shirt": [
    "S__16040056_0.jpg",
    "S__16040054_0.jpg",
    "S__16040039_0.jpg",
  ],
};

/** Resolve current photo objects, filling missing covers without duplicates. */
export function getCollectionCovers(
  collection: Pick<Collection, "id" | "photos">,
): Photograph[] {
  const preferred = (collectionCovers[collection.id] ?? []).flatMap((filename) => {
    const photo = collection.photos.find((item) => item.sourceFile === filename);
    return photo ? [photo] : [];
  });
  return [
    ...preferred,
    ...collection.photos.filter((photo) => !preferred.includes(photo)),
  ].slice(0, 3);
}
