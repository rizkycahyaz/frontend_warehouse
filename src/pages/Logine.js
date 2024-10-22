import React, { useState } from 'react';
import { login as loginApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'; // Use useAuthContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthContext(); // Get the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginApi({ email, password });
      login(token); // Call the login function with the token
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
