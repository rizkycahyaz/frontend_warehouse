import axios from 'axios';

// Instance untuk API Admin Items
const adminItemApi = axios.create({
  baseURL: 'http://localhost:3000/api/admin/items' // Base URL untuk API admin items
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

export { getAdminItems, addItem, updateItem, deleteItem, getAllLocations };
