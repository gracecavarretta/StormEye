import React from 'react';
import { Link } from "react-router-dom";
import "./ReliefPage.css";
import NavBar from '../NavBar/NavBar.jsx'

const ReliefPage = () => {
  return (
    <div>
      <NavBar />
      <h1>Relief Information</h1>
      <p>Here is some important information about relief efforts.</p>
    </div>
  );
};

export default ReliefPage;