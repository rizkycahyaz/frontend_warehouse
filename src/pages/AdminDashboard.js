import React, { useState, useEffect } from 'react';
import { deleteItem, getAdminItems } from '../api/itemAdminApi';
import ItemList from '../components/ItemList';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAdminItems();
        console.log(data);
        setItems(Array.isArray(data) ? data : []); // Pastikan data adalah array
      } catch (error) {
        console.error(error);
        alert(error.message); // Tampilkan pesan kesalahan kepada pengguna
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ItemList items={items} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;
