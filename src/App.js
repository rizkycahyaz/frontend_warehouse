import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Logine';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AuthProvider, { useAuthContext } from './context/authContext'; // Import AuthProvider and the hook
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider> {/* Ensure this wraps the Router */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Use a PrivateRoute component to check authentication */}
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

// Create a PrivateRoute component to handle authentication logic
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext(); // Now this works inside a child component of AuthProvider

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
