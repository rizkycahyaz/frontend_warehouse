import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles/Layout.css';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="layout map-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* AppBar Section */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="white" style={{ textDecoration: 'none' }} component={RouterLink} to="/" sx={{ flexGrow: 1 }}>
              Warehouse Locator
            </Typography>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        {/* Main content section */}
        <main style={{ flexGrow: 1, padding: 0 }}>{children}</main>
        {/* Footer */}
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '10px 0',
            color: '#3f51b5', // Fixed the color code
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // Added shadow
          }}
        >
          <Typography variant="body2">&copy; IT PENS 2024 | Gudang International</Typography>
        </div>
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
