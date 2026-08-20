/*
 * Skill Case Brainstormer — branded deck builder.
 *
 * Usage: from a working directory containing skills.json and deck_config.json,
 * run `node build_deck.js`. Produces output.pptx in that same directory.
 *
 * ---- SKILL_SCHEMA (skills.json) ----
 * An array of EVERY brainstormed skill (10, or however many the slate has) — not just the ones
 * getting a full detail slide. The summary table on slide 2 always lists every entry in this
 * array, so a person reviewing the deck sees the full brainstormed slate, not just the subset
 * that got flesh out. Use "detailed": true on the ones (typically 3-5) that should also get a
 * full 3-column detail slide with ROI; leave it false (or omit roiLow/roiHigh/roiCategory/roiBody/
 * roiScale entirely) for ideas that are part of the slate but weren't selected for deep-dive.
 * Each skill object is shaped like:
 * {
 *   "n": 1,                                  // 1-based rank, ordered simplest -> most advanced
 *   "name": "CPO Morning Digest",
 *   "sophistication": 3,                     // 1 (simple) - 10 (advanced): how hard to BUILD, not how valuable
 *   "cadence": "Daily (weekdays)",           // human-readable scheduling cadence, or "Event-triggered"
 *   "scope": "Individual → Team template",   // ownership scope and how it could grow
 *   "description": "...",                    // 1-2 sentences, plain language
 *   "detailed": true,                        // true = also gets a full detail slide; false/omitted = summary-row only
 *   "users": "...",                          // (detailed skills only) who runs/benefits from it today, and who it could extend to
 *   "workflow": ["step 1", "step 2", "step 3"], // (detailed skills only) 3-4 short plain-language steps
 *   "dataSources": "Outlook · Teams · SharePoint", // (detailed skills only) concrete connectors, joined with " · "
 *   "output": "HTML artifact (reload each morning) or short chat brief", // (detailed skills only)
 *   "scheduled": "Yes — weekdays, ~7am",     // (detailed skills only) or "No — triggered at <event>"
 *   "model": "Claude Haiku 4.5",             // (detailed skills only) see references/model-recommendations.md
 *   "modelWhy": "High-frequency, low-complexity summarization — cost efficiency matters more than depth.", // (detailed skills only)
 *   "roiHeadline": "~$7K–$11.5K/yr saved (individual)", // (detailed skills only) keep SHORT (under ~34 characters)
 *                                             // — this renders large/bold on the detail slide and long strings wrap
 *                                             // and collide with the caption beneath them. Put the arithmetic in
 *                                             // roiBody instead, not in the headline itself.
 *   "roiLow": 7, "roiHigh": 11.5,            // (detailed skills only, needed for ROI) numeric bounds in $K/year —
 *                                             // used to VALIDATE the total ROI slide and color the napkin-math cell.
 *                                             // Omit entirely (along with roiCategory) for non-detailed ideas — the
 *                                             // summary table will render "—" for napkin math rather than a number.
 *   "roiCategory": "time",                   // "time" (time-savings/risk-avoidance) or "expected" (strategic/expected-value)
 *   "roiBody": "...",                        // (detailed skills only) 1-2 sentences showing the arithmetic — see references/roi-methodology.md
 *   "roiScale": "..."                        // (detailed skills only) 1-2 sentences on team/org scaling potential
 * }
 *
 * ---- deck_config.json ----
 * {
 *   "title": "10 Claude Cowork Skills",
 *   "subtitle": "for the AI Offer Architect",
 *   "tagline": "A roadmap for scaling <name>'s role-based AI workflows across <company>",
 *   "presenterLine": "Jane Doe  |  VP Operations  ·  Cowork Champion",
 *   "date": "August 2026",
 *   "pillLabel": "SKILL CASE BRAINSTORM",
 *   "summaryTitle": "10 Claude Cowork Skills — At a Glance",
 *   "roiTitle": "Total Estimated ROI — All 10 Skills",
 *   "companyName": "Nimble Gravity",
 *   "companyTagline": "Strategy, executed."
 *   // Brand colors are intentionally NOT exposed as per-deck overrides. This deck is a Nimble
 *   // Gravity-branded asset (used in client workshops, sales enablement, and internal training)
 *   // regardless of whose role the content inside it is about — a deck brainstormed for an
 *   // external persona (e.g. a prospect's VP of Customer Success) still ships in NG's own purple
 *   // and ochre, the same way an NG slide template would for any other client-facing deliverable.
 *   // Don't invent a different company's brand palette for the deck itself even when the ROLE
 *   // being profiled is someone else's — only change the brand if the person using this skill
 *   // explicitly asks for a different one (e.g. they work at a different firm and want their own
 *   // template). If that happens, check for a brand-guidelines skill before guessing colors.
 * }
 */

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const skills = JSON.parse(fs.readFileSync("skills.json", "utf-8"));
const cfg = JSON.parse(fs.readFileSync("deck_config.json", "utf-8"));

