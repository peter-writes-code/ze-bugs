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
}

function BodyPart({
  path,
  pivotX,
  pivotY,
  offsetX,
  offsetY,
  name = '',
  heartBeatStamp = '',
  minAngle,
  maxAngle,
  angleOverride,
}: BodyPartProps) {
  const [angle, setAngle] = useState(minAngle);
  const [isIncreasing, setIsIncreasing] = useState(true);
  const INCREMENT = 11.5; // Constant increment value
  
  const handleMove = () => {
    setAngle(prevAngle => {
      if (isIncreasing) {
        const newAngle = prevAngle + INCREMENT;
        if (newAngle >= maxAngle) {
          setIsIncreasing(false);
          return maxAngle;
        }
        return newAngle;
      } else {
        const newAngle = prevAngle - INCREMENT;
        if (newAngle <= minAngle) {
          setIsIncreasing(true);
          return minAngle;
        }
        return newAngle;
      }
    });
  };

  useEffect(() => {
    if (heartBeatStamp && angleOverride === undefined) {
      handleMove();
    }
  }, [heartBeatStamp]);

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
}

export default BodyPart;
