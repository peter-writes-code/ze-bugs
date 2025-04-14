import React, { useEffect, useReducer } from "react";

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
  currentMotion: string;
  increments: Record<string, number>;
  startPositive: boolean;
}

interface BodyPartState {
  angle: number;
  isIncreasing: boolean;
}

type BodyPartAction = 
  | { type: 'SET_ANGLE'; payload: (prevAngle: number) => number }
  | { type: 'SET_DIRECTION'; payload: boolean };

function bodyPartReducer(state: BodyPartState, action: BodyPartAction): BodyPartState {
  switch (action.type) {
    case 'SET_ANGLE':
      return { ...state, angle: action.payload(state.angle) };
    case 'SET_DIRECTION':
      return { ...state, isIncreasing: action.payload };
    default:
      return state;
  }
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
  currentMotion,
  increments,
  startPositive,
}: BodyPartProps) {
  const initialAngle = (minAngle + maxAngle) / 2;
  const [state, dispatch] = useReducer(bodyPartReducer, {
    angle: initialAngle,
    isIncreasing: startPositive
  });

  useEffect(() => {
    if (heartBeatStamp) {
      const increment = increments[currentMotion] || 0;
      
      dispatch({ type: 'SET_ANGLE', payload: (prevAngle) => {
        if (state.isIncreasing) {
          const newAngle = prevAngle + increment;
          if (newAngle >= maxAngle) {
            dispatch({ type: 'SET_DIRECTION', payload: false });
            return maxAngle;
          }
          return newAngle;
        } else {
          const newAngle = prevAngle - increment;
          if (newAngle <= minAngle) {
            dispatch({ type: 'SET_DIRECTION', payload: true });
            return minAngle;
          }
          return newAngle;
        }
      }});
    }
  }, [heartBeatStamp, increments, currentMotion, state.isIncreasing, maxAngle, minAngle]);

  const currentAngle = angleOverride !== undefined ? angleOverride : state.angle;

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
}, areEqual);

export default BodyPart;
