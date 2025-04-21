import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "../NavBar/NavBar.jsx";
import mapImage from './stateOfFL.png';
import userImage from './userImage.jpg';
import cities from './floridaCities.js';
import reliefCenters from './ReliefCenters.js';

import DynamicMap from "../DynamicMap/DynamicMap.jsx" // Adjust the import path as necessary

export const UserPage = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({
    trafficUpdates: "off",
    cityUpdates: "off",
    emergencyAlerts: "immediate",
    weatherUpdates: "off"
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [latLon, setLatLon] = useState(null);
  const [selectedCenterIndex, setSelectedCenterIndex] = useState(null);
  const [mapMode, setMapMode] = useState("state");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3001/user-info', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);

        if (res.data.preferences && res.data.preferences.notifications) {
          setNotifications(res.data.preferences.notifications);
        }

        setSelectedCity(res.data.selectedCity || "");
        const match = cities.find(c => c.name === res.data.selectedCity);
        console.log("Selected City:", res.data.selectedCity);
        console.log("Matched city coords:", match);
        if (match) {
          setLatLon({ lat: match.lat, lon: match.lon });
        }
      })
      .catch(err => {
        console.log("Error fetching user info:", err);
        navigate('/login');
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    axios.put('http://localhost:3001/userDashboard',
      { preferences: { notifications } },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      console.log('Preferences updated:', res.data);
      alert('Preferences updated!');
    })
    .catch(err => {
      console.error('Update error:', err);
      alert('Failed to update preferences.');
    });
  };

  return (
    <div class="wrapper">
      <NavBar />
      <div className="container-fluid py-4">
        <h1 className="welcome">Welcome to StormEye!</h1>
        <div className="row g-4 align-items-stretch">

        <div className="col-12 col-md-6">
          <div className="map text-center">
            {/*calling the dynamic map component*/}
            <DynamicMap
              selectedCity={selectedCity}
              selectedCenterIndex={selectedCenterIndex}
              setSelectedCenterIndex={setSelectedCenterIndex}
              latLon={latLon}
              mapMode={mapMode}/>

            {selectedCity && (
              <p className="selected-city-label mt-3">
                <strong>📍 Selected City:</strong> {selectedCity}
              </p>
            )}
          </div>
        </div>


          <div className="col-12 col-md-3 d-flex flex-column h-100">
            <div className="box flex-grow-1 mb-4">
              <h4 className="stgText">Map Settings</h4>
              <div className="setting-buttons d-grid gap-2">
                <button className="btn btn-primary" onClick={() => setMapMode("state")}>Display Entire State</button>
                <button className="btn btn-primary" onClick={() => setMapMode("city")}>Display Selected City</button>
                <button className="btn btn-primary" onClick={() => setMapMode("rain")}>Display Rain</button>
              </div>
            </div>

            <div className="qrBox">
              <h4 className="stgText">Quick Relief Near Me</h4>
              {/*Looks in the relief centers js file and searches if the selected city is there*/}
              {reliefCenters[selectedCity] ? (
                <div className="relief-center-list">
                  {reliefCenters[selectedCity].map((center, index) => (
                    <div key={index} className={`relief-center-item ${selectedCenterIndex === index ? 'selected' : ''}`} 
                    onClick={() => setSelectedCenterIndex(index)}>
                      <h5>{center.name}</h5>
                      <p>Address: {center.address}</p>
                      <p>Phone: {center.phone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No relief centers available for {selectedCity}.</p>
              )} 

            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="user">
              <p1 className="stgText">User Settings</p1>
              <img src={userImage} alt="User Profile Picture" />
              <h2>User Account Info</h2>
              {user ? (
                <div>
                  <div className="user-info">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                  <h3>Notification Preferences</h3>
                  <div className="notification-settings">
                    {["trafficUpdates", "cityUpdates", "emergencyAlerts", "weatherUpdates"].map((key) => (
                      <div className="notification-item" key={key}>
                        <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                        <select 
                          id={key}
                          name={key} 
                          value={notifications[key]} 
                          onChange={handleChange}
                        >
                          <option value="off">Off</option>
                          <option value="daily">Daily</option>
                          <option value="immediate">Immediate</option>
                        </select>
                      </div>
                    ))}
                  </div>
                  <button className="savePref" onClick={handleSubmit}>Save Preferences</button>
                </div>
              ) : (
                <p>Loading user info...</p>
              )}
            </div>
          </div>
          
        </div>
      </div>
      <footer className="footer text-center py-3">
      <p>&copy; 2025 StormEye. All rights reserved.</p>

    </footer>
    </div>
  );
};

export default UserPage;
