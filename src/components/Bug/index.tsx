import React, { useEffect, useReducer, useCallback, useState } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import BodyPart from "./BodyPart";

interface BugProps {
  guid: string;
  variant: string;
  freeToMove?: boolean;
  scaleOverride?: number;
  xOverride?: number;
  yOverride?: number;
  rotationOverride?: number;
  onMovementChange?: (isMoving: boolean, guid: string) => void;
  forcedMotion?: string;
  BodyPartDecorator?: React.ComponentType<{
    path: string;
    pivotX: number;
    pivotY: number;
    offsetX: number;
    offsetY: number;
    minAngle: number;
    maxAngle: number;
    increments: { [motion: string]: number };
    currentMotion: string;
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
  increments: { [motion: string]: number };
  startPositive: boolean;
  motion: string[];
}

interface BugState {
  position: { x: number; y: number };
  currentRotation: number;
  currentMotion: string;
  heartBeatStamp: string;
  motionTimeoutId: NodeJS.Timeout | null;
  pulseTimeoutId: NodeJS.Timeout | null;
  isTurningRight: boolean;
  scale: number;
}

type BugAction =
  | { type: "SET_POSITION"; payload: { x: number; y: number } }
  | { type: "SET_ROTATION"; payload: number }
  | { type: "SET_MOTION"; payload: string }
  | { type: "SET_HEARTBEAT"; payload: string }
  | { type: "SET_MOTION_TIMEOUT"; payload: NodeJS.Timeout | null }
  | { type: "SET_PULSE_TIMEOUT"; payload: NodeJS.Timeout | null }
  | { type: "TOGGLE_TURNING_DIRECTION" }
  | { type: "UPDATE_MOVEMENT"; payload: { distance: number; radius: number } }
  | { type: "INITIALIZE_SCALE"; payload: number };

function bugReducer(state: BugState, action: BugAction): BugState {
  switch (action.type) {
    case "SET_POSITION":
      return { ...state, position: action.payload };
    case "SET_ROTATION":
      return { ...state, currentRotation: action.payload };
    case "SET_MOTION":
      return { ...state, currentMotion: action.payload };
    case "SET_HEARTBEAT":
      return { ...state, heartBeatStamp: action.payload };
    case "SET_MOTION_TIMEOUT":
      return { ...state, motionTimeoutId: action.payload };
    case "SET_PULSE_TIMEOUT":
      return { ...state, pulseTimeoutId: action.payload };
    case "TOGGLE_TURNING_DIRECTION":
      return { ...state, isTurningRight: !state.isTurningRight };
    case "UPDATE_MOVEMENT": {
      const { distance, radius } = action.payload;
      const turnAmount = radius * (state.isTurningRight ? 1 : -1);
      const newRotation = state.currentRotation + turnAmount;
      const correctedAngle = newRotation - 90;
      const angleInRadians = (correctedAngle * Math.PI) / 180;
      const stepDistance = (distance / 1000) * state.scale;

      let newX = state.position.x + stepDistance * Math.cos(angleInRadians);
      let newY = state.position.y + stepDistance * Math.sin(angleInRadians);

      // Wrap around screen edges
      if (newX < 0) newX = window.innerWidth;
      if (newX > window.innerWidth) newX = 0;
      if (newY < 0) newY = window.innerHeight;
      if (newY > window.innerHeight) newY = 0;

      return {
        ...state,
        position: { x: newX, y: newY },
        currentRotation: newRotation,
      };
    }
    case "INITIALIZE_SCALE":
      return { ...state, scale: action.payload };
    default:
      return state;
  }
}

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

const PulseCircle = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: -96px;
  left: -96px;
  width: 192px;
  height: 192px;
  border-radius: 50%;
  border: 16px solid orange;
  background: transparent;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ${pulse} 2s ease-in-out infinite;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

function Bug({
  guid,
  variant,
  freeToMove = false,
  scaleOverride,
  xOverride,
  yOverride,
  rotationOverride,
  onMovementChange,
  forcedMotion,
  BodyPartDecorator,
}: BugProps) {
  const config = require(`./variants/${variant}/bugConfig.json`);

  const initialState: BugState = {
    position: {
      x:
        xOverride !== undefined ? xOverride : Math.random() * window.innerWidth,
      y:
        yOverride !== undefined
          ? yOverride
          : Math.random() * window.innerHeight,
    },
    currentRotation:
      rotationOverride !== undefined ? rotationOverride : Math.random() * 360,
    currentMotion: "",
    heartBeatStamp: "",
    motionTimeoutId: null,
    pulseTimeoutId: null,
    isTurningRight: Math.random() < 0.5,
    scale:
      scaleOverride !== undefined
        ? scaleOverride
        : config.minScale + Math.random() * (config.maxScale - config.minScale),
  };

  const [state, dispatch] = useReducer(bugReducer, initialState);
  const [isHovered, setIsHovered] = useState(false);

  const startPulse = useCallback(() => {
    const pulse = () => {
      dispatch({ type: "SET_HEARTBEAT", payload: new Date().toISOString() });
      const timeoutId = setTimeout(pulse, 36);
      dispatch({ type: "SET_PULSE_TIMEOUT", payload: timeoutId });
    };
    pulse();
  }, []);

  const stopPulse = useCallback(() => {
    if (state.pulseTimeoutId) {
      clearTimeout(state.pulseTimeoutId);
      dispatch({ type: "SET_PULSE_TIMEOUT", payload: null });
    }
  }, [state.pulseTimeoutId]);

  const selectRandomMotion = useCallback(() => {
    const motions = config.motion.filter((m: any) => !m.hoverOnly);
    let selectedMotion;

    if (freeToMove) {
      selectedMotion = motions[Math.floor(Math.random() * motions.length)];
    } else {
      selectedMotion =
        motions.find((m: any) => m.name === "wait") || motions[0];
    }

    const duration = Math.floor(
      Math.random() *
        (selectedMotion.maxDuration - selectedMotion.minDuration) +
        selectedMotion.minDuration
    );

    dispatch({ type: "SET_MOTION", payload: selectedMotion.name });
    return duration;
  }, [config.motion, freeToMove]);

  useEffect(() => {
    if (
      state.heartBeatStamp &&
      state.currentMotion &&
      state.currentMotion !== "wait"
    ) {
      const currentMotionConfig = config.motion.find(
        (m: any) => m.name === state.currentMotion
      );
      if (currentMotionConfig?.distance) {
        if (Math.random() < 0.09) {
          dispatch({ type: "TOGGLE_TURNING_DIRECTION" });
        }

        dispatch({
          type: "UPDATE_MOVEMENT",
          payload: {
            distance: currentMotionConfig.distance,
            radius: currentMotionConfig.radius || 0,
          },
        });
      }
    }
  }, [state.heartBeatStamp, state.currentMotion, config.motion]);

  useEffect(() => {
    if (state.currentMotion && state.currentMotion !== "wait") {
      if (!state.pulseTimeoutId) {
        onMovementChange?.(true, guid);
        startPulse();
      }
    } else {
      onMovementChange?.(false, guid);
      stopPulse();
    }
  }, [
    state.currentMotion,
    state.pulseTimeoutId,
    onMovementChange,
    startPulse,
    stopPulse,
    guid,
  ]);

  useEffect(() => {
    if (!state.motionTimeoutId && !forcedMotion) {
      const startRandomMotion = () => {
        const duration = selectRandomMotion();
        const timeoutId = setTimeout(startRandomMotion, duration);
        dispatch({ type: "SET_MOTION_TIMEOUT", payload: timeoutId });
      };
      startRandomMotion();
    }

    return () => {
      if (state.motionTimeoutId) {
        clearTimeout(state.motionTimeoutId);
      }
    };
  }, [state.motionTimeoutId, selectRandomMotion, forcedMotion]);

  useEffect(() => {
    if (forcedMotion) {
      if (state.motionTimeoutId) {
        clearTimeout(state.motionTimeoutId);
        dispatch({ type: "SET_MOTION_TIMEOUT", payload: null });
      }
      dispatch({ type: "SET_MOTION", payload: forcedMotion });
    } else if (!state.motionTimeoutId) {
      selectRandomMotion();
    }
  }, [forcedMotion, state.motionTimeoutId, selectRandomMotion]);

  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
    if (hovered && !forcedMotion) {
      const runMotion = config.motion.find((m: any) => m.name === "run");
      if (runMotion) {
        const duration = Math.floor(
          Math.random() * 
          (runMotion.maxDuration - runMotion.minDuration) + 
          runMotion.minDuration
        );
        dispatch({ type: "SET_MOTION", payload: "run" });
        
        if (state.motionTimeoutId) {
          clearTimeout(state.motionTimeoutId);
        }
        const timeoutId = setTimeout(() => {
          selectRandomMotion();
        }, duration);
        dispatch({ type: "SET_MOTION_TIMEOUT", payload: timeoutId });
      }
    }
  }, [forcedMotion, config.motion, selectRandomMotion, state.motionTimeoutId]);

  return (
    <div
      style={{
        position: "absolute",
        left: state.position.x,
        top: state.position.y,
        transform: `rotate(${state.currentRotation}deg) scale(${state.scale})`,
        transformOrigin: "center center",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {isHovered && !BodyPartDecorator && <PulseCircle $isVisible={isHovered} />}
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
              increments={part.increments}
              currentMotion={state.currentMotion}
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
                part.motion.includes(state.currentMotion)
                  ? state.heartBeatStamp
                  : ""
              }
              minAngle={part.minAngle}
              maxAngle={part.maxAngle}
              increments={part.increments}
              currentMotion={state.currentMotion}
              startPositive={part.startPositive}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Bug;
