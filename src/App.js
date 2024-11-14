import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import Login from './pages/Logine';
import AddItem from './pages/AddItems';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AuthProvider, { useAuthContext } from './context/authContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<SearchPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Admin routes with PrivateRoute and AdminLayout */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="add-item" element={<AddItem />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// PrivateRoute component for handling authentication logic
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
