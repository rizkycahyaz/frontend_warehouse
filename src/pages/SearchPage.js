import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import SearchForm from '../components/SearchForm';
import Map from '../components/WarehouseMap';
import { searchLocation } from '../api/locationApi';

const SearchPage = () => {
  const [locationData, setLocationData] = useState(null);
  const [searchCode, setSearchCode] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (lotBatchNo) => {
    console.log('Searching for:', lotBatchNo);
    try {
      const data = await searchLocation(lotBatchNo);
      console.log('API response data:', data); // Data dari API, harusnya sudah terlog

      if (data.status) {
        const code = `${data.data.warehouse_name}${data.data.baris}${data.data.kolom}`; // Construct code string
        setLocationData({
          x: data.data.x,
          y: data.data.y,
          warehouse_name: data.data.warehouse_name,
          baris: data.data.baris,
          kolom: data.data.kolom,
        });
        setSearchCode(code); // Update searchCode with constructed code
        console.log('Updated locationData:', data.data); // Memastikan locationData diperbarui
        console.log('Updated searchCode:', lotBatchNo); // Memastikan searchCode diperbarui
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch location');
    }
  };

  return (
    <div>
      <h2>Search for a Material location</h2>
      <SearchForm onSearch={handleSearch} />
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Map location={locationData} code={searchCode} />
    </div>
  );
};

export default SearchPage;
