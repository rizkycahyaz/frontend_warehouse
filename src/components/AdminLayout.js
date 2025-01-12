import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles/Layout.css';
import { useAuthContext } from '../context/authContext'; // Assuming you have an AuthContext
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

const AdminLayout = ({ children }) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Arahkan ke halaman "/" setelah logout
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="layout map-wrapper">
        {/* AppBar Section */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="white" style={{ textDecoration: 'none' }} component={RouterLink} to="/admin" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {/* Main content section without padding or margin between AppBar and content */}
        <main style={{ flexGrow: 1, padding: 0 }}>{children}</main>
        {/* Footer */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#3f51b5',
            padding: '1px 0',
            color: 'white',
            textAlign: 'center',
            position: 'fixed',
            bottom: '0',
          }}
        >
          <Typography variant="body2">&copy; IT PENS 2024 | Gudang International</Typography>
        </div>
        <Outlet /> {/* This will render the nested routes (e.g., AdminDashboard, AddItem) */}
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
