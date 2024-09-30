import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/locations';

const searchLocation = async (code) => {
  try {
    const response = await axios.post('/search', { code });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching location');
  }
};

const addLocation = async (location) => {
  try {
    const response = await axios.post('/add', location);
    return response.data;
  } catch (error) {
    console.error('Error adding location:', error);
    throw new Error('Error adding location');
  }
};

export { searchLocation, addLocation };
