import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "../NavBar/NavBar.jsx";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signup Form submitted!`);
    console.log({ username, email, password });
    axios.post('http://localhost:3001/register', { username, email, password })
      .then(res => {
        console.log(res);
        navigate('/login');
      })
      .catch(err => console.log("error response: ", err))
  };

  return (
    <div>
      <NavBar />
      <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <i className="bi bi-person"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <i className="bi bi-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-btn">Sign Up</button>
        </div>
      </form>

      <div className="toggle-text">
        Already have an account?{' '}
        <span onClick={() => navigate('/login')}>Login here!</span>
      </div>
    </div>
    </div>
  );
};

export default Signup;