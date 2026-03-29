import type { Shot } from "./types";

/**
 * EDIT TIMELINE — Analytica 2026 LinkedIn Vlog
 *
 * Best-guess file assignments based on chronological IMG order.
 * Swap any file name below if a shot doesn't match.
 *
 * To preview: npm start → opens Remotion Studio
 * To render:  npm run render → outputs out/vlog.mp4
 */
export const SHOTS: Shot[] = [
  // ── ACT 1: Departure ──
  {
    src: "clips/IMG_7816.MOV",
    durationSec: 2,
    text: "Munich.",
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7817.MOV",
    durationSec: 2,
    text: "First conference.",
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7818.MOV",
    durationSec: 3,
    text: "Representing @Digital Alley.",
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7819.MOV",
    durationSec: 2,
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7820.MOV",
    durationSec: 4,
    text: "Analytica 2026.",
    type: "video",
    trimStart: 0,
  },

  // ── ACT 2: Arrival ──
  {
    src: "clips/IMG_7821.MOV",
    durationSec: 5,
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7822.MOV",
    durationSec: 4,
    text: "This is where the photonics world shows up.",
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7826.MOV",
    durationSec: 3,
    type: "video",
    trimStart: 0,
  },

  // ── ACT 3: The Event ──
  // Flash frame photo between acts (Casey Neistat style)
  {
    src: "clips/IMG_7844.jpg",
    durationSec: 0.4,
    type: "image",
  },
  {
    src: "clips/IMG_7842.MOV",
    durationSec: 5,
    text: "Digital Alley is in the room.",
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7843.MOV",
    durationSec: 5,
    type: "video",
    trimStart: 0,
  },
  // Another flash frame
  {
    src: "clips/IMG_7823.JPG",
    durationSec: 0.4,
    type: "image",
  },
  {
    src: "clips/IMG_7851.MOV",
    durationSec: 4,
    type: "video",
    trimStart: 5,
  },
  {
    src: "clips/IMG_7858.MOV",
    durationSec: 4,
    type: "video",
    trimStart: 0,
  },

  // ── ACT 4: Return ──
  {
    src: "clips/IMG_7885.MOV",
    durationSec: 4,
    text: "Done.",
    type: "video",
    trimStart: 0,
  },
  {
    src: "clips/IMG_7888.MOV",
    durationSec: 5,
    text: '"First one down."',
    type: "video",
    trimStart: 0,
  },
];
