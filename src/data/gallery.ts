import type { Collection, Photograph } from "@/types/gallery";

/**
 * Central content configuration. Replace the display name and optional contact
 * details here. Empty contact values render an honest coming-soon message.
 */
export const profile = {
  name: "FRAGMENTS",
  subtitle: "A personal gallery",
  statement: "Different moments. Different versions. Still me.",
  bio: "บางภาพเล่าเรื่องของวันนั้น บางภาพเล่าอีกด้านของตัวเรา ที่นี่คือพื้นที่เก็บช่วงเวลา สไตล์ และตัวตน ผ่านมุมมองที่ไม่เหมือนเดิม",
  email: "",
  instagramUrl: "",
};

/** Creates a reference to an optimized photo without coupling content to UI. */
function photo(
  id: string,
  title: string,
  alt: string,
  position = "50% 35%",
): Photograph {
  return {
    id,
    title,
    alt,
    position,
    src: `/photos/${id}.webp`,
    thumbnail: `/photos/${id}-thumb.webp`,
  };
}

export const photographs: Record<string, Photograph> = {
  "01": photo(
    "01",
    "A moment between",
    "Portrait in a light blue shirt, looking across the city",
  ),
  "02": photo(
    "02",
    "Quiet geometry",
    "Seated on a wide staircase in a light blue shirt",
    "50% 45%",
  ),
  "03": photo(
    "03",
    "In the daylight",
    "Thoughtful portrait in a blue shirt beside greenery",
  ),
  "04": photo(
    "04",
    "A familiar gesture",
    "Adjusting glasses against an urban backdrop",
  ),
  "05": photo(
    "05",
    "The darker side",
    "Black suit portrait beside an architectural staircase",
  ),
  "06": photo(
    "06",
    "Passing thought",
    "Looking down in an open collar blue shirt",
  ),
  "07": photo(
    "07",
    "Off the clock",
    "White shirt and sunglasses against a textured wall",
  ),
  "08": photo(
    "08",
    "Slow afternoon",
    "Relaxed portrait in sunglasses at a wooden table",
  ),
  "09": photo(
    "09",
    "City in black",
    "Full length portrait in a black suit on a staircase",
  ),
  "10": photo(
    "10",
    "Night falls",
    "White shirt portrait seated outside at night",
    "50% 45%",
  ),
  "11": photo(
    "11",
    "Through the doorway",
    "White shirt reflected in a dark glass doorway",
    "50% 50%",
  ),
  "12": photo(
    "12",
    "Soft focus",
    "Close portrait wearing glasses and a light blue shirt",
  ),
  "13": photo(
    "13",
    "White noise",
    "White shirt and dark sunglasses beside a city railing",
  ),
  "14": photo(
    "14",
    "After the lights",
    "Black suit portrait in a warmly lit interior",
  ),
  "15": photo(
    "15",
    "A little mystery",
    "Portrait in a white shirt with round dark sunglasses",
  ),
  "16": photo(
    "16",
    "Unscripted",
    "Blue shirt portrait with a hand near the face",
  ),
  "17": photo("17", "Open air", "Standing in white against the city skyline"),
  "18": photo(
    "18",
    "Room for stillness",
    "Seated portrait in a moody interior with bookshelves",
    "50% 50%",
  ),
  "19": photo(
    "19",
    "Between places",
    "Light blue shirt portrait beside an urban walkway",
  ),
  "20": photo(
    "20",
    "The black edition",
    "Seated black suit portrait in a bright modern interior",
  ),
};

/**
 * Mock event groupings based on the supplied outfits. Reorder entries, change
 * descriptions, or move photo references here to curate the exhibition.
 */
export const collections: Collection[] = [
  {
    id: "city-in-motion",
    number: "01",
    title: "City in motion",
    subtitle: "THE EVERYDAY EDIT",
    category: "Daylight",
    cover: "03",
    description:
      "แสงธรรมชาติ จังหวะของเมือง และช่วงเวลาที่ไม่ต้องจัดฉาก — อีกมุมของวันธรรมดาในเชิ้ตสีฟ้า",
    photos: ["03", "01", "04", "06", "16", "19"].map((id) => photographs[id]),
  },
  {
    id: "the-black-edition",
    number: "02",
    title: "The black edition",
    subtitle: "DRESSED FOR THE MOMENT",
    category: "After hours",
    cover: "20",
    description:
      "เส้นสายที่คมชัด รายละเอียดที่เรียบง่าย และความมั่นใจในชุดสีดำ ให้ทุกเฟรมพูดแทนตัวตน",
    photos: ["20", "05", "09", "14"].map((id) => photographs[id]),
  },
  {
    id: "off-the-clock",
    number: "03",
    title: "Off the clock",
    subtitle: "LESS RUSH. MORE LIFE.",
    category: "Daylight",
    cover: "07",
    description:
      "ปล่อยวันให้เดินช้าลงอีกนิด แว่นดำ เชิ้ตขาว และเวลาที่เป็นของเราเอง",
    photos: ["07", "08", "13", "15", "17"].map((id) => photographs[id]),
  },
  {
    id: "in-between",
    number: "04",
    title: "In between",
    subtitle: "THE QUIETER CHAPTERS",
    category: "After hours",
    cover: "18",
    description:
      "ระหว่างแสงกับเงา ระหว่างการเดินทาง มีเรื่องราวเล็ก ๆ ที่อยากเก็บเอาไว้เสมอ",
    photos: ["18", "10", "11", "02", "12"].map((id) => photographs[id]),
  },
];

export const totalPhotos = collections.reduce(
  (sum, collection) => sum + collection.photos.length,
  0,
);
