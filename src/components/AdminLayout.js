import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Paper } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles/Layout.css";
import { useAuthContext } from "../context/authContext"; // Assuming you have an AuthContext
import { Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f5f5f5",
    },
  },
});

const AdminLayout = ({ children }) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Arahkan ke halaman "/" setelah logout
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="layout map-wrapper">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="h6"
              color="white"
              style={{ textDecoration: "none" }}
              component={RouterLink}
              to="/admin"
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
            {/* <Button color="inherit" component={RouterLink} to="/">
              Go to Homepage
            </Button> */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main style={{ flexGrow: 1 }}>{children}</main>
        <Paper
          elevation={9}
          style={{ position: "fixed", bottom: 0, width: "100%" }}
        >
          <Typography variant="body2" align="center">
            &copy; IT PENS 2024 | Gudang International
          </Typography>
        </Paper>
        <Outlet />{" "}
        {/* This will render the nested routes (e.g., AdminDashboard, AddItem) */}
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
