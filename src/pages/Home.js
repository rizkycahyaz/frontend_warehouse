import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import MapComponent from '../components/WarehouseMap';
import ItemDetails from '../components/ItemDetails';
import { searchLocation } from '../api/locationApi';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [item, setItem] = useState(null);

  const handleSearch = async (code) => {
    const result = await searchLocation(code);
    setLocation(result.location);
    setItem(result.item);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <MapComponent location={location} />
      <ItemDetails item={item} />
    </div>
  );
};

export default Home;
