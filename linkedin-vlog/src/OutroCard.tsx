import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const OutroCard: React.FC<{ accentColor: string }> = ({
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({ fps, frame, from: 0.8, to: 1, delay: 5 });
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 60%, ${accentColor}22 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* LinkedIn logo color block */}
        <div
          style={{
            width: 100,
            height: 100,
            background: accentColor,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontFamily: "'Arial Black', sans-serif",
              fontSize: 56,
              fontWeight: 900,
            }}
          >
            in
          </span>
        </div>

        <p
          style={{
            color: "#fff",
            fontFamily: "'Arial', sans-serif",
            fontSize: 42,
            fontWeight: 700,
            margin: 0,
            textAlign: "center",
          }}
        >
          Thanks for watching
        </p>

        <p
          style={{
            color: "#aaa",
            fontFamily: "'Arial', sans-serif",
            fontSize: 30,
            fontWeight: 400,
            margin: 0,
            letterSpacing: 2,
          }}
        >
          Follow for more behind-the-scenes
        </p>
      </div>
    </AbsoluteFill>
  );
};
