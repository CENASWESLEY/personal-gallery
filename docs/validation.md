# Validation — shared gallery and selectable heroes

- Photo library tests cover file additions/removals, new event discovery, folder
  renumbering, stable photo IDs and highlight count changes.
- Latest source import: 10 collections, 127 event photos, 15 highlights.
- Actual first folders are competition then awards, matching the renamed folders.
- TypeScript and production static export checked.
- Orbit, Shatter and Flow render distinct scene geometry; Flow uses 3 rows.
- Overview renders a photo-stack anchor card for each collection.
- Every chapter uses the same borderless grid: 6 selected photos where available;
  the competition folder contains only 4 real photos and shows all 4.
- Desktop grid measured at 3 equal columns with identical 4:5 tiles and 0 borders.
- Floating chapter selection updates the URL and highlights the current chapter.
- Mobile mini index expands, selects a chapter and collapses after navigation.
- Highlight copy has no fixed 20-photo promise; manifest and reel count agree.

Physical touch hardware has not been exercised. Original camera files are never
modified by tests or imports. Further ongoing updates require build/publication
for the hosted static website; local dev is watched automatically.
