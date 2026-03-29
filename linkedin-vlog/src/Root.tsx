import { Composition } from "remotion";
import { LinkedInVlog, vlogSchema } from "./LinkedInVlog";
import { CLIPS } from "./clips";

// 30fps — adjust durationInFrames to target length
// 75 sec × 30fps = 2250 frames (change to suit your final cut)
const FPS = 30;
const DURATION_SEC = 75;

export const Root: React.FC = () => {
  return (
    <Composition
      id="LinkedInVlog"
      component={LinkedInVlog}
      durationInFrames={FPS * DURATION_SEC}
      fps={FPS}
      width={1920}
      height={1080}
      schema={vlogSchema}
      defaultProps={{
        clips: CLIPS,
        title: "Business Trip",
        subtitle: "Behind the scenes",
        location: "",
        accentColor: "#0077B5", // LinkedIn blue
      }}
    />
  );
};
