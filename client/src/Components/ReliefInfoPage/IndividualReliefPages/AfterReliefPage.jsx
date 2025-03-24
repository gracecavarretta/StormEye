import React from 'react';
import { Link } from "react-router-dom";
import "./IndividualReliefPage.css";
import NavBar from "../../NavBar/NavBar.jsx";
import MainImage from "../../../assets/images/AfterRelief.jpeg";

const AfterReliefPage = () => {
  return (
    <div className="individual-relief-page">
      <NavBar />
      <div className="h-relief-individual">
        <div class="h-relief-individual-image-box">
          <img src={MainImage}/>
          <h1>After Relief Information</h1>
        </div>
        <div class="h-relief-individual-text-box">
          <h2>Recovering from the Storm</h2>
            <p>Once the storm has passed, the aftermath can still be 
              dangerous. It’s important to take careful steps to ensure 
              your safety, assess damage, and begin recovery.</p>
          <h2>1. Ensure Personal Safety</h2>
            <p>Even though the storm is over, there are numerous hazards that 
              can still pose risks.</p>
              <ul>
                <li>Wait for Official Clearance</li>
                <li>Check for Injuries</li>
                <li>Avoid Floods and Downed Power lines</li>
              </ul>
         <h2>2. Communicate and Stay Informed</h2>
            <p>Keeping in touch with emergency services and loved ones 
              is crucial after a storm.</p>
              <ul>
                  <li>Listen to Local Authorities</li>
                  <li>Let Your Loved Ones Know Your Safe</li>
              </ul>
          <h2>3. Assess and Document Damage</h2>
            <p>Before beginning cleanup or repairs, evaluate the 
              condition of your home and surroundings.</p>
              <ul>
                  <li>Inspect Your Home</li>
                  <li>Look for Gas Leaks</li>
                  <li>Check for Water Damage</li>
                </ul>
          <h2>4. Seek Assistance and Recovery Aid</h2>
            <p>If your home has sustained significant damage, reach out for help 
              from relief organizations.</p>
              <ul>
                  <li>Contact your Insurance Provider</li>
                  <li>Apply for Disaster Assistance</li>
                  <li>Seek Community Support</li>
              </ul>
        </div>
      </div>
    </div>
  );
};

export default AfterReliefPage;