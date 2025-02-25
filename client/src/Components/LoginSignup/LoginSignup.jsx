import React, { useState } from 'react';
import './LoginSignup.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  const toggleAction = () => {
    setAction(action === "Login" ? "Sign Up" : "Login");
  };

  const handleSubmit = () => {
    console.log(`${action} form submitted!`);
    // api calls here
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <i className="bi bi-person"></i>
            <input type="text" placeholder="Username" />
          </div>
        )}
        <div className="input">
          <i className="bi bi-envelope"></i>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <i className="bi bi-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="toggle-container">
        <div
          className={`toggle-button ${action === "Sign Up" ? "active" : ""}`}
          onClick={toggleAction}
        >
          <div className="slider"></div>
        </div>
      </div>
      <div className="toggle-text">
        {action === "Sign Up" ? "Already have an account?" : "New Member?"}
      </div>
      {action === "Login" && (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}
      <div className="submit-container">
        <button className="submit-btn" onClick={handleSubmit}>
          {action}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;