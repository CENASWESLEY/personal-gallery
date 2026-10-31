# MARK. architecture

## Filesystem → content manifest

`syncPhotoLibrary` discovers numbered source folders on each dev/build invocation.
Folder numeric prefixes determine chronology. Curated filenames determine the
internal image order, followed by all newly discovered files. Folder renumbering
matches the existing identity by its non-numeric name. Existing source filenames
retain their prior image IDs, while new IDs are based on collection and filename.

Highlights are scanned independently without a fixed count or curated index list.
Generated manifests include complete file metadata; image transforms are cached
by file size, modification time and processing version. No dates/places are
inferred from filesystem timestamps or image backgrounds.

The dev launcher watches the source root for folder changes and the actual image
directories for image changes. Imports are debounced/serialized, and the manifest
is written only when content changes, allowing Next.js to refresh the page.
Static production requires a new build/deployment after local photo changes.

## Shared presentation

`CollectionOverview` renders photo-stack anchor cards. `CollectionSection` uses
the same `FeaturedPhotoGrid` and `CollectionArchive` for every event. The featured
grid contains up to six distinct images at the same aspect ratio, without image
frames. Counts and section navigation are derived from the generated collection
list. Empty event folders are excluded from presentation until images are added.

`CollectionNavigation` derives the current chapter from scroll position. It keeps
Overview and every chapter reachable from the desktop rail or mobile floating
menu. Its long link list scrolls independently; native anchor history is retained.

## Hero choreography

The existing scene uses the same portrait, glass component and controls for all
three modes. `mirrorTransform` defines pure orbit, rising-fragment and alternating
row geometries. `useMirrorOrbit` applies transforms through refs without a React
render per frame, sharing phase across drag, playback and step controls.

The picker persists browser preference. Reduced motion produces static geometry;
autoplay respects hover/focus, offscreen state and document visibility. Each glass
item keeps an accessible gallery button, including repeated items in Flow rows.

## State and delivery

`GalleryExperience` owns the shared viewer and theme. Native dialog retains focus
containment; active thumbnails scroll into view after selection and resize.
Source originals are untouched. Exported images preserve color and strip EXIF.
The deployed site needs no backend credentials or connection to the owner's disk.
