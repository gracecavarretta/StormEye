import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <div className="hero">
        <h1>Welcome to StormEye</h1>
        <Link to="/login" className="btn">Login/Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;  