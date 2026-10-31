# Hero asset provenance

## Additional poses for Shatter and Flow

- Shatter: `public/images/mark-shatter.webp`, source `4.สูทดำ/S__16039965_0.jpg`.
- Flow: `public/images/mark-back.webp`, source `4.สูทดำ/S__16039972_0.jpg`.
- Both use built-in ImageGen background-extraction edits with transparent alpha.
- Prompt: isolate only the entire standing person; preserve identity, original
  pose, clothes, colors and lighting; remove architecture, plants, floor and
  external shadows; do not redraw, beautify, reshape or turn the subject around.
  Keep all hair and both shoes, with small transparent margins and no text.
- The Flow target explicitly preserves the back-facing pose and side profile.

- Source: `D:\Photo\4.สูทดำ\S__16039966_0.jpg`
- Project asset: `public/images/mark-standing.webp`
- Tool: built-in ImageGen, transparent-background edit (not CLI/API fallback)
- Gallery images: original photographs, optimized to WebP without color filters.
- Hero: a separate generated background-extraction asset; original is untouched.
- Reference: `D:\Photo\Ref\Mirror.jpg` informed code-native polygon mirrors only.

## Prompt used

Use case: background-extraction. Edit target: the supplied photograph. Create a
clean transparent-background cutout of ONLY the full standing man in his black
suit. Remove all architecture, plants, floor, and background. Preserve the original
man's identity, face, glasses, hairstyle, skin color, facial expression, exact pose,
body proportions, black shirt, black suit, belt lettering, watch and shoes unchanged.
Keep both entire shoes and all hair in frame. Keep the original photographic colors
and lighting; do not beautify, redraw, stylize, reshape or reinterpret the person.
Output a tall full-body cutout with true alpha transparency and a small transparent
margin. No text, no ground, no shadows outside the person. This asset is for the
center of his personal portfolio hero.

## Blue-shirt Flow portrait (October 31 update)

- Original: `D:\Photo\9.Blue Shirt\S__16040039_0.jpg`.
- Saved asset: `public/images/mark-blue-flow.webp`.
- Tool/mode: built-in ImageGen, background-extraction edit with transparent alpha.
- Prompt: isolate only the full standing man in the light blue shirt onto actual
  transparent alpha. Preserve exact identity, face, glasses, hairstyle, pose,
  proportions and low camera angle, shirt, trousers, belt, watch and both shoes.
  Remove ceiling, walls, floor, furniture and people. Do not beautify, redraw,
  restyle, reshape, correct perspective, or alter clothing. Preserve original
  photographic colors and lighting. Include hair and entire shoes with a small
  transparent margin. No text, ground or cast shadows.
- Original gallery image remains untouched; hero is a separate extracted asset.
