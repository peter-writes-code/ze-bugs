import React from "react";
import { Container } from "@mui/material";
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
