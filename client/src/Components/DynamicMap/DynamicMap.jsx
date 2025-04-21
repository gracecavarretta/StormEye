import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { tileLayer } from 'leaflet';
import reliefCenters from '../UserPage/ReliefCenters';
import reliefIcon from '../../assets/images/first-aid-kit-icon.png'; 
import selectedReliefIcon from '../../assets/images/selected-marker-icon.png';

const ReliefIcon = (isSelected)=> (
    // creates marker icon. switches between the help vs blue if user selects on icon
    new L.Icon({
        iconUrl: isSelected
          ? selectedReliefIcon
          : reliefIcon,
        iconSize: [30, 30],
        popupAnchor: [0, -30],
      })
)


const RainOverlay = () => (
    // rain overlay from openweathermap api
  <TileLayer
    url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=47daf4c70f5c1d90b385c14e135c8726`}
    opacity={0.8}
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
  />
);

const MapFocus = ({ latLon, zoom }) => {
    //changing focus/zoom based on if user selects a city or state
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
  if (mapMode === 'state'|| mapMode === 'rain') { 
    latLon = { lat: 28, lon: -82 }; // Center of Florida
  }

  return (
    <MapContainer center={[latLon.lat, latLon.lon]} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <MapFocus latLon={latLon} zoom={zoom} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?appid=47daf4c70f5c1d90b385c14e135c8726"
      />

      {mapMode === "rain" && <RainOverlay />}
      {/*show markers if city is selected, selected city is true, selected city is found in the relief center.js, and there are items*/}
      {mapMode === "city" && selectedCity &&
        Array.isArray(reliefCenters[selectedCity]) &&
        reliefCenters[selectedCity].length > 0 &&
        reliefCenters[selectedCity].map((center, index) => (
            // create markers for each relief center in the selected city
          <Marker
            key={index}
            position={[center.lat, center.lon]}
            icon={ReliefIcon(index === selectedCenterIndex)}
            eventHandlers={{
              click: () => setSelectedCenterIndex(index),
            }}
          >
            {/* create popups for each marker with the name, address, and phone number */}
            <Popup>
              <strong>{center.name}</strong>
              <br />
              🏠{center.address}
              <br />
              📞 {center.phone}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default DynamicMap;
