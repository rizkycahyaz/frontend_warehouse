import React, { useState, useEffect } from 'react';
import { deleteItem, getAdminItems } from '../api/itemAdminApi';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAdminItems();
        console.log("Data fetched:", response); // Log respons
        const data = response; // Pastikan ini sesuai dengan data dari backend
        console.log("Data structure:", data[0]); // Log item pertama jika ada
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id); // Pastikan id sesuai dengan `lot_batch_no` di database
      setItems(items.filter(item => item.lot_batch_no !== id));
    } catch (error) {
      console.error(error);
      alert(error.message); // Tampilkan pesan kesalahan
    }
  };
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/add-item">
        <button>Add New Item</button>
      </Link>
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Lot/Batch No</th>
            <th>Part No</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Location ID</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.lot_batch_no}>
                <td>{item.id}</td>
                <td>{item.lot_batch_no}</td>
                <td>{item.part_no}</td>
                <td>{item.description}</td>
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>{item.location_id}</td>
                <img
                      src={`http://localhost:3000/uploads/${item.photo}`}
                      alt="Item"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                <td>
                  <button onClick={() => handleDelete(item.lot_batch_no)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
