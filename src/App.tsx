import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Ze-Bugs
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
}

export default App;