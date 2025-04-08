import React from 'react';
import Bug from './index';
import BodyPartAnatomy from './BodyPartAnatomy';

interface BugAnatomyProps {
  variant: string;
}

function BugAnatomy({ variant }: BugAnatomyProps) {
  return (
    <div 
      style={{ 
        position: 'relative',
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <Bug 
        variant={variant}
        BodyPartDecorator={BodyPartAnatomy}
        scaleOverride={5}
        xOverride={0}
        yOverride={0}
        rotationOverride={0}
      />
      <div
        style={{
          position: 'absolute',
          top: -5,
          left: -5,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'orange',
        }}
      />
    </div>
  );
}

export default BugAnatomy;
