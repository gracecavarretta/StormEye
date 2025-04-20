import React from 'react';
import { Link } from "react-router-dom";
import "./ReliefPage.css";
import NavBar from '../NavBar/NavBar.jsx'
import MainImage from "../../assets/images/ReliefPageMainImage.jpg";
//
const ReliefPage = () => {
  return (
    <div className="wrapper">
      <NavBar />
      <div className="hero">
        <div className="hero-image-box">
          <img src={MainImage} alt="Relief" />
          <h1>Relief Information</h1>
        </div>
      <div className="relief-container">
        <div className="relief-box">
          <h2>Before a Disaster</h2>
          <p>Preparation is key to staying safe in a storm. <br></br><br></br>
            Taking action before the storm arrives can make all the difference in 
            protecting your home, securing essential supplies, and ensuring your 
            family is ready for any emergency. </p>
          <Link to="/relief-before" className="relief-btn">Learn More</Link>
        </div>
        <div className="relief-box">
          <h2>During a Disaster</h2>
          <p>As a hurricane arrives, your priority is to stay 
            safe. <br></br><br></br>
            High winds, heavy rain, and potential flooding can create 
            life-threatening conditions. It is incredibly crucial to follow emergency guidelines,
            find shelter, and seek evacuation. </p>
          <Link to="/relief-during" className="relief-btn">Learn More</Link>
        </div>
        <div className="relief-box">
          <h2>After a Disaster</h2>
          <p>The storm passed, but the danger isn’t over yet.  <br></br><br></br>
             After a hurricane, there numerous hazards that pose high risks.
             As you assess the aftermath, it’s crucial to take precautions, 
             follow local emergency guidance, and access available relief resources.</p>
          <Link to="/relief-after" className="relief-btn">Learn More</Link>
        </div>
      </div>
      </div>
      <footer className="footer">
      <p>© 2025 StormEye. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default ReliefPage;