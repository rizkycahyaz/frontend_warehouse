import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../api/itemApi';
import ItemList from '../components/itemList';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
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