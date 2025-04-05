import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Ze-Bugs
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/anatomy')}
        sx={{ mr: 2 }}
      >
        Go to Anatomy
      </Button>
    </Container>
  );
}

export default Home;