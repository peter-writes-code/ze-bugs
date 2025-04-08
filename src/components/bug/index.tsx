import React, { useEffect, useState } from "react";
import BodyPart from "./BodyPart";

interface BugProps {
  variant: string;
  scale?: number;
  heartBeat?: boolean;
  BodyPartDecorator?: React.ComponentType<{
    path: string;
    pivotX: number;
    pivotY: number;
    offsetX: number;
    offsetY: number;
    minAngle: number;
    maxAngle: number;
  }>;
}

interface AnatomyPart {
  name: string;
  path: string;
  pivotX: number;
  pivotY: number;
  offsetX: number;
  offsetY: number;
  minAngle: number;
  maxAngle: number;
}

function Bug({ variant, scale = 1, heartBeat = false, BodyPartDecorator }: BugProps) {
  const config = require(`./variants/${variant}/bugConfig.json`);
  const [heartBeatStamp, setHeartBeatStamp] = useState<string>('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (heartBeat) {
      const pulse = () => {
        const currentTimestamp = new Date().toISOString();
        setHeartBeatStamp(currentTimestamp);
        timeoutId = setTimeout(pulse, 36);
      };
      
      pulse(); // Start the initial pulse
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [heartBeat]);

  return (
    <div
      style={{
        position: "relative",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {config.anatomy.map((part: AnatomyPart) => (
        <div key={part.name}>
          {BodyPartDecorator ? (
            <BodyPartDecorator
              path={part.path}
              pivotX={part.pivotX}
              pivotY={part.pivotY}
              offsetX={part.offsetX}
              offsetY={part.offsetY}
              minAngle={part.minAngle}
              maxAngle={part.maxAngle}
            />
          ) : (
            <BodyPart
              path={part.path}
              pivotX={part.pivotX}
              pivotY={part.pivotY}
              offsetX={part.offsetX}
              offsetY={part.offsetY}
              name={part.name}
              heartBeatStamp={heartBeatStamp}
              minAngle={part.minAngle}
              maxAngle={part.maxAngle}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Bug;
