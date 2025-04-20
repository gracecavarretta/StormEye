import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "../NavBar/NavBar.jsx";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Login form submitted!`);
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        console.log(res);
        if (res.data.token) {
            navigate('/'); // TODO: Change to home page
        }
      })
      .catch(err => console.log('Axios Error:', err.response ? err.response.data : err.message))
  };

  return (
    <div className="wrapper">
    <NavBar />

    <main className="main-content">
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
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
            <button type="submit" className="submit-btn">Login</button>
          </div>
        </form>
        <div className="toggle-text">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>Register here!</span>
        </div>
      </div>
    </main>

    <footer className="footer">
      <p>© 2025 StormEye. All rights reserved.</p>
    </footer>
  </div>
  );
};

export default Login;