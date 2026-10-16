// Central place for event content. Edit these values as plans firm up.
// Keeping copy here (not scattered in components) makes it easy to tweak later.

import { DEFAULT_TRAIL_YOUTUBE_ID } from "./youtube";

export const EVENT = {
  name: "Tweed Valley Senduro",
  shortName: "TVS",
  tagline: "A OneWheel enduro weekend at Glentress.",
  venue: "Glentress Mountain Bike Resort",
  venueMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Glentress+Mountain+Bike+Resort",
  region: "Scottish Borders",
  // Sat 1 – Sun 2 May 2027.
  dateLabel: "Sat 1 – Sun 2 May 2027",
  /** ISO date the countdown targets (Saturday). */
  startDate: "2027-05-01",
  presentedBy: "Presented by OneWheel Scotland",
  contactEmail: "onewheelscotland@gmail.com",
};

export const SOCIALS = {
  email: "onewheelscotland@gmail.com",
  instagram: "https://www.instagram.com/onewheel.scot/",
  facebook: "https://www.facebook.com/groups/281852826980697",
};

// The organising community behind the event.
export const ORGANISER = {
  name: "OneWheel Scotland",
  logo: "/img/ow-scotland.webp",
  url: "https://www.instagram.com/onewheel.scot/",
};

// European Onewheel League — the league this event runs under.
export const EOL_URL = "https://europeanonewheelleague.com/";

// Sponsors shown as a small strip on the home page. Add a `logo` path (in
// /public) once you have artwork; until then the name is shown as text.
export type Sponsor = { name: string; url?: string; logo?: string };
export const SPONSORS: Sponsor[] = [];

export type ScheduleDay = {
  day: string;
  title: string;
  items: { time?: string; text: string }[];
};

export const SCHEDULE: ScheduleDay[] = [
  {
    day: "Arrival day",
    title: "Arrival",
    items: [
      { text: "Register, or do it online ahead of time" },
      { text: "Settle in and explore the venue" },
    ],
  },
  {
    day: "Practice day",
    title: "Practice",
    items: [
      {
        time: "10:00",
        text: "Briefing — or do it on the website ahead of time, with the quiz, if you fancy a lie-in",
      },
      { text: "All segments open — check your times" },
      {
        text: "Merch, food trucks, board demos, and charging at timing HQ — grab a printout of your times",
      },
      { text: "Evening bingo" },
    ],
  },
  {
    day: "Race day",
    title: "Race day",
    items: [
      { text: "One shot at each trail — you won't know times until prize giving" },
      { text: "Endurance team race" },
      { text: "Prize giving" },
      { text: "Evening fireside drinks" },
    ],
  },
];

// Runs across the whole weekend rather than on a set day — shown separately.
export const ONGOING: { title: string; text: string }[] = [
  {
    title: "Hidden unicorns",
    text: "Hidden in local businesses — track them down over the weekend.",
  },
  {
    title: "Guess the weight",
    text: "Guess the weight, and how many jelly beans are in the tub.",
  },
];

export type Trail = {
  slug: string;
  name: string;
  grade: "Blue" | "Red" | "Black";
  lengthLabel: string;
  blurb: string;
  isRaceSegment: boolean;
  /** YouTube video ID or full URL. Omit for a "coming soon" placeholder. */
  youtubeId?: string;
};

