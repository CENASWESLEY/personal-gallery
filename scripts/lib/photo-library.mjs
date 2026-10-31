import sharp from "sharp";
import { createHash } from "node:crypto";
import {
  readdir,
  readFile,
  mkdir,
  writeFile,
  stat,
  access,
} from "node:fs/promises";
import { resolve, join } from "node:path";

const imagePattern = /\.(jpe?g|png|webp|avif)$/i;
const labelOf = (name) => name.replace(/^\d+\s*[.\-_]\s*/, "").trim();
const keyOf = (name) => labelOf(name).toLowerCase();
const digest = (value) =>
  createHash("sha256").update(value).digest("hex").slice(0, 12);
const readJson = async (path, fallback) => {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
};

/** Missing preferred files are ignored; every new image is appended once. */
export function orderFiles(files, preferred = []) {
  const existing = new Set(files);
  return [
    ...new Set([...preferred.filter((file) => existing.has(file)), ...files]),
  ];
}

/** Discover numbered event folders, respecting numeric prefix and renames. */
export async function discoverFolders(root, curation) {
  const folders = (await readdir(root, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^\d+\s*[.\-_]/.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  return folders.map((folder) => {
    const known = curation.find(
      (entry) => keyOf(entry.folder) === keyOf(folder),
    );
    return {
      id: known?.id ?? `collection-${digest(keyOf(folder))}`,
      folder,
      title: known?.title ?? labelOf(folder),
      english: known?.english ?? "Another chapter. Another side.",
      outfit: known?.outfit ?? "Styling details coming soon",
      preferredFiles: known?.preferredFiles ?? [],
    };
  });
}

/**
 * Sync filesystem contents into a committed static manifest. Existing source
 * filenames keep their IDs even after folders are renumbered or files are added.
 * Cached transforms avoid reprocessing unchanged originals during development.
 */
export async function syncPhotoLibrary({
  project = process.cwd(),
  root = process.env.MARK_PHOTO_ROOT ?? resolve(project, ".."),
  force = false,
} = {}) {
  const curation = await readJson(join(project, "src/data/curation.json"), []);
  const manifestPath = join(project, "src/data/photographs.json");
  const previous = await readJson(manifestPath, []);
  const folders = await discoverFolders(root, curation);
  const highlightFolder = (await readdir(root, { withFileTypes: true })).find(
    (entry) =>
      entry.isDirectory() && /^(hightlights?|highlights?)$/i.test(entry.name),
  )?.name;
  if (!folders.length && !highlightFolder) {
    if (previous.length) {
      console.log(
        "Original folders unavailable; using the committed photo library.",
      );
      return previous;
    }
    throw new Error("No photo folders or existing library found.");
  }
  const cachePath = join(project, ".sites-runtime/image-cache.json");
  const cache = await readJson(cachePath, {});
  const output = join(project, "public/archive");
  await mkdir(output, { recursive: true });
  const groups = [];
  for (const entry of [
    ...folders,
    {
      id: "highlights",
      folder: highlightFolder,
      title: "Highlight",
      english: "My personal favorites.",
      outfit: "",
      preferredFiles: [],
    },
  ]) {
    const oldGroup = previous.find((group) => group.id === entry.id);
    const files = entry.folder
      ? (await readdir(join(root, entry.folder), { withFileTypes: true }))
          .filter((file) => file.isFile() && imagePattern.test(file.name))
          .map((file) => file.name)
          .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
      : [];
    const preferred = entry.id === "highlights" ? [] : entry.preferredFiles;
    const ordered = orderFiles(files, preferred);
    const photos = [];
    for (const filename of ordered) {
      const old = oldGroup?.photos.find(
        (photo) => photo.sourceFile === filename,
      );
      const id =
        old?.id ??
        `${entry.id === "highlights" ? "h" : entry.id}-${digest(filename)}`;
      const source = join(root, entry.folder, filename);
      const info = await stat(source);
      const signature = `v1:${info.size}:${info.mtimeMs}`;
      const display = join(output, `${id}.webp`),
        thumb = join(output, `${id}-thumb.webp`);
      let size = cache[id]?.size;
      let assetsExist = true;
      try {
        await Promise.all([access(display), access(thumb)]);
      } catch {
        assetsExist = false;
      }
      if (force || cache[id]?.signature !== signature || !assetsExist) {
        size = await sharp(source)
          .rotate()
          .resize({
            width: 1600,
            height: 1900,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 86 })
          .toFile(display);
        await sharp(source)
          .rotate()
          .resize({
            width: 480,
            height: 600,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 77 })
          .toFile(thumb);
        cache[id] = {
          signature,
          size: { width: size.width, height: size.height },
        };
      }
      photos.push({
        id,
        src: `/archive/${id}.webp`,
        thumbnail: `/archive/${id}-thumb.webp`,
        width: size.width,
        height: size.height,
        title: `${entry.title} / ${String(photos.length + 1).padStart(2, "0")}`,
        alt: `Supavit Mungmalee — ${entry.title}, photograph ${photos.length + 1}`,
        position: old?.position ?? "50% 38%",
        sourceFile: filename,
      });
    }
    groups.push({
      id: entry.id,
      folder: entry.folder ?? "Hightlight",
      title: entry.title,
      english: entry.english,
      outfit: entry.outfit,
      photos,
    });
  }
  const serialized = JSON.stringify(groups, null, 2) + "\n";
  if (serialized !== JSON.stringify(previous, null, 2) + "\n")
    await writeFile(manifestPath, serialized);
  await mkdir(join(project, ".sites-runtime"), { recursive: true });
  await writeFile(cachePath, JSON.stringify(cache));
  console.log(
    `Library: ${groups.length - 1} collections, ${groups.filter((g) => g.id !== "highlights").reduce((sum, g) => sum + g.photos.length, 0)} photos, ${groups.find((g) => g.id === "highlights").photos.length} highlights.`,
  );
  return groups;
}
