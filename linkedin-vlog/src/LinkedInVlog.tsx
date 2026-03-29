import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useVideoConfig,
  staticFile,
} from "remotion";
import { z } from "zod";
import { clipSchema, ClipSequence } from "./ClipSequence";
import { IntroCard } from "./IntroCard";
import { OutroCard } from "./OutroCard";

export const vlogSchema = z.object({
  clips: z.array(clipSchema),
  title: z.string(),
  subtitle: z.string(),
  location: z.string(),
  accentColor: z.string(),
});

type Props = z.infer<typeof vlogSchema>;

const INTRO_DURATION_SEC = 3;
const OUTRO_DURATION_SEC = 4;

export const LinkedInVlog: React.FC<Props> = ({
  clips,
  title,
  subtitle,
  location,
  accentColor,
}) => {
  const { fps } = useVideoConfig();

  const introDur = INTRO_DURATION_SEC * fps;
  const outroDur = OUTRO_DURATION_SEC * fps;

  // Build timeline: intro → clips → outro
  let cursor = introDur;
  const clipOffsets: number[] = [];
  for (const clip of clips) {
    clipOffsets.push(cursor);
    cursor += Math.round(clip.durationSec * fps);
  }

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* ── Intro card ── */}
      <Sequence from={0} durationInFrames={introDur}>
        <IntroCard
          title={title}
          subtitle={subtitle}
          location={location}
          accentColor={accentColor}
        />
      </Sequence>

      {/* ── Clips ── */}
      {clips.map((clip, i) => (
        <Sequence
          key={clip.src + i}
          from={clipOffsets[i]}
          durationInFrames={Math.round(clip.durationSec * fps)}
        >
          <ClipSequence clip={clip} accentColor={accentColor} />
        </Sequence>
      ))}

      {/* ── Outro card ── */}
      <Sequence from={cursor} durationInFrames={outroDur}>
        <OutroCard accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
