import axios from 'axios';

const baseURL = 'http://localhost:3000/api/auth';

const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching location');
  }
};

export { login };
