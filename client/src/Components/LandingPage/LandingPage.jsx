import React from "react";
import { Link } from "react-router-dom";
import MainImage from "../../assets/images/LandingPageMainImage.jpg";
import "./LandingPage.css";
import "../RepeatedCSS/NavBar.css";

const LandingPage = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">StormEye</Link>
        <ul>
          <li><Link to="/relief">Relief Information</Link></li>
          <li><Link to="/login">Login/Sign Up</Link></li>
        </ul>
      </nav>

      <div className="hero">
        <div class="hero-image-box">        
          <img src={MainImage}/>
          <h1>Your Universal Guide Through <br></br> the StormEye</h1>
        </div>
        <Link to="/login" className="btn">Login/Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;  