import { watch } from "node:fs";
import { readdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { syncPhotoLibrary } from "./lib/photo-library.mjs";

/** Watches only source photo folders, keeping the local preview current. */
const root = process.env.MARK_PHOTO_ROOT ?? resolve("..");
await syncPhotoLibrary();
const watchers = new Map();
let timer,
  running = false,
  queued = false;
async function refresh() {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  try {
    await syncPhotoLibrary();
    await watchFolders();
  } catch (error) {
    console.error("Photo sync failed:", error.message);
  } finally {
    running = false;
    if (queued) {
      queued = false;
      schedule();
    }
  }
}
function schedule() {
  clearTimeout(timer);
  timer = setTimeout(refresh, 650);
}
async function watchFolders() {
  const folders = (await readdir(root, { withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isDirectory() &&
        (/^\d+\s*[.\-_]/.test(entry.name) ||
          /^(hightlights?|highlights?)$/i.test(entry.name)),
    )
    .map((entry) => resolve(root, entry.name));
  for (const [path, watcher] of watchers)
    if (!folders.includes(path)) {
      watcher.close();
      watchers.delete(path);
    }
  for (const path of folders)
    if (!watchers.has(path)) {
      const watcher = watch(path, schedule);
      watcher.on("error", schedule);
      watchers.set(path, watcher);
    }
}
await watchFolders();
const rootWatcher = watch(root, (_event, filename) => {
  if (
    filename &&
    (/^\d+\s*[.\-_]/.test(String(filename)) ||
      /^(hightlights?|highlights?)$/i.test(String(filename)))
  )
    schedule();
});
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1"],
  { stdio: "inherit", env: process.env },
);
const cleanup = () => {
  clearTimeout(timer);
  rootWatcher.close();
  for (const watcher of watchers.values()) watcher.close();
  child.kill();
};
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
child.on("exit", (code) => {
  cleanup();
  process.exitCode = code ?? 0;
});
