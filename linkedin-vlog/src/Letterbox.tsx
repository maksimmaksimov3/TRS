import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Thin cinematic letterbox bars — Casey Neistat signature look.
 * Adds a subtle cinematic feel without eating too much frame.
 */
export const Letterbox: React.FC = () => {
  const BAR = 40; // px height of each bar

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: BAR,
          background: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: BAR,
          background: "#000",
        }}
      />
    </AbsoluteFill>
  );
};
