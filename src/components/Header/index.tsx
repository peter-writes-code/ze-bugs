import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: '/anatomy', label: 'Anatomy' },
    { path: '/animate', label: 'Animate' },
    { path: '/performance', label: 'Performance' },
  ];

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <Box 
          component="img"
          src="/asset/logo/ze_bugs.png"
          alt="Ze-Bugs Logo"
          sx={{ 
            height: 144, 
            cursor: 'pointer',
            mr: 4,
            filter: `
              drop-shadow(3px 1px 1px white)
              drop-shadow(-3px 1px 1px white)
              drop-shadow(1px 3px 1px white)
              drop-shadow(1px -3px 1px white)
            `,
          }}
          onClick={() => navigate('/')}
        />
        
        {routes.map((route) => (
          <Button
            key={route.path}
            color="primary"
            variant={location.pathname === route.path ? "contained" : "text"}
            onClick={() => navigate(route.path)}
            sx={{ mr: 2 }}
          >
            {route.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
