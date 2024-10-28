import React, { useState, useEffect } from 'react';
import { addItem, getAllLocations } from '../api/itemAdminApi'; // Mengganti ke addItem dan getLocations
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [lotBatchNo, setLotBatchNo] = useState('');
  const [partNo, setPartNo] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('');
  const [locationId, setLocationId] = useState(''); // Menyimpan location_id
  const [photo, setPhoto] = useState(null); // Untuk menyimpan file foto
  const [locations, setLocations] = useState([]); // Menyimpan daftar lokasi
  const navigate = useNavigate();

  // Ambil daftar lokasi dari backend saat komponen dimount
  const fetchLocations = async () => {
    try {
      const data = await getAllLocations();
      setLocations(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch locations');
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
        lotBatchNo,
        partNo,
        description,
        qty,
        unit,
        locationId,
    }
 // Kirim location_id ke backend

    try {
      await addItem(formData); // Menggunakan fungsi addItem
      navigate('/admin'); // Kembali ke dashboard setelah item ditambahkan
    } catch (error) {
      console.error(error);
      alert('Failed to add item');
    }
  };

  return (
    <div>
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Lot/Batch No:</label>
          <input
            type="text"
            value={lotBatchNo}
            onChange={(e) => setLotBatchNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Part No:</label>
          <input
            type="text"
            value={partNo}
            onChange={(e) => setPartNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description/Name:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Satuan/Unit:</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
        </div>
        <div>
      <label>Location:</label>
      <input
            type="text"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            required
          />
    </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])} // Mendapatkan file photo
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
