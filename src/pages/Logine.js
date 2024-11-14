import React, { useState } from "react";
import { login as loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../assets/logo.png"; // Pastikan path sesuai lokasi gambar logo Anda

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginApi({ email, password });
      login(token);
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="center"
      >
        {/* Bagian Ilustrasi Ponsel */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
          p={4}
        >
          <img src={logo} alt="Logo" style={{ width: 200, marginTop: 20 }} />{" "}
          {/* Gambar logo diperbesar */}
        </Box>

        {/* Bagian Form Login */}
        <Box
          flex={1}
          component={Paper}
          elevation={6}
          p={4}
          borderRadius={2}
          bgcolor="#007bff"
          color="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: 20 }}
          >
            <TextField
              label="Username"
              type="text"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "white", borderRadius: 5 },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "white", borderRadius: 5 },
              }}
            />

            {/* Tombol Back */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/")}
              style={{
                marginTop: 10,
                borderColor: "white",
                color: "white",
                borderRadius: 20,
              }}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>

            {/* Tombol Submit */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                marginTop: 20,
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: 20,
              }}
              startIcon={<SendIcon />}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
