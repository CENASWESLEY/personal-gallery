import test from "node:test";
import assert from "node:assert/strict";
import { mirrorTransform } from "../src/lib/mirror-layout.ts";

test("Flow enters left/lower, coils upward, and leaves upper/right", () => {
  const start = mirrorTransform("rows", 0, 30, 1, 1440),
    end = mirrorTransform("rows", 0, 30, 219, 1440);
  assert.ok(start.x < 0 && start.y > 0);
  assert.ok(end.x > 0 && end.y < 0);
  assert.ok(
    mirrorTransform("rows", 0, 30, 55, 1440).z !==
      mirrorTransform("rows", 0, 30, 110, 1440).z,
  );
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
