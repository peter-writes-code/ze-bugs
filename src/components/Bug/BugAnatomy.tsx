import React from 'react';
import Bug from './index';
import BodyPartAnatomy from './BodyPartAnatomy';
import { v4 as uuidv4 } from 'uuid';

interface BugAnatomyProps {
  variant: string;
}

function BugAnatomy({ variant }: BugAnatomyProps) {
  const config = require(`./variants/${variant}/bugConfig.json`);

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
        guid={uuidv4()}
        variant={variant}
        BodyPartDecorator={BodyPartAnatomy}
        scaleOverride={config.anatomyScale}
        xOverride={0}
        yOverride={0}
        rotationOverride={0}
        forcedMotion="wait"
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