// Placeholder trail list — final segments picked after scoping.
export const TRAILS: Trail[] = [
  {
    slug: "twitcher",
    name: "Twitcher",
    grade: "Red",
    lengthLabel: "~1.2 km",
    blurb: "Steep bermed corners up top, opening into wider rollers and a double near the bottom.",
    isRaceSegment: true,
    youtubeId: DEFAULT_TRAIL_YOUTUBE_ID,
  },
  {
    slug: "smells-like-tweed-spirit",
    name: "Smells Like Tweed Spirit",
    grade: "Blue",
    lengthLabel: "~1.0 km",
    blurb: "Flowy and fast. A crowd favourite and a good warm-up segment.",
    isRaceSegment: true,
    youtubeId: DEFAULT_TRAIL_YOUTUBE_ID,
  },
  {
    slug: "spicy-tuna",
    name: "Spicy Tuna",
    grade: "Red",
    lengthLabel: "~1.4 km",
    blurb: "Technical rooty sections that reward a smooth line.",
    isRaceSegment: true,
    youtubeId: DEFAULT_TRAIL_YOUTUBE_ID,
  },
  {
    slug: "gnar-gnar",
    name: "Gnar Gnar",
    grade: "Black",
    lengthLabel: "~0.9 km",
    blurb: "Steep and technical. Marshals on this one — best for confident riders.",
    isRaceSegment: true,
    youtubeId: DEFAULT_TRAIL_YOUTUBE_ID,
  },
  {
    slug: "left-valley",
    name: "Left Valley",
    grade: "Blue",
    lengthLabel: "~1.1 km",
    blurb: "Natural features, good sight lines, spectator friendly.",
    isRaceSegment: true,
    youtubeId: DEFAULT_TRAIL_YOUTUBE_ID,
  },
  {
    slug: "right-valley",
    name: "Right Valley",
    grade: "Red",
    lengthLabel: "~1.3 km",
    blurb: "Loose berms that can catch out even the fastest riders.",
    isRaceSegment: true,
    youtubeId: DEFAULT_TRAIL_YOUTUBE_ID,
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What board can I ride?",
    a: "Any OneWheel is welcome. There are no board categories.",
  },
  {
    q: "What safety gear do I need?",
    a: "A helmet (certified EN 1078, CPSC 1203, AS/NZS 2063, or KC) and wrist guards or gloves are required at all times on your board. Other pads, waterproofs, and a full-face helmet are strongly recommended — see the Rules page for the full list.",
  },
  {
    q: "Can kids race?",
    a: "Yes. Under-18s need a parent or guardian to sign their waiver and be on site at check-in.",
  },
  {
    q: "How does the racing work?",
    a: "Practice all weekend, then one timed run per segment on race day. Times are revealed at prize giving. There is also a team endurance race. Full format and rules are on the Rules page.",
  },
  {
    q: "When do I find out my times?",
    a: "Times are kept secret until prize giving, so everyone finds out together.",
  },
  {
    q: "What if it rains?",
    a: "The timed window is long, so you can pick your moment. This is Scotland, so rain is likely — worth waterproofing your board before you arrive (tape, connectors, badger kit, or whatever you normally use).",
  },
  {
    q: "Can I camp?",
    a: "Yes. There is a free camping field, a lower camping field, and a main campsite. Hot tub lodges are at the top of the hill, with a cafe up there and another lower down.",
  },
  {
    q: "Do I need to log in to see the schedule?",
    a: "No. The schedule, tickets, maps, and trail guides are all public. You only log in to do your waiver and briefing.",
  },
  {
    q: "Can I volunteer and still ride?",
    a: "Yes, in most cases. Shifts are planned so you are not stuck in one spot all weekend, and we will do our best to fit practice and racing around your crew duties. Trail marshals during race windows need to be at their post — we will talk through what works for your role when you sign up.",
  },
];

export const VOLUNTEER = {
  intro:
    "We need a small crew to make the weekend run. If you would rather help out than just turn up and ride, we would love to hear from you.",
  perks: [
    "Free weekend entry — your volunteer pass covers the full event",
    "Crew wristband so marshals and organisers know who you are on site",
    "Goodie bag with stickers, snacks, and bits from our sponsors",
    "Limited edition crew t-shirt — only for volunteers, not for sale",
    "Hot drinks and food tokens while you are on shift",
    "Plenty of riding time — shifts are short and we rotate you around",
    "Behind-the-scenes access to how the weekend runs",
  ],
  howItWorks: [
    "Shifts are capped at about four hours in each spot, then you rotate to somewhere else or take a break.",
    "Roles include registration, timing HQ, trail marshals, skills area, the hub, and helping at prize giving.",
    "You still do your waiver and briefing online like everyone else — same check-in, different wristband colour.",
    "We will send you a shift plan before the weekend so you know roughly when you are on and when you are free.",
  ],
  racingNote:
    "We want you riding too. Most volunteers get good practice time, and we will try to sort a race slot where coverage allows — but if you are marshalling a trail during the race window, that comes first. Tell us what you are hoping for when you apply and we will be clear about what fits.",
};

export const THINGS_TO_DO = [
  {
    title: "Ride into Peebles",
    text: "Follow the paths into town for pubs and food. A relaxed evening ride.",
  },
  {
    title: "Unicorn hunt",
    text: "Hidden unicorns at local businesses and around the venue. Bring your event wristband to claim them.",
  },
  {
    title: "Go Ape",
    text: "High ropes and zip lines on site for anyone not riding, or for a rest day.",
  },
  {
    title: "Board demos",
    text: "Curious cyclists and spectators can try a OneWheel at the skills area.",
  },
  {
    title: "Bingo night",
    text: "Prizes across three tiers, with time to chat afterwards.",
  },
];

