// src/context/authContext.js
import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

// Create the AuthContext
export const AuthContext = createContext();

// Create a custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the app and provide auth state
const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
