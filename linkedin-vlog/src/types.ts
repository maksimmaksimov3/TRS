export type Shot = {
  /** Path relative to /public, e.g. "clips/IMG_7816.MOV" */
  src: string;
  /** Duration of this shot in the final edit (seconds) */
  durationSec: number;
  /** Text overlay — bold, Casey Neistat style */
  text?: string;
  /** Trim: start offset in the source file (seconds) */
  trimStart?: number;
  /** "video" or "image" */
  type: "video" | "image";
};