export const VENUE_ZONES = [
  { name: "Camping field (free)", note: "Free camping" },
  { name: "Lower camping field", note: "Lower field" },
  { name: "Camping (paid)", note: "Paid camping" },
  { name: "Main campsite", note: "Main campsite" },
  { name: "Main lower car park", note: "Lower car park" },
  { name: "Central toilet pavilion", note: "Toilets" },
  { name: "Taster trails and skills area", note: "Skills and taster trails" },
  { name: "Lower cafe", note: "Cafe on the lower site" },
  { name: "Upper cafe", note: "Cafe at the top of the hill" },
  { name: "Posh cafe", note: "By the hot tub lodges" },
  { name: "Upper toilet block", note: "Toilets at the top of the hill" },
  { name: "Hot tub lodges", note: "At the top of the hill" },
  { name: "Bike paths towards Peebles", note: "Path entrance" },
  { name: "Twitcher entrance", note: "Start of Twitcher" },
  { name: "Twitcher exit", note: "Finish of Twitcher" },
  { name: "Turn n Burn entrance", note: "Start of Turn n Burn" },
  { name: "Turn n Burn exit", note: "Finish of Turn n Burn" },
  { name: "Tweed Spirit entrance", note: "Start of Smells Like Tweed Spirit" },
  { name: "Tweed Spirit exit", note: "Finish of Smells Like Tweed Spirit" },
];

// Recommended gear. `required` items are event rules; the rest are strongly
// recommended for a wet Scottish enduro weekend.
export const GEAR: { item: string; required?: boolean; note: string }[] = [
  {
    item: "Helmet",
    required: true,
    note: "Required at all times while riding — practice, timed runs, and crossing the site. Must be certified EN 1078, CPSC 1203, AS/NZS 2063, or KC (not EN 1385 water-sports helmets). Strap done up, good condition, no cracks or mods.",
  },
  {
    item: "Wrist guards or gloves",
    required: true,
    note: "Required on the course. Wrist guards are the most common OneWheel injury prevention.",
  },
  {
    item: "Knee and elbow pads",
    note: "Strongly recommended, especially for the rooty and steep sections.",
  },
  {
    item: "Gloves",
    note: "Grip and protection, and warmth on a cold morning.",
  },
  {
    item: "Waterproofs and layers",
    note: "This is Scotland. Bring a waterproof jacket and warm layers whatever the forecast.",
  },
  {
    item: "Spare charger and a charged board",
    note: "Charging is available but plan ahead — turn up with plenty of range.",
  },
  {
    item: "Fender and board waterproofing",
    note: "A fender keeps the worst off you, and waterproofing your board (tape, connectors, badger kit) helps in the wet.",
  },
  {
    item: "Sturdy footwear",
    note: "Flat, grippy shoes you're happy to get muddy.",
  },
];

// Age categories used for results. Ages are as of the event.
export type AgeCategory = "Youth (U18)" | "Adult (18+)";
export function ageCategoryFromDob(dob: string): {
  age: number | null;
  category: AgeCategory | null;
} {
  if (!dob) return { age: null, category: null };
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return { age: null, category: null };
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  const category: AgeCategory = age < 18 ? "Youth (U18)" : "Adult (18+)";
  return { age, category };
}

// Digital briefing quiz. Riders must pass to unlock their check-in QR code.
export const QUIZ = [
  {
    id: "open-time",
    question: "What time do the timed segments open on race day?",
    options: ["08:00", "10:30", "12:00", "Whenever you're ready"],
    answerIndex: 1,
  },
  {
    id: "runs",
    question: "How many timed runs do you get per trail on race day?",
    options: ["As many as you want", "Three", "One", "Two"],
    answerIndex: 2,
  },
  {
    id: "times",
    question: "When are individual times published?",
    options: ["Live on your phone", "At prize giving", "The next morning", "Never"],
    answerIndex: 1,
  },
  {
    id: "gear",
    question: "What safety gear is required?",
    options: [
      "Just a helmet",
      "No safety gear",
      "Helmet and wrist guards",
      "Full face and body armour",
    ],
    answerIndex: 2,
  },
  {
    id: "trail",
    question: "Which of these is one of the enduro trails?",
    options: ["Rainbow Road", "Twitcher", "The Matterhorn", "Mario Circuit"],
    answerIndex: 1,
  },
];
