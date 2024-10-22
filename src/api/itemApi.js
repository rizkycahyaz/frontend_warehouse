import axios from "axios";

const baseURL = "http://localhost:3000/api/items"; // Ini untuk pengguna biasa

const getItems = async () => {
  try {
    const response = await axios.get(baseURL); // Tidak perlu token
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error.message || error);
    throw new Error('Error fetching items');
  }
};

export { getItems };
