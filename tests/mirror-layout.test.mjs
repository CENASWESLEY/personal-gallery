import test from "node:test";
import assert from "node:assert/strict";
import { mirrorTransform } from "../src/lib/mirror-layout.ts";

test("Flow rises through spaced lanes behind the portrait", () => {
  const start = mirrorTransform("rows", 0, 6, 1, 1440),
    end = mirrorTransform("rows", 0, 6, 259, 1440);
  assert.ok(start.y > 300 && end.y < -300);
  assert.ok(Math.abs(start.x - end.x) < 5);
  assert.ok(start.z < 20 && end.z < 20);
  const left = mirrorTransform("rows", 0, 6, 80, 1440);
  const right = mirrorTransform("rows", 1, 6, 80, 1440);
  assert.ok(right.x - left.x > 800);
});

test("Flow advances photo cycles at invisible wrap boundaries in either direction", () => {
  assert.equal(mirrorTransform("rows", 0, 6, 259.99, 1440).cycle, 0);
  const wrap = mirrorTransform("rows", 0, 6, 260, 1440);
  assert.equal(wrap.cycle, 1);
  assert.equal(wrap.opacity, 0);
  assert.equal(mirrorTransform("rows", 0, 6, -1, 1440).cycle, -1);
  assert.deepEqual(
    mirrorTransform("rows", 2, 6, 0, 375, true),
    mirrorTransform("rows", 2, 6, 900, 375, true),
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