// ---------- Brand palette (Nimble Gravity, fixed) ----------
// Deliberately not read from deck_config.json — this deck is a Nimble Gravity-branded asset
// regardless of whose role the content profiles. See the deck_config.json comment above.
const PURPLE = "2E1A47";
const SLATE = "5D5C6A";
const OCHRE = "E8A317";
const TEAL = "2F6B66";
const EMBER = "C43B31";
const WHITE = "FFFFFF";
const OFFWHITE = "F7F6F8";
const NEARBLACK = "1A1420";
const LIGHTPURPLE = "E9E4EF";

const HEADER_FONT = "Georgia";   // brand heading font (QA-unreliable in headless render — extra slack used)
const BODY_FONT = "Calibri";     // safe-list body font, renders true-to-width everywhere

const COMPANY = cfg.companyName || "Nimble Gravity";
const COMPANY_TAGLINE = cfg.companyTagline || "Strategy, executed.";

// ---------- Color scales ----------
// Linear interpolation between two hex colors, t in [0,1]
function lerpColor(hexA, hexB, t) {
  t = Math.max(0, Math.min(1, t));
  const a = [0, 2, 4].map(i => parseInt(hexA.substr(i, 2), 16));
  const b = [0, 2, 4].map(i => parseInt(hexB.substr(i, 2), 16));
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return c.map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

// Relative build complexity: light yellow (simple) -> dark gold (advanced), on the fixed 1-10 scale.
// (Grey was tried first and read as flat/lifeless against the rest of the deck — yellow reads as
// "effort/caution" without implying something is bad. Keep this distinct from the ROI green scale.)
const YELLOW_LIGHT = "FFF3B0", YELLOW_DARK = "946F00";
function complexityColor(v) {
  const t = (v - 1) / 9;
  return lerpColor(YELLOW_LIGHT, YELLOW_DARK, t);
}
function complexityTextColor(v) {
  return (v - 1) / 9 > 0.6 ? WHITE : NEARBLACK;
}

// Napkin math / ROI: light green (lower) -> dark green (higher), LOG-scaled since real slates span
// two orders of magnitude ($4K to $300K) and a linear scale would flatten everything but the outlier.
// Ideas that were never fleshed out (no roiLow/roiHigh) are excluded from the color scale entirely
// and render as a plain "—" in the summary table instead of a colored estimate.
const GREEN_LIGHT = "DCEEDD", GREEN_DARK = "1B5E20";
const hasRoi = sk => typeof sk.roiLow === "number" && typeof sk.roiHigh === "number";
const roiRep = sk => (sk.roiLow + sk.roiHigh) / 2;
function roiColorScale(allSkills) {
  const priced = allSkills.filter(hasRoi);
  const logs = priced.map(sk => Math.log10(Math.max(roiRep(sk), 0.01)));
  const lo = logs.length ? Math.min(...logs) : 0, hi = logs.length ? Math.max(...logs) : 0;
  return sk => {
    const t = hi === lo ? 0.5 : (Math.log10(Math.max(roiRep(sk), 0.01)) - lo) / (hi - lo);
    return lerpColor(GREEN_LIGHT, GREEN_DARK, t);
  };
}
function roiTextColor(t) {
  return t > 0.55 ? WHITE : NEARBLACK;
}

// Detail slides (full 3-column ROI treatment) are only built for skills explicitly marked
// detailed: true. Every skill in skills.json still appears in the summary table regardless —
// that decoupling is what lets a deck show the full brainstormed slate of 10 while only
// fleshing out the 3-5 the person actually selected to move forward with.
const detailedSkills = skills.filter(sk => sk.detailed === true);

// Auto-shrink the ROI headline font on detail slides so a longer headline string doesn't wrap
// and collide with the "Estimated annual value" caption beneath it. Short headlines (the common
// case) still get the full-size, confident treatment.
function headlineFontSize(text) {
  if (text.length > 60) return 12;
  if (text.length > 46) return 14;
  if (text.length > 34) return 16;
  return 19;
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5"
const PAGE_W = 13.33, PAGE_H = 7.5;

function addFooter(slide, light) {
  slide.addText(`${COMPANY.toUpperCase()}  ·  ${COMPANY_TAGLINE}`, {
    x: 0.5, y: PAGE_H - 0.42, w: 8, h: 0.3,
    fontFace: BODY_FONT, fontSize: 9, color: light ? "FFFFFF" : SLATE,
    align: "left", margin: 0
  });
  slide.addText("Confidential — Internal", {
    x: PAGE_W - 3.5, y: PAGE_H - 0.42, w: 3, h: 0.3,
    fontFace: BODY_FONT, fontSize: 9, color: light ? "FFFFFF" : SLATE,
    align: "right", margin: 0
  });
}

// ---------- Slide 1: Purple title slide ----------
{
  const s = pres.addSlide();
  s.background = { color: PURPLE };
  const pillLabel = cfg.pillLabel || "SKILL CASE BRAINSTORM";
  const pillW = Math.max(3.0, 0.11 * pillLabel.length + 0.6);
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.9, y: 2.05, w: pillW, h: 0.4, rectRadius: 0.2, fill: { color: "6A4E85" }, line: { type: "none" }
  });
  s.addText(pillLabel, {
    x: 0.9, y: 2.05, w: pillW, h: 0.4, align: "center", valign: "middle",
    fontFace: BODY_FONT, fontSize: 12, bold: true, color: WHITE, margin: 0, charSpacing: 1
  });
  s.addText(cfg.title, {
    x: 0.9, y: 2.5, w: 11.5, h: 1.3,
    fontFace: HEADER_FONT, fontSize: 46, color: WHITE, bold: false, align: "left", margin: 0
  });
  if (cfg.subtitle) {
    s.addText(cfg.subtitle, {
      x: 0.9, y: 3.55, w: 11.5, h: 0.8,
      fontFace: HEADER_FONT, fontSize: 28, color: OCHRE, align: "left", margin: 0
    });
  }
  if (cfg.tagline) {
    s.addText(cfg.tagline, {
      x: 0.9, y: 4.5, w: 10, h: 0.6,
      fontFace: BODY_FONT, fontSize: 16, color: LIGHTPURPLE, align: "left", margin: 0
    });
  }
  if (cfg.presenterLine) {
    s.addText(cfg.presenterLine, {
      x: 0.9, y: 6.55, w: 9, h: 0.35,
      fontFace: BODY_FONT, fontSize: 12, color: WHITE, align: "left", margin: 0
    });
  }
  s.addText(cfg.date || "", {
    x: 0.9, y: 6.9, w: 9, h: 0.3,
    fontFace: BODY_FONT, fontSize: 11, color: LIGHTPURPLE, align: "left", margin: 0
  });
  s.addText(`${COMPANY} · ${COMPANY_TAGLINE}`, {
    x: PAGE_W - 4.5, y: 6.85, w: 4, h: 0.4,
    fontFace: HEADER_FONT, italic: true, fontSize: 13, color: OCHRE, align: "right", margin: 0
  });
}

