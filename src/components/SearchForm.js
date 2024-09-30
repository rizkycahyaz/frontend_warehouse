import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(code);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter item code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
