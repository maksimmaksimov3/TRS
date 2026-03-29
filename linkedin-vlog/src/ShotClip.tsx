import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { z } from "zod";

export const shotSchema = z.object({
  src: z.string(),
  durationSec: z.number(),
  text: z.string().optional(),
  trimStart: z.number().optional(),
  type: z.enum(["video", "image"]),
});

type Shot = z.infer<typeof shotSchema>;

export const ShotClip: React.FC<{
  shot: Shot;
  orange: string;
  purple: string;
}> = ({ shot, orange, purple }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Hard cut in, slight fade out (Casey style — snappy)
  const opacity = interpolate(
    frame,
    [0, 2, durationInFrames - 3, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle Ken Burns zoom (1.0 → 1.05)
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  // Text animation
  const textSpring = spring({ fps, frame, from: 30, to: 0, delay: 4 });
  const textOpacity = interpolate(frame, [0, 6, durationInFrames - 6, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Media */}
      <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
        {shot.type === "video" ? (
          <OffthreadVideo
            src={staticFile(shot.src)}
            startFrom={Math.round((shot.trimStart ?? 0) * 30)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Img
            src={staticFile(shot.src)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </AbsoluteFill>

      {/* Text overlay — bold, centered, Casey Neistat style */}
      {shot.text && (
        <div
          style={{
            position: "absolute",
            bottom: 280,
            left: 60,
            right: 60,
            transform: `translateY(${textSpring}px)`,
            opacity: textOpacity,
          }}
        >
          {/* Orange accent bar */}
          <div
            style={{
              width: 60,
              height: 5,
              background: orange,
              borderRadius: 3,
              marginBottom: 16,
            }}
          />
          <span
            style={{
              color: "#fff",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.2,
              textTransform: "uppercase",
              letterSpacing: 1,
              textShadow:
                "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.5)",
              display: "block",
            }}
          >
            {shot.text}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
