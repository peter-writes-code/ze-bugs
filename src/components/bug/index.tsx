import React, { useEffect, useState } from "react";
import BodyPart from "./BodyPart";
import BodyPartAnatomy from "./BodyPartAnatomy";

interface BugProps {
  variant: string;
  scale?: number;
  anatomy?: boolean;
  heartBeat?: boolean;
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

function Bug({ variant, scale = 1, anatomy = false, heartBeat = false }: BugProps) {
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
      {!anatomy && config.anatomy.map((part: AnatomyPart) => (
        <div key={part.name}>
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
        </div>
      ))}
      {anatomy && config.anatomy.map((part: AnatomyPart) => (
        <div key={part.name}>
          <BodyPartAnatomy
            path={part.path}
            pivotX={part.pivotX}
            pivotY={part.pivotY}
            offsetX={part.offsetX}
            offsetY={part.offsetY}
            minAngle={part.minAngle}
            maxAngle={part.maxAngle}
          />
        </div>
      ))}
    </div>
  );
}

export default Bug;
