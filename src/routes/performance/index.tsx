import { Container, Box, Typography, Slider } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import Bug from "../../components/Bug";
import { useBugVariant } from '../../contexts/BugVariantContext';

interface BugInstance {
  id: number;
}

function Performance() {
  const { selectedVariant } = useBugVariant();
  const [numberOfBugs, setNumberOfBugs] = useState<number>(() => 
    Math.floor(Math.random() * (33 - 3 + 1)) + 3
  );
  const [bugs, setBugs] = useState<BugInstance[]>([]);
  const [movingBugGuids, setMovingBugGuids] = useState<string[]>([]);
  const MOVING_BUGS_CAP = 12;

  const handleMovementChange = useCallback((isMoving: boolean, guid: string) => {
    setMovingBugGuids(prev => 
      !isMoving ? prev.filter(id => id !== guid)
      : prev.includes(guid) || prev.length >= MOVING_BUGS_CAP ? prev 
      : [...prev, guid]
    );
  }, [MOVING_BUGS_CAP]);

  const generateBugs = useCallback(() => {
    const newBugs: BugInstance[] = [];
    for (let i = 0; i < numberOfBugs; i++) {
      newBugs.push({ id: i });
    }
    setBugs(newBugs);
    setMovingBugGuids([]);
  }, [numberOfBugs]);

  useEffect(() => {
    generateBugs();
  }, [generateBugs]);

  return (
    <Container
      maxWidth={false}
      sx={{
        p: 0,
        overflow: "hidden",
        height: "100vh",
        pt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 1,
          zIndex: 1,
          boxShadow: 1,
          pointerEvents: "auto",
        }}
      >
        <Typography gutterBottom>
          Number of Bugs: {numberOfBugs}
        </Typography>
        <Typography gutterBottom>
          Moving Bugs: {movingBugGuids.length}/{MOVING_BUGS_CAP}
        </Typography>
        <Slider
          value={numberOfBugs}
          onChange={(_, value) => setNumberOfBugs(value as number)}
          min={4}
          max={64}
          valueLabelDisplay="auto"
          aria-labelledby="number-of-bugs-slider"
        />
      </Box>
      {bugs.map((bug) => (
        <Bug
          key={bug.id}
          guid={`bug-${bug.id}`}
          variant={selectedVariant}
          freeToMove={movingBugGuids.length < MOVING_BUGS_CAP}
          onMovementChange={handleMovementChange}
        />
      ))}
    </Container>
  );
}

export default Performance;
