import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { z } from "zod";
import { shotSchema, ShotClip } from "./ShotClip";
import { IntroCard } from "./IntroCard";
import { OutroCard } from "./OutroCard";
import { Letterbox } from "./Letterbox";

export const vlogSchema = z.object({
  shots: z.array(shotSchema),
  title: z.string(),
  subtitle: z.string(),
  orange: z.string(),
  purple: z.string(),
});

type Props = z.infer<typeof vlogSchema>;

const INTRO_SEC = 2;
const OUTRO_SEC = 3;

export const LinkedInVlog: React.FC<Props> = ({
  shots,
  title,
  subtitle,
  orange,
  purple,
}) => {
  const { fps } = useVideoConfig();

  const introDur = INTRO_SEC * fps;
  const outroDur = OUTRO_SEC * fps;

  let cursor = introDur;
  const offsets: number[] = [];
  for (const shot of shots) {
    offsets.push(cursor);
    cursor += Math.round(shot.durationSec * fps);
  }

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* ── Font import ── */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');`}
      </style>

      {/* ── Intro ── */}
      <Sequence from={0} durationInFrames={introDur}>
        <IntroCard
          title={title}
          subtitle={subtitle}
          orange={orange}
          purple={purple}
        />
      </Sequence>

      {/* ── Shots ── */}
      {shots.map((shot, i) => (
        <Sequence
          key={i}
          from={offsets[i]}
          durationInFrames={Math.round(shot.durationSec * fps)}
        >
          <ShotClip shot={shot} orange={orange} purple={purple} />
        </Sequence>
      ))}

      {/* ── Outro ── */}
      <Sequence from={cursor} durationInFrames={outroDur}>
        <OutroCard orange={orange} purple={purple} />
      </Sequence>

      {/* ── Cinematic letterbox bars ── */}
      <Letterbox />
    </AbsoluteFill>
  );
};
