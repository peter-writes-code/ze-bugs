import React, { useState } from "react";
import { Button, Container, Box } from "@mui/material";
import Bug from "../../components/bug";
import Header from '../../components/Header';

function Animate() {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <>
      <Header />
      <Container 
        maxWidth={false} 
        sx={{ 
          pt: 8,
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Bug variant="carabid" scale={0.5} heartBeat={isAnimated} />
        <Box sx={{ mb: 2, marginTop: 8 }}>
          <Button
            variant="contained"
            color={isAnimated ? "error" : "success"}
            onClick={() => setIsAnimated(!isAnimated)}
          >
            {isAnimated ? "Turn Off Animation" : "Turn On Animation"}
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Animate;
