import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx'; 
import Login from './Components/LoginSignup/Login.jsx'
import Signup from './Components/LoginSignup/Signup.jsx'
import UserDash from './Components/UserPage/UserPage.jsx'
import ReliefPage from './Components/ReliefInfoPage/ReliefPage.jsx'
import BeforeReliefPage from './Components/ReliefInfoPage/IndividualReliefPages/BeforeReliefPage.jsx';
import DuringReliefPage from './Components/ReliefInfoPage/IndividualReliefPages/DuringReliefPage.jsx';
import AfterReliefPage from './Components/ReliefInfoPage/IndividualReliefPages/AfterReliefPage.jsx';

//from nora
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDash />} />
        <Route path="/relief-page" element={<ReliefPage />}/>
        <Route path="/relief-before" element={<BeforeReliefPage />}/>
        <Route path="/relief-during" element={<DuringReliefPage />}/>
        <Route path="/relief-after" element={<AfterReliefPage />}/>

      </Routes>
    </Router>
  )
}

export default App;