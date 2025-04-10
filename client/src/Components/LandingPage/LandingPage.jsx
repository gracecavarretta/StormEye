import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import axios from "axios"
import MainImage from "../../assets/images/LandingPageMainImage.jpg";
import "./LandingPage.css";

const LandingPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const cities = [
    { name: "Boca Raton", lat: 26.4, lon: -80.1 },
    { name: "Cape Canaveral", lat: 28.4, lon: -80.6 },
    { name: "Cape Coral", lat: 26.6, lon: -82.0 },
    { name: "Cape Sable", lat: 25.3, lon: -81.0 },
    { name: "Daytona Beach", lat: 29.2, lon: -81.1 },
    { name: "Fort Lauderdale", lat: 26.1, lon: -80.1 },
    { name: "Fort Myers", lat: 26.6, lon: -81.9 },
    { name: "Fort Pierce", lat: 27.4, lon: -80.3 },
    { name: "Gainesville", lat: 29.7, lon: -82.3 },
    { name: "Hollywood", lat: 26.0, lon: -80.2 },
    { name: "Inverness", lat: 28.8, lon: -82.3 },
    { name: "Jacksonville", lat: 30.3, lon: -81.7 },
    { name: "Jensen Beach", lat: 27.25, lon: -80.23 },
    { name: "Jupiter", lat: 26.9, lon: -80.1 },
    { name: "Key West", lat: 24.6, lon: -81.7 },
    { name: "Lake Worth", lat: 26.6, lon: -80.1 },
    { name: "Mar-a-Lago", lat: 26.68, lon: -80.04 },
    { name: "Melbourne", lat: 28.1, lon: -80.6 },
    { name: "Miami", lat: 25.8, lon: -80.2 },
    { name: "Naples", lat: 26.1, lon: -81.8 },
    { name: "Orlando", lat: 28.5, lon: -81.4 },
    { name: "Palm Bay", lat: 28.0, lon: -80.7 },
    { name: "Palm Coast", lat: 29.6, lon: -81.2 },
    { name: "Panama City", lat: 30.2, lon: -85.7 },
    { name: "Pensacola", lat: 30.4, lon: -87.2 },
    { name: "Perry", lat: 30.1, lon: -83.6 },
    { name: "Port Charlotte", lat: 27.0, lon: -82.1 },
    { name: "Port St. Lucie", lat: 27.3, lon: -80.4 },
    { name: "Sarasota", lat: 27.3, lon: -82.5 },
    { name: "Spring Hill", lat: 28.5, lon: -82.6 },
    { name: "St. Augustine", lat: 29.9, lon: -81.3 },
    { name: "St. Petersburg", lat: 27.8, lon: -82.6 },
    { name: "Tallahassee", lat: 30.46, lon: -84.28 },
    { name: "Tampa", lat: 28.0, lon: -82.5 },
    { name: "Titusville", lat: 28.6, lon: -80.8 },
    { name: "Vero Beach", lat: 27.6, lon: -80.4 },
    { name: "West Palm Beach", lat: 26.7, lon: -80.1 },
  ];

  const fetchAlerts = async () => {
    if (!latitude || !longitude) {
      setError("Please enter both latitude and longitude.");
      return;
    }

    try {
      const alertUrl = `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`;
      // const headers = { "User-Agent": "MyWeatherApp (myemail@example.com)" };

      console.log("Fetching Alerts:", alertUrl);
      const response = await axios.get(alertUrl);

      if (response.data.features.length === 0) {
        setAlerts([{ event: "No active alerts", description: "There are currently no alerts for this area." }]);
      } else {
        const alertsData = response.data.features.map((feature) => ({
          event: feature.properties.event,
          description: feature.properties.description,
          severity: feature.properties.severity,
          instruction: feature.properties.instruction,
        }));
        setAlerts(alertsData);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch alerts. Please try again.");
      setAlerts([]);
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = cities.find(city => city.name === event.target.value);
    if (selectedCity) {
      setLatitude(selectedCity.lat);
      setLongitude(selectedCity.lon);
      console.log(`Selected: ${selectedCity.name} - Latitude: ${selectedCity.lat}, Longitude: ${selectedCity.lon}`);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="hero">
        <div className="hero-image-box">
          <img src={MainImage} />
          <h1>Your Universal Guide Through <br></br> the StormEye</h1>
        </div>
        <div>
          <select onChange={handleCityChange} defaultValue="">
            <option value="" disabled>Select a city</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {latitude !== null && longitude !== null && (
            <div>
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
            </div>
          )}
          <button className="btn" onClick={fetchAlerts}>Get Alerts</button>
        </div>

        {alerts.length > 0 ? (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>
                <strong>{alert.event ?? "No event"}</strong> - {alert.description ?? "No description"}
                <br />
                <strong>Severity:</strong> {alert.severity ?? "Unknown"}
                <br />
                <strong>Instructions:</strong> {alert.instruction ?? "No instructions"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No active alerts.</p>
        )}

      </div>
    </div>
  );
};

export default LandingPage;  