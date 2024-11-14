import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert, Container } from '@mui/material';
import Map from '../components/WarehouseMap'; // Assuming you have a separate Map component
import ItemDetail from '../components/itemDetails';
import { searchLocation } from '../api/locationApi';
import { getItemDetails } from '../api/itemApi';

const SearchPage = () => {
  const [lotBatchNo, setLotBatchNo] = useState('');
  const [locationData, setLocationData] = useState({
    // Define initial coordinates for your default location here
    x: 0,
    y: 0,
    warehouse_name: 'Default Warehouse', // Optional initial warehouse name
  });
  const [searchCode, setSearchCode] = useState('');
  const [error, setError] = useState('');
  const [itemDetails, setItemDetails] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!lotBatchNo) {
      setError('Please enter a lot batch number to search.');
      return;
    }
    try {
      console.log('Searching for lotBatchNo:', lotBatchNo);
      const data = await searchLocation(lotBatchNo);
      if (data.status) {
        const code = `${data.data.warehouse_name}${data.data.kolom}${data.data.baris}`;
        setLocationData({
          x: data.data.x,
          y: data.data.y,
          warehouse_name: data.data.warehouse_name,
          baris: data.data.baris,
          kolom: data.data.kolom,
        });
        setSearchCode(code); // Assuming you have a separate searchCode state for Map
        // Get item details using the new API
        const items = await getItemDetails(lotBatchNo); // Mengambil item berdasarkan lotBatchNo
        setItemDetails(items);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch location');
    }
  };

  useEffect(() => {
    // Handle any cleanup or side effects if needed
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <h2>Search for a Material location</h2>
        <form onSubmit={handleSearch}>
          <TextField label="Lot Batch Number" variant="outlined" value={lotBatchNo} onChange={(event) => setLotBatchNo(event.target.value)} error={!!error} helperText={error} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </Container>
      {/* Conditionally render Map */}
      {locationData && <Map location={locationData} code={searchCode} />}
      {!locationData && <p>Searching...</p>} {/* Optional placeholder message */}
      {itemDetails && <ItemDetail items={itemDetails} />}
    </div>
  );
};

export default SearchPage;
