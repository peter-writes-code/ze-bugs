import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Header from '../components/Header';

function Home() {
  return (
    <>
      <Header />
      <Container 
        maxWidth={false} 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 4
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '600px',
            px: 3
          }}
        >
          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: 'text.primary'
            }}
          >
            Ze Bugs is a an experimental open source React application with the ambition to explore patterns
            and challenges of modern web application development.
          </Typography>
          <Typography 
            variant="h6" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: 'text.primary'
            }}
          >
            As well as bugs. We may learn about basic behaviors of insects so we can reproduce them.
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.6,
              mt: 2
            }}
          >
            The workshop is available on Youtube.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Home;
