import React from 'react';
import { AppBar, Toolbar, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBugVariant } from '../../contexts/BugVariantContext';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedVariant, setSelectedVariant } = useBugVariant();

  const routes = [
    { path: '/anatomy', label: 'Anatomy' },
    { path: '/motion', label: 'Motion' },
    { path: '/animate', label: 'Animate' },
    { path: '/performance', label: 'Performance' },
  ];

  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        pointerEvents: "none",
        backgroundColor: 'rgba(255, 252, 235, 0.84)'
      }}
    >
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
            pointerEvents: "auto"
          }}
          onClick={() => navigate('/')}
        />
        
        {routes.map((route) => (
          <Button
            key={route.path}
            color="primary"
            variant={location.pathname === route.path ? "contained" : "text"}
            onClick={() => navigate(route.path)}
            sx={{ mr: 2, pointerEvents: "auto" }}
          >
            {route.label}
          </Button>
        ))}

        <Box sx={{ flexGrow: 1 }} />
        
        <FormControl sx={{ minWidth: 120, pointerEvents: "auto" }}>
          <InputLabel id="bug-variant-label">Bug Variant</InputLabel>
          <Select
            labelId="bug-variant-label"
            value={selectedVariant}
            label="Bug Variant"
            onChange={(e) => setSelectedVariant(e.target.value as 'carabid' | 'fireAnt')}
          >
            <MenuItem value="carabid">Carabid Beetle</MenuItem>
            <MenuItem value="fireAnt">Fire Ant</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
