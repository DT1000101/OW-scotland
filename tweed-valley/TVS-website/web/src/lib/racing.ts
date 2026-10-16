// Racing rules and safety content for the Tweed Valley Senduro.
//
// Much of this is based on the European Onewheel League (EOL) Racing Standard
// (v4.1, Feb 2026). The EOL Standard is the intellectual property of the EOL
// Board of Directors; the text below is a plain-English summary written for our
// riders, not a copy of the document. Where our event does something specific,
// that is called out. Anything marked "TBC" is confirmed closer to the event.

export const EOL = {
  name: "European Onewheel League",
  short: "EOL",
  url: "https://europeanonewheelleague.com/",
  standardVersion: "Racing Standard v4.1 (Feb 2026)",
  complaintsEmail: "europeanonewheelleague@gmail.com",
};

// How the Tweed Valley Senduro actually runs — our own enduro format.
export const RACE_FORMAT = {
  intro:
    "Senduro is an enduro. You practise as much as you like across the weekend, then put down timed runs on race day. It rewards consistency and knowing the trails, not just raw speed on the day.",
  points: [
    {
      title: "Practice all weekend",
      text: "Every segment is open for practice through the weekend so you can learn the lines, pick your moment, and ride within yourself. Nothing is closed off during practice.",
    },
    {
      title: "One timed run per segment",
      text: "On race day you get a single timed run on each race segment. It counts — so it comes down to a clean, committed lap rather than endless retries.",
    },
    {
      title: "Times revealed at prize giving",
      text: "Individual times are kept under wraps until prize giving, so everyone finds out together and the suspense lasts all weekend.",
    },
    {
      title: "Endurance team race",
      text: "A separate team endurance race adds a head-to-head element for those who want it — grab a crew and share the load.",
    },
    {
      title: "All levels welcome",
      text: "There is no pro/amateur split. Chicken lines (easier alternatives) are marked on the tougher features, so you can ride the whole course at a level you are comfortable with.",
    },
  ],
  eolNote:
    "The EOL Racing Standard defines full championship formats (Time Trials, Groups & Points, and heads-up knockout brackets). Senduro runs its own enduro format for the timed runs, but follows the EOL Standard for safety, categories, and conduct. Whether any segment counts toward EOL rankings is TBC and will be confirmed before tickets go on sale.",
};

// Marked chicken / B-lines, straight from the EOL safety approach.
export const CHICKEN_LINES = {
  title: "A-lines and chicken lines",
  body: [
    "Tough features have a clearly marked chicken line (B-line) — an easier way around. Taking the main A-line is faster, so it rewards riders who commit, but nobody is forced onto a feature they are not comfortable with.",
    "If you cannot ride a feature and there is no chicken line, marshals will direct you. Never attempt a feature during a timed run that you do not think you can do safely.",
  ],
};

// EOL categories (paraphrased). We surface these so riders know the standard.
export const CATEGORIES = {
  intro:
    "The EOL runs three categories. We collect your date of birth at sign-up so we can group results correctly.",
  list: [
    { name: "Open", detail: "Anyone aged 15 and above." },
    {
      name: "Women",
      detail: "Women aged 15 and above whose gender was female at birth.",
    },
    { name: "Groms", detail: "Riders aged 14 and younger." },
  ],
  notes: [
    "Age is taken as of the first event of the season for age-restricted categories.",
    "An adult category only runs with at least 3 riders in it; if not, those riders can race Open for that event.",
    "Exactly which category prizes we award at Senduro is TBC and confirmed before the event.",
  ],
};

