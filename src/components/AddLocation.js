import React, { useState } from 'react';
import { addLocation } from '../services/api';

const AddLocation = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addLocation({ code });
      setMessage(result.message);
    } catch (error) {
      setMessage('Error adding location');
    }
  };

  return (
    <div>
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code (e.g., 1A24A)" required />
        <button type="submit">Add Location</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddLocation;
