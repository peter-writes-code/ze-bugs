import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BugAnatomy from '../../components/bug/BugAnatomy';
import Bug from '../../components/bug';

function Anatomy() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Anatomy Page
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/')}
        sx={{ mr: 2 }}
      >
        Back to Home
      </Button>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}>
        <BugAnatomy variant="carabid" scale={0.64} />
      </div>
      <Bug variant="carabid" scale={0.08} />
      </Container>
  );
}

export default Anatomy;
