import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles/Layout.css';
import { useAuthContext } from '../context/authContext'; // Assuming you have an AuthContext

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
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    };

    handleAuthChange();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    // Add any additional logout logic here, such as clearing local storage or redirecting
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="layout map-wrapper">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="white" style={{ textDecoration: 'none' }} component={RouterLink} to="/" sx={{ flexGrow: 1 }}>
              Warehouse Locator
            </Typography>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <main style={{ flexGrow: 1 }}>{children}</main>
        <Paper elevation={9} style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <Typography variant="body2" align="center">
            &copy; 2024 Warehouse Locator
          </Typography>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
