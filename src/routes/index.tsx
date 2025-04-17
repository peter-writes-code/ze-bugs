import React from "react";
import { Container, Typography, Link, Paper, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function Home() {

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: 8,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          px: 3,
          mt: 10,
          mb: 5
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            color: "text.primary",
            mb: 2,
          }}
        >
          Ze Bugs is a an experimental open source React workshop by Peter
          Gorgenyi. The purpose of this project is to push the boundaries of advanced React
          patterns.
        </Typography>
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          sx={{
            color: "text.primary",
          }}
        >
          Have fun with us! Feel free to clone or fork the repo and explore the code for
          yourself. Check back for the latests developments.
        </Typography>
        <Link
          href="https://github.com/peter-writes-code/ze-bugs"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
            mt: 3,
          }}
        >
          <GitHubIcon fontSize="small" />
          View on GitHub
        </Link>
        <Typography variant="h5" component="h1" sx={{ mt: 5 }}>
          Bug Report
        </Typography>
        <Paper sx={{ p: 2, mt: 4 }}>
          <Typography variant="subtitle2">April 16, 2025</Typography>
          <Typography variant="h6" gutterBottom>
            Meet Frank, the Fire Ant
          </Typography>
          <Typography variant="body1">
            An example of a simple model design scaling in variation.
            Sort of a strategy pattern.
            <br />
            <br />
            Considering next steps: collision detection? Let's make bugs
            interact with each other.
          </Typography>
        </Paper>{" "}
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="subtitle2">April 14, 2025</Typography>
          <Typography variant="h6" gutterBottom>
            Optimization and hover behavior
          </Typography>
          <Typography variant="body1">
            Refactored the bug component to cleaner patterns.
            <br />
            <br />
            Also try hovering over Carl now. He might make a run for it.
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="subtitle2">April 8, 2025</Typography>
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
  );
}

export default Home;
