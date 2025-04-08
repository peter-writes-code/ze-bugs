import { Container, Box, Typography } from "@mui/material";
import Bug from "../../components/bug";
import Header from "../../components/Header";

function Animate() {
  const variant = "carabid";
  const config = require(`../../components/bug/variants/${variant}/bugConfig.json`);

  return (
    <>
      <Header />
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
        <Bug
          variant="carabid"
          freeToMove
          xOverride={window.innerWidth / 2}
          yOverride={window.innerHeight / 2}
        />
        <Box sx={{ mb: 2, marginTop: 8 }}>
          <Typography variant="h5">Meet {config.variantNickName}, the {config.variantName}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default Animate;
