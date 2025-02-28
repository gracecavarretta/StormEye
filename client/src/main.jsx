import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx'; 
import Signup from './Components/LoginSignup/Signup.jsx'
import Login from './Components/LoginSignup/Login.jsx'
import ReliefPage from './Components/ReliefInfoPage/ReliefPage.jsx'; 

createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        {/* Route for landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for signup page */}
        <Route path="/register" element={<Signup />} />

        {/* Route for login page */}
        <Route path="/login" element={<Login />} />
         {/* Route for relief page */}
         <Route path="/relief" element={<ReliefPage />} /> 
      </Routes>
    </Router>
)
