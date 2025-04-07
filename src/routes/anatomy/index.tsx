import React from "react";
import { Container } from "@mui/material";
import BugAnatomy from "../../components/bug/BugAnatomy";
import Bug from "../../components/bug";
import Header from "../../components/Header";

function Anatomy() {
  return (
    <>
      <Header />
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
          <BugAnatomy variant="carabid" scale={0.64} />
        </div>
        <Bug variant="carabid" scale={0.08} />
      </Container>
    </>
  );
}

export default Anatomy;
