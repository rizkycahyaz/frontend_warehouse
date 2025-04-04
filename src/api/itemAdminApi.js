import axios from 'axios';

// Instance untuk API Admin Items
const adminItemApi = axios.create({
  baseURL: 'http://localhost:3000/api/admin/items', // Base URL untuk API admin items
});

// Fungsi untuk mengambil semua item admin
const getAdminItems = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      throw new Error('You must be logged in to access this data.');
    }

    const response = await adminItemApi.get('/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      console.warn('Unexpected response format:', response);
      return []; // Return an empty array if data format is unexpected
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching admin items:', error);
    throw error.response ? error.response.data : new Error('Error fetching admin items');
  }
};

// Fungsi untuk menambahkan item baru
// const addItem = async (item) => {
//   try {
//     const token = localStorage.getItem('token'); // Pastikan token digunakan untuk setiap request
//     if (!token) {
//       throw new Error('No token found');
//     }

//     const response = await adminItemApi.post('/add', item, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding item:', error.message);
//     throw new Error('Error adding item');
//   }
// };

// const addItem = async (newItem) => {
//   await axios.post('http://localhost:3000/api/items/create', newItem);
// };

const addItem = async (formData) => {
  return await axios.post('http://localhost:3000/api/items/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Fungsi untuk memperbarui item
const updateItem = async (id, updatedItem) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await adminItemApi.put(`/${id}`, updatedItem, {
      headers: { Authorization: `Bearer ${token}` },
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error.message);
    throw new Error('Error updating item');
  }
};

// Fungsi untuk menghapus item
// const deleteItem = async (lotBatchNo) => {
//   try {
//     const token = localStorage.getItem('token'); // Ambil token dari localStorage
//     if (!token) {
//       throw new Error('No token found'); // Pastikan token ada
//     }

//     const response = await adminItemApi.delete(`/delete/${lotBatchNo}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Sertakan token dalam header
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting item:", error.response || error.message);
//     throw new Error("Error deleting item");
//   }
// };

const deleteItem = async (lotBatchNo) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token missing');

    const response = await axios.delete(`http://localhost:3000/api/items/delete/${lotBatchNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error.message);
    throw new Error('Error deleting item');
  }
};

const getAllLocations = async () => {
  const response = await axios.get('http://localhost:3000/api/locations'); // pastikan '/api/locations'
  return response.data;
};

const getLocations = async () => {
  try {
    // Menggunakan endpoint yang baru: /api/locations/all
    const response = await axios.get('http://localhost:3000/api/locations/all');
    if (response.data.status) {
      return response.data.data; // Mengembalikan data lokasi
    } else {
      console.warn('Failed to fetch locations:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching locations:', error.message);
    throw new Error('Error fetching locations');
  }
};
// Fungsi untuk mengambil item berdasarkan ID
const getItemById = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token
    if (!token) throw new Error('Token missing');

    console.log(`Fetching item from: http://localhost:3000/api/items/detail/${id}`);
    const response = await axios.get(`http://localhost:3000/api/items/detail/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Response:', response.data);
    return response.data; // Data item
  } catch (error) {
    console.error('Error fetching item by ID:', error.message);
    throw new Error('Error fetching item by ID');
  }
};

// Jangan lupa untuk mengekspor fungsi ini
export { getItemById, getAdminItems, addItem, updateItem, deleteItem, getAllLocations, getLocations };
