import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * Generates privacy-conscious WebP display assets (EXIF is stripped by sharp).
 * Run from the project root. Original files remain untouched one directory up.
 * Stable numeric IDs match src/data/gallery.ts, independent of source filenames.
 */
const originals = [
  "06B44E55",
  "1DDC3F74",
  "2744EF3F",
  "371791D9",
  "634D9AB8",
  "6DC5DFC0",
  "7BBF6AE2",
  "8BA5E8C5",
  "8DBAA609",
  "94761232",
  "9A987ECA",
  "A71FC513",
  "B1C7AAA3",
  "B47D319B",
  "B5C8E782",
  "B98E50EA",
  "D1FF39A1",
  "E90C04B1",
  "F699917C",
  "FA53C065",
];
const sourceDirectory = resolve(process.cwd(), "..");
const output = resolve(process.cwd(), "public/photos");
await mkdir(output, { recursive: true });
const files = await readdir(sourceDirectory);
for (const [index, prefix] of originals.entries()) {
  const filename = files.find((file) => file.startsWith(prefix));
  if (!filename) throw new Error(`Missing original photograph: ${prefix}`);
  const id = String(index + 1).padStart(2, "0");
  const source = resolve(sourceDirectory, filename);
  await Promise.all([
    sharp(source)
      .rotate()
      .resize({
        width: 1400,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 86 })
      .toFile(resolve(output, `${id}.webp`)),
    sharp(source)
      .rotate()
      .resize({ width: 240, height: 300, fit: "cover", position: "attention" })
      .webp({ quality: 75 })
      .toFile(resolve(output, `${id}-thumb.webp`)),
  ]);
}
console.log(`Prepared ${originals.length} photographs and thumbnails.`);
