import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const LocationTag: React.FC<{
  location: string;
  accentColor: string;
}> = ({ location, accentColor }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        right: 80,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        borderRadius: 8,
        padding: "8px 18px",
        border: `2px solid ${accentColor}`,
      }}
    >
      {/* Pin icon */}
      <span style={{ fontSize: 22 }}>📍</span>
      <span
        style={{
          color: "#fff",
          fontFamily: "'Arial', sans-serif",
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        {location}
      </span>
    </div>
  );
};
