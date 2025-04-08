import React, { useState, useEffect, useCallback } from "react";
import { Container, Slider, Typography, Box } from "@mui/material";
import Bug from "../../components/bug";
import Header from "../../components/Header";

interface BugInstance {
  id: number;
}

function Performance() {
  const [numberOfBugs, setNumberOfBugs] = useState<number>(() => 
    Math.floor(Math.random() * (33 - 3 + 1)) + 3
  );
  const [bugs, setBugs] = useState<BugInstance[]>([]);
  const [numberOfBugsMoving, setNumberOfBugsMoving] = useState(0);
  const MOVING_BUGS_CAP = 12;

  const handleMovementChange = (isMoving: boolean) => {
    setNumberOfBugsMoving(prev => {
      const newCount = isMoving ? prev + 1 : prev - 1;
      return Math.max(0, newCount); // Ensure we don't go below 0
    });
  };

  const generateBugs = useCallback(() => {
    const newBugs: BugInstance[] = [];
    for (let i = 0; i < numberOfBugs; i++) {
      newBugs.push({ id: i });
    }
    setBugs(newBugs);
    setNumberOfBugsMoving(0); // Reset moving bugs count
  }, [numberOfBugs]);

  useEffect(() => {
    generateBugs();
  }, [generateBugs]);

  useEffect(() => {
    window.addEventListener("resize", generateBugs);
    return () => {
      window.removeEventListener("resize", generateBugs);
    };
  }, [generateBugs]);

  return (
    <>
      <Header />
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
          pointerEvents: "none",
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
            Moving Bugs: {numberOfBugsMoving}/{MOVING_BUGS_CAP}
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
            variant="carabid"
            freeToMove={numberOfBugsMoving < MOVING_BUGS_CAP}
            onMovementChange={handleMovementChange}
          />
        ))}
      </Container>
    </>
  );
}

export default Performance;
