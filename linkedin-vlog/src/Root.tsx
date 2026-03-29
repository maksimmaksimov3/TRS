import { Composition } from "remotion";
import { LinkedInVlog, vlogSchema } from "./LinkedInVlog";
import { SHOTS } from "./clips";

const FPS = 30;

// Calculate total duration from shots + intro (2s) + outro (3s)
const totalShotsSec = SHOTS.reduce((sum, s) => sum + s.durationSec, 0);
const DURATION_SEC = Math.ceil(2 + totalShotsSec + 3);

export const Root: React.FC = () => {
  return (
    <Composition
      id="LinkedInVlog"
      component={LinkedInVlog}
      durationInFrames={FPS * DURATION_SEC}
      fps={FPS}
      width={1080}
      height={1920}
      schema={vlogSchema}
      defaultProps={{
        shots: SHOTS,
        title: "ANALYTICA 2026",
        subtitle: "MUNICH",
        orange: "#FF6B00",
        purple: "#7B2D8E",
      }}
    />
  );
};
