import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
        <div className="logo">StormEye</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login/Sign Up</Link></li>
        </ul>
      </nav>
  )
}

export default NavBar;
