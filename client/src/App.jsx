import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx'; 
import Login from './Components/LoginSignup/Login.jsx'
import Signup from './Components/LoginSignup/Signup.jsx'
import UserDash from './Components/UserPage/UserPage.jsx'
import ReliefPage from './Components/ReliefInfoPage/ReliefPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDash />} />
        <Route path="/relief-page" element={<ReliefPage />}/>
      </Routes>
    </Router>
  )
}

export default App;