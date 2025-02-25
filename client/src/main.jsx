import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx'; 
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        {/* Route for landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for login/signup page */}
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
)
