import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
        <Link to="/" className="logo">StormEye</Link>
        <ul>
          <li><Link to="/relief-page">Relief Information</Link></li>
          <li><Link to="/login">Login/Sign Up</Link></li>
        </ul>
      </nav>
  )
}

export default NavBar;
