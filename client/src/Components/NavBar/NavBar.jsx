import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./NavBar.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
        <Link to="/" className="logo">StormEye</Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/relief-page">Relief Information</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/user-dashboard">My Profile</Link></li>
            <li> <Link to="/logout" onClick={handleLogout} className="logout-link">Logout</Link></li>
          </>
        ) : (
          <li><Link to="/login">Login/Sign Up</Link></li>
        )}
        </ul>
      </nav>
  )
}

export default NavBar;
