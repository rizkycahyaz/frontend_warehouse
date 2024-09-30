import React from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import warehouseImage from '../assets/warehouse.png';

const MapComponent = ({ location }) => {
  const bounds = [
    [0, 0],
    [1000, 2700],
  ]; // Adjust according to warehouse image dimensions

  return (
    <MapContainer bounds={bounds} maxZoom={1} minZoom={-1} style={{ height: '500px', width: '100%' }}>
      <ImageOverlay url={warehouseImage} bounds={bounds} />
      {location && (
        <Marker position={[location.y, location.x]}>
          <Popup>{location.code}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
