import React from "react";
import BodyPart from "./BodyPart";
import BodyPartAnatomy from "./BodyPartAnatomy";

interface BugProps {
  variant: string;
  scale?: number;
  anatomy?: boolean;
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

function Bug({ variant, scale = 1, anatomy = false }: BugProps) {
  const config = require(`./variants/${variant}/bugConfig.json`);

  return (
    <div
      style={{
        position: "relative",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
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
