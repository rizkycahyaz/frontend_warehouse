import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import AdminDashboard from './pages/adminDasboard';
import AuthProvider from './context/authContext';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {isAuthenticated && <Route path="/admin" element={<AdminDashboard />} />}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;