import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const LowerThird: React.FC<{
  caption: string;
  accentColor: string;
}> = ({ caption, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slide in from bottom after 0.5 sec, slide out 1.5 sec before end
  const slideIn = spring({ fps, frame, from: 80, to: 0, delay: 15 });
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 20, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 80,
        transform: `translateY(${slideIn}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 6,
          height: 40,
          background: accentColor,
          borderRadius: 3,
        }}
      />
      <span
        style={{
          color: "#fff",
          fontFamily: "'Arial', sans-serif",
          fontSize: 36,
          fontWeight: 600,
          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
          letterSpacing: 0.5,
        }}
      >
        {caption}
      </span>
    </div>
  );
};
