import React, { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import Bug from "../../components/bug";
import Header from "../../components/Header";

interface BugInstance {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

function Performance() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [bugs, setBugs] = useState<BugInstance[]>([]);

  useEffect(() => {
    const generateBugs = () => {
      const newBugs: BugInstance[] = [];
      for (let i = 0; i < 196; i++) {
        newBugs.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0.056 + Math.random() * (0.064 - 0.056),
        });
      }
      setBugs(newBugs);
    };

    generateBugs();
    window.addEventListener("resize", generateBugs);

    return () => {
      window.removeEventListener("resize", generateBugs);
    };
  }, []);

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
        }}
      >
        <Button
          variant="contained"
          color={isAnimated ? "error" : "success"}
          onClick={() => setIsAnimated(!isAnimated)}
          sx={{
            zIndex: 1,
          }}
        >
          {isAnimated ? "Turn Off Animation" : "Turn On Animation"}
        </Button>

        {bugs.map((bug) => (
          <div
            key={bug.id}
            style={{
              position: "absolute",
              left: bug.x,
              top: bug.y,
              transform: `rotate(${bug.rotation}deg)`,
            }}
          >
            <Bug variant="carabid" scale={bug.scale} heartBeat={isAnimated} />
          </div>
        ))}
      </Container>
    </>
  );
}

export default Performance;
