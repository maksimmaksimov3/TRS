import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const IntroCard: React.FC<{
  title: string;
  subtitle: string;
  orange: string;
  purple: string;
}> = ({ title, subtitle, orange, purple }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleScale = spring({ fps, frame, from: 0.85, to: 1, delay: 3 });
  const titleOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleSlide = spring({ fps, frame, from: 40, to: 0, delay: 10 });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0a0a0a 0%, ${purple}33 50%, ${orange}22 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      {/* Orange bar */}
      <div
        style={{
          width: 80,
          height: 6,
          background: orange,
          borderRadius: 3,
          marginBottom: 28,
          opacity: titleOpacity,
        }}
      />

      <h1
        style={{
          color: "#fff",
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 88,
          fontWeight: 800,
          margin: 0,
          letterSpacing: 3,
          textAlign: "center",
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: orange,
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 44,
          fontWeight: 700,
          margin: "12px 0 0",
          letterSpacing: 8,
          textTransform: "uppercase",
          transform: `translateY(${subtitleSlide}px)`,
        }}
      >
        {subtitle}
      </p>

      {/* Purple accent dot */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: purple,
          marginTop: 32,
          opacity: titleOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
