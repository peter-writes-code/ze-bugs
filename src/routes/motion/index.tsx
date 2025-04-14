import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Bug from "../../components/Bug";
import { v4 as uuidv4 } from 'uuid';

function Motion() {
  const variant = "carabid";
  const config = require(`../../components/Bug/variants/${variant}/bugConfig.json`);
  const [selectedMotion, setSelectedMotion] = useState<string>("wait");

  const handleMotionChange = (event: any) => {
    setSelectedMotion(event.target.value);
  };

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
      <FormControl sx={{ minWidth: 200, mb: 4 }}>
        <InputLabel id="motion-select-label">Motion</InputLabel>
        <Select
          labelId="motion-select-label"
          id="motion-select"
          value={selectedMotion}
          label="Motion"
          onChange={handleMotionChange}
        >
          {config.motion.map((motion: any) => (
            <MenuItem key={motion.name} value={motion.name}>
              {motion.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Bug
        guid={uuidv4()}
        variant="carabid"
        xOverride={window.innerWidth / 2}
        yOverride={window.innerHeight / 2}
        freeToMove
        forcedMotion={selectedMotion}
      />
    </Container>
  );
}

export default Motion;
