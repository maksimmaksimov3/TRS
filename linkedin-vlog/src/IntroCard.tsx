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
  location: string;
  accentColor: string;
}> = ({ title, subtitle, location, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleY = spring({ fps, frame, from: 40, to: 0, delay: 5 });
  const subtitleY = spring({ fps, frame, from: 40, to: 0, delay: 15 });
  const locationY = spring({ fps, frame, from: 40, to: 0, delay: 22 });

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 15, durationInFrames],
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
      {/* Accent bar */}
      <div
        style={{
          width: 80,
          height: 6,
          background: accentColor,
          borderRadius: 3,
          marginBottom: 32,
          transform: `translateY(${titleY}px)`,
        }}
      />

      <h1
        style={{
          color: "#fff",
          fontFamily: "'Arial Black', sans-serif",
          fontSize: 96,
          fontWeight: 900,
          margin: 0,
          letterSpacing: -1,
          textAlign: "center",
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: "#ccc",
          fontFamily: "'Arial', sans-serif",
          fontSize: 44,
          fontWeight: 400,
          margin: "16px 0 0",
          letterSpacing: 4,
          textTransform: "uppercase",
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        {subtitle}
      </p>

      {location && (
        <p
          style={{
            color: accentColor,
            fontFamily: "'Arial', sans-serif",
            fontSize: 32,
            fontWeight: 600,
            margin: "24px 0 0",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transform: `translateY(${locationY}px)`,
          }}
        >
          📍 {location}
        </p>
      )}
    </AbsoluteFill>
  );
};