// Safety gear — required vs recommended, and helmet certification, per EOL.
export const SAFETY = {
  intro:
    "Safety gear is not optional. These rules follow the EOL Racing Standard and our venue risk assessment.",
  required: [
    "A helmet at all times while on your board — including practice, warm-up, timed runs, and just crossing the site.",
    "Gloves or wrist guards whenever you are on the course.",
  ],
  recommended: [
    "Full-face helmet for the steeper, faster segments.",
    "Back protector, elbow pads, knee pads, and shin guards.",
    "Anything that stays put — all gear must be properly secured; kit falling off during a run can mean disqualification.",
  ],
  helmet: {
    title: "Helmet certification",
    body: [
      "Your helmet must carry one of these certifications: EN 1078, CPSC 1203, AS/NZS 2063, or KC.",
      "Soft-shell water-sports helmets (EN 1385) are not accepted.",
      "ASTM F1952 and NTA 8776 are highly recommended for downhill-rated protection.",
      "It must be in good condition — no cracks, deformation, or unauthorised modifications — with the strap done up whenever you are on course. Officials can refuse the start of any rider whose helmet does not clearly show an approved standard or shows damage.",
    ],
  },
  substances:
    "No riding under the influence of alcohol, drugs, or anything that impairs judgement or reaction time.",
};

// Behaviour that can get you disqualified — paraphrased from EOL rider rules.
export const RACE_RULES = {
  title: "On-course rules",
  intro:
    "The race jury are the only people who can disqualify a rider. Follow marshals, flags, and signals at all times. The following can result in disqualification:",
  rules: [
    "Attempting features in a way they were not intended (as shown during course inspection), or not making a valid attempt.",
    "Any intentional physical contact to gain an advantage. Incidental contact may be judged a racing incident by the jury.",
    "Tampering with another rider's board, gear, or belongings — this can also mean a ban from future events.",
    "Tampering with the race track itself.",
    "Gaining an advantage by leaving the track — re-enter where you left, or at the nearest safe point directed by officials.",
    "Not yielding when you are off your board after a crash, or obstructing another rider while remounting.",
    "Using any off-board control device (e.g. a remote tilt controller).",
    "Losing a piece of safety gear or clothing during a run.",
  ],
  overtaking:
    "During individual timed runs you may overtake by calling \"on your left\" or \"on your right\"; the rider in front lets you past on the called side. In head-to-head racing you do not ask — race clean and leave room.",
};

// Race jury — riders should know who the officials are and what they do.
export const JURY = {
  title: "Race jury",
  body: [
    "Each race has a jury of three impartial officials, named during the rider briefing and identifiable by hi-vis. They are the final word on the race.",
    "Roles cover the start (checking safety gear and rules), the finish (recording finishing order and any protests), and a chair who oversees the briefing and course inspection.",
    "Disputes are settled by a majority vote of the three. Only the jury can disqualify a rider.",
  ],
};

// Code of conduct + trail etiquette (paraphrased from EOL).
export const CODE_OF_CONDUCT = {
  title: "Code of conduct",
  intro:
    "Everyone — riders, crew, volunteers, and spectators — is treated with respect. We are committed to a welcoming, inclusive, and safe event.",
  points: [
    "No discrimination, harassment, or hateful conduct of any kind. This covers race, ethnicity, nationality, gender, gender identity, sexual orientation, religion, age, disability, or any other personal characteristic.",
    "Offensive language, intimidation, or exclusionary behaviour can lead to disqualification, removal, and bans from future events.",
    "Uphold good sportsmanship and help keep the atmosphere positive.",
  ],
  etiquette: [
    {
      title: "Leave no trace",
      text: "Fix any divots, stay on existing trails, don't cut switchbacks, and pack out everything you bring in. If your tyre is sliding, the trail is too wet to ride.",
    },
    {
      title: "Kids and animals",
      text: "Give walkers, dogs, and horses plenty of notice and space. Follow directions from horse riders. Never spook wildlife or livestock.",
    },
    {
      title: "Board charging safety",
      text: "Li-ion batteries can catch fire while charging. Charge only in the supervised charging area, never left unattended, near the fire-safety kit.",
    },
  ],
};

// Complaints process at and after the event.
export const COMPLAINTS = {
  title: "Complaints",
  atEvent:
    "If something feels unsafe or unfair during the event, tell the race jury. They will hear all sides and communicate a clear decision.",
  afterEvent:
    "Complaints about the EOL side of the race after the event go to the EOL committee by email, and you'll get a reply from an EOL official.",
  authority:
    "For anything not covered by the rules, event officials have the final say on the day; the EOL Board resolves interpretation questions afterwards.",
};
