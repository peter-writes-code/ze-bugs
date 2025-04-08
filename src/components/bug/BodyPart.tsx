import React, { useEffect, useState } from "react";

interface BodyPartProps {
  path: string;
  pivotX: number;
  pivotY: number;
  offsetX: number;
  offsetY: number;
  name?: string;
  heartBeatStamp?: string;
  minAngle: number;
  maxAngle: number;
  angleOverride?: number;
  increment: number;
  startPositive: boolean;
}

function areEqual(prevProps: BodyPartProps, nextProps: BodyPartProps) {
  return (
    prevProps.heartBeatStamp === nextProps.heartBeatStamp &&
    prevProps.angleOverride === nextProps.angleOverride
  );
}

const BodyPart = React.memo(function BodyPart({
  path,
  pivotX,
  pivotY,
  offsetX,
  offsetY,
  name = "",
  heartBeatStamp = "",
  minAngle,
  maxAngle,
  angleOverride,
  increment,
  startPositive,
}: BodyPartProps) {
  const [angle, setAngle] = useState(() => {
    // Initialize with a random angle within the allowed range
    const range = maxAngle - minAngle;
    return minAngle + Math.random() * range;
  });
  const [isIncreasing, setIsIncreasing] = useState(startPositive);

  useEffect(() => {
    if (heartBeatStamp) {
      setAngle((prevAngle) => {
        if (isIncreasing) {
          const newAngle = prevAngle + increment;
          if (newAngle >= maxAngle) {
            setIsIncreasing(false);
            return maxAngle;
          }
          return newAngle;
        } else {
          const newAngle = prevAngle - increment;
          if (newAngle <= minAngle) {
            setIsIncreasing(true);
            return minAngle;
          }
          return newAngle;
        }
      });
    }
  }, [heartBeatStamp, increment, isIncreasing, maxAngle, minAngle]);

  const currentAngle = angleOverride !== undefined ? angleOverride : angle;

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${pivotX}px, ${pivotY}px) rotate(${currentAngle}deg)`,
        transformOrigin: "0px 0px",
      }}
    >
      <img
        src={path}
        alt="Bug body part"
        draggable={false}
        style={{
          position: "relative",
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      />
    </div>
  );
},
areEqual);

export default BodyPart;
