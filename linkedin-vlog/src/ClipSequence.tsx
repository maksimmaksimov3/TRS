import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  staticFile,
} from "remotion";
import { z } from "zod";
import { LowerThird } from "./LowerThird";
import { LocationTag } from "./LocationTag";

export const clipSchema = z.object({
  src: z.string(),
  durationSec: z.number(),
  caption: z.string().optional(),
  location: z.string().optional(),
  trimStart: z.number().optional(),
});

type Clip = z.infer<typeof clipSchema>;

const FADE_FRAMES = 12; // 0.4 sec fade in/out at 30fps

export const ClipSequence: React.FC<{ clip: Clip; accentColor: string }> = ({
  clip,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity }}>
        <OffthreadVideo
          src={staticFile(clip.src)}
          startFrom={Math.round((clip.trimStart ?? 0) * 30)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {clip.location && (
        <LocationTag location={clip.location} accentColor={accentColor} />
      )}

      {clip.caption && (
        <LowerThird caption={clip.caption} accentColor={accentColor} />
      )}
    </AbsoluteFill>
  );
};
