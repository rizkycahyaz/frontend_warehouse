import React, { useState } from 'react';
import { tambahLokasi } from '../services/api';

const TambahLokasi = () => {
  const [code, setCode] = useState(''); // Input untuk kode lengkap
  const [latitude, setLatitude] = useState(''); // Latitude
  const [longitude, setLongitude] = useState(''); // Longitude
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await tambahLokasi({
        code,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      setMessage(result.message);
    } catch (error) {
      setMessage('Error adding location');
    }
  };

  return (
    <div>
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code (e.g., 1A25J)" required />
        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Enter latitude (e.g., -7.204095710211239)" required />
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Enter longitude (e.g., 112.74219124101411)" required />
        <button type="submit">Add Location</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TambahLokasi;
