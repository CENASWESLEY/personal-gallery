import curation from "./curation.json";
import archive from "./photographs.json";
import { eventDetails } from "./event-details";
import type { Collection, CollectionLayout, Photograph } from "@/types/gallery";

/** Owner-supplied identity and contact information. */
export const profile = {
  name: "MARK.",
  fullName: "Supavit Mungmalee",
  alias: "Mark Cenas",
  channel: "Cenaswesley",
  instagram: "supavit_mu",
  instagramUrl: "https://www.instagram.com/supavit_mu/",
  email: "supavit.mu@gmail.com",
};

/** Folder order is chronological; curation.json controls photo order only. */
export const collections: Collection[] = curation.map((item, index) => ({
  id: item.id,
  number: String(index + 1).padStart(2, "0"),
  folder: item.folder,
  title: item.title,
  english: item.english,
  layout: item.layout as CollectionLayout,
  details: {
    eventName: null,
    location: null,
    date: null,
    time: null,
    story: null,
    outfit: item.outfit,
    ...eventDetails[item.id],
  },
  photos: archive.find((group) => group.id === item.id)!.photos as Photograph[],
}));
export const highlights = archive.find((group) => group.id === "highlights")!
  .photos as Photograph[];
export const totalPhotos = collections.reduce(
  (sum, collection) => sum + collection.photos.length,
  0,
);
export const viewerGroups = [
  ...collections,
  {
    id: "highlights",
    number: "H",
    title: "The highlights",
    photos: highlights,
  },
];
export const heroPortrait = collections
  .find((group) => group.id === "black-suit")!
  .photos.find((photo) => photo.id === "c04-007")!;
