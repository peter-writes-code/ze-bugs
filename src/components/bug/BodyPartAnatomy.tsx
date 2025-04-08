import React, { useState, useCallback, useEffect } from "react";
import BodyPart from "./BodyPart";

interface BodyPartAnatomyProps {
  path: string;
  pivotX: number;
  pivotY: number;
  offsetX: number;
  offsetY: number;
  minAngle: number;
  maxAngle: number;
  increment: number;
  startPositive: boolean;
}

function BodyPartAnatomy({
  path,
  pivotX,
  pivotY,
  offsetX,
  offsetY,
  minAngle,
  maxAngle,
  increment,
  startPositive,
}: BodyPartAnatomyProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [angle, setAngle] = useState(0);
  const [startY, setStartY] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setDragStartX(e.clientX);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const deltaY = e.clientY - startY;
        // Determine if we're on the right side of the screen
        const isRightSide = dragStartX > window.innerWidth / 2;
        // Invert the angle change if on the right side
        const angleMultiplier = isRightSide ? 0.5 : -0.5;
        
        setAngle((prevAngle) => {
          const newAngle = prevAngle + (deltaY * angleMultiplier);
          // Constrain the angle within the allowed range
          return Math.max(minAngle, Math.min(maxAngle, newAngle));
        });
        setStartY(e.clientY);
      }
    },
    [isDragging, startY, minAngle, maxAngle, dragStartX]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        style={{
          position: "relative",
          cursor: isDragging ? "grabbing" : "grab",
          filter: isHovered ? "invert(50%)" : "none",
        }}
      >
        <BodyPart
          path={path}
          pivotX={pivotX}
          pivotY={pivotY}
          offsetX={offsetX}
          offsetY={offsetY}
          minAngle={minAngle}
          maxAngle={maxAngle}
          increment={increment}
          startPositive={startPositive}
          angleOverride={angle}
        />
        <div
          style={{
            position: "absolute",
            top: pivotY - 1,
            left: pivotX - 1,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            backgroundColor: "red",
            zIndex: 1,
          }}
        />
      </div>
      {isDragging && (
        <div
          style={{
            position: "fixed",
            left: -40,
            top:  -60,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            zIndex: 1000,
            pointerEvents: "none",
            userSelect: "none",
            scale: .2,
          }}
        >
          Angle: {Math.round(angle)}° (min: {minAngle}°, max: {maxAngle}°)
        </div>
      )}
    </>
  );
}

export default BodyPartAnatomy;
