import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "../NavBar/NavBar.jsx";

export const UserPage = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({
    trafficUpdates: "off",
    cityUpdates: "off",
    emergencyAlerts: "immediate",
    weatherUpdates: "off"
  });

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
        // OPTIONAL: If your backend returns preferences, pre-fill them
        if (res.data.preferences && res.data.preferences.notifications) {
          setNotifications(res.data.preferences.notifications);
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
    <div>
      <NavBar />
      <div className="grid-layout">
        <div className="map">Map</div>
        <div className="adj-col">Map Settings, Quick Info/Search</div>
        <div className="next-col">
          <h2>User Account Info</h2>
          {user ? (
            <div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>

              <h3>Notification Preferences</h3>
              {["trafficUpdates", "cityUpdates", "emergencyAlerts", "weatherUpdates"].map((key) => (
                <div key={key} style={{ marginBottom: "10px" }}>
                  <label><strong>{key}</strong>: </label>
                  <select name={key} value={notifications[key]} onChange={handleChange}>
                    <option value="off">Off</option>
                    <option value="daily">Daily</option>
                    <option value="immediate">Immediate</option>
                  </select>
                </div>
              ))}

              <button onClick={handleSubmit}>Save Preferences</button>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
