import React, { useState } from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting search for code:', code);
    onSearch(code); // Pass the code to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code (e.g., 1A24A)" required />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
