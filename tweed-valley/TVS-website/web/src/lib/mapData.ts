// Data for the interactive venue map (Leaflet + OpenStreetMap).
//
// Only confirmed pins live here. Mollie and Nico dropped these on Google Maps.
// Add a pin when someone sends a coordinate. Do not put guessed spots back.

export type Grade = "green" | "blue" | "red" | "black";

export type PlaceCategory =
  | "hub"
  | "spectator"
  | "food"
  | "cafe"
  | "charging"
  | "pub"
  | "poi"
  | "accommodation"
  | "toilets"
  | "parking"
  | "firstaid"
  | "nature";

export type TrailPoint = {
  kind: "trail";
  id: string;
  name: string;
  grade: Grade;
  competition: boolean;
  coords: [number, number];
  description: string;
  approx?: boolean;
};

export type PlacePoint = {
  kind: "place";
  id: string;
  name: string;
  category: PlaceCategory;
  coords: [number, number];
  description: string;
  approx?: boolean;
  /** Kept in the file for later, not shown on the public map. */
  draft?: boolean;
};

export type MapPoint = TrailPoint | PlacePoint;

// Midpoint of the confirmed pins, so the lower fields and Twitcher both show.
export const MAP_CENTER: [number, number] = [55.6517, -3.1376];
export const MAP_ZOOM = 14;

export const GRADE_META: Record<
  Grade,
  { label: string; color: string }
> = {
  green: { label: "Green", color: "#22c55e" },
  blue: { label: "Blue", color: "#3b82f6" },
  red: { label: "Red", color: "#ef4444" },
  black: { label: "Black", color: "#111827" },
};

export const CATEGORY_META: Record<
  PlaceCategory,
  { label: string; color: string; emoji: string }
> = {
  hub: { label: "Event hub", color: "#f97316", emoji: "🎪" },
  spectator: { label: "Spectator zone", color: "#a855f7", emoji: "👀" },
  food: { label: "Food trucks", color: "#f59e0b", emoji: "🍔" },
  cafe: { label: "Cafe", color: "#d97706", emoji: "☕" },
  charging: { label: "Charging", color: "#eab308", emoji: "⚡" },
  pub: { label: "Pub", color: "#b45309", emoji: "🍺" },
  poi: { label: "Point of interest", color: "#06b6d4", emoji: "📸" },
  accommodation: { label: "Accommodation", color: "#14b8a6", emoji: "🛏️" },
  toilets: { label: "Toilets / showers", color: "#0ea5e9", emoji: "🚻" },
  parking: { label: "Parking", color: "#64748b", emoji: "🅿️" },
  firstaid: { label: "First aid", color: "#dc2626", emoji: "➕" },
  nature: { label: "Nature centre", color: "#16a34a", emoji: "🌲" },
};

export const TRAIL_POINTS: TrailPoint[] = [
  {
    kind: "trail",
    id: "twitcher-entrance",
    name: "Twitcher entrance",
    grade: "red",
    competition: true,
    coords: [55.6553649, -3.125322],
    description: "Where Twitcher starts.",
  },
  {
    kind: "trail",
    id: "twitcher-exit",
    name: "Twitcher exit",
    grade: "red",
    competition: true,
    coords: [55.650745, -3.1271784],
    description: "Where Twitcher finishes.",
  },
  {
    kind: "trail",
    id: "turn-n-burn-entrance",
    name: "Turn n Burn entrance",
    grade: "red",
    competition: true,
    coords: [55.6482659, -3.1304702],
    description: "Where Turn n Burn starts.",
  },
  {
    kind: "trail",
    id: "turn-n-burn-exit",
    name: "Turn n Burn exit",
    grade: "red",
    competition: true,
    coords: [55.6476178, -3.1341777],
    description: "Where Turn n Burn finishes.",
  },
  {
    kind: "trail",
    id: "tweed-spirit-entrance",
    name: "Tweed Spirit entrance",
    grade: "blue",
    competition: true,
    coords: [55.647884, -3.1285091],
    description: "Where Smells Like Tweed Spirit starts.",
  },
  {
    kind: "trail",
    id: "tweed-spirit-exit",
    name: "Tweed Spirit exit",
    grade: "blue",
    competition: true,
    coords: [55.6468701, -3.1342625],
    description: "Where Smells Like Tweed Spirit finishes.",
  },
];

export const PLACE_POINTS: PlacePoint[] = [
  {
    kind: "place",
    id: "camping-free",
    name: "Camping field (free)",
    category: "accommodation",
    coords: [55.6455573, -3.1423913],
    description: "Free camping field.",
  },
  {
    kind: "place",
    id: "lower-camping-field",
    name: "Lower camping field",
    category: "accommodation",
    coords: [55.645139, -3.140778],
    description: "Lower camping field.",
  },
  {
    kind: "place",
    id: "camping-paid",
    name: "Camping (paid)",
    category: "accommodation",
    coords: [55.6471367, -3.1380836],
    description: "Paid camping.",
  },
  {
    kind: "place",
    id: "main-campsite",
    name: "Main campsite",
    category: "accommodation",
    coords: [55.647167, -3.138583],
    description: "Main campsite.",
  },
  {
    kind: "place",
    id: "hot-tub-lodges",
    name: "Hot tub lodges",
    category: "accommodation",
    coords: [55.659353, -3.1491219],
    description: "Lodges with hot tubs, at the top of the hill.",
  },
  {
    kind: "place",
    id: "main-lower-car-park",
    name: "Main lower car park",
    category: "parking",
    coords: [55.646472, -3.139861],
    description: "Main lower car park.",
  },
  {
    kind: "place",
    id: "central-toilet-pavilion",
    name: "Central toilet pavilion",
    category: "toilets",
    coords: [55.64575, -3.136972],
    description: "Central toilet pavilion.",
  },
  {
    kind: "place",
    id: "upper-toilet-block",
    name: "Upper toilet block",
    category: "toilets",
    coords: [55.658444, -3.148889],
    description: "Toilet block at the top of the hill.",
  },
  {
    kind: "place",
    id: "lower-cafe",
    name: "Lower cafe",
    category: "cafe",
    coords: [55.6469418, -3.1368947],
    description: "Cafe on the lower part of the site.",
  },
  {
    kind: "place",
    id: "upper-cafe",
    name: "Upper cafe",
    category: "cafe",
    coords: [55.658611, -3.149833],
    description: "Cafe at the top of the hill.",
  },
  {
    kind: "place",
    id: "posh-cafe",
    name: "Posh cafe",
    category: "cafe",
    coords: [55.6586956, -3.1497355],
    description: "Posh cafe at the top of the hill, by the hot tub lodges.",
  },
  {
    kind: "place",
    id: "taster-trails",
    name: "Taster trails and skills area",
    category: "poi",
    coords: [55.645306, -3.135056],
    description: "Taster trails and the skills area.",
  },
  {
    kind: "place",
    id: "peebles-path",
    name: "Bike paths towards Peebles",
    category: "poi",
    coords: [55.6439958, -3.1386942],
    description: "Entrance to the bike paths towards Peebles.",
  },
];

export const MAP_POINTS: MapPoint[] = [...TRAIL_POINTS, ...PLACE_POINTS].filter(
  (p) => !("draft" in p && p.draft)
);
