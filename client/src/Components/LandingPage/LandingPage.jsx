import React from "react";
import { Link } from "react-router-dom";
import MainImage from "../../assets/images/LandingPageMainImage.jpg";
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
        <div class="hero-image-box">        
          <img src={MainImage}/>
          <h1>Your Universal Guide Through the StormEye</h1>
        </div>
        <Link to="/login" className="btn">Login/Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;  