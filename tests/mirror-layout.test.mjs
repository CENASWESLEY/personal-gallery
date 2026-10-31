import test from "node:test";
import assert from "node:assert/strict";
import { mirrorTransform } from "../src/lib/mirror-layout.ts";

test("Flow sends rows 1 and 3 right and row 2 left", () => {
  for (const [index, direction] of [
    [0, 1],
    [10, -1],
    [20, 1],
  ]) {
    const before = mirrorTransform("rows", index, 30, 10, 1440);
    const after = mirrorTransform("rows", index, 30, 11, 1440);
    assert.equal(Math.sign(after.x - before.x), direction);
  }
});

test("Shatter emerges behind the model and travels upward/outward", () => {
  const start = mirrorTransform("shatter", 0, 10, 0, 1440);
  const rising = mirrorTransform("shatter", 0, 10, 60, 1440);
  assert.equal(start.opacity, 0);
  assert.ok(rising.y < start.y);
  assert.ok(Math.abs(rising.x) > Math.abs(start.x));
  assert.ok(rising.scale > start.scale);
});

test("reduced-motion burst stays static and orbit closes a full revolution", () => {
  assert.deepEqual(
    mirrorTransform("shatter", 2, 10, 0, 375, true),
    mirrorTransform("shatter", 2, 10, 100, 375, true),
  );
  const start = mirrorTransform("orbit", 2, 10, 0, 1440),
    end = mirrorTransform("orbit", 2, 10, 360, 1440);
  assert.ok(Math.abs(start.x - end.x) < 0.00001);
  assert.ok(Math.abs(start.y - end.y) < 0.00001);
});
