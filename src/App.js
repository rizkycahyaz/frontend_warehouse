import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/adminDasboard';
import AuthProvider from './context/authContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {isAuthenticated && <Route path="/admin" element={<AdminDashboard />} />}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
