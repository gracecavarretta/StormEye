import React from 'react';
import { Link } from "react-router-dom";
import "./IndividualReliefPage.css";
import NavBar from "../../NavBar/NavBar.jsx";
import MainImage from "../../../assets/images/BeforeRelief.jpg";

const BeforeReliefPage = () => {
  return (
    <div className="wrapper">
      <NavBar />

      <main className="individual-relief-page">
        <div className="h-relief-individual">
          <div className="h-relief-individual-image-box">
            <img src={MainImage} />
            <h1>Before Relief Information</h1>
          </div>

          <div className="h-relief-individual-text-box">
            <h2>Preparing for the Storm</h2>
              <p>When a tropical storm or hurricane is approaching, 
                advance preparation is crucial to reducing risks, ensuring safety, 
                and avoiding last-minute panic. Taking these steps can
                protect your home, belongings, and your loved ones.</p>
            <h2>1. Create an Emergency Plan</h2>
              <p>Having a well-curated emergency plan can make a major 
                difference in how you respond to the storm.</p>
                <ul>
                  <li>Create an Evauation Plan</li>
                  <li>Assemble an Emergency Kit</li>
                  <li>Establish a Communication Plan</li>
                </ul>
            <h2>2. Protect Your Property</h2>
              <p>Minimizing damage before the storm hits can 
                help protect your property and reduce costly repairs.</p>
                <ul>
                    <li>Install Storm Shutters</li>
                    <li>Secure Loose Furniture</li>
                    <li>Reinforce Doors and Garage Doors</li>
                    <li>Trim Trees and Discard Loose Branches</li>
                  </ul>
            <h2>3. Stay Informed & Monitor Alerts</h2>
              <p>It’s essential to stay updated because
                hurricanes can shift in strength and direction</p>
                <ul>
                    <li>Follow trusted weather monitoring sources</li>
                    <li>Sign up for alerts in your area</li>
                </ul>
            <h2>4. Prepare for Outages & Evacuations</h2>
              <p>Storms often result in power outages that can span multiple days.</p>
                <ul>
                    <li>Charge all Electronic Devices and Prepare Portable Power Banks</li>
                    <li>Store Extra Water and Food</li>
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

export default BeforeReliefPage;