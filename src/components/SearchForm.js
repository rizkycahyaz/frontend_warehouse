import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted with:', input); // Logging search input
    onSearch(input); // Pastikan fungsi onSearch dipanggil dengan nilai input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter lot batch number" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
