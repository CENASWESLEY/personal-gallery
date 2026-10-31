# Film and layout refinement

- All website interface text, collection titles, photo labels and clothing copy
  are English. Original source folder names remain unchanged on disk.
- Highlight film cards share identical computed dimensions (270 × 370 px at a
  1440 px desktop viewport). Their track loops left-to-right with floating film
  motion, pause control, hover/focus pause and reduced-motion fallback.
- Desktop Black Suit chapter measures approximately 730 px tall at 1440 × 900.
  All six featured photos end at y=734 after anchor navigation, within the viewport.
- Navigation is anchored on the right at desktop and mobile breakpoints.
- Shatter and Flow use distinct transparent portraits. Flow uses the owner’s
  original back-facing pose and rising helical film geometry.
- Geometry tests verify lower-left entry, upper-right exit and front/back depth.
- Five tests, TypeScript and Next.js static build pass.
- Browser DOM text checked for Thai characters: none present in interface text.
- Physical touch hardware has not been tested.
