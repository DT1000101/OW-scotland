// Organiser readiness checklist — derived from EOL Racing Standard v4.1,
// EOL event registration requirements, risk assessment templates (FTH / Shred
// the Shires), and rider data-point forms. Checked state is stored in Firestore
// at orgChecklist/{itemId} by admins.

export type ChecklistItem = {
  id: string;
  section: string;
  label: string;
  detail?: string;
  source?: string; // which EOL doc this came from
};

export const ORG_CHECKLIST_SECTIONS = [
  "EOL registration",
  "Risk assessment & safety",
  "Race format & timing",
  "Race jury & officials",
  "Rider data & registration",
  "Course & venue",
  "Medical & emergency",
  "Communications & content",
  "Insurance & legal",
  "Post-event",
] as const;

export const ORG_CHECKLIST: ChecklistItem[] = [
  // ── EOL registration ──────────────────────────────────────────────
  {
    id: "eol-event-application",
    section: "EOL registration",
    label: "Submit EOL event application for the season",
    detail:
      "Apply before the BOD deadline. Include event name, dates, location, lead organiser contact, website URL, social links, and event logo (PNG, transparent background).",
    source: "EOL event registration Season 5",
  },
  {
    id: "eol-risk-assessment-submit",
    section: "EOL registration",
    label: "Submit completed risk assessment to EOL by deadline",
    detail:
      "EOL requires a risk assessment by 28 February before the event year. Use the EOL template, adapt for Glentress, sign and date on site.",
    source: "EOL event registration + Racing Standard §5",
  },
  {
    id: "eol-compliance-agreement",
    section: "EOL registration",
    label: "Confirm event will comply with EOL Racing Standard",
    detail:
      "Consent that the event follows the EOL Racing Standard and that a completed risk assessment will be submitted on time.",
    source: "EOL event registration",
  },
  {
    id: "eol-ranking-points",
    section: "EOL registration",
    label: "Decide whether Senduro counts toward EOL ranking points",
    detail:
      "If yes, results must be sent to the EOL within 1 week of the event using their spreadsheet template. Confirm format (TT vs GAP vs enduro-only).",
    source: "EOL Racing Standard §5.4, §6.5",
  },
  {
    id: "eol-promo-consent",
    section: "EOL registration",
    label: "Consent for EOL to use event details and media for promotion",
    source: "EOL event registration",
  },

  // ── Risk assessment & safety ──────────────────────────────────────
  {
    id: "risk-assessment-draft",
    section: "Risk assessment & safety",
    label: "Draft Glentress-specific risk assessment",
    detail:
      "Use EOL / UK Float Events template. Cover: accessing competition area, setting up, officiating, and competing. Score likelihood × impact; mitigate anything scoring >8.",
    source: "FTH2026 Risk Assessment template",
  },
  {
    id: "risk-assessment-on-site",
    section: "Risk assessment & safety",
    label: "Update risk assessment on site before racing",
    detail:
      "Ground, weather, and course conditions can only be fully assessed on the day. Update whenever circumstances change.",
    source: "Risk assessment templates",
  },
  {
    id: "risk-high-items-mitigated",
    section: "Risk assessment & safety",
    label: "Document mitigation for all high-risk items (score >8)",
    detail:
      "Falls at speed (score 9) needs evidence of controls: mandatory helmet + wrist guards, course inspection, medical cover, chicken lines, rider briefing.",
    source: "Shred the Shires risk assessment",
  },
  {
    id: "safety-barriers",
    section: "Risk assessment & safety",
    label: "Plan safety barriers around track and event site",
    detail:
      "Fence off finish area and competition zones. Keep spectators and public away from racing. Divert public footpaths if needed.",
    source: "Risk assessment templates",
  },
  {
    id: "charging-area-safety",
    section: "Risk assessment & safety",
    label: "Set up supervised board charging area with fire safety kit",
    detail:
      "Li-ion charging in a visible, attended area. Metal fire box or sand pit nearby. Covered from rain. No unattended charging.",
    source: "EOL Racing Standard §8.1.3",
  },
  {
    id: "weather-monitoring",
    section: "Risk assessment & safety",
    label: "Plan weather monitoring and schedule adjustments",
    detail:
      "Monitor forecast and conditions. Communicate changes via official channels. Remind riders about layers and hypothermia risk.",
    source: "FTH risk assessment",
  },

  // ── Race format & timing ──────────────────────────────────────────
  {
    id: "timing-system",
    section: "Race format & timing",
    label: "Confirm electronic timing system (SportIdent or alternative)",
    detail:
      "EOL TT requires electronic sensor timing to 0.01s accuracy with a manual stopwatch backup. Confirm quote and booking.",
    source: "EOL Racing Standard §6.2.1",
  },
  {
    id: "timing-backup",
    section: "Race format & timing",
    label: "Arrange backup stopwatch system",
    detail:
      "Two synced stopwatches; record actual timer at start and finish; manual entry into database if electronic system fails.",
    source: "EOL Racing Standard §6.2.1",
  },
  {
    id: "race-format-confirmed",
    section: "Race format & timing",
    label: "Confirm Senduro race format and publish on Rules page",
    detail:
      "Enduro: one timed run per segment, practice all weekend, times at prize giving. Team endurance race. Chicken lines on tough features.",
    source: "Project docs + EOL Standard",
  },
  {
    id: "chicken-lines-marked",
    section: "Race format & timing",
    label: "Mark chicken lines (B-lines) on all tough features",
    detail:
      "Every difficult obstacle needs a clearly marked easier alternative that adds time. Spray-paint hazards, highlight rocks.",
    source: "EOL Racing Standard §7.2.2",
  },
  {
    id: "course-inspection",
    section: "Race format & timing",
    label: "Schedule mandatory course inspection for all riders",
    detail:
      "Inspect daily from 2 days prior and on race morning. Remove loose surface material. Marshals control ingress/egress.",
    source: "FTH risk assessment",
  },
  {
    id: "start-intervals",
    section: "Race format & timing",
    label: "Set minimum 30-second start intervals for timed runs",
    source: "EOL Racing Standard §6.2.1",
  },

  // ── Race jury & officials ─────────────────────────────────────────
  {
    id: "jury-appointed",
    section: "Race jury & officials",
    label: "Appoint 3-person race jury (impartial, no rider links)",
    detail:
      "Named at rider briefing, identifiable by hi-vis. Roles: start referee, finish referee, chair. Majority vote on disputes.",
    source: "EOL Racing Standard §5.2",
  },
  {
    id: "marshals-recruited",
    section: "Race jury & officials",
    label: "Recruit and brief trail marshals",
    detail:
      "Marshals on steep/technical segments. 2-way radio comms with timing crew, medics, and event director during racing.",
    source: "FTH risk assessment + volunteer plan",
  },
  {
    id: "volunteer-shifts",
    section: "Race jury & officials",
    label: "Create volunteer shift plan (max ~4 hours per spot)",
    detail:
      "Roles: registration, timing HQ, trail marshals, skills area, hub, prize giving. Send plan before the weekend.",
    source: "Volunteer page + project docs",
  },

  // ── Rider data & registration ───────────────────────────────────────
  {
    id: "rider-details-form",
    section: "Rider data & registration",
    label: "Rider details collection live (name, DOB, emergency contact)",
    detail:
      "Website account details page collects essentials. Age used for EOL categories (Open / Women / Groms).",
    source: "Data points to ask riders + website",
  },
  {
    id: "ticket-attendee-names",
    section: "Rider data & registration",
    label: "Ticket purchase collects all attendee names and emails",
    detail:
      "Manual matching of tickets to waivers for ~50 riders. Contact details on every ticket.",
    source: "Project docs",
  },
  {
    id: "waiver-final-text",
    section: "Rider data & registration",
    label: "Get final waiver wording approved by insurer",
    detail:
      "Current waiver is placeholder text. Must be signed off before the event.",
    source: "Website waiver page",
  },
  {
    id: "briefing-video",
    section: "Rider data & registration",
    label: "Record and upload rider briefing video",
    detail:
      "Short video covering format, safety gear, chicken lines, overtaking, charging area, and jury. Quiz unlocks check-in QR.",
    source: "EOL Racing Standard + website briefing",
  },
  {
    id: "board-specs-optional",
    section: "Rider data & registration",
    label: "Decide whether to collect board specs (EOL team form fields)",
    detail:
      "EOL team registration asks: controller, motor, battery, tire, footholds, weight. Optional for Senduro but useful for stats.",
    source: "EOL Team registration form",
  },

  // ── Course & venue ────────────────────────────────────────────────
  {
    id: "trail-scoping",
    section: "Course & venue",
    label: "Scope and confirm final race segments at Glentress",
    detail:
      "Current list is placeholder. Visit venue, pick segments, film walkthrough videos, update Segments page.",
    source: "Project docs",
  },
  {
    id: "glentress-date",
    section: "Course & venue",
    label: "Confirm event date and Glentress availability",
    detail: "Summer 2027 — date TBC. Scope visit planned around Aug 8 MTB event.",
    source: "Project docs",
  },
  {
    id: "venue-permits",
    section: "Course & venue",
    label: "Confirm venue permits and landowner agreements",
    source: "Project open questions",
  },
  {
    id: "walkthrough-videos",
    section: "Course & venue",
    label: "Film and upload trail walkthrough videos",
    detail:
      "Looping run-through of every race segment. Upload to YouTube and set youtubeId in event.ts.",
    source: "Website trails pages",
  },

  // ── Medical & emergency ─────────────────────────────────────────────
  {
    id: "medical-cover",
    section: "Medical & emergency",
    label: "Book professional medical cover for competition days",
    detail:
      "EOL requires medical staff on site with insurance. Ambulance access to venue guaranteed. Identify nearest A&E.",
    source: "EOL Racing Standard §7 + risk assessments",
  },
  {
    id: "first-aider",
    section: "Medical & emergency",
    label: "Confirm qualified first-aider for full event duration",
    detail:
      "At least one volunteer first-aider when professional medics are not on site (e.g. evening social activities).",
    source: "Shred the Shires risk assessment",
  },
  {
    id: "emergency-plan",
    section: "Medical & emergency",
    label: "Write and share emergency evacuation plan",
    detail:
      "Nearest hospital, ambulance access routes, HEMS landing site if applicable. UHS radio comms between marshals and medics.",
    source: "FTH risk assessment",
  },

  // ── Communications & content ────────────────────────────────────────
  {
    id: "racing-page-live",
    section: "Communications & content",
    label: "Rules page published with format, rules, and safety",
    detail:
      "Summarises EOL Standard for riders. Update when format or categories are confirmed.",
    source: "Website /rules",
  },
  {
    id: "event-guide",
    section: "Communications & content",
    label: "Prepare event guide for riders (WhatsApp / email)",
    detail:
      "Schedule, charging area, medical contacts, jury names, chicken lines, weather advice.",
    source: "Shred the Shires risk assessment",
  },
  {
    id: "official-channels",
    section: "Communications & content",
    label: "Set up official event communication channel",
    detail:
      "WhatsApp group or similar for schedule changes and updates during the weekend.",
    source: "Risk assessment templates",
  },

  // ── Insurance & legal ───────────────────────────────────────────────
  {
    id: "event-insurance",
    section: "Insurance & legal",
    label: "Quote and purchase event insurance (public liability)",
    source: "Project docs open questions",
  },
  {
    id: "cic-setup",
    section: "Insurance & legal",
    label: "CIC paperwork and bank account complete",
    detail: "Jess handling. Needed for ticket payments.",
    source: "Project docs",
  },
  {
    id: "code-of-conduct-published",
    section: "Insurance & legal",
    label: "Code of conduct and participation statement published",
    detail:
      "On Rules page. Riders agree via waiver. Covers inclusivity, non-discrimination, trail etiquette.",
    source: "EOL Racing Standard §8",
  },

  // ── Post-event ──────────────────────────────────────────────────────
  {
    id: "results-to-eol",
    section: "Post-event",
    label: "Send race results to EOL within 1 week (if ranking event)",
    detail:
      "All category rankings and qualification results using EOL spreadsheet template.",
    source: "EOL Racing Standard §5.4",
  },
  {
    id: "post-event-debrief",
    section: "Post-event",
    label: "Crew debrief and lessons learned",
    source: "Project docs",
  },
];

// Group items by section for display.
export function checklistBySection(): { section: string; items: ChecklistItem[] }[] {
  const map = new Map<string, ChecklistItem[]>();
  for (const item of ORG_CHECKLIST) {
    const list = map.get(item.section) ?? [];
    list.push(item);
    map.set(item.section, list);
  }
  return ORG_CHECKLIST_SECTIONS.filter((s) => map.has(s)).map((section) => ({
    section,
    items: map.get(section)!,
  }));
}
