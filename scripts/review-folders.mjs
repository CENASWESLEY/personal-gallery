import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

/** Creates local contact sheets for visual curation; not part of the website. */
const root = resolve("..");
const output = resolve("artifacts/review");
await mkdir(output, { recursive: true });
const folders = (await readdir(root, { withFileTypes: true }))
  .filter(
    (x) =>
      x.isDirectory() && (/^\d+\./.test(x.name) || x.name === "Hightlight"),
  )
  .map((x) => x.name)
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
const inventory = [];
for (const [folderIndex, folder] of folders.entries()) {
  const files = (await readdir(resolve(root, folder)))
    .filter((x) => /\.(jpe?g|png)$/i.test(x))
    .sort();
  const tiles = [];
  for (const [index, file] of files.entries()) {
    const thumb = await sharp(resolve(root, folder, file))
      .rotate()
      .resize(186, 210, { fit: "contain", background: "#deddd8" })
      .jpeg()
      .toBuffer();
    const label = Buffer.from(
      `<svg width="186" height="28"><rect width="186" height="28" fill="#deddd8"/><text x="8" y="19" fill="#111" font-size="13" font-family="Arial">${String(index + 1).padStart(2, "0")} / ${file.slice(0, 10)}</text></svg>`,
    );
    tiles.push({
      input: thumb,
      left: (index % 5) * 194,
      top: Math.floor(index / 5) * 246,
    });
    tiles.push({
      input: label,
      left: (index % 5) * 194,
      top: Math.floor(index / 5) * 246 + 210,
    });
  }
  await sharp({
    create: {
      width: 970,
      height: Math.ceil(files.length / 5) * 246,
      channels: 3,
      background: "#deddd8",
    },
  })
    .composite(tiles)
    .jpeg({ quality: 85 })
    .toFile(resolve(output, `${String(folderIndex + 1).padStart(2, "0")}.jpg`));
  inventory.push({ folder, files });
}
await writeFile(
  resolve(output, "inventory.json"),
  JSON.stringify(inventory, null, 2),
);
console.log(
  inventory
    .map(
      (x, i) =>
        `${String(i + 1).padStart(2, "0")}: ${x.folder} (${x.files.length})`,
    )
    .join("\n"),
);
