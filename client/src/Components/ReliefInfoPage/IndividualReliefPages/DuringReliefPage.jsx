import React from 'react';
import { Link } from "react-router-dom";
import "./IndividualReliefPage.css";
import NavBar from "../../NavBar/NavBar.jsx";
import MainImage from "../../../assets/images/DuringRelief.jpeg";

const DuringReliefPage = () => {
  return (
    <div className="wrapper">
    <NavBar />

    <main className="individual-relief-page">
      <div className="h-relief-individual">
        <div className="h-relief-individual-image-box">
          <img src={MainImage} />
          <h1>During Relief Information</h1>
        </div>

        <div className="h-relief-individual-text-box">
          <h2>Living through the Storm</h2>
            <p>Once the storm arrives, staying 
              safe should be your top priority. Follow these
               steps to protect yourself and your loved ones from 
               potential hazards.</p>
          <h2>1. Stay Indoors and Seek Shelter</h2>
            <p>Strong winds, flying debris, and heavy rain can 
              make outdoor conditions extremely dangerous.</p>
              <ul>
                <li>Remain in a Secure Location</li>
                <li>Move to an Interior Room</li>
                <li>Avoid Flood-Prone Area</li>
              </ul>
          <h2>2. Monitor Storm Updates</h2>
            <p>Storm conditions can change rapidly, so staying 
              informed is essential.</p>
              <ul>
                <li>Follow trusted weather monitoring sources</li>
                <li>Follow Evacuation Orders</li>
                </ul>
          <h2>3. Conserve Power & Supplies</h2>
            <p>It's important to ration resources as storms can cause prolonged outages.</p>
              <ul>
                  <li>Use Flashlights</li>
                  <li>Limit Phone Usage</li>
                  <li>Keep Refridgerators and Freezers Closed</li>
              </ul>
        </div>
      </div>
    </main>

    <footer className="footer">
      <p>© 2025 StormEye. All rights reserved.</p>
    </footer>
  </div>
  );
};

export default DuringReliefPage;

