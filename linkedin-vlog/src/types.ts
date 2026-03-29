export type Clip = {
  /** Path relative to /public, e.g. "clips/clip1.mp4" */
  src: string;
  /** Duration of this clip in the final edit (seconds) */
  durationSec: number;
  /** Optional caption shown in the lower-third */
  caption?: string;
  /** Optional location tag shown top-right */
  location?: string;
  /** Trim: start offset in the source file (seconds) */
  trimStart?: number;
};
