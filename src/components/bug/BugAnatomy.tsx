import React from 'react';
import Bug from './index';
import BodyPartAnatomy from './BodyPartAnatomy';

interface BugAnatomyProps {
  variant: string;
  scale?: number;
}

function BugAnatomy({ variant, scale = 1 }: BugAnatomyProps) {
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
        scale={scale} 
        BodyPartDecorator={BodyPartAnatomy}
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
