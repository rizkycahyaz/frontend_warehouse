import React, { useState } from 'react';
import SearchForm from './SearchForm';
import Map from './WarehouseMap';
import { searchLocation } from '../services/api';

const SearchPage = () => {
  const [locationData, setLocationData] = useState(null);
  const [searchCode, setSearchCode] = useState(''); // Track the code being searched
  const [error, setError] = useState('');

  const handleSearch = async (code) => {
    try {
      setError('');
      setSearchCode(code); // Save the search code
      const data = await searchLocation(code);
      if (data.status) {
        setLocationData(data.data); // Assuming this returns location data like { x: ..., y: ... }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch location');
    }
  };

  return (
    <div>
      <h2>Search for a Location</h2>
      <SearchForm onSearch={handleSearch} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Map location={locationData} code={searchCode} /> {/* Pass the location and the search code */}
    </div>
  );
};

export default SearchPage;
