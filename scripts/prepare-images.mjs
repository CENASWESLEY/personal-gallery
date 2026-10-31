import { syncPhotoLibrary } from "./lib/photo-library.mjs";

/** Every build imports the current folder contents; deployed pages stay static. */
await syncPhotoLibrary({ force: process.argv.includes("--force") });
