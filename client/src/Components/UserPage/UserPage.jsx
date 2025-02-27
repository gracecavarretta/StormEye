import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "../NavBar/NavBar.jsx";

export const UserPage = () => {
  //consts go here

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
          Profile Pic, User Settings, Notification Settings
        </div>
      </div>
    </div>
  );
}

export default UserPage;