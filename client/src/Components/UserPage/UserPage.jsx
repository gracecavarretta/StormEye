import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "../NavBar/NavBar.jsx";
import mapImage from './stateOfFL.png';
import userImage from './userImage.jpg';


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
      <div className="container-fluid py-4">
        <h1 className="welcome">Welcome to StormEye!</h1>
        <div className="row g-4 align-items-stretch">


          <div class="col-12 col-md-6">
            <div className="map">
              <img src={mapImage} alt="Map of Florida" />
            </div>
          </div>

          <div className="col-12 col-md-3 d-flex flex-column h-100">
            <div className="box flex-grow-1 mb-4">
              <h4 className="stgText">Map Settings</h4>
              <div className="setting-buttons d-grid gap-2">
                <button className="btn btn-primary">Setting 1</button>
                <button className="btn btn-primary">Setting 2</button>
                <button className="btn btn-primary">Setting 3</button>
              </div>
            </div>

            <div className="qrBox">
              <h4 className="stgText">Quick Relief Near Me</h4>
              <input type="text" className="search-bar" placeholder="Search..." />
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="user">
              <p1 className="stgText">User Settings</p1>
              <img src={userImage} alt="User Profile Picture" />
              <h2 >User Account Info</h2>
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
    </div>
  );
};

export default UserPage;
