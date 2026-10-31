/** Color-preserving photograph with stable provenance and intrinsic size. */
export interface Photograph {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  title: string;
  position?: string;
  width: number;
  height: number;
  sourceFile: string;
}
/** Distinct presentation vocabulary for the ten chronological chapters. */
export type CollectionLayout =
  | "editorial"
  | "stage"
  | "filmstrip"
  | "noir"
  | "diptych"
  | "panorama"
  | "mosaic"
  | "cinema"
  | "lookbook"
  | "contact";
/** Null fields await confirmed facts from the owner. */
export interface EventDetails {
  eventName: string | null;
  location: string | null;
  date: string | null;
  time: string | null;
  story: string | null;
  outfit: string;
}
/** Chronological chapter with a visually curated internal photo order. */
export interface Collection {
  id: string;
  number: string;
  folder: string;
  title: string;
  english: string;
  layout: CollectionLayout;
  details: EventDetails;
  photos: Photograph[];
}
/** Stable reference into a collection or the highlights group. */
export interface ViewerSelection {
  collectionId: string;
  photoIndex: number;
}
