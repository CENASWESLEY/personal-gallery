import sharp from "sharp";
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

/** Imports chronological folders while preserving color and stripping EXIF. */
const root = resolve("..");
const curation = JSON.parse(await readFile("src/data/curation.json", "utf8"));
await mkdir("public/archive", { recursive: true });
const records = [];
for (const [collectionIndex, entry] of [
  ...curation,
  {
    folder: "Hightlight",
    id: "highlights",
    order: [
      3, 8, 19, 1, 20, 10, 4, 12, 17, 5, 11, 18, 9, 2, 7, 16, 14, 6, 13, 15,
    ],
  },
].entries()) {
  const files = (await readdir(resolve(root, entry.folder)))
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();
  if (
    new Set(entry.order).size !== files.length ||
    entry.order.some((n) => n < 1 || n > files.length)
  )
    throw new Error(
      `Curation must include every photo exactly once: ${entry.folder}`,
    );
  const photos = [];
  for (const number of entry.order) {
    const file = files[number - 1];
    const id = `${entry.id === "highlights" ? "h" : `c${String(collectionIndex + 1).padStart(2, "0")}`}-${String(number).padStart(3, "0")}`;
    const source = resolve(root, entry.folder, file);
    const { width, height } = await sharp(source)
      .rotate()
      .resize({
        width: 1600,
        height: 1900,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 86 })
      .toFile(resolve("public/archive", `${id}.webp`));
    await sharp(source)
      .rotate()
      .resize({
        width: 480,
        height: 600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 77 })
      .toFile(resolve("public/archive", `${id}-thumb.webp`));
    photos.push({
      id,
      src: `/archive/${id}.webp`,
      thumbnail: `/archive/${id}-thumb.webp`,
      width,
      height,
      title: `${entry.title ?? "Highlight"} / ${String(photos.length + 1).padStart(2, "0")}`,
      alt: `Supavit Mungmalee — ${entry.title ?? "personal highlight"}, photograph ${number}`,
      position: "50% 38%",
      sourceFile: file,
    });
  }
  records.push({ id: entry.id, photos });
}
await writeFile("src/data/photographs.json", JSON.stringify(records, null, 2));
console.log(
  `Imported ${records.reduce((sum, r) => sum + r.photos.length, 0)} original-color photographs across ${records.length} groups.`,
);