// Shared light-theme header band, used on every non-intro slide for visual continuity
function addHeaderBand(s, kicker, title) {
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: PAGE_W, h: 1.15, fill: { color: PURPLE }, line: { type: "none" }
  });
  if (kicker) {
    s.addText(kicker, {
      x: 0.6, y: 0.18, w: 6, h: 0.35,
      fontFace: BODY_FONT, fontSize: 12, color: OCHRE, bold: true, margin: 0
    });
  }
  s.addText(title, {
    x: 0.6, y: kicker ? 0.48 : 0.32, w: 11.5, h: 0.6,
    fontFace: HEADER_FONT, fontSize: 26, color: WHITE, margin: 0
  });
}

// ---------- Slide 2: Summary of all ideas (light, native table) ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeaderBand(s, null, cfg.summaryTitle || `${skills.length} Claude Cowork Skills — At a Glance`);
  s.addText(`Ranked 1 (beginner) to ${skills.length} (advanced) by relative build complexity`, {
    x: 0.6, y: 1.24, w: 12, h: 0.3,
    fontFace: BODY_FONT, italic: true, fontSize: 11.5, color: SLATE, align: "left", margin: 0
  });

  const fmtRoi = v => (Number.isInteger(v) ? v : v.toFixed(1));
  const napkinMath = sk => {
    if (!hasRoi(sk)) return "—";
    const range = sk.roiLow === sk.roiHigh ? `$${fmtRoi(sk.roiLow)}K` : `$${fmtRoi(sk.roiLow)}K–$${fmtRoi(sk.roiHigh)}K`;
    return range + "/yr" + (sk.roiCategory === "expected" ? " *" : "");
  };
  const shortBlurb = sk => {
    const first = sk.description.split(/(?<=\.)\s/)[0];
    if (first.length <= 78) return first;
    const cut = first.slice(0, 78);
    return cut.slice(0, cut.lastIndexOf(" ")) + "…";
  };

  const roiColorFor = roiColorScale(skills);
  const roiTFor = (() => {
    const logs = skills.map(x => Math.log10(Math.max(roiRep(x), 0.01)));
    const lo = Math.min(...logs), hi = Math.max(...logs);
    return sk => (hi === lo ? 0.5 : (Math.log10(Math.max(roiRep(sk), 0.01)) - lo) / (hi - lo));
  })();

  const rows = [
    [
      { text: "#", options: { bold: true, color: WHITE, fill: { color: PURPLE }, fontFace: BODY_FONT, fontSize: 10, align: "center" } },
      { text: "Skill", options: { bold: true, color: WHITE, fill: { color: PURPLE }, fontFace: BODY_FONT, fontSize: 10 } },
      { text: "One-liner", options: { bold: true, color: WHITE, fill: { color: PURPLE }, fontFace: BODY_FONT, fontSize: 10 } },
      { text: "Scope", options: { bold: true, color: WHITE, fill: { color: PURPLE }, fontFace: BODY_FONT, fontSize: 10 } },
      { text: "Cadence", options: { bold: true, color: WHITE, fill: { color: PURPLE }, fontFace: BODY_FONT, fontSize: 10 } },
      { text: "Napkin Math", options: { bold: true, color: WHITE, fill: { color: PURPLE }, fontFace: BODY_FONT, fontSize: 10, align: "center" } },
      { text: "Relative Complexity", options: { bold: true, color: WHITE, fill: { color: PURPLE }, fontFace: BODY_FONT, fontSize: 9.5, align: "center" } },
    ]
  ];
  skills.forEach(sk => {
    const roiT = roiTFor(sk);
    const napkinFill = hasRoi(sk) ? { color: roiColorFor(sk) } : { color: "F2F1F4" };
    const napkinColor = hasRoi(sk) ? roiTextColor(roiT) : SLATE;
    rows.push([
      { text: String(sk.n), options: { color: PURPLE, bold: true, fontFace: BODY_FONT, fontSize: 10, align: "center" } },
      { text: sk.name, options: { color: NEARBLACK, bold: true, fontFace: BODY_FONT, fontSize: 10 } },
      { text: shortBlurb(sk), options: { color: SLATE, fontFace: BODY_FONT, fontSize: 9 } },
      { text: sk.scope, options: { color: SLATE, fontFace: BODY_FONT, fontSize: 8.5 } },
      { text: sk.cadence, options: { color: SLATE, fontFace: BODY_FONT, fontSize: 8.5 } },
      { text: napkinMath(sk), options: { color: napkinColor, bold: true, fontFace: BODY_FONT, fontSize: 9, align: "center", fill: napkinFill } },
      { text: String(sk.sophistication), options: { color: complexityTextColor(sk.sophistication), bold: true, fontFace: BODY_FONT, fontSize: 10, align: "center", fill: { color: complexityColor(sk.sophistication) } } },
    ]);
  });

  s.addTable(rows, {
    x: 0.6, y: 1.6, w: 12.1, h: 5.22,
    colW: [0.4, 2.05, 4.05, 1.3, 1.2, 1.5, 1.6],
    border: { type: "solid", color: "DDDAE2", pt: 0.5 },
    autoPage: false,
    valign: "middle",
    margin: [2, 5, 2, 5],
  });
  s.addText("* Strategic / expected-value estimate rather than direct time savings — see the Total ROI slide for methodology. — = not yet fleshed out with a full ROI estimate. Complexity: light yellow = simpler build, dark gold = more advanced. Napkin math: light green = smaller estimated value, dark green = larger.", {
    x: 0.6, y: 6.9, w: 12.1, h: 0.16, fontFace: BODY_FONT, italic: true, fontSize: 7.5, color: SLATE, margin: 0
  });
  addFooter(s, false);
}

