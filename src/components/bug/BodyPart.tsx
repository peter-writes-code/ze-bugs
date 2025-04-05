import React from "react";

interface BodyPartProps {
  path: string;
  pivotX: number;
  pivotY: number;
  offsetX: number;
  offsetY: number;
  angle?: number;
}

function BodyPart({
  path,
  pivotX,
  pivotY,
  offsetX,
  offsetY,
  angle = 0,
}: BodyPartProps) {
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${pivotX}px, ${pivotY}px) rotate(${angle}deg)`,
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
