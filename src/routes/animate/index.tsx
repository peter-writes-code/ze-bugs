import { Container, Box, Typography } from "@mui/material";
import Bug from "../../components/Bug";
import { v4 as uuidv4 } from 'uuid';
import { useBugVariant } from '../../contexts/BugVariantContext';

function Animate() {
  const { selectedVariant } = useBugVariant();
  const config = require(`../../components/Bug/variants/${selectedVariant}/bugConfig.json`);

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
      <Bug
        guid={uuidv4()}
        variant={selectedVariant}
        freeToMove
        xOverride={window.innerWidth / 2}
        yOverride={window.innerHeight / 2}
      />
      <Box sx={{ mb: 2, marginTop: 8 }}>
        <Typography variant="h5">Meet {config.variantNickName}, the {config.variantName}</Typography>
      </Box>
    </Container>
  );
}

export default Animate;