// ---------- Slide 3: TOTAL ROI across the detailed skills (validated, not hand-typed) ----------
// Sums only the detailed/priced skills — undetailed slate entries have no roiLow/roiHigh to add.
const timeSkills = detailedSkills.filter(sk => sk.roiCategory === "time");
const expectedSkills = detailedSkills.filter(sk => sk.roiCategory === "expected");
const sum = (arr, key) => arr.reduce((a, sk) => a + sk[key], 0);
const timeLow = sum(timeSkills, "roiLow"), timeHigh = sum(timeSkills, "roiHigh");
const expLow = sum(expectedSkills, "roiLow"), expHigh = sum(expectedSkills, "roiHigh");
const totalLow = timeLow + expLow, totalHigh = timeHigh + expHigh;
const fmtK = v => (Number.isInteger(v) ? v : v.toFixed(1));
const pluralSkills = n => `${n} skill${n === 1 ? "" : "s"}`;

{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeaderBand(s, null, cfg.roiTitle || `Total Estimated ROI — ${detailedSkills.length} Detailed Skills`);

  s.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.45, w: 12.1, h: 1.75, rectRadius: 0.1, fill: { color: "F3EEF7" }, line: { color: "D9CCE8", width: 1 }
  });
  s.addText(`$${fmtK(totalLow)}K – $${fmtK(totalHigh)}K / year`, {
    x: 0.95, y: 1.62, w: 11.4, h: 0.95, fontFace: HEADER_FONT, fontSize: 40, bold: true, color: PURPLE, margin: 0, valign: "middle"
  });
  s.addText(`Combined estimated annual value across the ${detailedSkills.length} skills detailed in this deck — sum of each skill's own ROI slide`, {
    x: 0.95, y: 2.62, w: 11.4, h: 0.4, fontFace: BODY_FONT, italic: true, fontSize: 12, color: SLATE, margin: 0
  });

  s.addText("HOW IT BREAKS DOWN", { x: 0.6, y: 3.5, w: 12, h: 0.32, fontFace: BODY_FONT, fontSize: 12, bold: true, color: PURPLE, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 3.9, w: 5.9, h: 1.55, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { color: "DDDAE2", width: 0.75 }
  });
  s.addText(`$${fmtK(timeLow)}K – $${fmtK(timeHigh)}K`, { x: 0.85, y: 4.05, w: 5.4, h: 0.5, fontFace: HEADER_FONT, fontSize: 22, bold: true, color: TEAL, margin: 0 });
  s.addText(`Time-savings & risk-avoidance  ·  ${pluralSkills(timeSkills.length)}`, { x: 0.85, y: 4.58, w: 5.4, h: 0.3, fontFace: BODY_FONT, fontSize: 11, bold: true, color: NEARBLACK, margin: 0 });
  s.addText("Reclaimed hours valued at loaded rates, plus avoided rework or scramble costs.", { x: 0.85, y: 4.9, w: 5.4, h: 0.5, fontFace: BODY_FONT, fontSize: 10.5, color: SLATE, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, {
    x: 6.8, y: 3.9, w: 5.9, h: 1.55, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { color: "DDDAE2", width: 0.75 }
  });
  s.addText(`$${fmtK(expLow)}K – $${fmtK(expHigh)}K`, { x: 7.05, y: 4.05, w: 5.4, h: 0.5, fontFace: HEADER_FONT, fontSize: 22, bold: true, color: EMBER, margin: 0 });
  s.addText(`Strategic / expected value  ·  ${pluralSkills(expectedSkills.length)}`, { x: 7.05, y: 4.58, w: 5.4, h: 0.3, fontFace: BODY_FONT, fontSize: 11, bold: true, color: NEARBLACK, margin: 0 });
  s.addText("Pursuit and offer-conversion value where no direct time-saved figure applies.", { x: 7.05, y: 4.9, w: 5.4, h: 0.5, fontFace: BODY_FONT, fontSize: 10.5, color: SLATE, margin: 0 });

  s.addText("A NOTE ON THE MATH", { x: 0.6, y: 5.65, w: 12, h: 0.3, fontFace: BODY_FONT, fontSize: 11, bold: true, color: PURPLE, margin: 0 });
  s.addText("This blends two different kinds of estimate — concrete time-savings math and directional expected-value math for the strategic skills, which carry the most uncertainty and the most upside. Use this total to size the opportunity, not as an audited figure.", {
    x: 0.6, y: 5.97, w: 12, h: 0.75, fontFace: BODY_FONT, fontSize: 11.5, color: NEARBLACK, margin: 0, valign: "top"
  });

  addFooter(s, false);
}

