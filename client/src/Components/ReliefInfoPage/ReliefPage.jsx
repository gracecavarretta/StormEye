import React from 'react';
import { Link } from "react-router-dom";
import "./ReliefPage.css";
const ReliefPage = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">StormEye</Link>
          <ul>
            <li><Link to="/relief">Relief Information</Link></li>
            <li><Link to="/login">Login/Sign Up</Link></li>
          </ul>
      </nav>
      <h1>Relief Information</h1>
      <p>Here is some important information about relief efforts.</p>
    </div>
  );
};

export default ReliefPage;