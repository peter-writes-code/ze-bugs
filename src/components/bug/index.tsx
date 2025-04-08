import React, { useEffect, useState } from "react";
import BodyPart from "./BodyPart";

interface BugProps {
  variant: string;
  freeToMove?: boolean;
  scaleOverride?: number;
  xOverride?: number;
  yOverride?: number;
  rotationOverride?: number;
  onMovementChange?: (isMoving: boolean) => void;
  BodyPartDecorator?: React.ComponentType<{
    path: string;
    pivotX: number;
    pivotY: number;
    offsetX: number;
    offsetY: number;
    minAngle: number;
    maxAngle: number;
    increment: number;
    startPositive: boolean;
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
  increment: number;
  startPositive: boolean;
  motion: string[];
}

function Bug({
  variant,
  freeToMove = false,
  scaleOverride,
  xOverride,
  yOverride,
  rotationOverride,
  onMovementChange,
  BodyPartDecorator,
}: BugProps) {
  const config = require(`./variants/${variant}/bugConfig.json`);
  const scale = React.useMemo(() => {
    if (scaleOverride !== undefined) return scaleOverride;
    return (
      config.minScale + Math.random() * (config.maxScale - config.minScale)
    );
  }, [config.minScale, config.maxScale, scaleOverride]);
  
  // Internal state for position and rotation
  const [position, setPosition] = useState(() => ({
    x: xOverride !== undefined ? xOverride : Math.random() * window.innerWidth,
    y: yOverride !== undefined ? yOverride : Math.random() * window.innerHeight
  }));
  const [currentRotation, setCurrentRotation] = useState(() => 
    rotationOverride !== undefined ? rotationOverride : Math.random() * 360
  );
  const [currentMotion, setCurrentMotion] = useState<string>("wait");
  const [isInMotion, setIsInMotion] = useState(false);
  const [heartBeatStamp, setHeartBeatStamp] = useState<string>("");
  const [pulseTimeoutId, setPulseTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isTurningRight, setIsTurningRight] = useState(() => Math.random() < 0.5);

  // Update position on pulse if current motion has distance
  useEffect(() => {
    if (heartBeatStamp && currentMotion && currentMotion !== "wait") {
      const currentMotionConfig = config.motion.find((m: any) => m.name === currentMotion);
      if (currentMotionConfig?.distance) {
        // Randomly change turning direction occasionally
        if (Math.random() < 0.09) { // 2% chance per pulse to change direction
          setIsTurningRight(prev => !prev);
        }

        // Apply fixed radius as turn rate in the current direction
        const radius = currentMotionConfig.radius || 0;
        const turnAmount = radius * (isTurningRight ? 1 : -1);
        const newRotation = currentRotation + turnAmount;
        setCurrentRotation(newRotation);
        
        const correctedAngle = newRotation - 90; // Apply -90 degree correction
        const angleInRadians = (correctedAngle * Math.PI) / 180;
        const stepDistance = (currentMotionConfig.distance / 1000) * scale; // Adjust distance by scale and make movement smoother
        
        setPosition(prev => {
          let newX = prev.x + (stepDistance * Math.cos(angleInRadians));
          let newY = prev.y + (stepDistance * Math.sin(angleInRadians));

          // Wrap around screen edges
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          return { x: newX, y: newY };
        });
      }
    }
  }, [heartBeatStamp, currentMotion, scale]);

  // Add effect to handle movement changes
  useEffect(() => {
    if (onMovementChange) {
      if (currentMotion && currentMotion !== "wait") {
        if (!isInMotion) {
          onMovementChange(true);
          setIsInMotion(true);
        }
      } else {
        if (isInMotion) {
          onMovementChange(false);
          setIsInMotion(false);
        }
      }
    }
  }, [currentMotion, onMovementChange, isInMotion]);

  const selectRandomMotion = () => {
    // If not free to move, force "wait" motion
    if (!freeToMove && !isInMotion) {
      const waitMotion = config.motion.find((m: any) => m.name === "wait");
      const duration = Math.floor(
        Math.random() * (waitMotion.maxDuration - waitMotion.minDuration) +
          waitMotion.minDuration
      );
      setCurrentMotion("wait");
      return duration;
    }

    const motions = config.motion;
    const randomMotion = motions[Math.floor(Math.random() * motions.length)];
    const duration = Math.floor(
      Math.random() * (randomMotion.maxDuration - randomMotion.minDuration) +
        randomMotion.minDuration
    );

    setCurrentMotion(randomMotion.name);
    return duration;
  };

  const startPulse = () => {
    const pulse = () => {
      const currentTimestamp = new Date().toISOString();
      setHeartBeatStamp(currentTimestamp);
      const timeoutId = setTimeout(pulse, 36);
      setPulseTimeoutId(timeoutId);
    };
    pulse();
  };

  const stopPulse = () => {
    if (pulseTimeoutId) {
      clearTimeout(pulseTimeoutId);
      setPulseTimeoutId(null);
    }
  };

  useEffect(() => {
    if (currentMotion && currentMotion !== "wait") {
      if (!pulseTimeoutId) {
        startPulse();
      }
    } else {
      stopPulse();
    }
  }, [currentMotion]);

  useEffect(() => {
    let motionTimeoutId: NodeJS.Timeout;

    const startMotionCycle = () => {
      const waitMotion = config.motion.find((m: any) => m.name === "wait");
      const duration = Math.floor(
        Math.random() * (waitMotion.maxDuration - waitMotion.minDuration) +
          waitMotion.minDuration
      );

      // Only schedule next motions if free to move
      if (freeToMove || isInMotion) {
        motionTimeoutId = setTimeout(() => {
          const startRandomMotions = () => {
            const duration = selectRandomMotion();
            motionTimeoutId = setTimeout(startRandomMotions, duration);
          };
          startRandomMotions();
        }, duration);
      }
    };

    startMotionCycle();

    return () => {
      if (motionTimeoutId) clearTimeout(motionTimeoutId);
      stopPulse();
    };
  }, [freeToMove]); // Add freeToMove to dependency array

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: `rotate(${currentRotation}deg) scale(${scale})`,
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
              increment={part.increment}
              startPositive={part.startPositive}
            />
          ) : (
            <BodyPart
              path={part.path}
              pivotX={part.pivotX}
              pivotY={part.pivotY}
              offsetX={part.offsetX}
              offsetY={part.offsetY}
              name={part.name}
              heartBeatStamp={
                part.motion.includes(currentMotion) ? heartBeatStamp : ""
              }
              minAngle={part.minAngle}
              maxAngle={part.maxAngle}
              increment={part.increment}
              startPositive={part.startPositive}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Bug;
