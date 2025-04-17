import React from "react";
import { Container } from "@mui/material";
import Bug from "../../components/Bug";
import { v4 as uuidv4 } from 'uuid';
import { useBugVariant } from '../../contexts/BugVariantContext';
import BugAnatomy from "../../components/Bug/BugAnatomy";

function Anatomy() {
  const { selectedVariant } = useBugVariant();

  return (
    <Container
      maxWidth={false}
      sx={{
        pt: 8,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BugAnatomy
        variant={selectedVariant}
      />
    </Container>
  );
}

export default Anatomy;
