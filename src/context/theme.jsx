import { createTheme } from "@mui/material";

const themeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#1a1a1a', // Dark gray
      },
      secondary: {
        main: '#ff5722', // Orange
      },
      info: {
        main: '#2196f3', // Blue
      },
      warning: {
        main: '#ffc107', // Yellow
      },
      error: {
        main: '#f44336', // Red
      },
      success: {
        main: '#4caf50', // Green
      },
    },
    shape: {
      borderRadius: 8, // Decreased borderRadius
    },
    spacing: 4, // Decreased spacing
    overrides: {
      MuiAppBar: {
        colorInherit: {
          backgroundColor: '#1a1a1a', // Dark gray
          color: '#fff', // White
        },
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif', // Updated font family
      h1: {
        fontWeight: 600, // Increased font weight
        fontSize: '2.5rem', // Decreased font size
        lineHeight: 1.2, // Adjusted line height
      },
      h2: {
        fontWeight: 500, // Adjusted font weight
        fontSize: '2rem', // Decreased font size
        lineHeight: 1.2, // Adjusted line height
      },
      h3: {
        fontWeight: 500, // Adjusted font weight
        fontSize: '1.5rem', // Decreased font size
        lineHeight: 1.2, // Adjusted line height
      },
    },
  };

const theme = createTheme(themeOptions);
export default theme;
