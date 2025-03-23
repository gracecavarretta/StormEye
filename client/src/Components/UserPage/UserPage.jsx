import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "../NavBar/NavBar.jsx";

export const UserPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login'); // Redirect if not logged in
      return;
    }

    // Fetch user data using token
    axios.get('http://localhost:3001/user-info', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data))
      .catch(err => {
        console.log("Error fetching user info:", err);
        navigate('/login'); // Redirect if token is invalid
      });
  }, [navigate]);

  return (
    <div>
      <NavBar />
      <div class="grid-layout">
        <div class="map">
          Map
        </div>
        <div class="adj-col">
          Map Settings, Quick Info/Search
        </div>
        <div class="next-col">
          <h2>User Account Info</h2>
          {user ? (
            <div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;