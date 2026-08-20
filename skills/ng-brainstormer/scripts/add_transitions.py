#!/usr/bin/env python3
"""
add_transitions.py — add PowerPoint slide transitions to specific slides in an
unpacked .pptx directory, by matching a text marker unique to that slide.

Why marker-based targeting instead of a slide index: slide order shifts easily
during iteration (a slide gets added or reordered), but a distinctive piece of
text on the slide — a title, a headline — stays put. Matching on that text is
more durable than "slide 3" across revisions.

Usage:
    python add_transitions.py <unpacked-dir> --transition "<marker-text>:<prst-name>" [--transition ... ]

Example:
    # Unpack first: mkdir unpacked && cd unpacked && unzip -q ../deck.pptx
    python add_transitions.py unpacked \\
        --transition "Total Estimated ROI:prestige" \\
        --transition "At a Glance:curtains"
    # Then repack: cd unpacked && zip -qr ../deck.pptx . && cd ..

Each --transition value is "<marker-text>:<prst-name>", split on the LAST colon
(so marker text itself may contain colons). The marker text must appear verbatim
in exactly one slide's XML (run text is not always contiguous across runs if the
title has mixed formatting — pick a short, distinctive substring that's unlikely
to be split across <a:r> runs, e.g. a single distinctive word from the title
rather than the full title with punctuation).

Verified preset transition names (from the MS-PPTX spec's CT_PresetTransition /
the p159 namespace used by PowerPoint 2013+), safe to pass as <prst-name>:
    fade, push, wipe, split, reveal, cut, random, cover, uncover, morph,
    curtains, prestige, ripple, honeycomb, glitter, vortex, shred, switch,
    flythrough, conveyor, pan, ferris, gallery, doors, window, fracture,
    crush, peel, page-curl, airplane, origami, flip, cube, drape, dissolve,
    checkerboard, blinds, clock, wheel, comb, zoom, orbit, pin-wheel

Only pick one of these if you have a specific reason (the deck's target
audience, a moment you want to land with a bit of showmanship). A deck with a
transition on every slide reads as gimmicky — one or two, on the slides that
most deserve a beat of emphasis (a big ROI reveal, a section break), is the
useful amount. Transitions can't be previewed in a headless sandbox, so treat
this as "apply, then ask the person to open it and confirm it looks right,"
not a fire-and-forget step.
"""

import argparse
import glob
import sys

FALLBACK_TAG = "p:fade"


def find_slide(unpacked_dir, marker):
    matches = []
    for path in sorted(glob.glob(f"{unpacked_dir}/ppt/slides/slide*.xml")):
        with open(path, encoding="utf-8") as f:
            if marker in f.read():
                matches.append(path)
    if not matches:
        raise SystemExit(f"error: marker not found on any slide: {marker!r}")
    if len(matches) > 1:
        raise SystemExit(
            f"error: marker {marker!r} matched more than one slide ({matches}); "
            "pick a more specific/unique substring"
        )
    return matches[0]


def add_transition(path, prst, fallback_tag=FALLBACK_TAG):
    with open(path, encoding="utf-8") as f:
        xml = f.read()

    marker = "</p:clrMapOvr></p:sld>"
    if marker not in xml:
        raise SystemExit(
            f"error: expected closing tag `{marker}` not found in {path} — "
            "this script assumes a standard python-pptx/pptxgenjs slide structure"
        )
    if "<p:transition" in xml:
        print(f"note: {path} already has a <p:transition> — leaving existing one in place, skipping", file=sys.stderr)
        return

    transition = (
        '<p:transition spd="slow" '
        'xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" p14:dur="1500">'
        '<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">'
        '<mc:Choice xmlns:p159="http://schemas.microsoft.com/office/powerpoint/2012/main" Requires="p159">'
        f'<p159:prstTrans prst="{prst}"/>'
        "</mc:Choice>"
        f"<mc:Fallback><{fallback_tag}/></mc:Fallback>"
        "</mc:AlternateContent>"
        "</p:transition>"
    )
    xml = xml.replace(marker, "</p:clrMapOvr>" + transition + "</p:sld>")
    with open(path, "w", encoding="utf-8") as f:
        f.write(xml)


def main():
    parser = argparse.ArgumentParser(
        description="Add a slide transition to slides matched by a text marker.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("unpacked_dir", help="Path to the unpacked .pptx directory (contains ppt/slides/...)")
    parser.add_argument(
        "--transition",
        action="append",
        required=True,
        metavar="MARKER:PRST",
        help='e.g. "Total Estimated ROI:prestige" — repeatable',
    )
    args = parser.parse_args()

    for spec in args.transition:
        if ":" not in spec:
            raise SystemExit(f"error: --transition value must be MARKER:PRST, got: {spec!r}")
        marker, prst = spec.rsplit(":", 1)
        path = find_slide(args.unpacked_dir, marker)
        add_transition(path, prst)
        print(f"applied '{prst}' transition to {path} (matched marker: {marker!r})")


if __name__ == "__main__":
    main()
