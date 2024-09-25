import React, { useEffect } from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';
import gambarGudang from '../assets/gudang22.jpg';
import ikonMarker from 'leaflet/dist/images/marker-icon.png';
import bayanganIkonMarker from 'leaflet/dist/images/marker-shadow.png';

// Ikon marker kustom
const ikonKustom = L.icon({
  iconUrl: ikonMarker,
  shadowUrl: bayanganIkonMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CustomMarker = ({ location, code }) => {
  const map = useMap(); // Mendapatkan referensi ke objek peta

  useEffect(() => {
    if (location) {
      const { x, y } = location;

      // Tambahkan marker ke map
      const marker = L.marker([y, x], { icon: ikonKustom }).addTo(map);
      // Fokuskan map ke lokasi marker
      map.setView([y, x], 0);

      // Tampilkan popup pada marker dengan informasi kode
      marker.bindPopup(`<b>Kode lokasi:</b> ${code}`).openPopup();

      // Bersihkan marker saat komponen tidak lagi digunakan
      return () => {
        map.removeLayer(marker);
      };
    }
  }, [location, map, code]);

  return null;
};

const Map = ({ location, code }) => {
  // Batas map sesuai dengan ukuran gambar
  const batas = [
    [0, 0],
    [1000, 2700], // Tinggi x Lebar dalam piksel
  ];

  return (
    <div className="map-container">
      <MapContainer
        crs={L.CRS.Simple} // Sistem koordinat sederhana
        bounds={batas} // Batas tampilan map
        maxZoom={1} // Zoom maksimum
        minZoom={-1} // Zoom minimum
        style={{ height: '100%', width: '100%' }} // Memastikan map memenuhi wadah
        scrollWheelZoom={false} // Menonaktifkan zoom menggunakan scroll roda mouse
      >
        {/* Tambahkan lapisan gambar sebagai latar belakang map */}
        <ImageOverlay url={gambarGudang} bounds={batas} />
        {/* Tampilkan marker kustom jika lokasi tersedia */}
        {location && <CustomMarker location={location} code={code} />}
      </MapContainer>
    </div>
  );
};

export default Map;
