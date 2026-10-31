import type { EventDetails } from "@/types/gallery";

/**
 * Owner-confirmed chapter details, keyed by stable collection IDs.
 * Dates use the Gregorian calendar (B.E. 2568/2569 → 2025/2026).
 * Event names and times stay unset until supplied by the owner.
 */
export const eventDetails: Record<string, Partial<EventDetails>> = {
  "cooperative-competition": {
    location: "Siam University",
    date: "April 4, 2025",
    outfit: "Formal university uniform · white shirt, tie and black trousers",
    story:
      "After earning the chance to represent my university in the Science and Technology category, I took my cooperative education project to the second round of the competition. Hosted at Siam University, this regional stage brought together students from more than eight universities across Thailand's lower Central region, with a place at the national competition ahead. A chance to share my work, exchange ideas and grow through the experience of presenting on a bigger stage.",
  },
  "cooperative-awards": {
    location: "Kasetsart University",
    date: "September 30, 2025",
    outfit: "Formal university uniform · white shirt, black tie and tailored trousers",
    story:
      "A proud moment at Kasetsart University, receiving an Outstanding Cooperative Education Award in the Science and Technology category for the 2025 academic year. The recognition marked an important milestone in turning classroom knowledge into practical work, and a moment to appreciate the effort and learning behind the project.",
  },
  graduation: {
    location: "Kasetsart University",
    date: "October 9, 2025",
    outfit: "Graduation gown over formal university attire",
    story:
      "The official graduation ceremony at Kasetsart University, celebrating the completion of my bachelor's degree in Electrical Engineering in the Faculty of Engineering. Wearing the gown made the milestone feel real: years of studying, challenges and shared memories coming together in one meaningful day. The close of my university chapter, and the beginning of everything that follows.",
  },
  "black-suit": {
    location: "Council of Engineers Thailand Building",
    date: "July 26, 2026",
    outfit: "Black suit · black shirt · polished formal styling",
    story:
      "An all-black look against the modern architecture of the Council of Engineers Thailand Building. This portrait series moves between natural surroundings and contemporary interiors, pairing sharp tailoring with greenery, light and clean architectural lines. Quiet confidence, with a darker edge.",
  },
  "white-suit": {
    location: "Council of Engineers Thailand Building",
    date: "July 26, 2026",
    outfit: "Black suit · white shirt · crisp formal styling",
    story:
      "A different expression of the same setting: a black suit and white shirt, framed by the natural surroundings and modern interiors of the Council of Engineers Thailand Building. The contrast brings a lighter, classic feel to the portraits, balancing precise tailoring with the openness of the space.",
  },
  coeidol: {
    location: "Council of Engineers Thailand Building",
    date: "July 26, 2026",
    outfit: "Smart, camera-ready styling for the competition final",
    story:
      "An engineering problem, seen through my own lens. After submitting a video sharing my approach to solving an engineering challenge, I was selected as one of the final 12 contestants. The final round brought a new challenge: creating a video live during the competition and presenting the thinking behind it. A day of turning ideas into a story, working in the moment and finding confidence in my own perspective.",
  },
  "bkk-challenge": {
    location: "Bangkok City Hall",
    date: "August 12, 2026",
    outfit: "Black suit · white shirt · polished formal styling",
    story:
      "At Bangkok City Hall as one of the 12 selected winners of a short-form video competition focused on ideas for solving Bangkok's challenges. An opportunity to bring a personal perspective to the city's everyday problems and communicate a possible way forward through a short film. A meaningful meeting point between creativity, problem-solving and the city around us.",
  },
  "cafe-bkk-challenge": {
    location: "A cafe near Bangkok City Hall",
    date: "August 12, 2026",
    outfit: "White shirt · neatly tailored, understated styling",
    story:
      "A quieter moment at a cafe near Bangkok City Hall. These portraits take in an understated, elegant setting, where simple details and a crisp white shirt create a refined mood. A small pause in the city, captured with an eye for effortless style.",
  },
  "white-shirt": {
    location: "Dusit Central Park",
    date: "September 4, 2026",
    outfit: "White shirt · bold, smart styling",
    story:
      "A garden in the heart of the city, where polished urban design meets the ease of nature. Photographed at Dusit Central Park, this series pairs a white shirt and a confident look with greenery and the surrounding cityscape. Clean, composed and open to the space around me.",
  },
  "blue-shirt": {
    location: "Dusit Central Park",
    date: "September 4, 2026",
    outfit: "Light blue shirt · soft, smart contemporary styling",
    story:
      "A softer shade in a modern luxury setting. Inside the shopping spaces of Dusit Central Park, a light blue shirt brings a relaxed elegance to contemporary interiors. This series explores a more model-inspired mood, with architectural details and a fresh perspective shaping each frame.",
  },
};
