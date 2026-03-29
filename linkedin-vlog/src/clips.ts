import type { Clip } from "./types";

/**
 * EDIT THIS FILE to configure your vlog clips.
 *
 * 1. Drop your video files into the /public/clips/ folder.
 * 2. Add an entry per clip below.
 * 3. Adjust durationSec so the total sums to 60-90 seconds.
 *
 * Example total: 8+7+8+7+8+7+8+7+8 = 68 sec ✓
 */
export const CLIPS: Clip[] = [
  {
    src: "clips/clip1.mp4",
    durationSec: 8,
    caption: "Heading to the airport",
    location: "Warsaw, PL",
  },
  {
    src: "clips/clip2.mp4",
    durationSec: 7,
    caption: "First day at the conference",
  },
  {
    src: "clips/clip3.mp4",
    durationSec: 8,
    caption: "Keynote highlights",
  },
  {
    src: "clips/clip4.mp4",
    durationSec: 7,
    caption: "Networking sessions",
  },
  {
    src: "clips/clip5.mp4",
    durationSec: 8,
    caption: "Workshop deep-dive",
  },
  {
    src: "clips/clip6.mp4",
    durationSec: 7,
    caption: "Team dinner",
  },
  {
    src: "clips/clip7.mp4",
    durationSec: 8,
    caption: "Final day wrap-up",
  },
  {
    src: "clips/clip8.mp4",
    durationSec: 7,
    caption: "Key takeaways",
  },
  {
    src: "clips/clip9.mp4",
    durationSec: 8,
    caption: "Flying back home",
  },
];
