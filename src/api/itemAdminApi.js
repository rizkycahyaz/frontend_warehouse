import axios from 'axios';

// Instance untuk API Admin Items
const adminItemApi = axios.create({
  baseURL: 'http://localhost:3000/api/admin/items', // Base URL untuk API admin items
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mengambil semua item admin
const getAdminItems = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    if (!token) {
      throw new Error('No token found'); // Jika token tidak ditemukan
    }

    const response = await adminItemApi.get('/', {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin items:', error.message);
    throw new Error('Error fetching admin items');
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

const addItem = async (newItem) => {
  await axios.post('http://localhost:3000/api/items/create', newItem);
};

// Fungsi untuk memperbarui item
const updateItem = async (id, updatedItem) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await adminItemApi.put(`/update/${id}`, updatedItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error.message);
    throw new Error('Error updating item');
  }
};

// Fungsi untuk menghapus item
const deleteItem = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await adminItemApi.delete(`/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export { getAdminItems, addItem, updateItem, deleteItem, getAllLocations };
