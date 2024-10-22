import axios from 'axios';

// Instance untuk API Lokasi
const locationApi = axios.create({
  baseURL: 'http://localhost:3000/api/locations', // Base URL untuk API lokasi
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mencari lokasi berdasarkan kode
const searchLocation = async (code) => {
  try {
    const response = await locationApi.post('/search', { code });
    return response.data;
  } catch (error) {
    console.error('Error fetching location:', error.message);
    throw new Error('Error fetching location');
  }
};

// Fungsi untuk menambahkan lokasi baru
const addLocation = async (location) => {
  try {
    const response = await locationApi.post('/add', location);
    return response.data;
  } catch (error) {
    console.error('Error adding location:', error.message);
    throw new Error('Error adding location');
  }
};

export { searchLocation, addLocation };
