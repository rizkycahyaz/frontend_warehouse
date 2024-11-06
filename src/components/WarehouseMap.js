import React, { useEffect } from "react";
import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Map.css";
import gambarGudang from "../assets/gudangdingin.jpg";
import ikonMarker from "leaflet/dist/images/marker-icon.png";
import bayanganIkonMarker from "leaflet/dist/images/marker-shadow.png";

const ikonKustom = L.icon({
  iconUrl: ikonMarker,
  shadowUrl: bayanganIkonMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CustomMarker = ({ location, code }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      const { x, y } = location;

      // Tambahkan marker ke map
      const marker = L.marker([y, x], { icon: ikonKustom }).addTo(map);

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
  const bounds = [
    [0, 0],
    [1000, 2700],
  ];

  return (
    <div className="map-container">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        maxBounds={bounds} // Menambahkan maxBounds agar peta tidak bergeser
        maxZoom={1}
        minZoom={-1}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <ImageOverlay url={gambarGudang} bounds={bounds} />
        {location && code && <CustomMarker location={location} code={code} />}
      </MapContainer>
    </div>
  );
};

export default Map;
