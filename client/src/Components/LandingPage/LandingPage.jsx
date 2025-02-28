import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import MainImage from "../../assets/images/LandingPageMainImage.jpg";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
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