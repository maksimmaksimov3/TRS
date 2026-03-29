import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const OutroCard: React.FC<{ orange: string; purple: string }> = ({
  orange,
  purple,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({ fps, frame, from: 0.9, to: 1, delay: 3 });
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0a0a0a 0%, ${purple}33 50%, ${orange}22 100%)`,
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
          gap: 24,
        }}
      >
        {/* DA wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              color: orange,
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            DIGITAL
          </span>
          <span
            style={{
              color: purple,
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            ALLEY
          </span>
        </div>

        {/* Orange bar */}
        <div
          style={{
            width: 60,
            height: 5,
            background: orange,
            borderRadius: 3,
          }}
        />

        <p
          style={{
            color: "#aaa",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 28,
            fontWeight: 600,
            margin: 0,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          First one down.
        </p>
      </div>
    </AbsoluteFill>
  );
};
