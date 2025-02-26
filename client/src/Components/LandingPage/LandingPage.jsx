import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">StormEye</div>
        <ul>
          <li><Link to="/relief">Relief Information</Link></li>
          <li><Link to="/login">Login/Sign Up</Link></li>
        </ul>
      </nav>

      <div className="hero">
        <h1>Welcome to StormEye</h1>
        <Link to="/login" className="btn">Login/Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;  