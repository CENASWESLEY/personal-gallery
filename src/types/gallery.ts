/** A photograph whose optimized assets live in the public photos directory. */
export interface Photograph {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  title: string;
  position?: string;
}

/** Editable exhibition metadata. Event names are editorial mock content. */
export interface Collection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: "Daylight" | "After hours";
  description: string;
  cover: string;
  photos: Photograph[];
}

/** Identifies a photo within its exhibition without duplicating photo state. */
export interface ViewerSelection {
  collectionId: string;
  photoIndex: number;
}
