import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  rename,
  unlink,
  rm,
} from "node:fs/promises";
import { resolve, join, sep } from "node:path";
import sharp from "sharp";
import { orderFiles, syncPhotoLibrary } from "../scripts/lib/photo-library.mjs";

test("curated names survive additions and removals without truncation", () => {
  assert.deepEqual(
    orderFiles(["a.jpg", "c.jpg", "d.jpg"], ["missing.jpg", "c.jpg", "c.jpg"]),
    ["c.jpg", "a.jpg", "d.jpg"],
  );
});

test("folder renumbering and highlight growth preserve photo IDs", async () => {
  const boundary = resolve("artifacts");
  await mkdir(boundary, { recursive: true });
  const fixture = await mkdtemp(join(boundary, "library-test-"));
  const project = join(fixture, "project"),
    root = join(fixture, "originals");
  const image = await sharp({
    create: { width: 30, height: 40, channels: 3, background: "#8296ab" },
  })
    .jpeg()
    .toBuffer();
  const add = async (folder, file) => {
    await mkdir(join(root, folder), { recursive: true });
    await writeFile(join(root, folder, file), image);
  };
  try {
    await mkdir(join(project, "src/data"), { recursive: true });
    await writeFile(
      join(project, "src/data/curation.json"),
      JSON.stringify([
        {
          id: "event",
          folder: "1.Event",
          title: "Event",
          preferredFiles: ["b.jpg"],
        },
      ]),
    );
    await add("1.Event", "b.jpg");
    await add("1.Event", "c.jpg");
    await add("Hightlight", "one.jpg");
    const initial = await syncPhotoLibrary({ project, root });
    const originalId = initial[0].photos[0].id;
    const highlightId = initial.find((g) => g.id === "highlights").photos[0].id;
    assert.ok(initial.flatMap((group) => group.photos).every((photo) => photo.zoom === 1));
    initial[0].photos[0].zoom = 1.35;
    initial[0].photos[0].position = "60% 20%";
    initial.find((g) => g.id === "highlights").photos[0].zoom = 1.6;
    await writeFile(join(project, "src/data/photographs.json"), JSON.stringify(initial));
    await rename(join(root, "1.Event"), join(root, "2.Event"));
    await add("2.Event", "a.jpg");
    await add("Hightlight", "two.jpg");
    await add("Hightlight", "three.jpg");
    await add("3.New Event", "a.jpg");
    const expanded = await syncPhotoLibrary({ project, root });
    assert.equal(expanded.find((g) => g.id === "event").folder, "2.Event");
    assert.equal(
      expanded
        .find((g) => g.id === "event")
        .photos.find((p) => p.sourceFile === "b.jpg").id,
      originalId,
    );
    assert.equal(expanded.find((g) => g.id === "event").photos.length, 3);
    const framed = expanded.find((g) => g.id === "event").photos.find((p) => p.id === originalId);
    assert.equal(framed.zoom, 1.35);
    assert.equal(framed.position, "60% 20%");
    assert.equal(expanded.find((g) => g.id === "highlights").photos[0].zoom, 1.6);
    assert.equal(expanded.find((g) => g.id === "event").photos.find((p) => p.sourceFile === "a.jpg").zoom, 1);
    assert.equal(expanded.find((g) => g.id === "highlights").photos.length, 3);
    assert.equal(
      expanded
        .find((g) => g.id === "highlights")
        .photos.find((p) => p.sourceFile === "one.jpg").id,
      highlightId,
    );
    assert.equal(expanded.filter((g) => g.id !== "highlights").length, 2);
    await unlink(join(root, "2.Event", "b.jpg"));
    await unlink(join(root, "Hightlight", "two.jpg"));
    const reduced = await syncPhotoLibrary({ project, root });
    assert.equal(reduced.find((g) => g.id === "event").photos.length, 2);
    assert.equal(reduced.find((g) => g.id === "highlights").photos.length, 2);
    assert.equal(
      new Set(reduced.flatMap((g) => g.photos.map((p) => p.id))).size,
      reduced.flatMap((g) => g.photos).length,
    );
  } finally {
    const checked = resolve(fixture);
    if (!checked.startsWith(boundary + sep))
      throw new Error("Unsafe fixture cleanup path");
    await rm(checked, { recursive: true, force: true });
  }
});
