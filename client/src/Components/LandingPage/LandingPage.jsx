import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import axios from "axios"
import MainImage from "../../assets/images/LandingPageMainImage.jpg";
import "./LandingPage.css";

const LandingPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [alerts, setAlerts] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    if (!latitude || !longitude) {
      setError("Please enter both latitude and longitude.");
      return;
    }

    try {
      const alertUrl = `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`;
      const headers = { "User-Agent": "MyWeatherApp (myemail@example.com)" };

      console.log("Fetching Alerts:", alertUrl);
      const response = await axios.get(alertUrl, { headers });

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
        {/* <Link to="/login" className="btn">Login/Sign Up</Link> */}
        <input
          type="latitude"
          placeholder="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="longitude"
          placeholder="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={fetchAlerts}>Get Alerts</button>

        {/* {alerts.length > 0 ? (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>
                <strong>{alert.event}</strong> - {alert.description}
                <br />
                <strong>Severity:</strong> {alert.severity}
                <br />
                <strong>Instructions:</strong> {alert.instruction}
              </li>
            ))}
          </ul>
        ) : (
          <p>No active alerts.</p>
        )} */}
      </div>
    </div>
  );
};

export default LandingPage;  