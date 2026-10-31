import test from "node:test";
import assert from "node:assert/strict";
import { assetPath } from "../src/lib/asset-path.ts";

test("assets work at the domain root and under the Pages project path", () => {
  const previous = process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    assert.equal(assetPath("/archive/photo.webp"), "/archive/photo.webp");
    process.env.NEXT_PUBLIC_BASE_PATH = "/personal-gallery";
    assert.equal(assetPath("/archive/photo.webp"), "/personal-gallery/archive/photo.webp");
    assert.equal(assetPath("/images/mark-standing.webp"), "/personal-gallery/images/mark-standing.webp");
    assert.equal(assetPath("https://example.com/photo.webp"), "https://example.com/photo.webp");
    assert.equal(assetPath("//example.com/photo.webp"), "//example.com/photo.webp");
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previous;
  }
});