// ---------- One combined slide per skill: overview + ROI together ----------
const CHAR_W_PER_PT = 0.0060;
function estH(text, widthIn, fontSize, minH, lineHeightFactor) {
  lineHeightFactor = lineHeightFactor || 1.32;
  const usable = widthIn - 0.3;
  const charsPerLine = Math.max(8, Math.floor(usable / (fontSize * CHAR_W_PER_PT)));
  const lines = Math.max(1, Math.ceil(text.length / charsPerLine));
  return Math.max(minH || 0.3, lines * (fontSize / 72) * lineHeightFactor);
}

detailedSkills.forEach(sk => {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeaderBand(s, `Skill ${sk.n}`, sk.name);
  s.addShape(pres.ShapeType.ellipse, {
    x: 12.1, y: 0.28, w: 0.6, h: 0.6, fill: { color: complexityColor(sk.sophistication) }, line: { type: "none" }
  });
  s.addText(String(sk.sophistication), {
    x: 12.1, y: 0.28, w: 0.6, h: 0.6, align: "center", valign: "middle",
    fontFace: BODY_FONT, fontSize: 16, bold: true, color: complexityTextColor(sk.sophistication), margin: 0
  });

  const TOP = 1.4, BOTTOM = 7.02;
  const C1_X = 0.6, C1_W = 3.65;
  const C2_X = 4.45, C2_W = 3.85;
  const C3_X = 8.5, C3_W = 4.23;
  const LBL_FS = 11.5;

  // ---- Column 1: what it is (plain, no card) ----
  // Auto-shrink the body font if description + users + workflow won't fit at the default size —
  // three long fields plus three section labels in a 3.65in-wide, ~5.6in-tall column is prone to
  // overflow, so pick the largest font in this ladder that actually fits rather than clipping.
  function col1TotalHeight(fontSize) {
    const labelsH = 0.26 * 3;
    const descH = estH(sk.description, C1_W, fontSize, 0.4);
    const usersH = estH(sk.users, C1_W, fontSize, 0.3);
    const wfH = sk.workflow.reduce((acc, w) => acc + estH(w, C1_W - 0.2, fontSize, 0.24) + 0.06, 0);
    return labelsH + descH + usersH + wfH + 0.36; // spacing between the three sections
  }
  const available = BOTTOM - TOP;
  const fontLadder = [12.5, 11.5, 10.5, 9.5];
  const BODY_FS = fontLadder.find(fs => col1TotalHeight(fs) <= available) || fontLadder[fontLadder.length - 1];

  let y = TOP;
  s.addText("DESCRIPTION", { x: C1_X, y, w: C1_W, h: 0.24, fontFace: BODY_FONT, fontSize: LBL_FS, bold: true, color: PURPLE, margin: 0 });
  y += 0.26;
  let h = estH(sk.description, C1_W, BODY_FS, 0.4);
  s.addText(sk.description, { x: C1_X, y, w: C1_W, h, fontFace: BODY_FONT, fontSize: BODY_FS, color: NEARBLACK, margin: 0, valign: "top" });
  y += h + 0.18;

  s.addText("USERS", { x: C1_X, y, w: C1_W, h: 0.24, fontFace: BODY_FONT, fontSize: LBL_FS, bold: true, color: PURPLE, margin: 0 });
  y += 0.26;
  h = estH(sk.users, C1_W, BODY_FS, 0.3);
  s.addText(sk.users, { x: C1_X, y, w: C1_W, h, fontFace: BODY_FONT, fontSize: BODY_FS, color: NEARBLACK, margin: 0, valign: "top" });
  y += h + 0.18;

  s.addText("WORKFLOW", { x: C1_X, y, w: C1_W, h: 0.24, fontFace: BODY_FONT, fontSize: LBL_FS, bold: true, color: PURPLE, margin: 0 });
  y += 0.26;
  const wfH = sk.workflow.reduce((acc, w) => acc + estH(w, C1_W - 0.2, BODY_FS, 0.24) + 0.06, 0);
  const wfItems = sk.workflow.map((w, i) => ({
    text: w, options: { bullet: { code: "25CF" }, color: NEARBLACK, fontFace: BODY_FONT, fontSize: BODY_FS, breakLine: i !== sk.workflow.length - 1, paraSpaceAfter: 4 }
  }));
  s.addText(wfItems, { x: C1_X, y, w: C1_W, h: Math.min(wfH, BOTTOM - y), valign: "top", margin: 0 });

  // ---- Column 2: how it runs (neutral card) ----
  s.addShape(pres.ShapeType.roundRect, {
    x: C2_X, y: TOP, w: C2_W, h: BOTTOM - TOP, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { color: "DDDAE2", width: 0.75 }
  });
  const midBlocks = [
    { label: "DATA SOURCES / CONNECTORS", value: sk.dataSources },
    { label: "OUTPUT FORMAT", value: sk.output },
    { label: "SCHEDULING", value: sk.scheduled },
    { label: "RECOMMENDED MODEL", value: sk.model + " — " + sk.modelWhy },
    { label: "SCOPE", value: sk.scope },
  ];
  const innerW2 = C2_W - 0.6;
  // Five fields in one card is the tightest spot in the layout (the RECOMMENDED MODEL field in
  // particular can run long once modelWhy is appended) — auto-shrink independently of column 1.
  function col2TotalHeight(fontSize) {
    return midBlocks.reduce((acc, b) => acc + 0.25 + estH(b.value, innerW2, fontSize, 0.3) + 0.16, 0);
  }
  const BODY_FS2 = fontLadder.find(fs => col2TotalHeight(fs) <= (BOTTOM - (TOP + 0.22))) || fontLadder[fontLadder.length - 1];

  let ry = TOP + 0.22;
  midBlocks.forEach(b => {
    s.addText(b.label, { x: C2_X + 0.3, y: ry, w: innerW2, h: 0.24, fontFace: BODY_FONT, fontSize: LBL_FS, bold: true, color: PURPLE, margin: 0 });
    ry += 0.25;
    const bh = estH(b.value, innerW2, BODY_FS2, 0.3);
    s.addText(b.value, { x: C2_X + 0.3, y: ry, w: innerW2, h: bh, fontFace: BODY_FONT, fontSize: BODY_FS2, color: NEARBLACK, margin: 0, valign: "top" });
    ry += bh + 0.16;
  });

  // ---- Column 3: what it's worth (purple-tinted card, same treatment as the Total ROI slide) ----
  s.addShape(pres.ShapeType.roundRect, {
    x: C3_X, y: TOP, w: C3_W, h: BOTTOM - TOP, rectRadius: 0.08, fill: { color: "F3EEF7" }, line: { color: "D9CCE8", width: 1 }
  });
  const innerW3 = C3_W - 0.6;
  let cy = TOP + 0.22;
  const hlFontSize = headlineFontSize(sk.roiHeadline);
  const headlineH = estH(sk.roiHeadline, innerW3, hlFontSize, 0.5, 1.45);
  s.addText(sk.roiHeadline, { x: C3_X + 0.3, y: cy, w: innerW3, h: headlineH, fontFace: HEADER_FONT, fontSize: hlFontSize, bold: true, color: PURPLE, margin: 0, valign: "top" });
  cy += headlineH + 0.14;
  s.addText("Estimated annual value", { x: C3_X + 0.3, y: cy, w: innerW3, h: 0.24, fontFace: BODY_FONT, italic: true, fontSize: 10.5, color: SLATE, margin: 0 });
  cy += 0.38;

  // roiBody + roiScale share whatever vertical room is left under the headline — shrink together
  // if the combination doesn't fit, same ladder pattern as columns 1 and 2.
  const c3Remaining = BOTTOM - cy - 0.1;
  const c3Ladder = [11.5, 10.5, 9.5, 8.5];
  const BODY_FS3 = c3Ladder.find(fs =>
    (0.26 + estH(sk.roiBody, innerW3, fs, 0.4) + 0.18 + 0.26 + estH(sk.roiScale, innerW3, fs, 0.4)) <= c3Remaining
  ) || c3Ladder[c3Ladder.length - 1];

  s.addText("HOW WE GET THERE", { x: C3_X + 0.3, y: cy, w: innerW3, h: 0.22, fontFace: BODY_FONT, fontSize: LBL_FS, bold: true, color: PURPLE, margin: 0 });
  cy += 0.26;
  const bodyH = estH(sk.roiBody, innerW3, BODY_FS3, 0.4);
  s.addText(sk.roiBody, { x: C3_X + 0.3, y: cy, w: innerW3, h: bodyH, fontFace: BODY_FONT, fontSize: BODY_FS3, color: NEARBLACK, margin: 0, valign: "top" });
  cy += bodyH + 0.18;

  s.addText("TEAM / ORG SCALING", { x: C3_X + 0.3, y: cy, w: innerW3, h: 0.22, fontFace: BODY_FONT, fontSize: LBL_FS, bold: true, color: PURPLE, margin: 0 });
  cy += 0.26;
  const scaleH = estH(sk.roiScale, innerW3, BODY_FS3, 0.4);
  s.addText(sk.roiScale, { x: C3_X + 0.3, y: cy, w: innerW3, h: Math.min(scaleH, BOTTOM - cy - 0.1), fontFace: BODY_FONT, fontSize: BODY_FS3, color: NEARBLACK, margin: 0, valign: "top" });

  addFooter(s, false);
});

pres.writeFile({ fileName: "output.pptx" }).then(() => {
  console.log(`Deck written: output.pptx (${skills.length} in slate, ${detailedSkills.length} detailed, total ROI $${fmtK(totalLow)}K-$${fmtK(totalHigh)}K/yr)`);
});
