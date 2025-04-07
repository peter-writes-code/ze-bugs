import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF8C42',      // Branding orange (beetle orange)
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFD166',      // Warm yellow (logo letters)
      contrastText: '#333',
    },
    background: {
      default: '#FFF8E7',    // Soft warm beige
      paper: '#FFFFFF',
    },
    text: {
      primary: '#5D3A00',    // Deep brown (distinguished, readable)
      secondary: '#A65E2E',  // Mid-orange-brown (subtle but in theme)
    },
    divider: '#E0C5A1',
  },
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif`,
    h1: {
      fontWeight: 700,
      color: '#FF8C42',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      color: '#A65E2E',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '-0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#FF8C42', // Matches branding bug
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFD166',  // Nav has contrast
          color: '#5D3A00',            // readable, warm brown
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          padding: '8px 16px',
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme;
