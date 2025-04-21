import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import reliefCenters from '../UserPage/ReliefCenters'; // adjust path if needed

const ReliefIcon = (isSelected) =>
  new L.Icon({
    iconUrl: isSelected
      ? 'https://cdn-icons-png.flaticon.com/512/684/684908.png'
      : 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [30, 30],
    popupAnchor: [0, -30],
    className: isSelected ? 'selected-relief-icon' : ''
  });

const RainOverlay = () => (
  <TileLayer
    url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=47daf4c70f5c1d90b385c14e135c8726`}
    opacity={0.8}
  />
);

const MapFocus = ({ latLon, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (latLon) {
      map.setView([latLon.lat, latLon.lon], zoom);
    }
  }, [latLon, zoom, map]);

  return null;
};

const DynamicMap = ({ selectedCity, selectedCenterIndex, setSelectedCenterIndex, latLon, mapMode }) => {
  if (!latLon) return <p>Loading map...</p>;
  const zoom = mapMode === 'city' ? 11 : 6;

  return (
    <MapContainer center={[latLon.lat, latLon.lon]} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <MapFocus latLon={latLon} zoom={zoom} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?appid=47daf4c70f5c1d90b385c14e135c8726"
      />

      {mapMode === "rain" && <RainOverlay />}

      {mapMode === "city" && selectedCity &&
  Array.isArray(reliefCenters[selectedCity]) &&
  reliefCenters[selectedCity].length > 0 &&
  reliefCenters[selectedCity].map((center, index) => (
          <Marker
            key={index}
            position={[center.lat, center.lon]}
            icon={ReliefIcon(index === selectedCenterIndex)}
            eventHandlers={{
              click: () => setSelectedCenterIndex(index),
            }}
          >
            <Popup>
              <strong>{center.name}</strong>
              <br />
              {center.address}
              <br />
              📞 {center.phone}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default DynamicMap;
