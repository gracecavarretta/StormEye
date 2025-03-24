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
      <div>
        <div class="welcome">
          <p1>
            Welcome to StormEye!
          </p1>
        </div>
    
        <div class="row">
          <div class="col">
            <div className="map">
              <img src={mapImage} alt="Map of Florida" />
            </div>
          </div>
          <div class="col">
            <div class="mapStg">
            <div class="row">
              <div class="col">
                <div class="Stg">
                  <p1>Map Settings</p1>
                  <div class="setting-buttons">
                    <button>Setting 1</button>
                    <button>Setting 2</button>
                    <button>Setting 3</button>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="quickInfo">
                  <p1 class="matchText">Quick Info/Search</p1>
                  <input type="text" class="search-bar" placeholder="Search..." />
                </div>
              </div>
            </div>
            </div>
            <div class="quickRelief">
              <p1 class="matchText">
                Quick Relief Near Me
              </p1>
            </div>
          </div>
          <div class="col">
            <div class="user">
              <p1 class="matchText">User Settings</p1>
              <img src={userImage} alt="User Profile Picture" />
              <div className="next-col">
              <h2 >User Account Info</h2>
              {user ? (
                <div>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>

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
                  <button class="savePref" onClick={handleSubmit}>Save Preferences</button>
                </div>
              ) : (
                <p>Loading user info...</p>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
