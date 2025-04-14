import React from "react";
import { Container } from "@mui/material";
import BugAnatomy from "../../components/Bug/BugAnatomy";

function Anatomy() {
  return (
    <Container maxWidth="sm">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          paddingTop: "240px",
          marginBottom: "120px",
        }}
      >
        <BugAnatomy variant="carabid" />
      </div>
    </Container>
  );
}

export default Anatomy;
