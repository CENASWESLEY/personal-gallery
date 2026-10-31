import archive from "./photographs.json";
import { eventDetails } from "./event-details";
import { assetPath } from "@/lib/asset-path";
import type { Collection, Photograph } from "@/types/gallery";

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
export const collections: Collection[] = archive
  .filter((group) => group.id !== "highlights" && group.photos.length > 0)
  .map((item, index) => ({
    id: item.id,
    number: String(index + 1).padStart(2, "0"),
    folder: item.folder,
    title: item.title,
    english: item.english,
    details: {
      eventName: null,
      location: null,
      date: null,
      time: null,
      story: null,
      outfit: item.outfit,
      ...eventDetails[item.id],
    },
    photos: item.photos.map((photo) => ({
      ...photo,
      src: assetPath(photo.src),
      thumbnail: assetPath(photo.thumbnail),
    })) as Photograph[],
  }));
export const highlights = archive.find((group) => group.id === "highlights")!
  .photos.map((photo) => ({
    ...photo,
    src: assetPath(photo.src),
    thumbnail: assetPath(photo.thumbnail),
  })) as Photograph[];
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
export const heroPortrait =
  collections
    .find((group) => group.id === "black-suit")!
    .photos.find((photo) => photo.id === "c04-007") ?? collections[0].photos[0];
