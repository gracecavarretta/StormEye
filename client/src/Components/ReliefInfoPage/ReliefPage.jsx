import React from 'react';
import { Link } from "react-router-dom";
import "./ReliefPage.css";
import NavBar from '../NavBar/NavBar.jsx'

const ReliefPage = () => {
  return (
    <div>
      <NavBar />
      <div className="h-relief">
        <h1>Relief Information</h1>
      </div>
      <div className="relief-container">
        <div className="relief-box">
          <h2>Before a Disaster</h2>
          <p>blah blah blah</p>
          <Link to="/relief-before" className="relief-btn">Learn More</Link>
        </div>
        <div className="relief-box">
          <h2>During a Disaster</h2>
          <p>blah blah blah</p>
          <Link to="/relief-during" className="relief-btn">Learn More</Link>
        </div>
        <div className="relief-box">
          <h2>After a Disaster</h2>
          <p>blah blah blah</p>
          <Link to="/relief-after" className="relief-btn">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default ReliefPage;