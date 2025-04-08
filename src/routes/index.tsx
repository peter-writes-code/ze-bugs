import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            px: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
              color: "text.primary",
            }}
          >
            Ze Bugs is a an experimental open source React application with the
            ambition to explore patterns and challenges of modern web
            application development.
          </Typography>
          <Typography
            variant="h6"
            component="h1"
            gutterBottom
            sx={{
              color: "text.primary",
            }}
          >
            Feel free to clone or fork the code and explore for yourself. Check
            back for latests developments.
          </Typography>
          <Paper sx={{ p: 2, mt: 5 }}>
            <Typography variant="subtitle1">April 8, 2025</Typography>
            <Typography variant="h6" gutterBottom>
              Carl moves!
            </Typography>
            <Typography variant="body1">
              Carl, the Carabid Beetle is now autonomously moving around the
              screen. What's next? Maybe mouse interactions?
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default Home;
