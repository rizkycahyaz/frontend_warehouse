import axios from 'axios';

const baseURL = 'http://localhost:3000/api/auth';

// LOGIN API
const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/login`, credentials);
    const token = response.data.token; // Assuming the server returns a token
  localStorage.setItem('token', token); // Store the token in localStorage
    return response.data;
  } catch (error) {
    throw new Error('Error during login');
  }
};

// REGISTER API
const register = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/register`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Error during registration');
  }
};

export { login, register };
